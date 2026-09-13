"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { generateQuestionSequence } from "@/lib/game/engine"
import { computeScore } from "@/lib/game/scoring"
import { sound } from "@/lib/game/sound"
import type { AnsweredQuestion, GamePhase, PlayerDecision, Question } from "@/lib/game/types"

const TOTAL_QUESTIONS = 25
const MAX_MISTAKES = 3

export interface LastResult {
  correct: boolean
  question: Question
  pointsAwarded: number
  streakAfter: number
}

export function useRecallGame() {
  const [phase, setPhase] = useState<GamePhase>("start")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [history, setHistory] = useState<AnsweredQuestion[]>([])
  const [muted, setMuted] = useState(false)
  const [lastResult, setLastResult] = useState<LastResult | null>(null)

  const mutedRef = useRef(muted)
  mutedRef.current = muted

  const play = useCallback((fn: () => void) => {
    if (!mutedRef.current) fn()
  }, [])

  const currentQuestion = questions[currentIndex]

  const start = useCallback(() => {
    const generated = generateQuestionSequence(TOTAL_QUESTIONS)
    setQuestions(generated)
    setCurrentIndex(0)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setMistakes(0)
    setHistory([])
    setLastResult(null)
    setPhase("playing")
  }, [])

  const decide = useCallback(
    (decision: PlayerDecision, timeRemaining: number) => {
      const question = questions[currentIndex]
      if (!question || phase !== "playing") return

      // Not pressing is a real action here: a timeout is equivalent to leaving
      // the button untouched, so it's correct whenever the round wanted "don't press".
      const pressed = decision === "press"
      const correct = pressed === question.correctDecision

      let pointsAwarded = 0
      let nextStreak = streak
      if (correct) {
        const breakdown = computeScore(question, timeRemaining, streak)
        pointsAwarded = breakdown.total
        nextStreak = streak + 1
        play(sound.correct)
      } else {
        nextStreak = 0
        play(sound.wrong)
      }

      const nextBest = Math.max(bestStreak, nextStreak)
      const nextMistakes = correct ? mistakes : mistakes + 1

      setScore((s) => s + pointsAwarded)
      setStreak(nextStreak)
      setBestStreak(nextBest)
      setMistakes(nextMistakes)
      setHistory((h) => [...h, { question, decision, correct, timeRemaining, pointsAwarded }])
      setLastResult({ correct, question, pointsAwarded, streakAfter: nextStreak })
      setPhase("feedback")

      if (nextMistakes >= MAX_MISTAKES) {
        play(sound.gameover)
        setTimeout(() => setPhase("gameover"), 900)
        return
      }

      const isLast = currentIndex + 1 >= questions.length
      setTimeout(() => {
        if (isLast) {
          setPhase("gameover")
        } else {
          setCurrentIndex((i) => i + 1)
          setPhase("playing")
        }
      }, 900)
    },
    [bestStreak, currentIndex, mistakes, phase, play, questions, streak],
  )

  const restart = useCallback(() => {
    setPhase("start")
  }, [])

  const toggleMuted = useCallback(() => setMuted((m) => !m), [])

  const accuracy = useMemo(() => {
    if (history.length === 0) return 0
    const correctCount = history.filter((h) => h.correct).length
    return Math.round((correctCount / history.length) * 100)
  }, [history])

  return {
    phase,
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: TOTAL_QUESTIONS,
    score,
    streak,
    bestStreak,
    mistakes,
    maxMistakes: MAX_MISTAKES,
    history,
    accuracy,
    muted,
    lastResult,
    start,
    decide,
    restart,
    toggleMuted,
    play,
  }
}
