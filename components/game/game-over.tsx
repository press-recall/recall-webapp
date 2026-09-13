"use client"

import { motion } from "framer-motion"

interface GameOverProps {
  score: number
  accuracy: number
  bestStreak: number
  questionsAnswered: number
  totalQuestions: number
  onPlayAgain: () => void
  onMainMenu: () => void
}

export function GameOver({
  score,
  accuracy,
  bestStreak,
  questionsAnswered,
  totalQuestions,
  onPlayAgain,
  onMainMenu,
}: GameOverProps) {
  return (
    <motion.div
      key="gameover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-dvh w-full flex-col items-center justify-center px-6 py-16 text-center"
    >
      <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">Recall</p>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 font-serif text-4xl italic text-destructive sm:text-5xl"
      >
        You forgot.
      </motion.h2>

      <div className="mt-12 grid w-full max-w-sm grid-cols-2 gap-x-8 gap-y-8">
        <Stat label="Score" value={score.toLocaleString()} large />
        <Stat label="Accuracy" value={`${accuracy}%`} large />
        <Stat label="Best Streak" value={String(bestStreak)} />
        <Stat label="Rounds" value={`${questionsAnswered} / ${totalQuestions}`} />
      </div>

      <div className="mt-14 flex w-full max-w-xs flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPlayAgain}
          className="w-full border border-primary/60 bg-transparent px-8 py-4 text-sm font-mono uppercase tracking-[0.3em] text-primary transition-colors hover:bg-primary/10"
        >
          Play Again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onMainMenu}
          className="w-full px-8 py-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Main Menu
        </motion.button>
      </div>
    </motion.div>
  )
}

function Stat({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <span className={large ? "font-serif text-3xl text-foreground" : "font-mono text-xl text-foreground"}>
        {value}
      </span>
    </div>
  )
}
