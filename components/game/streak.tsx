"use client"

import { cn } from "@/lib/utils"

interface StreakProps {
  value: number
}

export function Streak({ value }: StreakProps) {
  return (
    <div className="flex flex-col items-center gap-1 sm:items-end">
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Streak</span>
      <span className={cn("font-mono text-lg tabular-nums sm:text-xl", value >= 3 ? "text-primary" : "text-foreground")}>
        {value}
      </span>
    </div>
  )
}
