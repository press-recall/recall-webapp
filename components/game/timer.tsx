"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimerProps {
  timeRemaining: number
  timeLimit: number
}

export function Timer({ timeRemaining, timeLimit }: TimerProps) {
  const urgent = timeRemaining <= Math.min(2, timeLimit * 0.3)
  const fraction = Math.max(0, Math.min(1, timeRemaining / timeLimit))

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.span
        animate={urgent ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={urgent ? { duration: 0.5, repeat: Number.POSITIVE_INFINITY } : {}}
        className={cn(
          "font-mono text-4xl tabular-nums tracking-tight sm:text-5xl",
          urgent ? "text-destructive" : "text-foreground",
        )}
        aria-live="off"
      >
        {timeRemaining.toFixed(1)}
        <span className="text-lg text-muted-foreground">s</span>
      </motion.span>
      <div className="h-px w-40 overflow-hidden bg-border">
        <motion.div
          className={cn("h-full", urgent ? "bg-destructive" : "bg-primary")}
          style={{ width: `${fraction * 100}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </div>
  )
}
