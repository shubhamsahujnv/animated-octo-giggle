"""Synthesises assets/soundtrack.wav (22 s) synced to the timeline in index.html.
Drone on Sa/Pa (tanpura feel), temple-bell chimes on scene beats,
coin clinks on each landing, a soft whoosh on the end-card wipe."""
import wave
import numpy as np

SR, DUR = 44100, 22.0
n = int(SR * DUR)
t = np.arange(n) / SR
mix = np.zeros(n)

def add(sig, at, gain=1.0):
    i = int(at * SR)
    j = min(n, i + len(sig))
    mix[i:j] += sig[: j - i] * gain

# --- drone (C3 + G3 + C4), slow breathing swell
for f, g in [(130.81, .30), (196.0, .20), (261.63, .14), (392.0, .05)]:
    tone = sum(np.sin(2 * np.pi * f * h * t + h) / h**1.6 for h in range(1, 7))
    mix += g * tone * (0.75 + 0.25 * np.sin(2 * np.pi * 0.11 * t + f))
mix *= np.clip(t / 2.0, 0, 1) * 0.22

# --- temple bell
def bell(f0, dur=3.5, amp=1.0):
    tt = np.arange(int(dur * SR)) / SR
    parts = [(1, 1, 1.4), (2.0, .5, 2.2), (2.76, .45, 2.8), (5.4, .25, 4.5), (8.9, .12, 6.5)]
    s = sum(a * np.sin(2 * np.pi * f0 * r * tt) * np.exp(-k * tt) for r, a, k in parts)
    s *= np.minimum(1, tt / 0.004)
    return amp * s / 2.3

# --- coin clink
def clink(f0):
    tt = np.arange(int(0.45 * SR)) / SR
    s = sum(a * np.sin(2 * np.pi * f0 * r * tt) * np.exp(-k * tt) for r, a, k in [(1, 1, 14), (2.41, .6, 18), (3.9, .35, 24)])
    return s * np.minimum(1, tt / 0.002) / 2

# --- shimmer (rising arpeggio in C major pentatonic)
def shimmer(start, notes, step=.09, gain=.18):
    for i, f in enumerate(notes):
        add(bell(f, 1.6), start + i * step, gain)

rng = np.random.default_rng(7)
add(bell(523.25), 1.05, .55)            # flame ignites
add(bell(392.0), 3.6, .35)              # into scene 2
for i in range(9):                       # coins land
    add(clink(2300 + rng.uniform(-250, 450)), 4.5 + i * .14 + .72, .22)
shimmer(6.4, [523.25, 587.33, 659.25, 783.99, 880.0])  # sprout
add(bell(329.63), 8.45, .35)            # landscape
for k, at in enumerate([9.6, 10.1, 10.6]):  # tip cards
    add(bell([659.25, 783.99, 880.0][k], 1.4), at, .16)
add(bell(261.63, 4.5), 13.75, .5)       # rangoli
shimmer(14.0, [523.25, 659.25, 783.99, 1046.5, 1174.66, 1318.5], .12, .12)

# whoosh on wipe
w = rng.standard_normal(int(0.9 * SR))
w = np.convolve(w, np.ones(60) / 60, mode='same') * np.sin(np.linspace(0, np.pi, len(w)))**2
add(w, 17.5, .9)
add(bell(523.25, 4.0), 18.35, .6)       # logo
add(bell(783.99, 3.0), 19.35, .25)

# fade + normalise + stereo widen
mix *= np.clip((DUR - t) / 1.5, 0, 1)
mix /= np.max(np.abs(mix)) * 1.12
d = int(0.012 * SR)
left, right = mix, np.concatenate([np.zeros(d), mix[:-d]])
st = (np.stack([left, right], 1) * 32767).astype(np.int16)
with wave.open('assets/soundtrack.wav', 'wb') as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR); f.writeframes(st.tobytes())
print('assets/soundtrack.wav written')
