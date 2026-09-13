"use client"

import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

interface ScoreProps {
  value: number
}

export function Score({ value }: ScoreProps) {
  const spring = useSpring(value, { stiffness: 120, damping: 20, mass: 0.6 })
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString())

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <div className="flex flex-col items-center gap-1 sm:items-start">
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Score</span>
      <motion.span className="font-mono text-lg tabular-nums text-foreground sm:text-xl">{rounded}</motion.span>
    </div>
  )
}
