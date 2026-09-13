import type { InstructionKind, Question } from "./types"

export const INSTRUCTION_LABEL: Record<InstructionKind, string> = {
  press: "PRESS",
  "dont-press": "DO NOT PRESS",
  "quickly-dont-press": "QUICKLY, DON'T PRESS",
  "same-last": "SAME AS LAST",
  "opposite-last": "OPPOSITE OF LAST",
  "same-2-ago": "SAME AS 2 AGO",
  "opposite-2-ago": "OPPOSITE OF 2 AGO",
  "same-3-ago": "SAME AS 3 AGO",
  "opposite-3-ago": "OPPOSITE OF 3 AGO",
}

/**
 * How many rounds back each referencing instruction looks,
 * and whether it flips the result.
 */
const REFERENCE: Partial<
  Record<InstructionKind, { back: number; flip: boolean }>
> = {
  "same-last": {
    back: 1,
    flip: false,
  },

  "opposite-last": {
    back: 1,
    flip: true,
  },

  "same-2-ago": {
    back: 2,
    flip: false,
  },

  "opposite-2-ago": {
    back: 2,
    flip: true,
  },

  "same-3-ago": {
    back: 3,
    flip: false,
  },

  "opposite-3-ago": {
    back: 3,
    flip: true,
  },
}

/**
 * Difficulty of each instruction.
 */
const DIFFICULTY: Record<InstructionKind, number> = {
  press: 1,
  "dont-press": 1,
  "quickly-dont-press": 2,

  "same-last": 2,
  "opposite-last": 2,

  "same-2-ago": 3,
  "opposite-2-ago": 3,

  "same-3-ago": 4,
  "opposite-3-ago": 4,
}

/**
 * Seeded random number generator.
 *
 * Same seed = same sequence.
 */
function mulberry32(seed: number) {
  let a = seed

  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0

    let t = Math.imul(a ^ (a >>> 15), 1 | a)

    t =
      (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^
      t

    return (
      ((t ^ (t >>> 14)) >>> 0) /
      4294967296
    )
  }
}

/**
 * Returns the instructions available at a
 * particular round.
 *
 * The difficulty ramps up earlier than before,
 * but still gives the player time to learn the game.
 */
function poolForIndex(
  index: number,
): InstructionKind[] {
  // Rounds 1–3
  // Only basic actions.
  if (index < 3) {
    return [
      "press",
      "dont-press",
    ]
  }

  // Rounds 4–6
  // Introduce SAME/OPPOSITE LAST.
  if (index < 6) {
    return [
      "press",
      "dont-press",
      "same-last",
      "opposite-last",
    ]
  }

  // Rounds 7–10
  // Mostly difficulty 1–2,
  // with a small introduction of 2-back memory.
  if (index < 10) {
    return [
      "press",
      "dont-press",
      "same-last",
      "opposite-last",
      "same-2-ago",
    ]
  }

  // Rounds 11–14
  // Full 2-back mechanic.
  if (index < 14) {
    return [
      "press",
      "dont-press",
      "same-last",
      "opposite-last",
      "same-2-ago",
      "opposite-2-ago",
    ]
  }

  // Round 15+
  // Introduce 3-back gradually.
  return [
    "press",
    "dont-press",
    "same-last",
    "opposite-last",
    "same-2-ago",
    "opposite-2-ago",
    "same-3-ago",
  ]
}

/**
 * Calculates the time available for the player.
 *
 * The game gets gradually faster.
 *
 * The goal is:
 *
 * Early game:
 * ~4.4s
 *
 * Mid game:
 * ~3.5s
 *
 * Later game:
 * ~2.5s
 *
 * Harder reference instructions get a small
 * amount of extra time, but not too much.
 */
function timeLimitForIndex(
  index: number,
  kind: InstructionKind,
  rng: () => number,
): number {
  /**
   * Faster decay than the previous version.
   */
  const decay = Math.max(
    1.5,
    4.4 - index * 0.12,
  )

  /**
   * Memory instructions receive a small bonus.
   *
   * We intentionally keep this smaller than before
   * so the game remains challenging.
   */
  const referenceBonus = REFERENCE[kind]
    ? 0.25
    : 0

  /**
   * QUICKLY, DON'T PRESS gets a stronger penalty.
   */
  const quickPenalty =
    kind === "quickly-dont-press"
      ? 0.9
      : 0

  /**
   * Small timing variation.
   *
   * This prevents players from learning one exact
   * timing value.
   */
  const jitter =
    (rng() - 0.5) * 0.5

  const raw =
    decay +
    referenceBonus -
    quickPenalty +
    jitter

  /**
   * Never allow the game to become impossibly fast.
   */
  return Math.round(
    Math.max(1.2, raw) * 10,
  ) / 10
}

/**
 * Creates an explanation for the correct answer.
 */
function explanationFor(
  kind: InstructionKind,
  correctDecision: boolean,
  correctAnswerHistory: boolean[],
  index: number,
): string {
  const action = correctDecision
    ? "PRESS"
    : "DO NOT PRESS"

  const ref = REFERENCE[kind]

  /**
   * Direct instructions.
   */
  if (!ref) {
    return (
      `The instruction was ${INSTRUCTION_LABEL[kind]}. ` +
      `The correct action was to ${action}.`
    )
  }

  const refIndex =
    index - ref.back

  /**
   * Safety check.
   */
  if (
    refIndex < 0 ||
    refIndex >= correctAnswerHistory.length
  ) {
    return (
      `The instruction was ${INSTRUCTION_LABEL[kind]}. ` +
      `The correct action was to ${action}.`
    )
  }

  const referencedAnswer =
    correctAnswerHistory[refIndex]

  const referencedAction =
    referencedAnswer
      ? "PRESS"
      : "DO NOT PRESS"

  const agoLabel =
    ref.back === 1
      ? "last round"
      : `${ref.back} rounds ago`

  const operation = ref.flip
    ? "the opposite of"
    : "the same as"

  return (
    `${agoLabel[0].toUpperCase()}${agoLabel.slice(1)}, ` +
    `the correct action was ${referencedAction}. ` +
    `${INSTRUCTION_LABEL[kind]} means ${operation} that action. ` +
    `The correct action was ${action}.`
  )
}

/**
 * Generates the complete sequence of rounds.
 *
 * Reference instructions use the correct answers
 * from previous rounds.
 */
export function generateQuestionSequence(
  count: number,
  seed: number = Date.now(),
): Question[] {
  const rng = mulberry32(seed)

  const questions: Question[] = []

  /**
   * Ground-truth answer history.
   *
   * true  = PRESS
   * false = DO NOT PRESS
   */
  const correctAnswerHistory: boolean[] = []

  for (let i = 0; i < count; i++) {
    const id = i + 1

    /**
     * Get available instructions.
     */
    const pool = poolForIndex(i)

    /**
     * Select an instruction.
     */
    const kind =
      pool[
        Math.floor(
          rng() * pool.length,
        )
      ]

    let correctDecision: boolean

    const ref = REFERENCE[kind]

    /**
     * Memory/reference instruction.
     */
    if (
      ref &&
      i - ref.back >= 0
    ) {
      const referencedAnswer =
        correctAnswerHistory[
          i - ref.back
        ]

      correctDecision = ref.flip
        ? !referencedAnswer
        : referencedAnswer
    }

    /**
     * PRESS.
     */
    else if (kind === "press") {
      correctDecision = true
    }

    /**
     * DON'T PRESS.
     */
    else if (
      kind === "dont-press" ||
      kind === "quickly-dont-press"
    ) {
      correctDecision = false
    }

    /**
     * Safety fallback.
     */
    else {
      correctDecision =
        rng() < 0.5
    }

    /**
     * Save the correct answer so future
     * memory instructions can reference it.
     */
    correctAnswerHistory.push(
      correctDecision,
    )

    const difficulty =
      DIFFICULTY[kind]

    const timeLimit =
      timeLimitForIndex(
        i,
        kind,
        rng,
      )

    const explanation =
      explanationFor(
        kind,
        correctDecision,
        correctAnswerHistory,
        i,
      )

    questions.push({
      id,
      text: INSTRUCTION_LABEL[kind],
      kind,
      correctDecision,
      difficulty,
      timeLimit,
      explanation,
    })
  }

  return questions
}
