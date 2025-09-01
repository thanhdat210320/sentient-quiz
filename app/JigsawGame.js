import React, { useState, useEffect } from "react";
import logo from "../app/images/sentient-logo.jpg";
import cet from "../app/images/cetificate.png"

const QUESTIONS = [
  {
    id: 1,
    q: "What is the core mission of Sentient (The Open AGI Foundation)?",
    options: [
      "Build a closed, proprietary AGI for enterprise only",
      "Ensure AGI is open, decentralized, and community-controlled",
      "Create a social network for AI influencers",
      "Focus solely on robotics hardware"
    ],
    answer: 1,
    explain:
      "Sentient is a nonprofit aiming to keep AGI open-source, decentralized, and aligned with community ownership and control."
  },
  {
    id: 2,
    q: "How much seed funding did Sentient announce?",
    options: ["$15M", "$50M", "$85M", "$250M"],
    answer: 2,
    explain: "$85M seed round, co-led by Founders Fund alongside other investors."
  },
  {
    id: 3,
    q: "Which firm co-led Sentient's seed round?",
    options: ["Andreessen Horowitz", "Founders Fund", "Sequoia Capital", "Paradigm"],
    answer: 1,
    explain: "Founders Fund (Peter Thiel) co-led the seed round."
  },
  {
    id: 4,
    q: "What does Sentient call models that are aligned to serve the community?",
    options: ["General Models", "Sovereign Models", "Loyal Models", "Guardian Models"],
    answer: 2,
    explain: "Sentient uses the term 'Loyal Models' for community-serving AI models."
  },
  {
    id: 5,
    q: "Which key research idea helps prove model ownership on Sentient?",
    options: ["Quantization", "Pruning", "Fingerprinting", "Distillation"],
    answer: 2,
    explain:
      "Fingerprinting embeds verifiable signatures so owners can prove provenance and usage even when models are copied or merged."
  },
  {
    id: 6,
    q: "OML in Sentient's context most closely relates to…",
    options: [
      "Open, Monetizable, Loyal",
      "Object Markup Language",
      "Operator Machine Learning",
      "Open Model Ledger"
    ],
    answer: 0,
    explain: "OML is framed as Open, Monetizable, Loyal."
  },
  {
    id: 7,
    q: "What is The GRID?",
    options: [
      "A centralized app store for closed models",
      "An open AGI network where agents, tools, and models interoperate",
      "A blockchain L1 for payments only",
      "A hardware accelerator initiative"
    ],
    answer: 1,
    explain:
      "The GRID is Sentient's open network where community-built agents, data sources, and models connect and monetize."
  },
  {
    id: 8,
    q: "Which user-facing interface lets people use multiple agents on Sentient?",
    options: ["Sentient Chat", "AgentHub", "OpenAI Studio", "ModelForge"],
    answer: 0,
    explain: "Sentient Chat provides a UI to compose and route tasks across agents."
  },
  {
    id: 9,
    q: "A planned role of the Sentient Protocol v1 is to…",
    options: [
      "Mint NFTs for every prompt",
      "Track usage and revenue for fingerprinted models via smart contracts",
      "Replace all cloud providers",
      "Handle only model quantization"
    ],
    answer: 1,
    explain:
      "Protocol v1 is described to represent models on-chain and program revenue-sharing and verification."
  },
  {
    id: 10,
    q: "Which statement about Sentient's governance/ethos is MOST accurate?",
    options: [
      "It aims to concentrate control of AGI in one corporation",
      "It positions AGI as a community-owned public good",
      "It excludes open-source contributions",
      "It focuses only on Web2 SaaS"
    ],
    answer: 1,
    explain:
      "Sentient frames AGI as a public, community-aligned resource rather than a closed corporate asset."
  },
  {
    id: 11,
    q: "Which launch (reported in 2025) showcases Sentient's open network push?",
    options: [
      "The GRID launch with dozens of agents and data sources",
      "A private enterprise-only beta with NDAs",
      "A new hardware chip",
      "A centralized AI API with no open-source"
    ],
    answer: 0,
    explain: "News in 2025 highlighted The GRID unveiling with many community agents and integrations."
  },
  {
    id: 12,
    q: "Why is model fingerprinting valuable in open ecosystems?",
    options: [
      "It reduces training time by 90%",
      "It enables verifiable provenance and fair payouts even if models are shared",
      "It compresses models for mobile",
      "It blocks all copying entirely"
    ],
    answer: 1,
    explain:
      "Fingerprinting allows provenance/usage checks and supports revenue-sharing—critical when models are widely reused."
  }
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-2 bg-indigo-500 transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  );
}

function useCountdown(seconds, isRunning, onComplete) {
  const [time, setTime] = useState(seconds);
  useEffect(() => {
    if (!isRunning) return;
    setTime(seconds);
  }, [seconds, isRunning]);
  useEffect(() => {
    if (!isRunning) return;
    if (time <= 0) {
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setTime((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [time, isRunning, onComplete]);
  return time;
}

function Option({ label, chosen, correct, disabled, onClick, reveal }) {
  const base =
    "w-full text-left p-4 rounded-2xl border transition active:scale-[0.99] focus:outline-none focus:ring-2";
  const state = !reveal
    ? "border-gray-200 hover:border-indigo-400"
    : correct
    ? "border-green-500 bg-green-50"
    : chosen
    ? "border-red-500 bg-red-50"
    : "border-gray-200 opacity-70";
  return (
    <button
      className={`${base} ${state}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl shadow-sm border bg-white ${className}`}>{children}</div>;
}


export default function SentientQuizApp() {
  // Build shuffled question list; keep original QUESTIONS intact
  const [shuffledQs, setShuffledQs] = useState(() =>
    QUESTIONS.length > 0
      ? shuffleArray(
          QUESTIONS.map((q) => ({
            ...q,
            options: shuffleArray(q.options),
          }))
        )
      : []
  );

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [reveal, setReveal] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [finished, setFinished] = useState(false);
  const [perQuestionTime, setPerQuestionTime] = useState(45);
  const [timerOn, setTimerOn] = useState(false);

  const total = shuffledQs.length;

  // 👉 Hook phải luôn được gọi, kể cả khi không có câu hỏi
  const time = useCountdown(
    perQuestionTime,
    timerOn && !reveal && !reviewMode,
    () => setReveal(true)
  );

  // Nếu không có câu hỏi, render fallback
  if (total === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 md:p-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <header className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl text-white grid place-items-center font-bold"></div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Sentient – Multiple Choice Quiz
              </h1>
              <p className="text-sm text-gray-600">
                No questions available. Please add questions to the QUESTIONS
                array.
              </p>
            </div>
          </header>

          <Card className="p-6 text-center">
            <p className="text-gray-600">
              Không có câu hỏi để hiển thị. Hãy kiểm tra lại danh sách QUESTIONS.
            </p>
          </Card>

          <footer className="text-center text-xs text-gray-500 pb-4">
            Built for learning about Sentient • React + Tailwind •{" "}
            {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    );
  }

  const current = shuffledQs[idx] ?? null;

  const findOriginal = (id) => QUESTIONS.find((q) => q.id === id) || null;

  // 👉 Tính correctIndex trực tiếp
  let correctIndex = -1;
  if (current) {
    const orig = findOriginal(current.id);
    if (orig) {
      const originalCorrectLabel = orig.options?.[orig.answer];
      if (originalCorrectLabel !== undefined) {
        correctIndex = current.options.findIndex(
          (o) => o === originalCorrectLabel
        );
      }
    }
  }

  const progress = Math.round(((idx + 1) / total) * 100);

  const select = (i) => {
    if (!current) return;
    if (reveal || reviewMode) return;
    setAnswers((a) => ({ ...a, [current.id]: i }));
  };

  const next = () => {
    if (idx < total - 1) {
      setIdx(idx + 1);
      setReveal(false);
    } else {
      setReviewMode(true);
      setFinished(true);
    }
  };

  const prev = () => idx > 0 && setIdx(idx - 1);

  const check = () => setReveal(true);

  const reset = () => {
    setShuffledQs(
      shuffleArray(
        QUESTIONS.map((q) => ({ ...q, options: shuffleArray(q.options) }))
      )
    );
    setIdx(0);
    setAnswers({});
    setReveal(false);
    setReviewMode(false);
    setFinished(false);
  };

  // 👉 Tính score trực tiếp
  let score = 0;
  shuffledQs.forEach((q) => {
    const a = answers[q.id];
    if (a === undefined) return;
    const orig = findOriginal(q.id);
    if (!orig) return;
    const originalCorrectLabel = orig.options?.[orig.answer];
    if (originalCorrectLabel === undefined) return;
    const correctIdx = q.options.findIndex((o) => o === originalCorrectLabel);
    if (a === correctIdx) score++;
  });


  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <header className="flex items-center gap-3 items-centerr justify-center">
          <div className="">
            <img
              src={logo.src}
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
              alt="logo"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-3xl font-bold">
              Sentient – Multiple Choice Quiz
            </h1>
            <p className="text-sm text-gray-600">
              Learn the essentials: mission, funding, The GRID, OML,
              fingerprinting, and protocol.
            </p>
          </div>
        </header>

        {!finished ? (
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <ProgressBar value={progress} />
              <span className="text-sm text-gray-600 w-16 text-right">
                {idx + 1}/{total}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 justify-between mb-2">
              <div className="text-xs text-gray-500">
                Score: {score}/{total}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <label className="flex items-center gap-2">
                  <span>Timer</span>
                  <input
                    type="checkbox"
                    className="accent-indigo-600"
                    checked={timerOn}
                    onChange={(e) => setTimerOn(e.target.checked)}
                  />
                </label>
                <select
                  className="border rounded-xl px-2 py-1"
                  value={perQuestionTime}
                  onChange={(e) => setPerQuestionTime(Number(e.target.value))}
                  disabled={reviewMode}
                >
                  {[30, 45, 60, 90].map((s) => (
                    <option key={s} value={s}>
                      {s}s
                    </option>
                  ))}
                </select>
                {timerOn && !reviewMode && (
                  <span className="font-mono tabular-nums">{time}s</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold">
                {current?.q ?? "(No question)"}
              </h2>

              <div className="grid gap-3">
                {(current?.options ?? []).map((opt, i) => (
                  <Option
                    key={i}
                    label={`${"ABCD"[i] ?? String.fromCharCode(65 + i)}. ${opt}`}
                    chosen={answers[current.id] === i}
                    correct={i === correctIndex}
                    disabled={reviewMode}
                    reveal={reveal || reviewMode}
                    onClick={() => select(i)}
                  />
                ))}
              </div>

              {(reveal || reviewMode) && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-sm text-indigo-900">
                  <strong>Explanation: </strong>
                  {findOriginal(current.id)?.explain ??
                    "(No explanation available)"}
                </div>
              )}

              <div className="flex flex-wrap gap-2 justify-between pt-2">
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-xl border hover:bg-gray-50"
                    onClick={prev}
                    disabled={idx === 0}
                  >
                    Previous
                  </button>
                  {!reveal && !reviewMode && (
                    <button
                      className="px-4 py-2 rounded-xl border border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                      onClick={check}
                      disabled={answers[current.id] === undefined}
                    >
                      Check answer
                    </button>
                  )}
                  {(reveal || reviewMode) && (
                    <button
                      className="px-4 py-2 rounded-xl border border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                      onClick={next}
                    >
                      {idx < total - 1 ? "Next" : "Finish"}
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-xl border hover:bg-gray-50"
                    onClick={reset}
                  >
                    Reset quiz
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">🎉 Congratulations to you! 🎉</h2>
            <p className="text-lg text-gray-700 mb-4">
              You have completed the challenge with {score}/{total} correct answers. 🎯👏
            </p>
            {score >= 10 ? (
              <img src={cet.src} className="h-100 w-100 " alt="cet" />
            ) : (
              <p className="text-gray-600">
                You’ve got some of the information right — try again to achieve an even higher score! 
              </p>
            )}
            <div className="mt-6">
              <button
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                onClick={reset}
              >
                Retake the quiz
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

