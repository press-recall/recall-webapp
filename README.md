# Recall 🧠

**Recall** is a fast-paced brain-teasing puzzle game that tests your **memory, attention, and reaction time**.

The rules are simple:

> **Read the instruction. Remember what happened before. Decide whether to press.**

But as the game progresses, remembering the previous rounds becomes increasingly difficult.

## 🎮 How It Works

Each round presents a single instruction on a large button.

For example:

```text
PRESS
```

You should press the button.

Then:

```text
DO NOT PRESS
```

You should leave the button untouched.

But things become more interesting:

```text
SAME AS LAST
```

Now you need to remember the previous round.

If the previous instruction was `DO NOT PRESS`, you should not press.

Another round might say:

```text
OPPOSITE OF LAST
```

If the previous action was `DO NOT PRESS`, you need to press.

The game gradually introduces more complex memory rules.

### Example

```text
Round 1
PRESS
→ Press

Round 2
DO NOT PRESS
→ Don't press

Round 3
SAME AS LAST
→ Don't press

Round 4
OPPOSITE OF LAST
→ Press

Round 5
SAME AS 2 AGO
→ Recall the instruction from two rounds ago
```

Your ability to remember previous rounds is the key to surviving.

---

## 🧩 Features

* 🧠 Memory-based gameplay
* ⚡ Fast decision making
* ⏱️ Time-limited rounds
* 🔄 Dynamic instruction sequences
* 🔥 Streak and scoring system
* 📈 Increasing difficulty
* 📱 Responsive design
* 🎨 Minimal and focused UI
* 🎯 Multiple memory-based rules
* 🔁 Replayable gameplay

## 📜 Instruction Types

The game currently supports concepts such as:

| Instruction         | Meaning                                 |
| ------------------- | --------------------------------------- |
| `PRESS`             | Press the button                        |
| `DO NOT PRESS`      | Don't press the button                  |
| `SAME AS LAST`      | Repeat the previous action              |
| `OPPOSITE OF LAST`  | Do the opposite of the previous action  |
| `SAME AS 2 AGO`     | Repeat the action from two rounds ago   |
| `OPPOSITE OF 2 AGO` | Do the opposite of two rounds ago       |
| `SAME AS 3 AGO`     | Repeat the action from three rounds ago |
| `OPPOSITE OF 3 AGO` | Do the opposite of three rounds ago     |

More complex rules can be added as the game evolves.

---

## 🛠️ Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**

The game currently runs entirely on the client side.

No authentication or database is required.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js 18+
* npm, pnpm, or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/recall.git
cd recall
```

Install dependencies:

```bash
pnpm install
```

Or:

```bash
npm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Or:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🏗️ Project Structure

A simplified structure:

```text
recall/
├── app/
│   ├── page.tsx
│   └── ...
├── components/
│   ├── game.tsx
│   ├── start-screen.tsx
│   ├── question.tsx
│   ├── timer.tsx
│   ├── score.tsx
│   └── game-over.tsx
├── lib/
│   ├── game-engine.ts
│   ├── questions.ts
│   └── types.ts
├── public/
└── README.md
```

The game logic is kept separate from the UI so that new puzzle rules can be added easily.

---

## 🧠 Game Philosophy

**Recall** is intentionally simple.

There are no complicated controls.

There are no long instructions.

There is only one question:

> **Should I press?**

The challenge comes from remembering what happened before.

As the rounds become faster and the instructions become more complex, the player has to rely on their working memory and attention.

The goal is to create that moment of:

> *"Wait... what was the last one?"*

---

## 🔮 Future Ideas

Possible future features include:

* Global leaderboards
* Daily challenges
* Different game modes
* Difficulty levels
* Multiplayer mode
* More complex memory rules
* Custom challenge creation
* Sound effects and haptic feedback
* Personal statistics
* Achievements
* Mobile app version

---

## 🤝 Contributing

Contributions are welcome.

If you have an idea for a new rule, game mode, or improvement:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-rule
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add new memory rule"
```

5. Push the branch

```bash
git push origin feature/new-rule
```

6. Open a Pull Request

---

## 📄 License

This project is open source and available under the **MIT License**.

---

<p align="center">
  <strong>Recall</strong><br>
  <em>Read. Remember. Decide.</em>
</p>
