"""Score and sound design for the Lynkk for Mac launch film, synthesized from code.

    python3 score.py                 writes out/score_raw.wav (then loudnorm in make.sh)

Everything sits on the 120 BPM grid in beats.json, counted from frame 0, so the
music and the effects never drift against the picture. The tempo stays at 120 to
match the cuts; the drive comes from density: four-on-the-floor kick from frame 0,
16th hats, a rolling 16th bass, a 16th arpeggio and a plucked lead hook on the
drops. A minor, one chord per bar: Am, F, C, G.

Three buses: KICK (drives the sidechain, never ducked), MUSIC (ducked by the kick,
muted in the pre-drop gaps) and FX (key-clicks and UI sounds that belong to the
picture, never muted).
"""
import json
import os
import wave
import numpy as np

SR = 48000
# ARR=teaser builds the teaser at 128 BPM from teaser_beats.json and teaser_edl.json.
ARR = os.environ.get("ARR", "film")
GRID = json.load(open("teaser_beats.json" if ARR == "teaser" else "beats.json"))
BEAT = GRID["beat"]                # 0.5 s
BAR = GRID["bar"]                  # 2.0 s
S16 = BEAT / 4                     # a 16th note, 0.125 s
DUR = GRID["duration"]
# FX_ONLY=1 writes just the picture's sound effects (for use over a licensed track).
# TS=<factor> places every sound at t/TS, to match the picture played at 120*TS BPM.
TS = float(os.environ.get("TS", "1"))
FX_ONLY = os.environ.get("FX_ONLY") == "1"
N = int(DUR / TS * SR) + SR
rng = np.random.default_rng(7)

KICK = np.zeros((2, N))
MUS = np.zeros((2, N))
FX = np.zeros((2, N))
REV = np.zeros(N)                  # mono reverb send
KICKS = []                         # kick times, for the sidechain


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def fft_filter(x, lo=None, hi=None):
    """Band filter with soft edges, done in the frequency domain."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.ones_like(f)
    if lo:
        m *= 1 / (1 + (lo / np.maximum(f, 1)) ** 4)
    if hi:
        m *= 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * m, len(x))


def add(sig, t, gain=1.0, pan=0.0, send=0.0, bus=None):
    """Place a mono or (2, n) stereo signal at time t on a bus."""
    bus = MUS if bus is None else bus
    i = int(round(t / TS * SR))
    if i >= N or i < 0:
        return
    if sig.ndim == 1:
        lg = np.cos((pan + 1) * np.pi / 4) * np.sqrt(2)
        rg = np.sin((pan + 1) * np.pi / 4) * np.sqrt(2)
        sig = np.stack([sig * lg, sig * rg])
    k = min(sig.shape[1], N - i)
    bus[:, i:i + k] += sig[:, :k] * gain
    if send:
        REV[i:i + k] += sig[:, :k].mean(0) * gain * send


def tvec(length):
    return np.arange(int(length * SR)) / SR


# ------------------------------------------------------------------ drums
def kick():
    t = tvec(0.42)
    f = 48 + 120 * np.exp(-t / 0.025)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.16)
    click = fft_filter(rng.standard_normal(len(t)), lo=2000, hi=8000) * np.exp(-t / 0.002) * 0.25
    return np.tanh((body + click) * 1.6)


def clap():
    t = tvec(0.28)
    x = fft_filter(rng.standard_normal(len(t)), lo=1000, hi=5000)
    x /= np.abs(x).max()
    e = np.exp(-t / 0.08)
    for d in (0.007, 0.015, 0.022):
        k = int(d * SR)
        e[k:] += 0.5 * np.exp(-t[: len(t) - k] / 0.01)
    return x * e * 0.55


def snare():
    t = tvec(0.18)
    noise = fft_filter(rng.standard_normal(len(t)), lo=1800, hi=9000)
    noise /= np.abs(noise).max()
    tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.04)
    return noise * np.exp(-t / 0.06) * 0.7 + tone * 0.5


def hat(open_=False):
    t = tvec(0.2 if open_ else 0.05)
    x = fft_filter(rng.standard_normal(len(t)), lo=7500, hi=16000)
    x /= np.abs(x).max()
    return x * np.exp(-t / (0.06 if open_ else 0.011))


def crash(length=2.4):
    t = tvec(length)
    x = fft_filter(rng.standard_normal(len(t)), lo=4000, hi=16000)
    x /= np.abs(x).max()
    return x * np.exp(-t / 0.7) * 0.5


# ------------------------------------------------------------------ tones
def saw(f, t, kmax, decay_per_k=0.0):
    """Band-limited saw; upper partials can die faster, like a pluck."""
    s = np.zeros_like(t)
    for k in range(1, kmax + 1):
        if f * k > 15000:
            break
        a = 1.0 / k
        if decay_per_k:
            a = a * np.exp(-t * decay_per_k * (k - 1))
        s += a * np.sin(2 * np.pi * f * k * t)
    return s


def pluck(midi, length, bright=10, decay=0.18):
    t = tvec(length)
    s = saw(hz(midi), t, bright, decay_per_k=6.0) + 0.5 * saw(hz(midi) * 1.004, t, bright, decay_per_k=6.0)
    return s * np.minimum(t / 0.002, 1) * np.exp(-t / decay)


def stab(midis, length=0.2, bright=14):
    """A wide supersaw chord stab: detuned voices split left and right."""
    t = tvec(length)
    left = np.zeros_like(t)
    right = np.zeros_like(t)
    for m in midis:
        for j, c in enumerate((-14, -6, 0, 6, 14)):
            v = saw(hz(m) * 2 ** (c / 1200), t, bright)
            if j % 2:
                left += v
            else:
                right += v
    e = np.minimum(t / 0.003, 1) * np.exp(-t / 0.09)
    return np.stack([left * e, right * e]) / (len(midis) * 3)


def pad(midis, length):
    t = tvec(length)
    left = np.zeros_like(t)
    right = np.zeros_like(t)
    for m in midis:
        left += saw(hz(m) * 2 ** (-7 / 1200), t, 5)
        right += saw(hz(m) * 2 ** (7 / 1200), t, 5)
    e = np.minimum(t / 0.25, 1)
    rel = min(int(0.3 * SR), len(t))
    e[-rel:] *= np.linspace(1, 0, rel)
    return np.stack([left * e, right * e]) / len(midis)


def bass(midi, length=0.11):
    t = tvec(length)
    f = hz(midi)
    s = (np.sin(2 * np.pi * f * t) + 0.45 * np.sin(2 * np.pi * 2 * f * t)
         + 0.2 * np.sin(2 * np.pi * 3 * f * t) + 0.1 * np.sin(2 * np.pi * 4 * f * t))
    e = np.minimum(t / 0.003, 1) * np.exp(-t / 0.07)
    return np.tanh(s * e * 1.4)


# ------------------------------------------------------------------ foley (FX bus)
def key_click(heavy=False):
    t = tvec(0.09)
    tick = fft_filter(rng.standard_normal(len(t)), lo=2500, hi=9000) * np.exp(-t / 0.004)
    f0 = 120 if heavy else 170
    thock = np.sin(2 * np.pi * (f0 * t - 30 * t * t)) * np.exp(-t / (0.06 if heavy else 0.035))
    body = np.sin(2 * np.pi * 2200 * t) * np.exp(-t / 0.012) * 0.25
    return 0.55 * tick / (np.abs(tick).max() + 1e-9) + 0.7 * thock + body


def soft_tick(f=1760):
    t = tvec(0.12)
    return np.sin(2 * np.pi * f * t) * np.exp(-t / 0.03) + 0.4 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t / 0.015)


def sub_thud(length=1.4):
    t = tvec(length)
    f = 38 + 28 * np.exp(-t / 0.08)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.45)


def riser(length):
    """Noise that opens up and rises into the hit."""
    t = tvec(length)
    n = len(t)
    x = rng.standard_normal(n)
    y = np.zeros(n)
    acc = 0.0
    a = np.exp(-2 * np.pi * (300 * (40 ** (t / length))) / SR)
    for i in range(n):
        acc = a[i] * acc + (1 - a[i]) * x[i]
        y[i] = acc
    tone = np.sin(2 * np.pi * np.cumsum(220 * (4 ** (t / length))) / SR) * 0.25
    return (y * 2.5 + tone) * (t / length) ** 2.2


def snare_roll(t0, t1, gain=0.3):
    """8ths, then 16ths, then 32nds, getting louder into t1."""
    span = t1 - t0
    t = t0
    while t < t1 - 1e-6:
        p = (t - t0) / span
        step = S16 * 2 if p < 0.5 else (S16 if p < 0.75 else S16 / 2)
        add(snare(), t, gain=gain * (0.35 + 0.65 * p), send=0.15)
        t += step


# ------------------------------------------------------------------ the song
CHORDS = [[57, 60, 64], [53, 57, 60], [55, 60, 64], [55, 59, 62]]     # Am F C G, mid voicing
PADS = [[45, 52, 57, 60, 64], [41, 48, 53, 57, 60], [48, 52, 55, 60, 64], [43, 50, 55, 59, 62]]
ROOTS = [33, 29, 36, 31]                                            # A1 F1 C2 G1
ARP = [[69, 72, 76, 81], [65, 69, 72, 77], [67, 72, 76, 79], [67, 71, 74, 79]]
ARP_ORDER = [0, 1, 2, 3, 2, 1, 2, 3, 0, 2, 1, 3, 2, 1, 0, 1]          # 16 steps per bar
HOOK = [  # 8ths per bar; None is a rest
    [76, None, 74, 76, None, 72, 69, None],
    [72, None, 69, 72, None, 77, 76, None],
    [79, None, 76, 79, None, 74, 72, None],
    [74, None, 71, 74, None, 79, 76, 74],
]

# Sections: (start, end, layers). Layers: k kick, c clap, h hats, b bass,
# a arp, s stabs, p pad, l lead hook. Chapter starts follow shots.md.
SECTIONS = [
    (0.0, 3.0, "k h a"),             # cold open: a kick under every fragment, dark arp
    (3.0, 4.0, "h a"),               # collage: drums lift, roll and riser take over
    (4.0, 7.0, "k c h b a s"),       # brand line: the groove
    (7.0, 7.5, "h a"),               # roll into the gap
    (8.0, 12.0, "k c h b a s p l"),  # the drop: Lynkk for Mac
    (12.0, 20.0, "k c h b a s"),     # 01 Calls, verse
    (20.0, 28.0, "k c h b a s p l"),
    (28.0, 31.0, "k c h b a s"),     # build to the fn moment
    (32.0, 43.0, "k c h b a s p l"), # 02 Dictation: fn drop
    (43.0, 51.0, "k c h b a s"),     # 03 The app, verse
    (51.0, 59.5, "k c h b a s p l"),
    (59.5, 68.0, "k c h b a s p l"), # 04 Feature wall at full tilt
    (68.0, 71.5, "a p"),             # install: breakdown
    (72.0, 78.0, "p"),               # lockup: final hit, then the tail
]
DROPS = [(8.0, 1.0), (32.0, 1.0), (72.0, 1.2)]       # crash + thud on the big hits
ROLLS = [(3.0, 4.0), (7.0, 7.5), (30.0, 31.5), (71.0, 72.0)]
GAPS = [(7.5, 8.0), (31.5, 32.0)]                    # music drops out, FX stays

if ARR == "teaser":
    # The same instruments at 128 BPM. Drops land on the story: 01 During the
    # call (7.5), 02 After the call (13.125), fn down (18.28), the lockup (22.5).
    b = BEAT
    SECTIONS = [
        (0.0, 3.75, "k h a"),                 # hook: a kick under every fragment
        (3.75, 5.625, "k c h b a s"),         # Your revenue lives in your conversations
        (5.625, 7.03125, "h a p"),            # the reveal builds
        (7.5, 13.125, "k c h b a s p l"),     # 01 During the call
        (13.125, 16.875, "k c h b a s p l"),  # 02 After the call
        (16.875, 17.8125, "h a"),             # 03 Between calls: lift
        (18.28125, 22.5, "k c h b a s p l"),  # fn down: the last drop
        (22.5, 25.5, "p"),                    # lockup tail
    ]
    DROPS = [(7.5, 1.0), (13.125, 0.6), (18.28125, 1.0), (22.5, 1.2)]
    ROLLS = [(2.8125, 3.75), (6.5625, 7.265625), (16.875, 17.8125), (21.5625, 22.5)]
    GAPS = [(7.265625, 7.5), (17.8125, 18.28125)]


def bar_of(t):
    return int(np.floor(t / BAR + 1e-6)) % 4


for (t0, t1, layers) in ([] if FX_ONLY else SECTIONS):
    lay = set(layers.split())
    bright = 4 if t1 <= 3.0 else (7 if t0 < 8.0 else 10)    # the arp opens up over the film
    t = t0
    while t < t1 - 1e-6:
        s16 = int(round(t / S16))
        pos = s16 % 16
        bar = bar_of(t)
        if "k" in lay and pos % 4 == 0:
            add(kick(), t, gain=0.62, bus=KICK)
            KICKS.append(t)
        if "c" in lay and pos in (4, 12):
            add(clap(), t, gain=0.32, send=0.2)
        if "h" in lay:
            accent = [0.55, 0.25, 1.0, 0.3][pos % 4]
            add(hat(open_=(pos % 4 == 2)), t, gain=0.075 * accent, pan=0.35 if pos % 2 else -0.25)
        if "b" in lay and pos % 4 != 0:            # rolling offbeat bass; the kick owns the downbeat
            add(bass(ROOTS[bar] + (12 if pos == 15 else 0)), t, gain=0.32)
        if "a" in lay:
            note = ARP[bar][ARP_ORDER[pos] % 4]
            add(pluck(note, 0.2, bright=bright, decay=0.09), t, gain=0.075, pan=0.4 * np.sin(s16 * 0.7), send=0.25)
        if "s" in lay and pos % 4 == 2:            # stabs on the "and"
            add(stab(CHORDS[bar], 0.18, bright=12), t, gain=0.16, send=0.2)
        if "p" in lay and pos == 0:
            add(pad(PADS[bar], min(BAR, t1 - t) + 0.05), t, gain=0.09, send=0.3)
        if "l" in lay and pos % 2 == 0:
            n = HOOK[bar][pos // 2]
            if n is not None:
                add(pluck(n, 0.3, bright=12, decay=0.16), t, gain=0.17, pan=0.1, send=0.35)
                add(pluck(n + 12, 0.25, bright=6, decay=0.1), t, gain=0.05, pan=-0.2, send=0.35)
        t += S16

for (t0, t1) in ([] if FX_ONLY else ROLLS):
    snare_roll(t0, t1)
    add(riser(t1 - t0), t0, gain=0.1, send=0.3)
for (t, size) in DROPS:
    if not FX_ONLY:
        add(crash(), t, gain=0.5 * size, send=0.3)
    add(sub_thud(1.2), t, gain=0.6 * size, bus=FX)
if not FX_ONLY and ARR != "teaser":
    add(crash(1.6), 4.0, gain=0.3, send=0.3)

# ------------------------------------------------------------------ foley on the picture
def film_to_teaser(src):
    for t0, t1, s0, r, _ in EDL["segments"]:
        if r and s0 <= src <= s0 + (t1 - t0) * r + 1e-9:
            return t0 + (src - s0) / r
    return None


if ARR == "teaser":
    EDL = json.load(open("teaser_edl.json"))
    for i in range(6):                                      # a key-click per fragment, on the beat
        add(key_click(), i * BEAT, gain=0.55, send=0.12, bus=FX)
    add(soft_tick(hz(81)), 6 * BEAT, gain=0.14, send=0.4, bus=FX)
    add(sub_thud(), 3.75, gain=0.9, bus=FX)                 # the mark lands
    for t in EDL["cards"][0]["beats"][1:]:                  # each line of the brand card
        add(soft_tick(hz(76)), t, gain=0.12, send=0.3, bus=FX)
    for src, f in [(8.0, "dock"), (14.25, "click"), (24.9, "key"), (25.0, "key"), (34.55, "tick"), (39.5, "click")]:
        t = film_to_teaser(src)
        if f == "dock":
            add(soft_tick(hz(88)), t, gain=0.25, send=0.35, bus=FX); add(key_click(), t, gain=0.45, send=0.2, bus=FX)
        elif f == "tick":
            add(soft_tick(hz(88)), t, gain=0.18, send=0.3, bus=FX)
        else:
            add(key_click(heavy=(f == "key")), t, gain=0.45, send=0.15, bus=FX)
    for c in EDL["cards"][1:]:                              # act cards
        add(soft_tick(hz(76)), c["t0"], gain=0.16, send=0.35, bus=FX)
    add(key_click(heavy=True), 18.28125, gain=0.5, send=0.2, bus=FX)   # fn down
    for k in range(9):                                      # wall tiles, one per 8th
        add(soft_tick(hz(88)), 20.625 + k * BEAT / 2, gain=0.07, send=0.3, bus=FX)

for i in ([] if ARR == "teaser" else range(6)):             # one key-click per fragment
    add(key_click(), i * 0.5, gain=0.55, send=0.12, bus=FX)
if ARR != "teaser":
    add(soft_tick(hz(81)), 3.0, gain=0.14, send=0.4, bus=FX)    # collage
    add(sub_thud(), 4.0, gain=0.9, bus=FX)                      # the mark lands
    add(key_click(heavy=True), 4.0, gain=0.35, send=0.2, bus=FX)
    add(soft_tick(hz(88)), 8.0, gain=0.25, send=0.35, bus=FX)   # docks in the menu bar
    add(key_click(), 8.0, gain=0.45, send=0.2, bus=FX)

# ------------------------------------------------------------------ mix
# Sidechain the music to the kick: the pump is part of the drive.
duck = np.ones(N)
for k in KICKS:
    i = int(k / TS * SR)
    n = min(int(0.2 * SR), N - i)
    duck[i:i + n] = np.minimum(duck[i:i + n], 0.45 + 0.55 * np.linspace(0, 1, n) ** 1.3)

for (g0, g1) in GAPS:                                       # the music drops out; FX stays
    i0, i1 = int(g0 / TS * SR), int(g1 / TS * SR)
    MUS[:, i0:i1] = 0.0
    KICK[:, i0:i1] = 0.0

ir_t = tvec(1.4)
ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t / 0.32)
ir = fft_filter(ir, lo=250, hi=7000)
ir /= np.sqrt((ir ** 2).sum())
size = 1 << int(np.ceil(np.log2(N + len(ir))))
wet = np.fft.irfft(np.fft.rfft(REV, size) * np.fft.rfft(ir, size), size)[:N] * 0.45
for (g0, g1) in GAPS:                                       # only a little tail into the gap
    i0, i1 = int(g0 / TS * SR), int(g1 / TS * SR)
    wet[i0:i1] *= np.linspace(1, 0.15, i1 - i0)

mix = KICK + MUS * duck + FX + np.stack([wet, np.roll(wet, int(0.011 * SR))])
peak = np.abs(mix).max()
mix = np.tanh(mix / peak * 1.5) / np.tanh(1.5)
end = int(DUR / TS * SR)
fade = int(2.0 * SR)
mix[:, end - fade:end] *= np.linspace(1, 0, fade)

out = (mix[:, :end].T * 0.89 * 32767).astype(np.int16)
os.makedirs("out", exist_ok=True)
name = "out/fx_raw.wav" if FX_ONLY else ("out/teaser_score_raw.wav" if ARR == "teaser" else "out/score_raw.wav")
with wave.open(name, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(out.tobytes())
print("wrote", name, f"{DUR / TS:.2f}s", f"{len(KICKS)} kicks")
