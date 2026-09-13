import type { Question } from "./types"

export interface ScoreBreakdown {
  base: number
  speedBonus: number
  streakMultiplier: number
  difficultyMultiplier: number
  total: number
}

export function computeScore(question: Question, timeRemaining: number, streak: number): ScoreBreakdown {
  const base = 100
  const speedFraction = Math.max(0, Math.min(1, timeRemaining / question.timeLimit))
  const speedBonus = Math.round(speedFraction * 50)
  const streakMultiplier = Math.min(1 + streak * 0.1, 3)
  const difficultyMultiplier = 1 + (question.difficulty - 1) * 0.25
  const total = Math.round((base + speedBonus) * streakMultiplier * difficultyMultiplier)
  return { base, speedBonus, streakMultiplier, difficultyMultiplier, total }
}
