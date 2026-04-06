"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SurveyAnswers {
  [questionId: number]: any;
}

interface Question {
  id: number;
  question: string;
  section?: number;
  options?: string[];
  type: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "In your honest opinion, how common is romantic attraction between colleagues in Nigerian workplaces?",
    section: 1,
    options: [
      "Very common — it happens everywhere",
      "Fairly common — more than people admit",
      "It happens but people keep it quiet",
      "Rare — most people are professional about it",
      "I genuinely don't know",
    ],
    type: "single answer",
  },
  {
    id: 2,
    question:
      "Have you ever had romantic feelings for someone you worked with?",
    section: 1,
    options: [
      "Yes, and I acted on it",
      "Yes, but I kept it to myself",
      "No, never",
      "I'm not sure — maybe",
    ],
    type: "single answer",
  },
  {
    id: 3,
    question:
      "At your current or most recent workplace, how many people do you know of who were or are romantically involved with a colleague?",
    section: 1,
    options: [
      "None that I know of",
      "One or two people",
      "A lot — it's practically an open secret",
      "I'd rather not say",
    ],
    type: "single answer",
  },
  {
    id: 4,
    question: "What Actually Happens",
    section: 2,
    type: "enter answer",
  },
  {
    id: 5,
    question: "Have you ever been in a romantic relationship with a colleague?",
    options: [
      "Yes, but it started after one of us left",
      "Yes, while we were at the same company",
      "No, but it came close",
      "No, never",
    ],
    section: 2,
    type: "single answer",
  },
  {
    id: 6,
    question: "How did it start? Select all that apply.",
    options: [
      "Working closely together on a project",
      "After-work drinks or a team event",
      "WhatsApp or DM conversations that shifted",
      "It was obvious from day one",
      "One person made a move",
      "It just happened gradually — no clear moment",
      "Prefer not to say",
    ],
    section: 2,
    type: "multiple answer",
  },
  {
    id: 7,
    question:
      "Was the relationship between people at the same level, or was one person senior to the other?",
    options: [
      "Same level",
      "One person was more senior",
      "Significant seniority gap — manager and direct report",
      "Not applicable",
      "Prefer not to say",
    ],
    section: 2,
    type: "single answer",
  },
  {
    id: 8,
    question: "Did anyone at work find out?",
    options: [
      "Yes — most people knew",
      "Yes — a few people knew",
      "Only one or two people",
      "No — it was completely private",
      "Prefer not to say",
    ],
    section: 2,
    type: "single answer",
  },
  {
    id: 9,
    question: "THE WORK PART",
    section: 3,
    type: "enter answer",
  },
  {
    id: 10,
    question:
      "In your experience or observation, what tends to happen to work performance when two colleagues are romantically involved?",
    options: [
      "Performance improves — they work harder and better together",
      "No real change — they keep it professional",
      "It depends entirely on how they handle it",
      "Performance drops — the distraction is real",
      "It creates problems for the whole team, not just them",
    ],
    section: 3,
    type: "single answer",
  },
  {
    id: 11,
    question:
      "Have you ever felt uncomfortable at work because of a romantic situation involving your colleagues — not yourself?",
    options: [
      "Yes, significantly — it affected the team dynamic",
      "Yes, mildly — it was awkward but manageable",
      "Not really — I stayed out of it",
      "No, never",
    ],
    section: 3,
    type: "single answer",
  },
  {
    id: 12,
    question:
      "If a romantic relationship between two colleagues ended badly, what usually happens?",
    options: [
      "One person leaves the company eventually",
      "They manage to stay professional — it's awkward but it works",
      "The whole team feels it for months",
      "It depends on the seniority of the people involved",
      "I've never seen it end badly",
      "I've never seen it end well",
    ],
    section: 3,
    type: "single answer",
  },
  {
    id: 13,
    question: "WHAT DOES THE ORGANIZATION DO?",
    section: 4,
    type: "enter answer",
  },
  {
    id: 14,
    question:
      "Does your current or most recent organisation have any formal policy on romantic relationships between colleagues?",
    options: [
      "Yes and I know what it says",
      "Yes but I have never read it",
      "I think there is one but I'm not sure",
      "There is definitely no policy",
      "I don't know",
    ],
    section: 4,
    type: "single answer",
  },
  {
    id: 15,
    question:
      "If you found yourself in a romantic situation with a colleague, who would you tell first?",
    options: [
      "Nobody — I'd keep it completely private",
      "A close colleague I trust",
      "HR or management — I'd want to be transparent",
      "Whoever seemed relevant when it became necessary",
      "My friends outside work, not anyone at the company",
    ],
    section: 4,
    type: "single answer",
  },
  {
    id: 16,
    question:
      "Overall, do you think Nigerian workplaces handle romantic relationships between colleagues well?",
    options: [
      "Yes — most organisations manage it professionally",
      "Somewhat — they manage the obvious cases but ignore the rest",
      "No — it's either ignored completely or handled badly when it surfaces",
      "It shouldn't need managing — it's personal",
      "I've never thought about it",
    ],
    section: 4,
    type: "single answer",
  },
  {
    id: 17,
    question:
      "One last thing — and this is entirely optional. In your experience, what actually happens when two colleagues get together at a Nigerian workplace? Tell us what you've seen, heard, or lived. Anonymous. Real answers only.",
    section: 4,
    type: "enter answer",
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

  // Organization form state (includes email)
  const [orgForm, setOrgForm] = useState({
    industry: "",
    companySize: "",
    roleLevel: "",
    email: "",
  });

  const total = questions.length;
  const progress = ((currentQ + 1) / total) * 100;
  const q = questions[currentQ];
  const isLastQuestion = currentQ === total - 1;

  const selectSingle = (optIndex: number) => {
    // Store answer with 1-based index
    setAnswers({ ...answers, [q.id]: optIndex });

    // Check if this is question 5 and answer is "No" option (index 3 or 4 in 1-based)
    if (q.id === 5 && (optIndex === 3 || optIndex === 4)) {
      // Jump to section 3 (question 9 - THE WORK PART)
      const section3StartIndex = questions.findIndex((q) => q.id === 9);
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

  const handleTextAnswer = (value: string) => {
    setAnswers({ ...answers, [q.id]: value });
  };

  const hasAnswer = (): boolean => {
    if (q.type === "enter answer") {
      return true;
    }
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

  const handleFinalSubmit = () => {
    const finalAnswers = {
      surveyAnswers: answers,
      organizationInfo: {
        industry: orgForm.industry,
        companySize: orgForm.companySize,
        roleLevel: orgForm.roleLevel,
      },
      email: orgForm.email || undefined,
    };

    localStorage.setItem("surveyAnswers", JSON.stringify(finalAnswers));
    console.log("Submitted:", finalAnswers);
    router.push("/results");
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
    if (q.type === "enter answer" && (!q.options || q.options.length === 0)) {
      return (
        <div className="mb-10">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#c0392b]/20 text-[#c0392b] px-6 py-2 rounded-full text-sm font-semibold">
              Section {q.section}
            </div>
          </div>
          <textarea
            placeholder="Type your answer here... (optional)"
            value={answers[q.id] || ""}
            onChange={(e) => handleTextAnswer(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c0392b] resize-none min-h-[150px]"
          />
          <p className="text-white/30 text-xs mt-2 text-right">Optional</p>
        </div>
      );
    }

    if (q.type === "single answer" && q.options) {
      return (
        <div className="flex flex-col gap-3 mb-10">
          {q.options.map((opt, i) => {
            const optionIndex = i + 1; // 1-based index
            return (
              <button
                key={i}
                onClick={() => selectSingle(optionIndex)}
                className={`flex items-center gap-4 bg-white/5 border rounded-xl p-[18px] text-left transition-all hover:bg-white/9 hover:border-white/25 hover:text-white ${
                  isSelected(optionIndex)
                    ? "bg-red/25 border-[#c0392b] text-white"
                    : "border-white/10 text-white/80"
                }`}
              >
                <span className="text-sm md:text-[15px]">{opt}</span>
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
              const optionIndex = i + 1; // 1-based index
              return (
                <button
                  key={i}
                  onClick={() => toggleMulti(optionIndex)}
                  className={`flex items-center gap-4 bg-white/5 border rounded-xl p-[18px] text-left transition-all hover:bg-white/9 hover:border-white/25 hover:text-white ${
                    isSelected(optionIndex)
                      ? "bg-red/25 border-[#c0392b] text-white"
                      : "border-white/10 text-white/80"
                  }`}
                >
                  <span className="text-sm md:text-[15px]">{opt}</span>
                </button>
              );
            })}
          </div>
        </>
      );
    }

    return null;
  };

  // Organization Form Screen (after survey completion)
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
            {/* Industry Question */}
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

            {/* Company Size */}
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

            {/* Role Level */}
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

            {/* Email - Part of organization details */}
            <div className="border-t border-white/8 pt-6 mt-6">
              <label className="text-white font-semibold mb-3 block">
                Email (Optional)
              </label>
              <p className="text-white/40 text-sm mb-3">
                Drop your email to get early access to the Street Pulse report
                when it drops. No spam. Just the findings.
              </p>
              <input
                type="email"
                value={orgForm.email}
                onChange={(e) =>
                  setOrgForm({ ...orgForm, email: e.target.value })
                }
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#c0392b]"
              />
              <button
                onClick={() => setOrgForm({ ...orgForm, email: "" })}
                className="text-xs text-white/30 underline bg-none border-none mt-2.5 cursor-pointer hover:text-white/50"
              >
                Skip for now
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setShowSurveyComplete(false)}
                className="flex-1 bg-transparent border border-white/15 text-white/50 px-6 py-3.5 rounded-lg text-[15px] cursor-pointer hover:border-white/30 hover:text-white transition-all"
              >
                ← Back to Survey
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex-1 bg-[#8b1a1a] text-white px-6 py-3.5 rounded-lg text-[15px] font-semibold hover:bg-[#c0392b] transition-all"
              >
                Submit Survey →
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
        <div className="flex items-center gap-2.5 text-white font-semibold text-sm md:text-[15px]">
          <div className="bg-[#8b1a1a] text-white font-bold text-xs w-8 h-8 flex items-center justify-center rounded">
            SO
          </div>
          Street Ask
        </div>
        <div className="text-[13px] text-white/40">
          Question{" "}
          <span className="text-white/80 font-semibold">{currentQ + 1}</span> of{" "}
          <span className="text-white/80 font-semibold">{total}</span>
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
          <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#c0392b] mb-4">
            Question {currentQ + 1} of {total}
          </div>
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
              disabled={!hasAnswer()}
              className={`bg-[#8b1a1a] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold flex items-center gap-2 transition-all hover:bg-[#c0392b] hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(139,26,26,0.3)] disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              {isLastQuestion ? "Complete Survey →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
