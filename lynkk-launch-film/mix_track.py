"""Lay the picture's sound effects over a licensed music track, locked to the grid.

    python3 mix_track.py TRACK.mp3 --offset 4.026 --bpm 120.11 [--film-bpm 120]
                         [--fx out/fx_raw.wav] [--dur 78] --out out/mix_raw.wav

--offset is the time in the track (a downbeat) that lands on frame 0. The track is
time-stretched by film_bpm / bpm (a fraction of a percent for the 120 BPM tracks)
so its beats stay on the picture's grid to the last frame.
"""
import argparse
import subprocess
import wave
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("track")
ap.add_argument("--offset", type=float, required=True)
ap.add_argument("--bpm", type=float, required=True)
ap.add_argument("--film-bpm", type=float, default=120.0)
ap.add_argument("--fx", default="out/fx_raw.wav")
ap.add_argument("--dur", type=float, default=None, help="seconds of output; default: length of the fx stem")
ap.add_argument("--music-gain", type=float, default=0.8)
ap.add_argument("--fx-gain", type=float, default=0.9)
ap.add_argument("--fade-out", type=float, default=2.0)
ap.add_argument("--out", required=True)
a = ap.parse_args()

SR = 48000
w = wave.open(a.fx)
fx = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1, 2).astype(float) / 32768
dur = a.dur or len(fx) / SR
n = int(dur * SR)

tempo = a.film_bpm / a.bpm
# Skip the seek and the stretch when they are no-ops: atempo resynthesizes the
# audio (and shifts it by about 2 ms) even at exactly 1.0.
seek = ["-ss", f"{a.offset:.4f}"] if a.offset else []
stretch = ["-af", f"atempo={tempo:.6f}"] if abs(tempo - 1) > 1e-9 else []
raw = subprocess.run(
    ["ffmpeg", "-loglevel", "error", *seek, "-i", a.track, *stretch,
     "-t", f"{dur + 0.5:.3f}", "-ac", "2", "-ar", str(SR), "-f", "s16le", "-"],
    capture_output=True, check=True).stdout
mus = np.frombuffer(raw, dtype=np.int16).reshape(-1, 2).astype(float) / 32768
mus = np.pad(mus, ((0, max(0, n - len(mus))), (0, 0)))[:n]
fx = np.pad(fx, ((0, max(0, n - len(fx))), (0, 0)))[:n]

# 5 ms fade in so the cut into the track never clicks; musical fade at the end.
mus[: int(0.005 * SR)] *= np.linspace(0, 1, int(0.005 * SR))[:, None]
f = int(a.fade_out * SR)
mus[-f:] *= np.linspace(1, 0, f)[:, None] ** 1.5

mix = mus * a.music_gain + fx * a.fx_gain
peak = np.abs(mix).max()
if peak > 0.98:
    mix *= 0.98 / peak
out = (mix * 32767).astype(np.int16)
with wave.open(a.out, "wb") as o:
    o.setnchannels(2); o.setsampwidth(2); o.setframerate(SR)
    o.writeframes(out.tobytes())
print(f"wrote {a.out}  {dur:.2f}s  tempo x{tempo:.5f}  from {a.offset:.3f}s")
