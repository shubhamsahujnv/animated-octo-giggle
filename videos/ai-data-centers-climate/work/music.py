#!/usr/bin/env python3
"""Synthesize the soundtrack: calm, polished, 96 BPM in A minor (Am-F-C-G).
Every part sits on one beat grid counted from t=0, and scene cuts land on beats
(scenes are 10 beats = 6.25s). Soft swells and chimes on cuts, in key.
Usage: python3 music.py <out.wav> [cuts...]"""
import sys, wave
import numpy as np

SR = 44100
BPM = 96
BEAT = 60 / BPM            # 0.625s
TOTAL = 51.25
N = int(SR * TOTAL)
rng = np.random.default_rng(7)

def hz(midi): return 440.0 * 2 ** ((midi - 69) / 12)
def env(n, a, r):           # attack/release in samples, sustain 1
    e = np.ones(n)
    a = max(1, min(a, n)); r = max(1, min(r, n - a))
    e[:a] = np.linspace(0, 1, a)
    e[n - r:] *= np.linspace(1, 0, r)
    return e
def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR); y = np.empty_like(x); s = 0.0
    for i in range(len(x)): s = (1 - a) * x[i] + a * s; y[i] = s
    return y
def place(buf, sig, t):
    i = int(round(t * SR)); j = min(len(buf), i + len(sig))
    if i < len(buf): buf[i:j] += sig[:j - i]

# chord roots (A minor key): Am F C G, one chord per bar (4 beats)
CHORDS = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [55, 60, 64]), (55, [55, 59, 62])]
BAR = 4 * BEAT
nbars = int(np.ceil(TOTAL / BAR))

pad = np.zeros(N); bass = np.zeros(N); kick = np.zeros(N); hat = np.zeros(N); pluck = np.zeros(N); fx = np.zeros(N)

for b in range(nbars):
    t0 = b * BAR
    last = t0 >= 42.5                                       # final section: hold on Am
    root, notes = CHORDS[0] if last else CHORDS[b % 4]
    # pad: detuned additive saws, slow attack, gentle low-pass
    n = int(BAR * SR) + int(0.6 * SR); tt = np.arange(n) / SR; sig = np.zeros(n)
    for m in notes:
        for det in (-0.12, 0.12):
            f = hz(m + 12) * 2 ** (det / 12)
            for k in range(1, 6): sig += np.sin(2 * np.pi * f * k * tt) / k
    sig = lowpass(sig, 1400) * env(n, int(0.5 * SR), int(0.7 * SR)) * 0.018
    place(pad, sig, t0)
    # bass on beats 1 and 3
    for bt in (0, 2):
        n = int(1.1 * BEAT * SR); tt = np.arange(n) / SR
        s = (np.sin(2 * np.pi * hz(root - 12) * tt) + 0.25 * np.sin(4 * np.pi * hz(root - 12) * tt)) * np.exp(-tt * 2.2)
        place(bass, s * env(n, 200, 2000) * 0.20, t0 + bt * BEAT)

beats = int(TOTAL / BEAT)
for i in range(beats):
    t = i * BEAT
    if t >= TOTAL - 2.5: break
    intro = t < 2 * BAR
    # soft kick on 1 and 3 (from bar 2)
    if not intro and i % 2 == 0:
        n = int(0.35 * SR); tt = np.arange(n) / SR
        f = 45 + 75 * np.exp(-tt * 28)
        place(kick, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9) * 0.30, t)
    # shaker on the off-beat 8ths
    if not intro or i >= 4:
        n = int(0.06 * SR); tt = np.arange(n) / SR
        noise = rng.standard_normal(n); noise = noise - lowpass(noise, 6000)
        place(hat, noise * np.exp(-tt * 70) * 0.035, t + BEAT / 2)
    # pluck arpeggio, 8ths, chord tones up an octave
    b = int(t // BAR); root, notes = CHORDS[b % 4]
    if t >= TOTAL - 7.5: notes = CHORDS[0][1]
    for half in (0, 1):
        m = notes[(2 * i + half) % 3] + 24 - (12 if (2 * i + half) % 6 == 5 else 0)
        n = int(0.9 * SR); tt = np.arange(n) / SR; f = hz(m)
        s = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt) * np.exp(-tt * 8)) * np.exp(-tt * 5.5)
        place(pluck, s * env(n, 60, 3000) * 0.045, t + half * BEAT / 2)

# simple echo on the plucks (dotted 8th), keeps them in the same space
d = int(0.75 * BEAT * SR); echo = np.zeros(N); echo[d:] = pluck[:-d] * 0.35; echo[2 * d:] += pluck[:-2 * d] * 0.12
pluck += lowpass(echo, 2500)

# transition fx: a soft swell into each cut, a chime on it (A-minor notes)
cuts = [float(c) for c in sys.argv[2:]] or [6.25, 12.5, 18.75, 25, 31.25, 37.5, 43.75]
for k, c in enumerate(cuts):
    n = int(0.6 * SR); tt = np.arange(n) / SR
    sw = lowpass(rng.standard_normal(n), 1800) * (tt / tt[-1]) ** 2 * 0.05
    place(fx, sw, c - 0.6)
    m = [76, 72, 69, 74][k % 4]; n = int(1.6 * SR); tt = np.arange(n) / SR
    ch = sum(a * np.sin(2 * np.pi * hz(m) * r * tt) * np.exp(-tt * dcy) for a, r, dcy in ((1, 1, 3.0), (.35, 2.01, 5), (.15, 3.0, 8)))
    place(fx, ch * env(n, 80, 4000) * 0.035, c)

mix = pad + bass + kick + hat + pluck + fx
# end: fade over the last 2.5s
fade = int(2.5 * SR); mix[-fade:] *= np.linspace(1, 0, fade) ** 1.5
mix = np.tanh(mix * 1.4) / np.tanh(1.4)
mix /= np.max(np.abs(mix)) / 0.89
st = np.stack([mix, np.roll(mix, int(0.012 * SR)) * 0.96 + mix * 0.04], axis=1)   # light stereo width
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype('<i2').tobytes())
print('wrote', sys.argv[1], f'{TOTAL}s @ {BPM} BPM')
