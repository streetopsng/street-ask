"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface SurveyAnswers {
  [questionId: number]: any;
}

interface Question {
  id: number;
  question: string;
  section?: number;
  options?: any[];
  type: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "In your honest opinion, how common is romantic attraction between colleagues in Nigerian workplaces?",
    section: 1,
    options: [
      { letter: "A", emoji: "❤️", text: "Very common — it happens everywhere" },
      {
        letter: "B",
        emoji: "🔥",
        text: "Fairly common — more than people admit",
      },
      { letter: "C", emoji: "🤫", text: "It happens but people keep it quiet" },
      {
        letter: "D",
        emoji: "💼",
        text: "Rare — most people are professional about it",
      },
      { letter: "E", emoji: "🤷", text: "I genuinely don't know" },
    ],
    type: "single answer",
  },
  {
    id: 2,
    question:
      "Have you ever had romantic feelings for someone you worked with?",
    section: 1,
    options: [
      { letter: "A", emoji: "💕", text: "Yes, and I acted on it" },
      { letter: "B", emoji: "🤐", text: "Yes, but I kept it to myself" },
      { letter: "C", emoji: "❌", text: "No, never" },
      { letter: "D", emoji: "🤔", text: "I'm not sure — maybe" },
    ],
    type: "single answer",
  },
  {
    id: 3,
    question:
      "At your current or most recent workplace, how many people do you know of who were or are romantically involved with a colleague?",
    section: 1,
    options: [
      { letter: "A", emoji: "0️⃣", text: "None that I know of" },
      { letter: "B", emoji: "1️⃣", text: "One or two people" },
      {
        letter: "C",
        emoji: "🔓",
        text: "A lot — it's practically an open secret",
      },
      { letter: "D", emoji: "🤫", text: "I'd rather not say" },
    ],
    type: "single answer",
  },
  {
    id: 5,
    question: "Have you ever been in a romantic relationship with a colleague?",
    section: 2,
    options: [
      {
        letter: "A",
        emoji: "💔",
        text: "Yes, but it started after one of us left",
      },
      {
        letter: "B",
        emoji: "💑",
        text: "Yes, while we were at the same company",
      },
      { letter: "C", emoji: "🏃", text: "No, but it came close" },
      { letter: "D", emoji: "🚫", text: "No, never" },
    ],
    type: "single answer",
  },
  {
    id: 6,
    question: "How did it start? Select all that apply.",
    section: 2,
    options: [
      {
        letter: "A",
        emoji: "📋",
        text: "Working closely together on a project",
      },
      { letter: "B", emoji: "🍻", text: "After-work drinks or a team event" },
      {
        letter: "C",
        emoji: "💬",
        text: "WhatsApp or DM conversations that shifted",
      },
      { letter: "D", emoji: "👀", text: "It was obvious from day one" },
      { letter: "E", emoji: "💪", text: "One person made a move" },
      {
        letter: "F",
        emoji: "🌀",
        text: "It just happened gradually — no clear moment",
      },
      { letter: "G", emoji: "🤐", text: "Prefer not to say" },
    ],
    type: "multiple answer",
  },
  {
    id: 7,
    question:
      "Was the relationship between people at the same level, or was one person senior to the other?",
    section: 2,
    options: [
      { letter: "A", emoji: "🤝", text: "Same level" },
      { letter: "B", emoji: "⬆️", text: "One person was more senior" },
      {
        letter: "C",
        emoji: "📊",
        text: "Significant seniority gap — manager and direct report",
      },
      { letter: "D", emoji: "❓", text: "Not applicable" },
      { letter: "E", emoji: "🤐", text: "Prefer not to say" },
    ],
    type: "single answer",
  },
  {
    id: 8,
    question: "Did anyone at work find out?",
    section: 2,
    options: [
      { letter: "A", emoji: "👥", text: "Yes — most people knew" },
      { letter: "B", emoji: "👤", text: "Yes — a few people knew" },
      { letter: "C", emoji: "🔍", text: "Only one or two people" },
      { letter: "D", emoji: "🔒", text: "No — it was completely private" },
      { letter: "E", emoji: "🤐", text: "Prefer not to say" },
    ],
    type: "single answer",
  },
  {
    id: 10,
    question:
      "In your experience or observation, what tends to happen to work performance when two colleagues are romantically involved?",
    section: 3,
    options: [
      {
        letter: "A",
        emoji: "📈",
        text: "Performance improves — they work harder and better together",
      },
      {
        letter: "B",
        emoji: "➡️",
        text: "No real change — they keep it professional",
      },
      {
        letter: "C",
        emoji: "🎲",
        text: "It depends entirely on how they handle it",
      },
      {
        letter: "D",
        emoji: "📉",
        text: "Performance drops — the distraction is real",
      },
      {
        letter: "E",
        emoji: "💥",
        text: "It creates problems for the whole team, not just them",
      },
    ],
    type: "single answer",
  },
  {
    id: 11,
    question:
      "Have you ever felt uncomfortable at work because of a romantic situation involving your colleagues — not yourself?",
    section: 3,
    options: [
      {
        letter: "A",
        emoji: "😰",
        text: "Yes, significantly — it affected the team dynamic",
      },
      {
        letter: "B",
        emoji: "😬",
        text: "Yes, mildly — it was awkward but manageable",
      },
      { letter: "C", emoji: "😐", text: "Not really — I stayed out of it" },
      { letter: "D", emoji: "😌", text: "No, never" },
    ],
    type: "single answer",
  },
  {
    id: 12,
    question:
      "If a romantic relationship between two colleagues ended badly, what usually happens?",
    section: 3,
    options: [
      {
        letter: "A",
        emoji: "🚪",
        text: "One person leaves the company eventually",
      },
      {
        letter: "B",
        emoji: "🤝",
        text: "They manage to stay professional — it's awkward but it works",
      },
      { letter: "C", emoji: "💔", text: "The whole team feels it for months" },
      {
        letter: "D",
        emoji: "⚖️",
        text: "It depends on the seniority of the people involved",
      },
      { letter: "E", emoji: "👀", text: "I've never seen it end badly" },
      { letter: "F", emoji: "😢", text: "I've never seen it end well" },
    ],
    type: "single answer",
  },
  {
    id: 14,
    question:
      "Does your current or most recent organisation have any formal policy on romantic relationships between colleagues?",
    section: 4,
    options: [
      { letter: "A", emoji: "✅", text: "Yes and I know what it says" },
      { letter: "B", emoji: "📄", text: "Yes but I have never read it" },
      {
        letter: "C",
        emoji: "🤔",
        text: "I think there is one but I'm not sure",
      },
      { letter: "D", emoji: "❌", text: "There is definitely no policy" },
      { letter: "E", emoji: "🤷", text: "I don't know" },
    ],
    type: "single answer",
  },
  {
    id: 15,
    question:
      "If you found yourself in a romantic situation with a colleague, who would you tell first?",
    section: 4,
    options: [
      {
        letter: "A",
        emoji: "🤐",
        text: "Nobody — I'd keep it completely private",
      },
      { letter: "B", emoji: "👥", text: "A close colleague I trust" },
      {
        letter: "C",
        emoji: "🏢",
        text: "HR or management — I'd want to be transparent",
      },
      {
        letter: "D",
        emoji: "⏰",
        text: "Whoever seemed relevant when it became necessary",
      },
      {
        letter: "E",
        emoji: "👨‍👩‍👧",
        text: "My friends outside work, not anyone at the company",
      },
    ],
    type: "single answer",
  },
  {
    id: 16,
    question:
      "Overall, do you think Nigerian workplaces handle romantic relationships between colleagues well?",
    section: 4,
    options: [
      {
        letter: "A",
        emoji: "🏆",
        text: "Yes — most organisations manage it professionally",
      },
      {
        letter: "B",
        emoji: "⚡",
        text: "Somewhat — they manage the obvious cases but ignore the rest",
      },
      {
        letter: "C",
        emoji: "❌",
        text: "No — it's either ignored completely or handled badly when it surfaces",
      },
      {
        letter: "D",
        emoji: "💭",
        text: "It shouldn't need managing — it's personal",
      },
      { letter: "E", emoji: "🤔", text: "I've never thought about it" },
    ],
    type: "single answer",
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [multiSelected, setMultiSelected] = useState<{
    [key: number]: { [key: number]: boolean };
  }>({});
  const [showSurveyComplete, setShowSurveyComplete] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Organization form state - removed email
  const [orgForm, setOrgForm] = useState({
    industry: "",
    companySize: "",
    roleLevel: "",
  });

  const total = questions.length;
  const progress = ((currentQ + 1) / total) * 100;
  const q = questions[currentQ];
  const isLastQuestion = currentQ === total - 1;

  const selectSingle = (optIndex: number) => {
    setAnswers({ ...answers, [q.id]: optIndex });

    if (q.id === 5 && (optIndex === 3 || optIndex === 4)) {
      const section3StartIndex = questions.findIndex((q) => q.id === 10);
      if (section3StartIndex !== -1) {
        setCurrentQ(section3StartIndex);
        window.scrollTo(0, 0);
      }
    }
  };

  const toggleMulti = (optIndex: number) => {
    const current = multiSelected[q.id] || {};
    const updated = { ...current };
    if (updated[optIndex]) {
      delete updated[optIndex];
    } else {
      updated[optIndex] = true;
    }
    setMultiSelected({ ...multiSelected, [q.id]: updated });
    setAnswers({ ...answers, [q.id]: updated });
  };

  const hasAnswer = (): boolean => {
    if (q.type === "multiple answer") {
      return Object.keys(multiSelected[q.id] || {}).length > 0;
    }
    return answers[q.id] !== undefined;
  };

  const nextQuestion = () => {
    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      window.scrollTo(0, 0);
    }
  };

  const completeSurvey = () => {
    setShowSurveyComplete(true);
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = async () => {
    const finalAnswers = {
      surveyAnswers: answers,
      organizationInfo: {
        industry: orgForm.industry,
        companySize: orgForm.companySize,
        roleLevel: orgForm.roleLevel,
      },
      email: "anonymous@streetask.ng", // Dummy email to satisfy backend
    };

    localStorage.setItem("surveyAnswers", JSON.stringify(finalAnswers));
    console.log("Submitted:", finalAnswers);

    setIsLoading(true);
    try {
      const res = await fetch("/api/survey/submit", {
        method: "POST",
        body: JSON.stringify(finalAnswers),
      });
      if (!res.ok) {
        toast.error("error");
        return;
      }
      toast.success("success");
      router.push("/results");
    } catch (error) {
      toast.error("sorry an error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const isSelected = (optIndex: number): boolean => {
    if (q.type === "single answer") {
      return answers[q.id] === optIndex;
    }
    if (q.type === "multiple answer") {
      return !!multiSelected[q.id]?.[optIndex];
    }
    return false;
  };

  const renderQuestion = () => {
    if (q.type === "single answer" && q.options) {
      return (
        <div className="flex flex-col gap-3 mb-10">
          {q.options.map((opt, i) => {
            const optionIndex = i + 1;
            return (
              <button
                key={i}
                onClick={() => selectSingle(optionIndex)}
                className={`flex items-center gap-4 rounded-xl p-[18px] text-left transition-all hover:translate-x-1 ${
                  isSelected(optionIndex)
                    ? "bg-[#8b1a1a] border-[#8b1a1a] text-white"
                    : "bg-white/5 border-white/10 text-white/80 hover:bg-white/9 hover:border-white/25"
                } border`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all ${
                    isSelected(optionIndex)
                      ? "bg-white/20 text-white"
                      : "bg-white/8 text-white/50"
                  }`}
                >
                  {opt.letter}
                </span>
                <span className="text-sm md:text-[15px]">{opt.text}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (q.type === "multiple answer" && q.options) {
      return (
        <>
          <div className="text-xs text-white/30 italic mb-4">
            Select all that apply
          </div>
          <div className="flex flex-col gap-3 mb-10">
            {q.options.map((opt, i) => {
              const optionIndex = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => toggleMulti(optionIndex)}
                  className={`flex items-center gap-4 rounded-xl p-[18px] text-left transition-all hover:translate-x-1 ${
                    isSelected(optionIndex)
                      ? "bg-[#8b1a1a] border-[#8b1a1a] text-white"
                      : "bg-white/5 border-white/10 text-white/80 hover:bg-white/9 hover:border-white/25"
                  } border`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all ${
                      isSelected(optionIndex)
                        ? "bg-white/20 text-white"
                        : "bg-white/8 text-white/50"
                    }`}
                  >
                    {opt.letter}
                  </span>
                  <span className="text-sm md:text-[15px]">{opt.text}</span>
                </button>
              );
            })}
          </div>
        </>
      );
    }

    return null;
  };

  // Organization Form Screen - Email removed
  if (showSurveyComplete) {
    return (
      <div className="min-h-screen bg-[#1a1009]">
        <div className="fixed pointer-events-none select-none z-0 top-20 right-10 text-[120px] opacity-4 rotate-12">
          💬
        </div>
        <div className="fixed pointer-events-none select-none z-0 bottom-20 left-5 text-[80px] opacity-4 -rotate-10">
          📋
        </div>

        <nav className="px-5 md:px-10 py-5 flex items-center justify-between border-b border-white/8 bg-[#1a1009] relative z-10">
          <div className="flex items-center gap-2.5 text-white font-semibold text-sm md:text-[15px]">
            <div className="bg-[#8b1a1a] text-white font-bold text-xs w-8 h-8 flex items-center justify-center rounded">
              SO
            </div>
            Street Ask
          </div>
          <div className="text-[13px] text-white/40">Almost done</div>
          <button
            onClick={() => router.push("/")}
            className="bg-white/8 border-none text-white/50 px-4 py-2 rounded-md text-[13px] cursor-pointer hover:bg-white/12 hover:text-white transition-all"
          >
            Exit
          </button>
        </nav>

        <div className="max-w-[680px] mx-auto px-5 md:px-10 py-15 md:py-[60px]">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#c0392b]/20 text-[#c0392b] px-6 py-2 rounded-full text-sm font-semibold mb-4">
              Almost There!
            </div>
            <div className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-3">
              Tell us about yourself
            </div>
            <p className="text-white/50 text-sm">
              This helps us break down findings by industry, company size, and
              role
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-white font-semibold mb-3 block">
                What sector do you work in?
              </label>
              <select
                value={orgForm.industry}
                onChange={(e) =>
                  setOrgForm({ ...orgForm, industry: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c0392b] appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#1a1009]">
                  Select industry
                </option>
                <option className="bg-[#1a1009]">Finance & Banking</option>
                <option className="bg-[#1a1009]">Technology</option>
                <option className="bg-[#1a1009]">FMCG</option>
                <option className="bg-[#1a1009]">Healthcare</option>
                <option className="bg-[#1a1009]">NGO / Non-profit</option>
                <option className="bg-[#1a1009]">Government</option>
                <option className="bg-[#1a1009]">Real Estate</option>
                <option className="bg-[#1a1009]">Logistics</option>
                <option className="bg-[#1a1009]">Other</option>
              </select>
            </div>

            <div>
              <label className="text-white font-semibold mb-3 block">
                How many people work at your organisation?
              </label>
              <select
                value={orgForm.companySize}
                onChange={(e) =>
                  setOrgForm({ ...orgForm, companySize: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c0392b] appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#1a1009]">
                  Select company size
                </option>
                <option className="bg-[#1a1009]">1 to 10</option>
                <option className="bg-[#1a1009]">11 to 50</option>
                <option className="bg-[#1a1009]">51 to 200</option>
                <option className="bg-[#1a1009]">201 to 500</option>
                <option className="bg-[#1a1009]">500+</option>
              </select>
            </div>

            <div>
              <label className="text-white font-semibold mb-3 block">
                What is your role level?
              </label>
              <select
                value={orgForm.roleLevel}
                onChange={(e) =>
                  setOrgForm({ ...orgForm, roleLevel: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c0392b] appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#1a1009]">
                  Select role level
                </option>
                <option className="bg-[#1a1009]">Founder / Executive</option>
                <option className="bg-[#1a1009]">Senior Manager</option>
                <option className="bg-[#1a1009]">Manager</option>
                <option className="bg-[#1a1009]">Mid-level</option>
                <option className="bg-[#1a1009]">Entry level</option>
              </select>
            </div>

            {/* Email section completely removed */}

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setShowSurveyComplete(false)}
                disabled={isLoading}
                className="flex-1 bg-transparent border border-white/15 text-white/50 px-6 py-3.5 rounded-lg text-[15px] cursor-pointer hover:border-white/30 hover:text-white transition-all"
              >
                ← Back to Survey
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isLoading}
                className="flex-1 bg-[#8b1a1a] text-white px-6 py-3.5 rounded-lg text-[15px] font-semibold hover:bg-[#c0392b] transition-all"
              >
                {isLoading ? "loading" : "Submit Survey →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Survey Questions
  return (
    <div className="min-h-screen bg-[#1a1009]">
      <div className="fixed pointer-events-none select-none z-0 top-20 right-10 text-[120px] opacity-4 rotate-12">
        💬
      </div>
      <div className="fixed pointer-events-none select-none z-0 bottom-20 left-5 text-[80px] opacity-4 -rotate-10">
        📋
      </div>

      <nav className="px-5 md:px-10 py-5 flex items-center justify-between border-b border-white/8 bg-[#1a1009] relative z-10">
        <div className="flex items-center gap-2.5">
          <Link href={"/"}>
            <img src={"/red-logo.png"} className="h-10 w-30 object-contain" />
          </Link>
        </div>

        <button
          onClick={() => router.push("/")}
          className="bg-white/8 border-none text-white/50 px-4 py-2 rounded-md text-[13px] cursor-pointer hover:bg-white/12 hover:text-white transition-all"
        >
          Exit
        </button>
      </nav>

      <div className="h-[3px] bg-white/8">
        <div
          className="h-full bg-gradient-to-r from-[#8b1a1a] to-[#e8554a] transition-all duration-400"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-[680px] mx-auto px-5 md:px-10 py-15 md:py-[60px] min-h-[calc(100vh-120px)] flex flex-col justify-center">
        <div className="animate-[slideIn_0.35s_ease_forwards]">
          {/* <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#c0392b] mb-4">
            Question {currentQ + 1} of {total}
          </div> */}
          <div className="font-['Playfair_Display'] text-2xl md:text-4xl font-bold text-white leading-tight mb-3">
            {q.question}
          </div>

          {renderQuestion()}

          <div className="flex items-center justify-between mt-8">
            {currentQ > 0 ? (
              <button
                onClick={prevQuestion}
                className="bg-transparent border border-white/15 text-white/50 px-6 py-3.5 rounded-lg text-[15px] cursor-pointer hover:border-white/30 hover:text-white transition-all"
              >
                ← Back
              </button>
            ) : (
              <div></div>
            )}
            <button
              onClick={isLastQuestion ? completeSurvey : nextQuestion}
              disabled={!hasAnswer() || isLoading}
              className="bg-[#8b1a1a] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold flex items-center gap-2 transition-all hover:bg-[#c0392b] hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(139,26,26,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLastQuestion ? "Complete Survey →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
