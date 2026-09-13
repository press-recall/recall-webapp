"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRecallGame } from "@/hooks/use-recall-game"
import { sound } from "@/lib/game/sound"
import { StartScreen } from "./start-screen"
import { GameOver } from "./game-over"
import { GameWin } from "./game-win"
import { Header } from "./header"
import { Timer } from "./timer"
import { DecisionButton } from "./decision-button"
import { Feedback } from "./feedback"

export function Game() {
  const {
    phase,
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    streak,
    mistakes,
    maxMistakes,
    bestStreak,
    history,
    accuracy,
    muted,
    lastResult,
    won,
    start,
    decide,
    restart,
    toggleMuted,
    play,
  } = useRecallGame()

  const [timeRemaining, setTimeRemaining] = useState(0)
  const warnedRef = useRef(false)

  useEffect(() => {
    if (phase !== "playing" || !currentQuestion) return
    setTimeRemaining(currentQuestion.timeLimit)
    warnedRef.current = false
    play(sound.question)

    const id = setInterval(() => {
      setTimeRemaining((prev) => {
        const next = Math.round((prev - 0.1) * 10) / 10
        if (next <= 2 && next > 0 && !warnedRef.current) {
          warnedRef.current = true
          play(sound.warning)
        }
        if (next <= 0) {
          clearInterval(id)
          decide("timeout", 0)
          return 0
        }
        return next
      })
    }, 100)

    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion?.id, phase])

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {phase === "start" && <StartScreen key="start" onStart={start} />}

        {(phase === "playing" || phase === "feedback") && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex min-h-dvh flex-col"
          >
            <Header
              roundNumber={currentIndex + 1}
              totalRounds={totalQuestions}
              score={score}
              streak={streak}
              muted={muted}
              onToggleMuted={toggleMuted}
            />

            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-6 sm:gap-8">
              <div className="flex w-full items-center justify-center">
                <AnimatePresence mode="wait">
                  {phase === "playing" ? (
                    <DecisionButton
                      key="btn"
                      text={currentQuestion.text}
                      questionKey={currentQuestion.id}
                      disabled={false}
                      onClick={() => decide("press", timeRemaining)}
                    />
                  ) : (
                    lastResult && (
                      <motion.div
                        key="feedback-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex aspect-square w-full max-w-64 flex-col items-center justify-center rounded-2xl border-2 border-border bg-card px-6 sm:max-w-72"
                      >
                        <Feedback
                          correct={lastResult.correct}
                          pointsAwarded={lastResult.pointsAwarded}
                          explanation={lastResult.question.explanation}
                          streak={lastResult.streakAfter}
                        />
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </div>

              {phase === "playing" && <Timer timeRemaining={timeRemaining} timeLimit={currentQuestion.timeLimit} />}
            </div>

            <footer className="flex items-center justify-center gap-1.5 pb-6 sm:pb-8">
              {Array.from({ length: maxMistakes }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < mistakes
                      ? "h-1.5 w-1.5 rounded-full bg-destructive"
                      : "h-1.5 w-1.5 rounded-full bg-border"
                  }
                  aria-hidden="true"
                />
              ))}
              <span className="sr-only">
                {mistakes} of {maxMistakes} mistakes made
              </span>
            </footer>
          </motion.div>
        )}

        {phase === "gameover" && won && (
          <GameWin
            key="gamewin"
            score={score}
            accuracy={accuracy}
            bestStreak={bestStreak}
            questionsAnswered={history.length}
            totalQuestions={totalQuestions}
            onPlayAgain={start}
            onMainMenu={restart}
          />
        )}

        {phase === "gameover" && !won && (
          <GameOver
            key="gameover"
            score={score}
            accuracy={accuracy}
            bestStreak={bestStreak}
            questionsAnswered={history.length}
            totalQuestions={totalQuestions}
            onPlayAgain={start}
            onMainMenu={restart}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
