"""Score and sound design for the Lynkk for Mac launch film, synthesized from code.

    python3 score.py                 writes out/score_raw.wav (then loudnorm in make.sh)

Everything sits on the 120 BPM grid in beats.json, counted from frame 0, so the
music and the effects never drift against the picture. Music is A minor
(Am9, Fmaj7, Cmaj7, G6, one chord per bar). Effects are tuned to the key and sit
under the music.
"""
import json
import wave
import numpy as np

SR = 48000
GRID = json.load(open("beats.json"))
BEAT = GRID["beat"]                # 0.5 s
BAR = GRID["bar"]                  # 2.0 s
DUR = GRID["duration"]
N = int(DUR * SR) + SR
rng = np.random.default_rng(7)

L = np.zeros(N)
R = np.zeros(N)
REV = np.zeros(N)                  # mono reverb send


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def env(n, attack, decay, sustain=0.0, release=None):
    """Attack then exponential decay to a sustain level, in samples of length n."""
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    d = sustain + (1 - sustain) * np.exp(-np.maximum(t - attack, 0) / max(decay, 1e-4))
    e = a * d
    if release:
        tail = int(release * SR)
        if tail < n:
            e[-tail:] *= np.linspace(1, 0, tail)
    return e


def fft_filter(x, lo=None, hi=None):
    """Brick-ish band filter with soft edges, done in the frequency domain."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.ones_like(f)
    if lo:
        m *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4)
    if hi:
        m *= 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * m, len(x))


def add(sig, t, gain=1.0, pan=0.0, send=0.0):
    i = int(round(t * SR))
    if i >= N:
        return
    sig = sig[: N - i]
    lg = gain * np.cos((pan + 1) * np.pi / 4)
    rg = gain * np.sin((pan + 1) * np.pi / 4)
    L[i:i + len(sig)] += sig * lg
    R[i:i + len(sig)] += sig * rg
    if send:
        REV[i:i + len(sig)] += sig * gain * send


# ------------------------------------------------------------------ voices
def key_click(heavy=False):
    """A mechanical key switch: a bright tick and a short low thock."""
    n = int(0.09 * SR)
    t = np.arange(n) / SR
    tick = fft_filter(rng.standard_normal(n), lo=2500, hi=9000) * np.exp(-t / 0.004)
    f0 = 170 if not heavy else 120
    thock = np.sin(2 * np.pi * (f0 * t - 30 * t * t)) * np.exp(-t / (0.035 if not heavy else 0.06))
    body = np.sin(2 * np.pi * 2200 * t) * np.exp(-t / 0.012) * 0.25
    return 0.55 * tick / (np.abs(tick).max() + 1e-9) + 0.7 * thock + body


def soft_tick(f=1760):
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * f * t) * np.exp(-t / 0.03) + 0.4 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t / 0.015)


def sub_thud(length=1.4):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = 38 + 28 * np.exp(-t / 0.08)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t / 0.45)


def kick():
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 45 + 85 * np.exp(-t / 0.03)
    ph = 2 * np.pi * np.cumsum(f) / SR
    click = fft_filter(rng.standard_normal(n), lo=1500, hi=6000) * np.exp(-t / 0.003) * 0.15
    return np.sin(ph) * np.exp(-t / 0.18) + click


def clap():
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    x = fft_filter(rng.standard_normal(n), lo=900, hi=3800)
    x /= np.abs(x).max()
    e = np.exp(-t / 0.07)
    for d in (0.008, 0.017):            # three quick bursts, like hands
        k = int(d * SR)
        e[k:] += 0.6 * np.exp(-(t[: n - k]) / 0.012)
    return x * e * 0.6


def hat(open_=False):
    n = int((0.16 if open_ else 0.05) * SR)
    t = np.arange(n) / SR
    x = fft_filter(rng.standard_normal(n), lo=7000, hi=15000)
    x /= np.abs(x).max()
    return x * np.exp(-t / (0.05 if open_ else 0.012))


def pad_note(midi, length, detune_cents=5):
    """A soft saw built from a few partials, two detuned voices for width."""
    n = int(length * SR)
    t = np.arange(n) / SR
    out_l = np.zeros(n)
    out_r = np.zeros(n)
    for voice, cents in ((0, -detune_cents), (1, detune_cents)):
        f = hz(midi) * 2 ** (cents / 1200)
        s = np.zeros(n)
        for k in range(1, 7):
            s += np.sin(2 * np.pi * f * k * t + voice * 0.7 * k) / (k ** 1.6)
        (out_l if voice == 0 else out_r)[:] += s
    e = env(n, 0.35, 10.0, sustain=1.0, release=min(0.5, length * 0.5))
    return out_l * e, out_r * e


def bass_note(midi, length):
    n = int(length * SR)
    t = np.arange(n) / SR
    f = hz(midi)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) + 0.12 * np.sin(2 * np.pi * 3 * f * t)
    return s * env(n, 0.005, 0.22, sustain=0.35, release=0.03)


def riser(length):
    """Noise that opens up and rises into the hit."""
    n = int(length * SR)
    t = np.arange(n) / SR
    x = rng.standard_normal(n)
    y = np.zeros(n)
    acc = 0.0
    cut = 300 * (40 ** (t / length))         # 300 Hz to 12 kHz
    a = np.exp(-2 * np.pi * cut / SR)
    for i in range(n):                        # time-varying one-pole lowpass
        acc = a[i] * acc + (1 - a[i]) * x[i]
        y[i] = acc
    tone = np.sin(2 * np.pi * np.cumsum(220 * (4 ** (t / length))) / SR) * 0.25
    e = (t / length) ** 2.2
    return (y * 2.5 + tone) * e


# ------------------------------------------------------------------ arrangement
CHORDS = [  # one per bar, Am9, Fmaj7, Cmaj7, G6
    [45, 52, 55, 59, 60],
    [41, 48, 52, 57, 60],
    [48, 52, 55, 59, 64],
    [43, 50, 55, 59, 64],
]
ROOTS = [33, 29, 36, 31]

# 0.0 to 3.0: a key-click per fragment, a low pulse building underneath.
for i in range(6):
    add(key_click(), i * 0.5, gain=0.5, send=0.15)
    n = int(0.3 * SR)
    t = np.arange(n) / SR
    pulse = np.sin(2 * np.pi * hz(33) * t) * np.exp(-t / 0.12)
    add(pulse, i * 0.5, gain=0.25 + 0.07 * i)

# 3.0: the collage. 3.0 to 3.95: riser. 4.0: the mark lands on a sub thud.
add(soft_tick(hz(81)), 3.0, gain=0.12, send=0.4)
add(riser(0.95), 3.0, gain=0.09, send=0.3)
add(sub_thud(), 4.0, gain=0.95)
add(key_click(heavy=True), 4.0, gain=0.35, send=0.2)

# 4.0 to 7.5: pad in, hats from 5.0, building.
def lay_pad(t0, t1, gain):
    t = t0
    while t < t1 - 1e-6:
        bar = int(round(t / BAR)) % 4
        # Ring over the next chord change, but stop dead at the end of a section.
        length = min(BAR, t1 - t) + (0.5 if t + BAR < t1 - 1e-6 else 0.06)
        for m in CHORDS[bar]:
            l, r = pad_note(m, length)
            if m < 50:                      # keep the low end for the thud and the kick
                l, r = l * 0.4, r * 0.4
            i = int(round(t * SR))
            k = min(len(l), N - i)
            L[i:i + k] += l[:k] * gain
            R[i:i + k] += r[:k] * gain
            REV[i:i + k] += (l[:k] + r[:k]) * gain * 0.25
        t += BAR

lay_pad(4.0, 7.5, 0.035)
for k in range(int((7.5 - 5.0) / 0.25)):
    t = 5.0 + k * 0.25
    add(hat(), t, gain=0.05 + 0.015 * (k / 10), pan=0.25 if k % 2 else -0.15)
add(riser(0.5), 7.0, gain=0.06, send=0.2)

# 7.5 to 8.0: everything drops out for half a beat. 8.0: dock click, beat drops.
add(soft_tick(hz(88)), 8.0, gain=0.22, send=0.35)
add(key_click(), 8.0, gain=0.45, send=0.2)
add(sub_thud(1.0), 8.0, gain=0.6)

# 8.0 to the end: full groove (later chapters will reshape this section).
lay_pad(8.0, DUR, 0.03)
t = 8.0
while t < DUR - 1e-6:
    beat_i = int(round(t / BEAT))
    add(kick(), t, gain=0.5)
    if beat_i % 2 == 1:
        add(clap(), t, gain=0.22, send=0.25)
    for s in range(4):
        add(hat(open_=(s == 2)), t + s * 0.125, gain=0.045 if s % 2 else 0.065, pan=0.3 if s % 2 else -0.2)
    bar = int(t / BAR) % 4
    for s in range(2):
        add(bass_note(ROOTS[bar] + (12 if s == 1 and beat_i % 4 == 3 else 0), 0.24), t + s * 0.25, gain=0.2)
    t += BEAT

# ------------------------------------------------------------------ mix
# Sidechain: duck the pad and bass under every kick from 8.0, so the low end stays clean.
duck = np.ones(N)
k = 8.0
while k < DUR:
    i = int(k * SR)
    n = int(0.22 * SR)
    duck[i:i + n] = np.minimum(duck[i:i + n], 0.55 + 0.45 * np.linspace(0, 1, min(n, N - i)) ** 1.5)
    k += BEAT

# Reverb: convolve the send with a short decaying noise tail.
ir_n = int(1.6 * SR)
ir_t = np.arange(ir_n) / SR
ir = rng.standard_normal(ir_n) * np.exp(-ir_t / 0.38)
ir = fft_filter(ir, lo=200, hi=7000)
ir /= np.sqrt((ir ** 2).sum())
size = 1 << int(np.ceil(np.log2(N + ir_n)))
wet = np.fft.irfft(np.fft.rfft(REV, size) * np.fft.rfft(ir, size), size)[:N] * 0.6
wet_l = wet
wet_r = np.roll(wet, int(0.011 * SR))

mix_l = L * duck + wet_l
mix_r = R * duck + wet_r
# Gentle bus glue: soft clip, then fade the very end.
peak = max(np.abs(mix_l).max(), np.abs(mix_r).max())
mix_l = np.tanh(mix_l / peak * 1.2) / np.tanh(1.2)
mix_r = np.tanh(mix_r / peak * 1.2) / np.tanh(1.2)
end = int(DUR * SR)
fade = int(1.5 * SR)
for ch in (mix_l, mix_r):
    ch[end - fade:end] *= np.linspace(1, 0, fade)
    ch[end:] = 0

out = np.stack([mix_l[:end], mix_r[:end]], axis=1)
out = (out * 0.89 * 32767).astype(np.int16)
import os
os.makedirs("out", exist_ok=True)
with wave.open("out/score_raw.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(out.tobytes())
print("wrote out/score_raw.wav", f"{DUR:.1f}s")
