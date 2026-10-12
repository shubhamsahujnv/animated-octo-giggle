"""Generate a per-scene Indian-English female voiceover with Kokoro TTS.

Writes voiceover.wav and timeline.json (scene start/end times) next to script.json.
Each scene may override "voice", "speed" and "gap" (pause after the line) and set
"breath": true for a soft inhale before it. Script-level "humanize": true adds a
light room sound, mic warmth and slight pacing variation so the read feels less synthetic.
Usage: python3 tools/make-voiceover.py content/videos/<dir> [--voice hf_alpha]
Requires: pip install kokoro-onnx soundfile; model files in $KOKORO_DIR
(kokoro.onnx + voices.bin from github.com/thewh1teagle/kokoro-onnx releases).
"""
import json, os, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

LEAD_IN = 0.35   # silence before the first line
TAIL = 1.6       # hold on the end card after the last line

# Phoneme fixes so the Indian-English voice says brand words clearly
# (checked by speech-recognition round trip). Applied after phonemisation.
LEXICON = {"sˈɑːlv": "sˈɔlv"}   # "Solve" in The Green Solve

def humanize(x, sr, rng):
    """Mic warmth, a small room and a quiet room tone, so the voice doesn't sound bone-dry."""
    from scipy.signal import butter, sosfilt, fftconvolve
    warm = sosfilt(butter(2, 220, 'low', fs=sr, output='sos'), x) * 0.18    # low-mid body
    soft = x - sosfilt(butter(2, 7500, 'high', fs=sr, output='sos'), x) * 0.25  # tame TTS fizz
    y = soft + warm
    n = int(0.28 * sr)                                                      # small-room impulse
    ir = rng.standard_normal(n) * np.exp(-np.arange(n) / sr * 22)
    ir = sosfilt(butter(2, 4000, 'low', fs=sr, output='sos'), ir)
    ir[0] = 0
    wet = fftconvolve(y, ir)[: len(y)]
    y = y + wet / np.max(np.abs(wet)) * np.max(np.abs(y)) * 0.06
    tone = sosfilt(butter(2, [80, 1200], 'band', fs=sr, output='sos'), rng.standard_normal(len(y)))
    y = y + tone / np.max(np.abs(tone)) * 0.0025                            # barely-there room tone
    return (y / np.max(np.abs(y)) * 0.9).astype(np.float32)

def breath(sr, rng, dur=0.32):
    """A soft, short inhale: band-passed noise with a rise-and-fall envelope."""
    from scipy.signal import butter, sosfilt
    n = int(dur * sr)
    b = sosfilt(butter(2, [400, 2600], 'band', fs=sr, output='sos'), rng.standard_normal(n))
    env = np.sin(np.linspace(0, np.pi, n)) ** 1.6
    return (b * env / np.max(np.abs(b)) * 0.035).astype(np.float32)

def main():
    vdir = sys.argv[1]
    script = json.load(open(os.path.join(vdir, "script.json")))
    voice = sys.argv[sys.argv.index("--voice") + 1] if "--voice" in sys.argv else script["voice"]
    kdir = os.environ.get("KOKORO_DIR", ".")
    k = Kokoro(os.path.join(kdir, "kokoro.onnx"), os.path.join(kdir, "voices.bin"))

    sr = 24000
    rng = np.random.default_rng(5)
    human = script.get("humanize", False)
    chunks = [np.zeros(int(LEAD_IN * sr), dtype=np.float32)]
    t = LEAD_IN
    timeline = []
    for sc in script["scenes"]:
        ph = k.tokenizer.phonemize(sc["say"], lang="en-us")
        for src, dst in LEXICON.items():
            ph = ph.replace(src, dst)
        speed = sc.get("speed", script["speed"])
        if human and "speed" not in sc:
            speed *= 1 + rng.uniform(-0.03, 0.03)                         # natural pace drift
        audio, sr = k.create(ph, voice=sc.get("voice", voice), speed=speed, is_phonemes=True)
        # trim leading/trailing near-silence so scene timing is tight
        idx = np.where(np.abs(audio) > 0.01)[0]
        audio = audio[max(idx[0] - 600, 0): idx[-1] + 1200]
        dur = len(audio) / sr
        timeline.append({"id": sc["id"], "start": round(t, 3), "end": round(t + dur, 3), "caption": sc["caption"]})
        gap = sc.get("gap", script["gap"])
        if sc.get("breath"):                                              # inhale tucked into the previous pause
            br = breath(sr, rng)
            tail = chunks[-1]
            if len(tail) >= len(br) + int(0.05 * sr):
                tail[-len(br) - int(0.05 * sr): -int(0.05 * sr)] += br
        chunks += [audio.astype(np.float32), np.zeros(int(gap * sr), dtype=np.float32)]
        t += dur + gap
    chunks.append(np.zeros(int(TAIL * sr), dtype=np.float32))
    full = np.concatenate(chunks)
    if human:
        full = humanize(full, sr, rng)
    sf.write(os.path.join(vdir, "voiceover.wav"), full, sr)
    total = len(full) / sr
    json.dump({"duration": round(total, 3), "scenes": timeline, "sources": script["sources"]},
              open(os.path.join(vdir, "timeline.json"), "w"), indent=2, ensure_ascii=False)
    print(f"voice={voice} duration={total:.2f}s")
    for s in timeline:
        print(f'{s["start"]:6.2f}-{s["end"]:6.2f} {s["id"]}')

if __name__ == "__main__":
    main()
