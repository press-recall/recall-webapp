export type InstructionKind =
  | "press"
  | "dont-press"
  | "quickly-dont-press"
  | "same-last"
  | "opposite-last"
  | "same-2-ago"
  | "opposite-2-ago"
  | "same-3-ago"
  | "opposite-3-ago"

export interface Question {
  id: number
  /** The instruction text shown on the button, e.g. "PRESS", "SAME AS LAST". */
  text: string
  kind: InstructionKind
  /** Whether the correct action for this round is to press the button. */
  correctDecision: boolean
  difficulty: number
  timeLimit: number
  /** Shown when the player answers incorrectly. */
  explanation: string
}

/** "press" = the player clicked the button. "timeout" = the player left it untouched. */
export type PlayerDecision = "press" | "timeout"

export interface AnsweredQuestion {
  question: Question
  decision: PlayerDecision
  correct: boolean
  timeRemaining: number
  pointsAwarded: number
}

export type GamePhase = "start" | "playing" | "feedback" | "gameover"
