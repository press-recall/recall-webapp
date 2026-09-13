"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FeedbackProps {
  correct: boolean
  pointsAwarded: number
  explanation: string
  streak: number
}

export function Feedback({ correct, pointsAwarded, explanation, streak }: FeedbackProps) {
  return (
    <motion.div
      role="status"
      aria-live="assertive"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-col items-center gap-3 text-center"
    >
      <span
        className={cn(
          "font-mono text-sm uppercase tracking-[0.35em]",
          correct ? "text-primary" : "text-destructive",
        )}
      >
        {correct ? "Correct" : "Incorrect"}
      </span>

      {correct ? (
        <div className="flex flex-col items-center gap-1">
          <span className="font-serif text-3xl text-foreground">+{pointsAwarded}</span>
          {streak > 1 && (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {"\u00d7"}
              {streak} streak
            </span>
          )}
        </div>
      ) : (
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{explanation}</p>
      )}
    </motion.div>
  )
}
