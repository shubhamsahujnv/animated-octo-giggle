"""Speech-recognition round trip for a TGS voiceover: proves every word is spoken correctly
and adds word-level timings to timeline.json (used for caption sync and motion cues).

1. Transcribes the audio with faster-whisper (default model small.en, word timestamps).
2. Normalises both sides (case, punctuation, numbers, US/UK spelling, known brand splits)
   and diffs the transcript against each scene's "caption" text.
3. Writes <dir>/voiceover-check.md with the transcript and every difference, and
   adds "words": [{"w", "start", "end"}] per scene to timeline.json.
Exit code 1 if any word differs.

Usage: python3 check_voiceover.py <video dir> [audio file, default voiceover.wav] [--model small.en]
"""
import difflib, json, os, re, sys
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly
from faster_whisper import WhisperModel

# spelling/brand variants that are the same spoken word
EQUIV = {"liters": "litres", "tons": "tonnes", "centers": "centres", "center": "centre",
         "liter": "litre", "nvidias": "nvidias", "starcloud": "starcloud", "okay": "ok"}
JOIN = [("star cloud", "starcloud"), ("space x", "spacex")]
NUMS = {w: str(i) for i, w in enumerate("zero one two three four five six seven eight nine ten eleven twelve".split())}

def norm(text):
    t = text.lower().replace("’", "'").replace("×", "x")
    t = re.sub(r"(\d)\s*,\s*(\d)", r"\1\2", t)                 # 3,500 / "3 ,500" -> 3500
    t = re.sub(r"(\d)\s*x\b", r"\1 x", t)
    t = t.replace("-", " ")
    t = re.sub(r"[^a-z0-9' ]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    for a, b in JOIN:
        t = re.sub(rf"\b{a}\b", b, t)
    words = [NUMS.get(w, w) for w in (EQUIV.get(w.strip("'"), w.strip("'")) for w in t.split())]
    return [w for w in words if w and w != "x"]                  # "3,500×" vs "3,500 times" handled below

def main():
    vdir = sys.argv[1]
    args = sys.argv[2:]
    model = "small.en"
    if "--model" in args:
        i = args.index("--model"); model = args[i + 1]; del args[i:i + 2]
    audio_name = args[0] if args else "voiceover.wav"
    tl_path = os.path.join(vdir, "timeline.json")
    tl = json.load(open(tl_path))
    a, sr = sf.read(os.path.join(vdir, audio_name), dtype="float32")
    if a.ndim > 1: a = a.mean(1)
    a = resample_poly(a, 16000, sr).astype(np.float32)
    m = WhisperModel(model, device="cpu", compute_type="int8")
    # proper nouns from script.json "vocab" are passed as a spelling hint only (they don't change what is heard)
    script = json.load(open(os.path.join(vdir, "script.json")))
    vocab = ("Names: " + ", ".join(script["vocab"]) + ".") if script.get("vocab") else None
    # transcribe scene by scene (full-file passes can hallucinate repeats at line joins)
    heard = []
    for sc in tl["scenes"]:
        off = max(0.0, sc["start"] - 0.12)
        clip = a[int(off * 16000): int((sc["end"] + 0.18) * 16000)]
        segs, _ = m.transcribe(clip, language="en", beam_size=5, word_timestamps=True,
                               condition_on_previous_text=False, initial_prompt=vocab)
        for s in segs:
            for w in s.words:
                raw = w.word.strip()
                if heard and re.match(r"^[,\-][0-9a-z]", raw, re.I):   # "3" ",500" / "zero" "-evaporation"
                    heard[-1]["raw"] += raw; heard[-1]["end"] = round(off + w.end, 3); continue
                heard.append({"raw": raw, "start": round(off + w.start, 3), "end": round(off + w.end, 3)})
    transcript = " ".join(h["raw"] for h in heard)

    # flatten heard words into normalised tokens that keep their timing
    htok = []
    for h in heard:
        for tok in norm(h["raw"]):
            htok.append({"w": tok, "start": h["start"], "end": h["end"]})
    # expected tokens per scene (from the on-screen caption, with "times" for ×)
    problems, report = [], []
    exp = []
    for si, sc in enumerate(tl["scenes"]):
        cap = sc["caption"].replace("×", " times")
        cap_words = cap.split()
        for wi, cw in enumerate(cap_words):
            for tok in norm(cw):
                exp.append({"w": tok, "scene": si, "cap_i": wi})
    sm = difflib.SequenceMatcher(a=[e["w"] for e in exp], b=[h["w"] for h in htok], autojunk=False)
    match_t = {}
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op == "equal":
            for k in range(i2 - i1):
                match_t[i1 + k] = htok[j1 + k]
        else:
            want = " ".join(e["w"] for e in exp[i1:i2]) or "(nothing)"
            got = " ".join(h["w"] for h in htok[j1:j2]) or "(nothing)"
            scene = tl["scenes"][exp[min(i1, len(exp) - 1)]["scene"]]["id"]
            problems.append(f"- **{scene}**: expected `{want}`, heard `{got}`")

    # word timings per caption word (interpolate any word without a match)
    for si, sc in enumerate(tl["scenes"]):
        cap_words = sc["caption"].split()
        times = [None] * len(cap_words)
        for ei, e in enumerate(exp):
            if e["scene"] == si and ei in match_t and times[e["cap_i"]] is None:
                times[e["cap_i"]] = (match_t[ei]["start"], match_t[ei]["end"])
        n = len(cap_words)
        for i in range(n):
            if times[i] is None:
                frac0, frac1 = i / n, (i + 1) / n
                times[i] = (sc["start"] + frac0 * (sc["end"] - sc["start"]), sc["start"] + frac1 * (sc["end"] - sc["start"]))
        words, last = [], sc["start"] - .05
        for i in range(n):   # keep monotonic and inside the scene
            s0 = max(min(max(times[i][0], sc["start"] - .05), sc["end"]), last)
            words.append({"w": cap_words[i], "start": round(s0, 3), "end": round(max(times[i][1], s0 + .05), 3)})
            last = s0
        if audio_name == "voiceover.wav":
            sc["words"] = words
    if audio_name == "voiceover.wav":
        json.dump(tl, open(tl_path, "w"), indent=2, ensure_ascii=False)

    ok = not problems
    report.append(f"# Voiceover check: {os.path.basename(os.path.abspath(vdir))} ({audio_name})\n")
    report.append(f"- Voice: `{tl.get('voice', '?')}` (US English) · ASR model: `{model}`, scene by scene")
    if vocab: report.append(f"- Spelling hint for proper nouns: {vocab}")
    report.append(f"- Expected words: {len(exp)} · Heard words: {len(htok)} · Matched: {len(match_t)}")
    report.append(f"- Result: **{'PASS: every word heard as written' if ok else 'FAIL: differences below'}**\n")
    if problems:
        report.append("## Differences\n")
        report += problems
    report.append("\n## What the speech recogniser heard\n")
    report.append("> " + transcript)
    open(os.path.join(vdir, "voiceover-check.md" if audio_name == "voiceover.wav" else "final-audio-check.md"), "w").write("\n".join(report) + "\n")
    print("\n".join(report[:4]))
    for p in problems: print(p)
    print("TRANSCRIPT:", transcript)
    sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
