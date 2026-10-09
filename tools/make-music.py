"""Synthesise an original, royalty-free background track + transition SFX for a video.

Hopeful I–V–vi–IV progression with pad, pluck arpeggio, sub bass and a soft beat that
builds through the video; whooshes on scene changes. Timing comes from timeline.json.
Usage: python3 tools/make-music.py content/videos/<dir>   -> music.wav (44.1 kHz stereo)
Requires numpy + scipy.
"""
import json, os, sys
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

SR = 44100
BPM = 100
BEAT = 60 / BPM
rng = np.random.default_rng(11)

def midi(n): return 440 * 2 ** ((n - 69) / 12)
def lp(x, f, o=2): return sosfilt(butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)

def add(buf, sig, t):
    i = int(t * SR)
    if i >= len(buf): return
    sig = sig[: len(buf) - i]
    buf[i:i + len(sig)] += sig

def tone(f, dur, harm=(1, .5, .25), detune=0.0):
    t = np.arange(int(dur * SR)) / SR
    s = sum(a * np.sin(2 * np.pi * f * (k + 1) * t * (1 + detune)) for k, a in enumerate(harm))
    return s

def env(n, a, r):
    e = np.ones(n); A = int(a * SR); R = int(r * SR)
    if A: e[:A] = np.linspace(0, 1, A)
    if R: e[-R:] *= np.linspace(1, 0, R)
    return e

def main():
    vdir = sys.argv[1]
    tl = json.load(open(os.path.join(vdir, 'timeline.json')))
    T = tl['duration']; N = int(T * SR) + SR
    S = {s['id']: s for s in tl['scenes']}
    beat_in = S['question']['start']           # drums enter after the hook
    hats_in = S['upi']['start']                # energy lift at the big number
    lift = S['hope']['start']                  # brighter section for the hopeful turn
    end = S['end']['start']

    pad = np.zeros(N); pl = np.zeros(N); bass = np.zeros(N); drums = np.zeros(N); sfx = np.zeros(N)
    # D major: D  A  Bm  G   (I V vi IV), 2 bars each
    chords = [[50, 54, 57, 62], [45, 52, 57, 61], [47, 54, 59, 62], [43, 50, 55, 59]]
    bar = 4 * BEAT
    t = 0.0; ci = 0
    while t < T + 1:
        ch = chords[ci % 4]; dur = 2 * bar
        for n in ch:
            for d in (-.003, .003):
                s = tone(midi(n + 12), dur + .6, harm=(1, .35, .2, .1), detune=d)
                pad_sig = s * env(len(s), .8, 1.0)
                add(pad, pad_sig, t)
        add(bass, tone(midi(ch[0] - 12), dur, harm=(1, .2)) * env(int(dur * SR), .02, .3), t)
        # pluck arpeggio, 8th notes
        arp = [ch[0] + 24, ch[1] + 24, ch[2] + 24, ch[3] + 24, ch[2] + 24, ch[1] + 24, ch[2] + 24, ch[3] + 24]
        for k in range(16):
            tt = t + k * BEAT / 2
            n = arp[k % 8]
            s = tone(midi(n), .6, harm=(1, .3, .12))
            s *= np.exp(-np.arange(len(s)) / SR * 7)
            gain = .55 if tt < lift else .8
            add(pl, s * gain, tt)
        t += dur; ci += 1

    # drums: soft kick on 1 & 3 after the hook, offbeat hats after the UPI scene
    k_t = beat_in
    while k_t < end + bar:
        n = int(.35 * SR); tt = np.arange(n) / SR
        f = 45 + 75 * np.exp(-tt * 30)
        kick = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9)
        add(drums, kick * .9, k_t)
        if k_t >= hats_in:
            hn = int(.08 * SR)
            hat = hp(rng.standard_normal(hn), 7000) * np.exp(-np.arange(hn) / SR * 60)
            add(drums, hat * .25, k_t + BEAT)
            add(drums, hat * .18, k_t + BEAT * 1.5)
        k_t += 2 * BEAT

    # SFX: whoosh into each scene, tap + success chime in the hook
    for s in tl['scenes'][1:]:
        n = int(.5 * SR); x = rng.standard_normal(n)
        sweep = np.concatenate([bp(x[i:i + 2205], 300 + 3000 * (i / n), 600 + 6000 * (i / n)) for i in range(0, n, 2205)])
        sweep *= np.sin(np.linspace(0, np.pi, len(sweep))) ** 2
        add(sfx, sweep * .5, s['start'] - .45)
    tap = 1.6
    n = int(.05 * SR); add(sfx, hp(rng.standard_normal(n), 2000) * np.exp(-np.arange(n) / SR * 120) * .6, tap)
    for i, note in enumerate((81, 88)):            # A5 -> E6 "paid" chime
        s = tone(midi(note), .7, harm=(1, .2)) * np.exp(-np.arange(int(.7 * SR)) / SR * 5)
        add(sfx, s * .35, 2.0 + i * .12)
    # riser into the hopeful section
    n = int(1.5 * SR); x = rng.standard_normal(n)
    riser = np.concatenate([bp(x[i:i + 2205], 200 + 4000 * (i / n) ** 2, 400 + 9000 * (i / n) ** 2) for i in range(0, n, 2205)])
    riser *= np.linspace(0, 1, len(riser)) ** 2
    add(sfx, riser * .35, lift - 1.5)

    pad = lp(pad, 2500) * .05
    pl = lp(pl, 5000) * .09
    bass = lp(bass, 300) * .22
    mix = pad + pl + bass + drums * .45
    # fade in quickly, fade out over the end card tail
    t_all = np.arange(N) / SR
    fade = np.clip(t_all / .4, 0, 1) * np.clip((T + .2 - t_all) / 2.0, 0, 1)
    mix *= fade
    # gentle stereo: delay plucks/pad slightly on the right
    d = int(.012 * SR)
    left = mix + sfx
    right = np.concatenate([np.zeros(d), mix[:-d]]) + sfx
    st = np.stack([left, right], 1)[: int(T * SR)]
    st /= np.max(np.abs(st)) / .89
    sf.write(os.path.join(vdir, 'music.wav'), st, SR)
    print(f'music.wav {T:.2f}s')

if __name__ == '__main__':
    main()
