#!/usr/bin/env python3
"""Narrate each scene with Kokoro (kokoro-onnx), then lay out the scene timeline on the 96 BPM grid.

Writes work/vo/scene-NN.wav, work/vo/timings.json (scene starts/durations + VO offsets),
work/vo/narration.wav (all lines placed on the timeline) and explainer-60s.srt.
Usage: python3 work/voiceover.py [voice]   (default af_heart; models in work/models/)"""
import json, math, os, sys, wave
import numpy as np
from kokoro_onnx import Kokoro

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
VOICE = sys.argv[1] if len(sys.argv) > 1 else "af_heart"
BEAT = 60 / 96
LEAD = 0.35            # VO starts this long after the cut, once the headline is up
TAIL = 0.5             # breathing room after the line before the next cut

# (subtitle text, spoken text, minimum scene length)
LINES = [
    ("America's AI boom could eat up 44% of its power-sector climate budget. Here's how.",
     "America's A.I. boom could eat up forty-four percent of its power-sector climate budget. Here's how.", 6.25),
    ("Data centres used about 4% of US power in 2024. By 2030, up to 12.",
     "Data centres used about four percent of U.S. power in twenty twenty-four. By twenty thirty, up to twelve.", 6.25),
    ("To keep up, at least 15 coal plants that were due to close kept running last year.",
     "To keep up, at least fifteen coal plants that were due to close kept running last year.", 6.25),
    ("AI needs power around the clock, and gas already supplies over 40% of it.",
     "A.I. needs power around the clock, and gas already supplies over forty percent of it.", 6.25),
    ("Big Tech's own emissions rose by up to 182% between 2020 and 2023.",
     "Big Tech's own emissions rose by up to a hundred and eighty-two percent between twenty twenty and twenty twenty-three.", 6.25),
    ("Cooling those servers could take 1.1 billion cubic metres of water a year.",
     "Cooling those servers could take one point one billion cubic metres of water a year.", 6.25),
    ("And the pollution could cost over $20 billion a year in public health by 2030.",
     "And the pollution could cost over twenty billion dollars a year in public health, by twenty thirty.", 6.25),
    ("The good news? On clean power, the same boom uses just 4% of that budget.",
     "The good news? On clean power, the same boom uses just four percent of that budget.", 6.25),
    ("AI's future is an energy choice. Should it run on clean power? Comment below, and follow The Green Solve.",
     "The future of A.I. is an energy choice. Should it run on clean power? Comment below, and follow The Green Solve.", 7.5),
]

def write_wav(path, x, sr):
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype("<i2").tobytes())

def srt_time(t):
    ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"

def main():
    models = os.path.join(HERE, "models"); out = os.path.join(HERE, "vo")
    os.makedirs(out, exist_ok=True)
    # kokoro-onnx reads voices from an npz; the HF voice files are raw float32 (510, 1, 256)
    npz = os.path.join(models, "voices.npz")
    np.savez(npz, **{v[:-4]: np.fromfile(os.path.join(models, v), dtype=np.float32).reshape(-1, 1, 256)
                     for v in os.listdir(models) if v.endswith(".bin")})
    tts = Kokoro(os.path.join(models, "model_quantized.onnx"), npz)

    clips, scenes, t = [], [], 0.0
    for i, (sub, spoken, min_len) in enumerate(LINES):
        audio, sr = tts.create(spoken, voice=VOICE, speed=1.1, lang="en-us")
        audio = np.asarray(audio, dtype=np.float32)
        nz = np.flatnonzero(np.abs(audio) > 0.01)            # trim silence at both ends
        audio = audio[max(0, nz[0] - int(0.03 * sr)): nz[-1] + int(0.08 * sr)]
        write_wav(os.path.join(out, f"scene-{i + 1:02}.wav"), audio, sr)
        vo = len(audio) / sr
        dur = max(min_len, math.ceil((LEAD + vo + TAIL) / BEAT) * BEAT)
        scenes.append({"start": round(t, 4), "dur": round(dur, 4), "vo_start": round(t + LEAD, 4), "vo_len": round(vo, 3), "text": sub})
        clips.append(audio); t += dur
        print(f"scene {i + 1}: vo {vo:5.2f}s  scene {dur:5.3f}s")

    total = round(t + 1.25, 4)                              # hold the end card a beat longer
    track = np.zeros(int(total * sr) + sr, dtype=np.float32)
    for s, a in zip(scenes, clips):
        k = int(round(s["vo_start"] * sr)); track[k:k + len(a)] += a
    write_wav(os.path.join(out, "narration.wav"), track[:int(total * sr)], sr)
    scenes[-1]["dur"] = round(total - scenes[-1]["start"], 4)
    json.dump({"total": total, "beat": BEAT, "voice": VOICE, "scenes": scenes}, open(os.path.join(out, "timings.json"), "w"), indent=1)

    with open(os.path.join(ROOT, "explainer-60s.srt"), "w") as f:
        for i, s in enumerate(scenes, 1):
            f.write(f"{i}\n{srt_time(s['vo_start'])} --> {srt_time(s['vo_start'] + s['vo_len'])}\n{s['text']}\n\n")
    print(f"total {total:.2f}s, voice {VOICE}")

if __name__ == "__main__":
    main()
