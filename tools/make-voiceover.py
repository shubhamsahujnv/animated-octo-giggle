"""Generate a per-scene Indian-English female voiceover with Kokoro TTS.

Writes voiceover.wav and timeline.json (scene start/end times) next to script.json.
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

def main():
    vdir = sys.argv[1]
    script = json.load(open(os.path.join(vdir, "script.json")))
    voice = sys.argv[sys.argv.index("--voice") + 1] if "--voice" in sys.argv else script["voice"]
    kdir = os.environ.get("KOKORO_DIR", ".")
    k = Kokoro(os.path.join(kdir, "kokoro.onnx"), os.path.join(kdir, "voices.bin"))

    sr = 24000
    chunks = [np.zeros(int(LEAD_IN * sr), dtype=np.float32)]
    t = LEAD_IN
    timeline = []
    for sc in script["scenes"]:
        ph = k.tokenizer.phonemize(sc["say"], lang="en-us")
        for src, dst in LEXICON.items():
            ph = ph.replace(src, dst)
        audio, sr = k.create(ph, voice=voice, speed=script["speed"], is_phonemes=True)
        # trim leading/trailing near-silence so scene timing is tight
        idx = np.where(np.abs(audio) > 0.01)[0]
        audio = audio[max(idx[0] - 600, 0): idx[-1] + 1200]
        dur = len(audio) / sr
        timeline.append({"id": sc["id"], "start": round(t, 3), "end": round(t + dur, 3), "caption": sc["caption"]})
        chunks += [audio.astype(np.float32), np.zeros(int(script["gap"] * sr), dtype=np.float32)]
        t += dur + script["gap"]
    chunks.append(np.zeros(int(TAIL * sr), dtype=np.float32))
    full = np.concatenate(chunks)
    sf.write(os.path.join(vdir, "voiceover.wav"), full, sr)
    total = len(full) / sr
    json.dump({"duration": round(total, 3), "scenes": timeline, "sources": script["sources"]},
              open(os.path.join(vdir, "timeline.json"), "w"), indent=2, ensure_ascii=False)
    print(f"voice={voice} duration={total:.2f}s")
    for s in timeline:
        print(f'{s["start"]:6.2f}-{s["end"]:6.2f} {s["id"]}')

if __name__ == "__main__":
    main()
