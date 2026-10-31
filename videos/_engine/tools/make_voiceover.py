"""US-English voiceover for TGS motion videos (Kokoro TTS, voice af_heart by default).

Reads <dir>/script.json, writes <dir>/voiceover.wav and <dir>/timeline.json.
Each scene has:
  "say"     what the voice reads (numbers written as words so they are read exactly)
  "caption" what is shown on screen (numerals, UK spelling)
Optional per scene: "speed", "gap" (pause after the line, seconds).

Pronunciation fixes live in LEXICON (phoneme replacements applied after phonemisation).
Every fix is verified by tools/check_voiceover.py (speech-recognition round trip).

Usage: python3 make_voiceover.py <video dir>
Env: KOKORO_DIR with kokoro-v1.0.onnx + voices-v1.0.bin
     (github.com/thewh1teagle/kokoro-onnx releases, model-files-v1.0)
"""
import json, os, sys
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

LEAD_IN = 0.30   # silence before the first line
TAIL = 3.4       # hold on the end card after the last line

# phoneme fixes for the en-us voice
LEXICON = {
    "ˈɛnvˈɪdiə": "ɛnvˈɪdiə",   # Nvidia: en-VID-ee-uh (one main stress)
    "jˈɑːɾə": "jˈɑːtə",        # Yotta: clear "t" so it isn't heard as "Yada"
    "lˈiːɾɚ": "lˈiːtɚ",        # litre: clear "t" so it isn't heard as "leader"
}

def main():
    vdir = sys.argv[1]
    script = json.load(open(os.path.join(vdir, "script.json")))
    kdir = os.environ["KOKORO_DIR"]
    k = Kokoro(os.path.join(kdir, "kokoro-v1.0.onnx"), os.path.join(kdir, "voices-v1.0.bin"))
    voice = script.get("voice", "af_heart")
    sr = 24000
    chunks = [np.zeros(int(LEAD_IN * sr), dtype=np.float32)]
    t = LEAD_IN
    timeline, phon = [], {}
    for sc in script["scenes"]:
        ph = k.tokenizer.phonemize(sc["say"], lang="en-us")
        for a, b in LEXICON.items():
            ph = ph.replace(a, b)
        phon[sc["id"]] = ph
        audio, sr = k.create(ph, voice=sc.get("voice", voice), speed=sc.get("speed", script.get("speed", 1.0)), is_phonemes=True)
        idx = np.where(np.abs(audio) > 0.008)[0]
        audio = audio[max(idx[0] - 480, 0): idx[-1] + 1440].astype(np.float32)
        audio *= np.minimum(1, np.arange(len(audio)) / 240)            # click-free edges
        audio[-480:] *= np.linspace(1, 0, 480)
        dur = len(audio) / sr
        timeline.append({"id": sc["id"], "start": round(t, 3), "end": round(t + dur, 3),
                         "caption": sc["caption"], "say": sc["say"]})
        gap = sc.get("gap", script.get("gap", 0.4))
        chunks += [audio, np.zeros(int(gap * sr), dtype=np.float32)]
        t += dur + gap
    chunks.append(np.zeros(int(TAIL * sr), dtype=np.float32))
    full = np.concatenate(chunks)
    full = full / np.max(np.abs(full)) * 0.9
    sf.write(os.path.join(vdir, "voiceover.wav"), full, sr)
    total = round(len(full) / sr, 3)
    json.dump({"duration": total, "voice": voice, "scenes": timeline, "sources": script.get("sources", [])},
              open(os.path.join(vdir, "timeline.json"), "w"), indent=2, ensure_ascii=False)
    json.dump(phon, open(os.path.join(vdir, "phonemes.json"), "w"), indent=2, ensure_ascii=False)
    print(f"voice={voice} duration={total:.2f}s")
    for s in timeline:
        print(f'{s["start"]:6.2f}-{s["end"]:6.2f} {s["id"]}')

if __name__ == "__main__":
    main()
