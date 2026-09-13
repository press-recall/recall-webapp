"use client"

import { Score } from "./score"
import { Streak } from "./streak"
import { SoundToggle } from "./sound-toggle"

interface HeaderProps {
  roundNumber: number
  totalRounds: number
  score: number
  streak: number
  muted: boolean
  onToggleMuted: () => void
}

export function Header({ roundNumber, totalRounds, score, streak, muted, onToggleMuted }: HeaderProps) {
  return (
    <header className="w-full px-6 pt-6 sm:px-10 sm:pt-8">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">Recall</span>
        <SoundToggle muted={muted} onToggle={onToggleMuted} />
      </div>

      <p className="mt-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Round {String(roundNumber).padStart(2, "0")} / {totalRounds}
      </p>

      <div className="mx-auto mt-4 flex w-full max-w-xs items-center justify-between sm:mt-5">
        <Score value={score} />
        <Streak value={streak} />
      </div>
    </header>
  )
}
