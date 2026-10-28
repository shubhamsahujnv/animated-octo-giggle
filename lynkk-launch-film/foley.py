"""Interface sounds for chapters 01 to 06, laid over the approved score.

    python3 foley.py        writes out/foley_raw.wav (78 s, 48 kHz stereo)

The approved score (assets/music/score-approved.m4a) already carries the
music and the sounds for 0 to 12 s and the big hits at 32 s and 72 s. This layer
adds only the small UI sounds for what happens on screen after 12 s, every one
timed to the same frames as the picture in scenes.js.
"""
import os
import wave
import numpy as np

SR = 48000
DUR = 78.0
N = int(DUR * SR)
rng = np.random.default_rng(11)
OUT = np.zeros((2, N))


def tvec(s):
    return np.arange(int(s * SR)) / SR


def band(x, lo=None, hi=None):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); m = np.ones_like(f)
    if lo: m *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4)
    if hi: m *= 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * m, len(x))


def add(sig, t, gain=1.0, pan=0.0):
    i = int(round(t * SR))
    if i >= N: return
    k = min(len(sig), N - i)
    OUT[0, i:i + k] += sig[:k] * gain * np.cos((pan + 1) * np.pi / 4) * np.sqrt(2)
    OUT[1, i:i + k] += sig[:k] * gain * np.sin((pan + 1) * np.pi / 4) * np.sqrt(2)


def click(heavy=False):
    t = tvec(0.08)
    tick = band(rng.standard_normal(len(t)), 2500, 9000) * np.exp(-t / 0.004)
    tick /= np.abs(tick).max() + 1e-9
    f0 = 120 if heavy else 180
    thock = np.sin(2 * np.pi * (f0 * t - 30 * t * t)) * np.exp(-t / (0.06 if heavy else 0.03))
    return 0.5 * tick + 0.7 * thock


def tap():                       # a soft trackpad tap
    t = tvec(0.05)
    x = band(rng.standard_normal(len(t)), 1500, 6000) * np.exp(-t / 0.006)
    return x / (np.abs(x).max() + 1e-9) * 0.6 + np.sin(2 * np.pi * 900 * t) * np.exp(-t / 0.01) * 0.3


def typekey():
    t = tvec(0.04)
    x = band(rng.standard_normal(len(t)), 3000, 10000) * np.exp(-t / 0.003)
    return x / (np.abs(x).max() + 1e-9) * 0.5


def whoosh(length=0.35, up=True):
    t = tvec(length)
    x = band(rng.standard_normal(len(t)), 600, 7000)
    x /= np.abs(x).max() + 1e-9
    e = np.sin(np.pi * t / length) ** 2
    return x * e * 0.5


def tone(f, length=0.12, decay=0.04):
    t = tvec(length)
    return np.sin(2 * np.pi * f * t) * np.exp(-t / decay) + 0.3 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t / (decay / 2))


def blip(f1, f2, length=0.16):
    t = tvec(length)
    f = np.where(t < length / 2, f1, f2)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.06)


def thud():
    t = tvec(0.3)
    f = 55 + 60 * np.exp(-t / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.09)


def typing(t0, t1, gain=0.18):
    t = t0
    k = 0
    while t < t1:
        add(typekey(), t, gain * (0.8 + 0.4 * ((k * 7919) % 10) / 10), pan=0.15 * np.sin(k))
        t += 0.06 + 0.02 * ((k * 31) % 3)
        k += 1


A = 1760.0  # A6, in the score's key
# 01 Calls
add(whoosh(0.4), 11.95, 0.25)                     # the call window opens
add(tone(A, 0.14), 13.0, 0.18); add(whoosh(0.3), 12.95, 0.2)   # card drops
add(click(), 14.25, 0.45)                         # Record
add(whoosh(0.3), 14.55, 0.15)                     # card goes back up
for s in (15.5, 16.0, 16.5, 17.0, 17.5, 18.0):    # window changes shape
    add(tap(), s, 0.16)
add(whoosh(0.45), 18.0, 0.22, pan=0.5)            # the column slides in
typing(20.0, 20.9)                                # Add a note
add(tap(), 21.55, 0.2, pan=0.6); add(whoosh(0.3), 21.6, 0.12, pan=0.6)   # folds into a tab
add(whoosh(0.35), 23.5, 0.2)                      # Spotter
add(click(True), 24.9, 0.4); add(click(True), 25.0, 0.45)   # ⌘↩
typing(25.2, 26.5, 0.1)
add(blip(880, 587), 28.8, 0.16)                   # Wi-Fi drops
add(blip(587, 880), 30.0, 0.16)                   # and comes back
add(click(), 30.3, 0.4)                           # Leave
add(tone(A * 0.75, 0.3, 0.12), 30.45, 0.14)       # saving
# 02 Dictation
add(click(True), 32.0, 0.6); add(click(), 32.5, 0.35)       # fn down, fn up
for s in (34.0, 35.0, 36.0):
    add(tap(), s + 0.1, 0.12)
    add(tone(A, 0.1, 0.03), s + 0.55, 0.14)       # words land
add(click(), 37.35, 0.25)                         # fn, in a password field: nothing answers
add(click(), 39.5, 0.35); add(tone(A * 1.5, 0.12, 0.03), 39.5, 0.12)  # the snap
for s in (41.0, 41.25, 41.5, 41.75):
    add(tap(), s, 0.14)
# 03 The app
add(whoosh(0.45), 42.95, 0.22)
for s in (43.5, 50.0, 57.0):
    add(click(True), s, 0.45)                     # ⌘1 ⌘2 ⌘3
add(click(), 44.0, 0.3); typing(44.15, 44.6); add(click(), 45.0, 0.3)   # ⌘K, Corvane, return
add(click(), 47.0, 0.25); typing(47.3, 47.95, 0.12)          # ⌘J
add(tap(), 49.1, 0.3); add(tone(A, 0.2, 0.08), 49.15, 0.1)   # Play from 12:04
typing(50.3, 50.95, 0.12)
add(tone(A, 0.12, 0.04), 52.3, 0.12)
add(tap(), 54.42, 0.25); add(thud(), 55.0, 0.35); add(tap(), 55.0, 0.2)   # drag, drop
add(tap(), 55.85, 0.3); add(tone(A * 1.25, 0.14, 0.05), 56.35, 0.12)     # Send, sent
# 04 Wall: one soft tick per tile
for i in range(13):
    add(tap(), 59.5 + i * 0.5, 0.1, pan=[-0.4, 0, 0.4][i % 3])
# 05 Install
add(whoosh(0.4), 68.45, 0.22)
add(tap(), 68.77, 0.25); add(thud(), 69.5, 0.4); add(tone(A, 0.18, 0.06), 69.5, 0.12)
for i in range(4):
    add(tap(), 69.5 + i * 0.5, 0.18)
add(tone(A, 0.1, 0.03), 70.3, 0.12)
add(tone(A * 1.25, 0.25, 0.1), 70.8, 0.14); add(tone(A * 1.5, 0.3, 0.12), 70.88, 0.1)   # You're set

peak = np.abs(OUT).max()
out = (OUT.T / max(peak, 1e-9) * 0.7 * 32767).astype(np.int16)
os.makedirs("out", exist_ok=True)
with wave.open("out/foley_raw.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(out.tobytes())
print("wrote out/foley_raw.wav", f"peak scaled from {peak:.2f}")
