"use client"

let ctx: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!ctx) {
    const AudioCtor = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtor) return null
    ctx = new AudioCtor()
  }
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {})
  }
  return ctx
}

function tone(
  freq: number,
  duration: number,
  options: { type?: OscillatorType; gain?: number; delay?: number; slideTo?: number } = {},
) {
  const audioCtx = getContext()
  if (!audioCtx) return
  const { type = "sine", gain = 0.12, delay = 0, slideTo } = options
  const start = audioCtx.currentTime + delay
  const osc = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  if (slideTo) {
    osc.frequency.linearRampToValueAtTime(slideTo, start + duration)
  }
  gainNode.gain.setValueAtTime(0, start)
  gainNode.gain.linearRampToValueAtTime(gain, start + Math.min(0.02, duration / 4))
  gainNode.gain.linearRampToValueAtTime(0, start + duration)
  osc.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

export const sound = {
  question() {
    tone(420, 0.12, { type: "sine", gain: 0.08 })
  },
  press() {
    tone(280, 0.07, { type: "square", gain: 0.05 })
  },
  correct() {
    tone(520, 0.09, { type: "sine", gain: 0.1 })
    tone(780, 0.14, { type: "sine", gain: 0.09, delay: 0.08 })
  },
  wrong() {
    tone(220, 0.18, { type: "sawtooth", gain: 0.08, slideTo: 120 })
  },
  warning() {
    tone(600, 0.05, { type: "square", gain: 0.04 })
  },
  gameover() {
    tone(300, 0.2, { type: "sine", gain: 0.08, slideTo: 90 })
  },
  win() {
    tone(440, 0.12, { type: "sine", gain: 0.1 })
    tone(660, 0.12, { type: "sine", gain: 0.1, delay: 0.1 })
    tone(880, 0.22, { type: "sine", gain: 0.1, delay: 0.2 })
  },
}
