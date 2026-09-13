"use client"

import { motion } from "framer-motion"
import type { AnsweredQuestion } from "@/lib/game/types"

interface GameWinProps {
    score: number
    accuracy: number
    bestStreak: number
    questionsAnswered: number
    totalQuestions: number
    history: AnsweredQuestion[]
    onPlayAgain: () => void
    onMainMenu: () => void
}

export function GameWin({
    score,
    accuracy,
    bestStreak,
    questionsAnswered,
    totalQuestions,
    history,
    onPlayAgain,
    onMainMenu,
}: GameWinProps) {
    return (
        <motion.div
            key="gamewin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-dvh w-full flex-col items-center justify-center px-6 py-16 text-center"
        >
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground">Recall</p>

            <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mt-6 border-2 border-primary px-4 py-1.5"
            >
                <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary">Perfect Recall</span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 font-serif text-4xl italic text-primary sm:text-5xl"
            >
                You remembered.
            </motion.h2>

            <div className="mt-12 grid w-full max-w-sm grid-cols-2 gap-x-8 gap-y-8">
                <Stat label="Score" value={score.toLocaleString()} large />
                <Stat label="Accuracy" value={`${accuracy}%`} large />
                <Stat label="Best Streak" value={String(bestStreak)} />
                <Stat label="Rounds" value={`${questionsAnswered} / ${totalQuestions}`} />
            </div>

            <RunRecap history={history} />

            <div className="mt-10 flex w-full max-w-xs flex-col gap-3">
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

function RunRecap({ history }: { history: AnsweredQuestion[] }) {
    if (history.length === 0) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 w-full max-w-sm"
        >
            <p className="text-left text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Run Recap</p>
            <ol className="mt-3 max-h-64 w-full overflow-y-auto border border-border/60 text-left">
                {history.map((entry, i) => (
                    <li
                        key={entry.question.id}
                        className={
                            i === 0
                                ? "flex items-center justify-between gap-3 px-4 py-2.5"
                                : "flex items-center justify-between gap-3 border-t border-border/60 px-4 py-2.5"
                        }
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <span className="w-6 shrink-0 font-mono text-[10px] text-muted-foreground">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="truncate font-mono text-xs uppercase tracking-wide text-foreground">
                                {entry.question.text}
                            </span>
                        </div>
                        <span
                            className={
                                entry.correct
                                    ? "shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-primary"
                                    : "shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-destructive"
                            }
                        >
                            {entry.decision === "timeout" ? "Waited" : "Pressed"}
                        </span>
                    </li>
                ))}
            </ol>
        </motion.div>
    )
}
