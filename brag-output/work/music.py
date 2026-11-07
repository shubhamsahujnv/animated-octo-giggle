"""Synthesize the 20s soundtrack: 96 BPM, key of D, one beat grid from frame 0.
Music and SFX are written as one piece: every SFX is a bell tuned to the D major pentatonic scale."""
import numpy as np
import wave, sys

SR = 44100
DUR = 20.0
BPM = 96
B = 60 / BPM
N = int(SR * DUR)
rng = np.random.default_rng(3)

L = np.zeros(N); R = np.zeros(N)

def hz(note):
    names = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}
    n, o = note[:-1], int(note[-1])
    return 440.0 * 2 ** ((names[n] + 12 * (o + 1) - 69) / 12)

def add(sig, t0, gain=1.0, pan=0.0):
    i0 = int(round(t0 * SR))
    if i0 >= N: return
    sig = sig[: N - i0]
    l = gain * np.cos((pan + 1) * np.pi / 4); r = gain * np.sin((pan + 1) * np.pi / 4)
    L[i0:i0 + len(sig)] += sig * l * np.sqrt(2)
    R[i0:i0 + len(sig)] += sig * r * np.sqrt(2)

def lowpass(x, fc):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / fc) ** 4)
    return np.fft.irfft(X, len(x))

def highpass(x, fc):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (fc / np.maximum(f, 1)) ** 4)
    return np.fft.irfft(X, len(x))

def tt(d): return np.arange(int(d * SR)) / SR

# ---------- instruments ----------
def pluck(f, d=1.6, bright=1.0):
    """santoor-ish struck string: harmonics with faster decay up top, tiny double strike"""
    t = tt(d)
    s = np.zeros_like(t)
    for k, a in [(1, 1.0), (2, 0.45 * bright), (3, 0.22 * bright), (4, 0.12 * bright), (5, 0.06 * bright)]:
        s += a * np.sin(2 * np.pi * f * k * t * (1 + 0.0007 * k)) * np.exp(-t * (2.2 + 1.6 * k))
    s *= (1 - np.exp(-t * 900))
    s2 = np.concatenate([np.zeros(int(0.028 * SR)), s[: len(s) - int(0.028 * SR)]]) * 0.35
    return (s + s2) * 0.5

def bell(f, d=2.4):
    t = tt(d)
    s = np.zeros_like(t)
    for ratio, a, dec in [(1, 1.0, 1.6), (2.0, 0.35, 2.4), (2.76, 0.30, 3.2), (4.07, 0.12, 4.5), (5.4, 0.06, 6.0)]:
        s += a * np.sin(2 * np.pi * f * ratio * t) * np.exp(-t * dec)
    s *= (1 - np.exp(-t * 600))
    return s * 0.45

def kick(d=0.45):
    t = tt(d)
    f = 48 + 70 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 9) * (1 - np.exp(-t * 2000))

def tabla(f, d=0.5, slide=True):
    """pitched membrane with downward glide (bayan/dayan feel)"""
    t = tt(d)
    fr = f * (1 + (0.18 if slide else 0.04) * np.exp(-t * 18))
    ph = 2 * np.pi * np.cumsum(fr) / SR
    s = np.sin(ph) * np.exp(-t * 7) + 0.3 * np.sin(2 * ph) * np.exp(-t * 14)
    n = rng.standard_normal(len(t)) * np.exp(-t * 60) * 0.15
    return (s + n) * (1 - np.exp(-t * 1500))

def shaker(d=0.12):
    t = tt(d)
    n = rng.standard_normal(len(t))
    n = highpass(n, 5500)
    return n * np.exp(-t * 45) * (1 - np.exp(-t * 400))

def whoosh(d=0.6):
    t = tt(d)
    n = rng.standard_normal(len(t))
    n = lowpass(highpass(n, 600), 3200)
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    return n * env * 0.5

# ---------- drone + pad ----------
t = np.arange(N) / SR
drone = np.zeros(N)
for f, a in [(hz('D2'), 0.5), (hz('A2'), 0.35), (hz('D3'), 0.3), (hz('A3'), 0.12)]:
    for k in range(1, 7):
        drone += a / k ** 1.3 * np.sin(2 * np.pi * f * k * t * (1 + 0.0004 * np.sin(0.7 * t + k)))
drone = lowpass(drone, 1400)
swell = np.clip(t / 2.0, 0, 1) ** 2 * (0.85 + 0.15 * np.sin(2 * np.pi * t / (4 * B)))
drone *= swell * 0.11
L += drone; R += drone

pad = np.zeros(N)
for f in [hz('D4'), hz('F#4'), hz('A4'), hz('E5')]:
    pad += np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.003 * t)
pad = lowpass(pad, 1800)
pad_env = np.clip((t - 3.75) / 1.5, 0, 1) * (1 - 0.55 * np.clip((t - 11.875) / 0.5, 0, 1) * (t < 15.625))
pad *= pad_env * 0.018
L += pad; R += pad * 0.95

# ---------- drums ----------
def beat(n): return n * B
# scene 2-3 and 5: kick on 1 & 3 of each bar, tabla accents, shakers on 8ths
for n in range(32):
    tb = beat(n)
    in23 = 6 <= n < 25
    in4 = False
    in5 = 25 <= n < 31
    if in23 or in5:
        if n % 2 == 0: add(kick(), tb, 0.30)
        add(tabla(hz('D4'), 0.35) if n % 2 else tabla(hz('A3'), 0.4), tb + (B / 2 if n % 2 else 0), 0.10, pan=0.2)
        for h in range(2): add(shaker(), tb + h * B / 2, 0.035 if h == 0 else 0.055, pan=-0.35)
    if in4:
        if n % 4 == 3: add(kick(), tb, 0.22)
        add(shaker(), tb + B / 2, 0.04, pan=-0.35)
# final downbeat
add(kick(), beat(31), 0.28)

# ---------- melody (santoor) ----------
mel = [
    # (beat, note) scene 2-3 phrase, D major pentatonic
    (6, 'D5'), (6.5, 'F#5'), (7, 'A5'), (7.5, 'F#5'),
    (10, 'E5'), (10.5, 'F#5'), (11, 'A5'), (11.5, 'B5'),
    (14, 'A5'), (14.5, 'F#5'), (15, 'E5'), (15.5, 'D5'),
    (17, 'E5'), (17.5, 'F#5'), (18, 'A5'),
    # scene 5 resolution
    (28, 'F#5'), (28.5, 'A5'), (29, 'B5'), (29.5, 'A5'), (30, 'F#5'), (30.5, 'E5'), (31, 'D5'),
]
for b, nt in mel:
    add(pluck(hz(nt)), beat(b), 0.20, pan=0.25)
# bass under scene 5
for b, nt in [(25, 'D3'), (27, 'B2'), (29, 'G2'), (31, 'D3')]:
    add(pluck(hz(nt), 2.2, 0.5), beat(b), 0.28, pan=0)

# ---------- SFX (bells and shimmers in key, sitting under the music) ----------
S16 = B / 4
bells = [
    (0.625, 'A5', 0.22),                                              # diya ignites
    (1.25, 'F#5', 0.10), (1.875, 'A5', 0.12), (2.5, 'D6', 0.09),        # hook lines, pill
    (3.9, 'D5', 0.07), (3.9 + S16, 'F#5', 0.06), (3.9 + 2 * S16, 'A5', 0.06),   # globe draws on
    (5.625, 'D6', 0.09), (5.625 + S16, 'F#6', 0.08), (5.625 + 2 * S16, 'A6', 0.07), (5.625 + 3 * S16, 'D7', 0.05),  # smoke clears
    (10.625, 'D5', 0.12), (10.625, 'F#5', 0.10), (10.625, 'A5', 0.10), (10.625 + S16, 'D6', 0.08),            # marigolds bloom
    (16.25, 'D5', 0.13), (16.25, 'F#5', 0.10), (16.25, 'A5', 0.10),    # logo
    (16.875, 'D6', 0.11), (18.125, 'A5', 0.08),
]
for tm, nt, g in bells:
    add(bell(hz(nt)), tm, g, pan=(-0.2 if 'F' in nt else 0.15))
for i, nt in enumerate(['D5', 'E5', 'F#5', 'A5']):
    add(pluck(hz(nt), 0.8), 9.0 + i * S16, 0.09, pan=0.3)            # stem grows
ring = ['D5', 'E5', 'F#5', 'A5', 'B5', 'D6', 'E6', 'F#6']
for i, nt in enumerate(ring):
    add(bell(hz(nt), 1.6), 13.4375 + i * S16, 0.07, pan=-0.7 + i * 0.2)   # ring of diyas lights
for w in [3.45, 5.5, 8.35, 12.7, 15.1, 15.625]:
    add(whoosh(0.55), w - 0.1, 0.04)

# ---------- master ----------
mix = np.stack([L, R])
# gentle room: two short, quiet early reflections
for d, g in [(0.031, 0.18), (0.057, 0.12)]:
    k = int(d * SR)
    mix[:, k:] += mix[:, :-k] * g * 0.5
mix = lowpass(mix[0], 12000), lowpass(mix[1], 12000)
mix = np.stack(mix)
fade = np.ones(N)
fo = int(1.3 * SR); fade[-fo:] = np.linspace(1, 0, fo) ** 1.5
fi = int(0.02 * SR); fade[:fi] = np.linspace(0, 1, fi)
mix *= fade
peak = np.max(np.abs(mix))
mix = np.tanh(mix / peak * 1.1) / np.tanh(1.1) * 0.89
out = (mix.T * 32767).astype(np.int16)
with wave.open(sys.argv[1] if len(sys.argv) > 1 else 'music.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(out.tobytes())
print('peak', peak, 'written')
