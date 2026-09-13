"use client"

import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InstructionButtonProps {
  text: string
  questionKey: number
  onClick: () => void
  disabled?: boolean
  shake?: boolean
}

export function DecisionButton({ text, questionKey, onClick, disabled, shake }: InstructionButtonProps) {
  const long = text.length > 12

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={cn(
        "relative flex aspect-square w-full max-w-64 select-none flex-col items-center justify-center rounded-2xl border-2 border-primary/50 bg-card px-4 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.2)] transition-colors sm:max-w-72",
        !disabled && "hover:border-primary hover:bg-secondary",
        disabled && "pointer-events-none opacity-60",
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={questionKey}
          initial={{ opacity: 0, y: 8 }}
          animate={
            shake
              ? { opacity: 1, y: 0, x: [0, -8, 8, -6, 6, 0] }
              : { opacity: 1, y: 0, x: 0 }
          }
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: shake ? 0.4 : 0.4, ease: "easeOut" }}
          className={cn(
            "text-balance font-serif font-semibold uppercase leading-tight tracking-wide text-foreground",
            long ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl",
          )}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
