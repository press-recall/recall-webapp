"use client"

import { motion } from "framer-motion"
import RecallLogo from "../ui/logo"

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-dvh w-full flex-col items-center justify-center px-6 py-16 text-center"
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.35em" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-xs font-mono uppercase text-muted-foreground"
      >
        A Memory Experiment
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-6 font-serif text-6xl italic tracking-tight text-foreground sm:text-8xl flex"
      >
        Recall
      </motion.h1>

      <motion.div>
        <RecallLogo className=" top-0 relative" size={100} />
      </motion.div>

      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-8 max-w-sm font-serif text-xl text-foreground/90 sm:text-2xl"
      >
        One button. Read the instruction. Remember the last one.
      </motion.p> */}

      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground"
      >
        Sometimes it says PRESS. Sometimes SAME AS LAST, or OPPOSITE OF 2 AGO. Not clicking counts too &mdash;
        leave it untouched when it says don&apos;t press.
      </motion.p> */}

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-14 w-40 h-40 border rounded-full border-primary/60 bg-transparent px-8 py-4 text-xl font-mono uppercase tracking-[0.3em] text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Play
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="mt-16 text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70"
      >
        Press, or don&apos;t.
      </motion.p>
    </motion.div>
  )
}
