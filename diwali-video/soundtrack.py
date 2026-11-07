"""
Procedural soundtrack for the GreenSolve Diwali video (NumPy only).

Tanpura drone + soft pad, santoor-like plucked melody in raag Bhupali
(D major pentatonic: D E F# A B), muffled firecrackers in the smoky opening,
a chime when Meera lights her diya, sparkles synced to the rangoli, and a
warm final cadence on the greeting card.
"""
import wave

import numpy as np

SR = 44100
NOTE_IDX = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}


def hz(name):
    n, octv = name[:-1], int(name[-1])
    midi = 12 * (octv + 1) + NOTE_IDX[n]
    return 440.0 * 2 ** ((midi - 69) / 12)


def ks(freq, dur, decay=0.996, seed=0, bright=0.7):
    """Karplus–Strong plucked string, computed one period at a time."""
    n = int(SR * dur)
    p = max(2, int(round(SR / freq)))
    rng = np.random.default_rng(seed)
    init = rng.uniform(-1, 1, p + 1)
    init = bright * init + (1 - bright) * np.convolve(init, np.ones(6) / 6, "same")
    out = np.zeros(n + p + 1)
    out[:p + 1] = init
    s = p + 1
    while s < len(out):
        e = min(s + p, len(out))
        L = e - s
        out[s:e] = decay * 0.5 * (out[s - p:s - p + L] + out[s - p - 1:s - p - 1 + L])
        s = e
    out = out[:n]
    out -= np.convolve(out, np.ones(64) / 64, "same")  # remove DC drift
    return out / (np.max(np.abs(out)) + 1e-9)


def bell(freq, dur, ratio=1.41, idx=2.2, tau=1.4):
    t = np.arange(int(SR * dur)) / SR
    env = np.exp(-t / tau) * (1 - np.exp(-t * 500))
    i = idx * np.exp(-t / (tau * 0.4))
    return env * np.sin(2 * np.pi * freq * t + i * np.sin(2 * np.pi * freq * ratio * t))


def fft_filter(x, lo, hi):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = ((f >= lo) & (f <= hi)).astype(float)
    # soft edges
    m = np.convolve(m, np.ones(400) / 400, "same")
    return np.fft.irfft(X * m, len(x))


class Mix:
    def __init__(self, dur):
        self.n = int(SR * dur)
        self.L = np.zeros(self.n)
        self.R = np.zeros(self.n)

    def add(self, sig, t, amp=1.0, pan=0.0):
        i = int(t * SR)
        if i >= self.n:
            return
        sig = sig[:self.n - i] * amp
        gl, gr = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        self.L[i:i + len(sig)] += sig * gl
        self.R[i:i + len(sig)] += sig * gr


def santoor(freq, dur=2.5, seed=0):
    """Two slightly detuned bright plucks, like a santoor's string course."""
    a = ks(freq, dur, 0.9975, seed, 0.85)
    b = ks(freq * 1.003, dur, 0.9975, seed + 1, 0.85)
    t = np.arange(len(a)) / SR
    return (a + b) * 0.5 * np.exp(-t / (dur * 0.45))


def make_soundtrack(path, duration):
    rng = np.random.default_rng(2024)
    m = Mix(duration)
    T = np.arange(m.n) / SR

    # ---- tanpura drone (Pa – Sa – Sa – low Sa), throughout -----------------
    pattern = [("A2", 0.0), ("D3", 1.05), ("D3", 2.1), ("D2", 3.15)]
    cache = {}
    cyc = 0
    t0 = 0.3
    while t0 < duration:
        for (note, off) in pattern:
            key = (note, cyc % 3)
            if key not in cache:
                s = ks(hz(note), 5.0, 0.9993, seed=hash(key) % 1000, bright=0.95)
                s = np.tanh(2.2 * s) / np.tanh(2.2)  # a touch of jawari buzz
                cache[key] = s
            m.add(cache[key], t0 + off, 0.075, pan=-0.35 if note != "D2" else 0.2)
        t0 += 4.2
        cyc += 1

    # ---- pad ------------------------------------------------------------
    def pad_voice(freq, pts, amp, pan):
        env = np.interp(T, [p[0] for p in pts], [p[1] for p in pts])
        vib = 0.0025 * np.sin(2 * np.pi * 0.21 * T + freq)
        ph = 2 * np.pi * freq * np.cumsum(1 + vib) / SR
        sig = (np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.08 * np.sin(3 * ph)) * env
        m.add(sig, 0, amp, pan)

    end = duration
    pad_voice(hz("D3"), [(0, 0), (2, 1), (end - 3, 1), (end, 0)], 0.05, -0.2)
    pad_voice(hz("A3"), [(0, 0), (3, 0.8), (end - 3, 1), (end, 0)], 0.04, 0.25)
    pad_voice(hz("D4"), [(0, 0), (9, 0), (12, 0.8), (end - 3, 1), (end, 0)], 0.03, -0.3)
    pad_voice(hz("F#4"), [(0, 0), (18, 0), (21, 0.9), (end - 3, 1), (end, 0)], 0.026, 0.3)
    pad_voice(hz("B3"), [(0, 0), (36, 0), (39, 0.9), (44.5, 0.9), (46, 0.0), (end, 0)], 0.026, 0.0)
    pad_voice(hz("E4"), [(0, 0), (27, 0), (29, 0.6), (35.5, 0.6), (37, 0.0), (end, 0)], 0.02, 0.1)

    # ---- smoky opening: rumble + distant firecrackers ---------------------
    rum = fft_filter(rng.normal(0, 1, m.n), 25, 180)
    rum /= np.max(np.abs(rum)) + 1e-9
    m.add(rum * np.interp(T, [0, 1.5, 17, 27, 28], [0, 1, 0.8, 0, 0]), 0, 0.10)
    for (bt, pan) in [(1.0, -0.5), (2.5, 0.4), (3.9, -0.1), (5.3, 0.7), (6.6, -0.7), (7.8, 0.2)]:
        n = int(SR * 1.6)
        t = np.arange(n) / SR
        pop = rng.normal(0, 1, n) * np.exp(-t / 0.07)
        pop = np.convolve(pop, np.ones(30) / 30, "same")
        crackle = np.zeros(n)
        for k in rng.integers(int(0.08 * SR), int(1.2 * SR), 70):
            crackle[k:k + 60] += rng.normal(0, 1, 60) * np.exp(-np.arange(60) / 12) * np.exp(-k / SR / 0.5)
        m.add(pop / (np.max(np.abs(pop)) + 1e-9) * 0.9 + crackle * 0.18, bt, 0.16, pan)

    # ---- ignition: whoosh + chime ----------------------------------------
    n = int(SR * 1.4)
    t = np.arange(n) / SR
    wh = fft_filter(rng.normal(0, 1, n), 600, 4000) * np.interp(t, [0, 0.25, 1.4], [0, 1, 0]) ** 2
    m.add(wh / (np.max(np.abs(wh)) + 1e-9), 11.75, 0.10)
    m.add(bell(hz("D6"), 4.0), 12.0, 0.11, 0.2)
    m.add(bell(hz("A6"), 3.5), 12.08, 0.07, -0.2)
    m.add(bell(hz("F#6"), 3.5), 12.16, 0.05, 0.4)

    # ---- melody ---------------------------------------------------------
    mel = [("A4", 9.8), ("B4", 10.6), ("D5", 11.4),
           ("F#5", 13.8), ("E5", 14.4), ("D5", 15.0), ("B4", 15.8), ("A4", 16.4)]
    phrase3 = ["D5", "E5", "F#5", "A5", None, "F#5", "E5", "D5", None, None,
               "B4", "D5", "E5", None, "F#5", "E5", "D5", "B4", "A4", None, None]
    mel += [(nm, 18.4 + 0.4 * i) for i, nm in enumerate(phrase3) if nm]
    mel += [("A4", 26.6)]
    # rangoli: one rising sparkle per ring as it is drawn (soft, high)
    for k, nm in enumerate(["D5", "E5", "F#5", "A5", "B5", "D6", "E6", "F#6", "A6"]):
        m.add(bell(hz(nm), 2.5, ratio=2.0, idx=1.0, tau=0.9), 27.3 + 0.75 * k, 0.05, -0.6 + 0.15 * k)
    mel += [("A4", 27.4), ("B4", 29.0), ("D5", 30.6), ("E5", 31.8), ("D5", 33.0), ("B4", 34.2), ("A4", 35.0)]
    phrase5 = ["A4", "D5", "E5", "F#5", None, "A5", "B5", "A5", None, "F#5", "E5", "D5", "E5", "F#5", None,
               "A5", "F#5", "E5", "D5", None, "B4", "D5", None]
    mel += [(nm, 36.4 + 0.4 * i) for i, nm in enumerate(phrase5) if nm]
    mel += [("D5", 45.6), ("F#5", 47.0), ("A5", 47.4), ("B5", 47.8), ("A5", 48.6), ("F#5", 49.0),
            ("E5", 49.4), ("D5", 50.2)]
    for i, (nm, tt) in enumerate(mel):
        f = hz(nm)
        dur = 3.0
        m.add(santoor(f, dur, seed=i), tt, 0.20, pan=0.15 * np.sin(i))
        if tt > 36:  # fuller: double an octave lower in the finale
            m.add(santoor(f / 2, dur, seed=i + 500), tt, 0.10, pan=-0.2)

    # roof diyas lighting up: tiny glints
    for k in range(18):
        tt = 36.6 + k * 0.24 + rng.uniform(0, 0.08)
        m.add(bell(hz(["D6", "E6", "F#6", "A6", "B6"][k % 5]), 1.2, ratio=3.0, idx=0.6, tau=0.35), tt, 0.025,
              rng.uniform(-0.8, 0.8))

    # shooting star shimmer
    for k, nm in enumerate(["A5", "B5", "D6", "E6", "F#6", "A6", "B6", "D7"]):
        m.add(bell(hz(nm), 1.6, ratio=2.0, idx=0.8, tau=0.5), 41.0 + k * 0.06, 0.03, 0.6 - k * 0.15)

    # ---- soft rhythm (bayan thump + high "na") from the solar scene -------
    beat = 0.8
    n = int(SR * 0.6)
    t = np.arange(n) / SR
    f_inst = 70 + 60 * np.exp(-t / 0.05)
    thump = np.sin(2 * np.pi * np.cumsum(f_inst) / SR) * np.exp(-t / 0.18)
    na = ks(hz("D5"), 0.5, 0.99, seed=77, bright=0.9) * np.exp(-t[:int(SR * 0.5)] / 0.08)
    tt = 18.4
    k = 0
    while tt < 50:
        level = min(1.0, (tt - 18.4) / 4) * (0.6 if 27 < tt < 36 else 1.0)
        if k % 4 in (0, 2):
            m.add(thump, tt, 0.16 * level)
        if k % 4 == 3 or (k % 8 == 5):
            m.add(na, tt + beat / 2, 0.035 * level, 0.3)
        tt += beat
        k += 1

    # ---- card: strummed chords ------------------------------------------
    for j, nm in enumerate(["D4", "F#4", "A4", "D5", "E5"]):
        m.add(santoor(hz(nm), 4.0, seed=900 + j), 45.6 + j * 0.045, 0.12, -0.4 + 0.2 * j)
    m.add(bell(hz("D6"), 5.0, tau=2.0), 46.0, 0.08, 0.0)
    for j, nm in enumerate(["D3", "A3", "D4", "F#4", "A4", "D5"]):
        m.add(santoor(hz(nm), 5.0, seed=950 + j), 50.6 + j * 0.06, 0.12, -0.5 + 0.2 * j)
    m.add(bell(hz("A5"), 5.0, tau=2.2), 50.9, 0.06, 0.3)

    master(m, T, path, duration)


def master(m, T, path, duration):
    # ---- reverb (stereo, FFT convolution) --------------------------------
    rl = int(SR * 2.6)
    tr = np.arange(rl) / SR
    def ir(seed):
        r = np.random.default_rng(seed).normal(0, 1, rl) * np.exp(-tr / 0.55)
        r[:int(0.012 * SR)] = 0
        return r / np.sqrt(np.sum(r ** 2))
    nfft = 1 << int(np.ceil(np.log2(m.n + rl)))
    outs = []
    for ch, seed in ((m.L, 1), (m.R, 2)):
        wet = np.fft.irfft(np.fft.rfft(ch, nfft) * np.fft.rfft(ir(seed), nfft), nfft)[:m.n]
        outs.append(ch * 0.78 + wet * 0.42)
    L, Rr = outs

    # master: fade, soft-limit, normalise
    fade = np.interp(T, [0, 0.8, duration - 2.6, duration - 0.1], [0, 1, 1, 0])
    st = np.stack([L, Rr], 1) * fade[:, None]
    st = np.tanh(st / (np.max(np.abs(st)) + 1e-9) * 1.4) / np.tanh(1.4)
    st *= 0.89
    pcm = (st * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def drone_and_pad(m, T, duration, rangoli=False):
    pattern = [("A2", 0.0), ("D3", 1.05), ("D3", 2.1), ("D2", 3.15)]
    cache = {}
    t0, cyc = 0.2, 0
    while t0 < duration:
        for (note, off) in pattern:
            key = (note, cyc % 3)
            if key not in cache:
                s = ks(hz(note), 5.0, 0.9993, seed=hash(key) % 1000, bright=0.95)
                cache[key] = np.tanh(2.2 * s) / np.tanh(2.2)
            m.add(cache[key], t0 + off, 0.075, pan=-0.35 if note != "D2" else 0.2)
        t0 += 4.2
        cyc += 1
    end = duration

    def pad_voice(freq, pts, amp, pan):
        env = np.interp(T, [p[0] for p in pts], [p[1] for p in pts])
        ph = 2 * np.pi * freq * np.cumsum(1 + 0.0025 * np.sin(2 * np.pi * 0.21 * T + freq)) / SR
        m.add((np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.08 * np.sin(3 * ph)) * env, 0, amp, pan)
    pad_voice(hz("D3"), [(0, 0), (1.5, 1), (end - 2, 1), (end, 0)], 0.05, -0.2)
    pad_voice(hz("A3"), [(0, 0), (2, 0.8), (end - 2, 1), (end, 0)], 0.04, 0.25)
    pad_voice(hz("F#4"), [(0, 0), (5, 0), (7, 0.9), (end - 2, 1), (end, 0)], 0.026, 0.3)


def make_story_soundtrack(path, duration, rangoli_map=(26.9, 1.3), card_at=5.8):
    """15 s Instagram Story: rangoli sparkles, then the greeting-card cadence."""
    m = Mix(duration)
    T = np.arange(m.n) / SR
    drone_and_pad(m, T, duration)
    r0, rs = rangoli_map
    # one rising sparkle per rangoli ring, timed to the drawing
    for k, nm in enumerate(["D5", "E5", "F#5", "A5", "B5", "D6", "E6", "F#6", "A6"]):
        tt = (27.3 + 0.75 * k - r0) / rs
        m.add(bell(hz(nm), 2.5, ratio=2.0, idx=1.0, tau=0.9), tt, 0.06, -0.6 + 0.15 * k)
    mel = [("A4", 0.4), ("B4", 1.4), ("D5", 2.4), ("E5", 3.2), ("F#5", 4.0), ("E5", 4.6), ("D5", 5.2)]
    c = card_at
    mel += [("F#5", c + 2.6), ("A5", c + 3.0), ("B5", c + 3.4), ("A5", c + 4.2), ("F#5", c + 4.6),
            ("E5", c + 5.0), ("D5", c + 5.8)]
    for i, (nm, tt) in enumerate(mel):
        m.add(santoor(hz(nm), 3.0, seed=i), tt, 0.20, pan=0.15 * np.sin(i))
        if tt > c:
            m.add(santoor(hz(nm) / 2, 3.0, seed=i + 500), tt, 0.09, pan=-0.2)
    for j, nm in enumerate(["D4", "F#4", "A4", "D5", "E5"]):
        m.add(santoor(hz(nm), 4.0, seed=900 + j), c + 1.0 + j * 0.045, 0.12, -0.4 + 0.2 * j)
    m.add(bell(hz("D6"), 5.0, tau=2.0), c + 1.4, 0.08, 0.0)
    for j, nm in enumerate(["D3", "A3", "D4", "F#4", "A4", "D5"]):
        m.add(santoor(hz(nm), 5.0, seed=950 + j), c + 6.6 + j * 0.06, 0.12, -0.5 + 0.2 * j)
    m.add(bell(hz("A5"), 5.0, tau=2.2), c + 6.9, 0.06, 0.3)
    # soft bayan pulse under the card
    n = int(SR * 0.6)
    t = np.arange(n) / SR
    thump = np.sin(2 * np.pi * np.cumsum(70 + 60 * np.exp(-t / 0.05)) / SR) * np.exp(-t / 0.18)
    tt, k = c + 1.0, 0
    while tt < duration - 2:
        if k % 4 in (0, 2):
            m.add(thump, tt, 0.14)
        tt += 0.8
        k += 1
    master(m, T, path, duration)


if __name__ == "__main__":
    make_soundtrack("soundtrack_test.wav", 55.0)
