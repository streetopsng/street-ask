"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface SurveyAnswers {
  [questionId: number]: any;
}

interface Option {
  letter: string;
  emoji: string;
  text: string;
}

interface Question {
  id: number;
  question: string;
  section?: number;
  options?: Option[];
  type: "single answer" | "text";
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "When your salary alert drops, what is your honest first thought?",
    section: 1,
    options: [
      { letter: "A", emoji: "🎉", text: "Finally — I earned this." },
      { letter: "B", emoji: "😐", text: "It's fine. Not great, not terrible." },
      {
        letter: "C",
        emoji: "😤",
        text: "It's insulting but I have bills to pay.",
      },
      { letter: "D", emoji: "💼", text: "I immediately open job boards." },
      {
        letter: "E",
        emoji: "😩",
        text: "I don't even check anymore. What's the point.",
      },
    ],
    type: "single answer",
  },
  {
    id: 2,
    question:
      "How satisfied are you with your current compensation — total package included?",
    section: 1,
    options: [
      {
        letter: "A",
        emoji: "🏆",
        text: "Very satisfied — I feel genuinely valued.",
      },
      {
        letter: "B",
        emoji: "🙂",
        text: "Somewhat satisfied — it could be better but I'm not complaining.",
      },
      { letter: "C", emoji: "😐", text: "Neutral — I've accepted it." },
      {
        letter: "D",
        emoji: "😡",
        text: "Dissatisfied — I know I am underpaid.",
      },
      {
        letter: "E",
        emoji: "🚫",
        text: "Very dissatisfied — this is not sustainable.",
      },
    ],
    type: "single answer",
  },
  {
    id: 3,
    question:
      "Has inflation changed how far your salary goes in the last 12 months?",
    section: 1,
    options: [
      {
        letter: "A",
        emoji: "📉",
        text: "Yes — dramatically. My salary is worth significantly less than it was.",
      },
      {
        letter: "B",
        emoji: "⚠️",
        text: "Yes — noticeably. I've had to cut back on things.",
      },
      {
        letter: "C",
        emoji: "🤏",
        text: "Somewhat — I've felt it but I've managed.",
      },
      {
        letter: "D",
        emoji: "✅",
        text: "Not really — I received a raise that kept pace.",
      },
      {
        letter: "E",
        emoji: "🧾",
        text: "No — my expenses haven't changed much.",
      },
    ],
    type: "single answer",
  },
  {
    id: 4,
    question:
      "Which statement best describes your relationship with your salary right now?",
    section: 2,
    options: [
      {
        letter: "A",
        emoji: "💰",
        text: "It covers my needs and I have something left over.",
      },
      {
        letter: "B",
        emoji: "🪙",
        text: "It covers my needs but barely — nothing is left.",
      },
      {
        letter: "C",
        emoji: "🛠️",
        text: "I cover my needs by supplementing with side income.",
      },
      {
        letter: "D",
        emoji: "⚠️",
        text: "My salary alone does not cover my basic monthly needs.",
      },
      {
        letter: "E",
        emoji: "🏦",
        text: "I rely on family support or savings to bridge the gap.",
      },
    ],
    type: "single answer",
  },
  {
    id: 5,
    question: "How does your pay reflect your qualifications and experience?",
    section: 2,
    options: [
      {
        letter: "A",
        emoji: "✅",
        text: "Fairly — I am paid in line with what I bring.",
      },
      {
        letter: "B",
        emoji: "🔎",
        text: "I am slightly underpaid given my experience.",
      },
      {
        letter: "C",
        emoji: "📉",
        text: "I am significantly underpaid. The gap is real.",
      },
      {
        letter: "D",
        emoji: "🎓",
        text: "I am overqualified for this role and it shows in the pay.",
      },
      {
        letter: "E",
        emoji: "😔",
        text: "I've stopped thinking about it. Credentials don't guarantee anything here.",
      },
    ],
    type: "single answer",
  },
  {
    id: 6,
    question:
      "Did your educational qualifications meaningfully increase your earning power?",
    section: 2,
    options: [
      {
        letter: "A",
        emoji: "🎓",
        text: "Yes — my degree or certifications directly unlocked better pay.",
      },
      {
        letter: "B",
        emoji: "🤝",
        text: "Somewhat — it got me in the door but the pay hasn't reflected it.",
      },
      {
        letter: "C",
        emoji: "📉",
        text: "Not really — I know people without my qualifications earning more than me.",
      },
      {
        letter: "D",
        emoji: "🚫",
        text: "No — experience and connections mattered far more than paper.",
      },
      {
        letter: "E",
        emoji: "💸",
        text: "I'm still paying off the education and the salary hasn't caught up.",
      },
    ],
    type: "single answer",
  },
  {
    id: 7,
    question:
      "Have you ever negotiated your salary — at any point in your career?",
    section: 3,
    options: [
      {
        letter: "A",
        emoji: "💪",
        text: "Yes, regularly — I always negotiate.",
      },
      {
        letter: "B",
        emoji: "🗣️",
        text: "Yes, once or twice — with mixed results.",
      },
      {
        letter: "C",
        emoji: "😬",
        text: "I tried once and it didn't go well. I haven't since.",
      },
      {
        letter: "D",
        emoji: "🚫",
        text: "No — I was too uncomfortable to try.",
      },
      {
        letter: "E",
        emoji: "🇳🇬",
        text: "No — in Nigerian workplaces, you take what they offer or leave.",
      },
    ],
    type: "single answer",
  },
  {
    id: 8,
    question: "Do you know what your colleagues earn — and does it affect you?",
    section: 3,
    options: [
      { letter: "A", emoji: "✅", text: "Yes, I know — and I'm fine with it." },
      {
        letter: "B",
        emoji: "😡",
        text: "Yes, I know — and it bothers me significantly.",
      },
      {
        letter: "C",
        emoji: "🤐",
        text: "I have a rough idea and I'd rather not confirm it.",
      },
      {
        letter: "D",
        emoji: "❓",
        text: "I don't know and I genuinely don't want to.",
      },
      {
        letter: "E",
        emoji: "🇳🇬",
        text: "I don't know but I wish Nigerian workplaces were more open about pay.",
      },
    ],
    type: "single answer",
  },
  {
    id: 9,
    question: "Do you have income outside your primary job — and why?",
    section: 3,
    options: [
      {
        letter: "A",
        emoji: "💼",
        text: "Yes — by choice. I like the extra income and independence.",
      },
      {
        letter: "B",
        emoji: "💸",
        text: "Yes — because my salary alone is not enough to survive on.",
      },
      {
        letter: "C",
        emoji: "🚀",
        text: "Yes — because I'm building something in case this job ends.",
      },
      {
        letter: "D",
        emoji: "⚠️",
        text: "I've tried but haven't found something consistent yet.",
      },
      {
        letter: "E",
        emoji: "✅",
        text: "No — my primary job pays well enough that I don't need to.",
      },
    ],
    type: "single answer",
  },
  {
    id: 10,
    question:
      "If you earn in naira, how has naira devaluation affected your financial reality?",
    section: 4,
    options: [
      {
        letter: "A",
        emoji: "📉",
        text: "Severely — my effective purchasing power has collapsed.",
      },
      {
        letter: "B",
        emoji: "⚠️",
        text: "Significantly — I've had to restructure how I spend and save.",
      },
      {
        letter: "C",
        emoji: "🤏",
        text: "Somewhat — I've noticed it but adapted.",
      },
      {
        letter: "D",
        emoji: "🪙",
        text: "Not much — my expenses are mostly local and stable.",
      },
      {
        letter: "E",
        emoji: "🌍",
        text: "I earn in a foreign currency — this doesn't apply to me.",
      },
    ],
    type: "single answer",
  },
  {
    id: 11,
    question:
      "Do you think your industry pays fairly compared to others in Nigeria?",
    section: 4,
    options: [
      {
        letter: "A",
        emoji: "✅",
        text: "Yes — my sector is competitive and pays well.",
      },
      {
        letter: "B",
        emoji: "➖",
        text: "It's average. Not the best, not the worst.",
      },
      {
        letter: "C",
        emoji: "🚫",
        text: "No — I'm in a sector that is chronically underpaid.",
      },
      {
        letter: "D",
        emoji: "⚖️",
        text: "Pay varies wildly within my sector — it depends entirely on the employer.",
      },
      {
        letter: "E",
        emoji: "🤷",
        text: "I honestly don't know what fair looks like anymore.",
      },
    ],
    type: "single answer",
  },
  {
    id: 12,
    question:
      "Has staying loyal to one organisation paid off financially for you?",
    section: 4,
    options: [
      {
        letter: "A",
        emoji: "🏆",
        text: "Yes — my raises and promotions have been meaningful over time.",
      },
      {
        letter: "B",
        emoji: "🔁",
        text: "Not really — small increments that don't match my growth.",
      },
      {
        letter: "C",
        emoji: "🚀",
        text: "No — I've learned that job-hopping is the only real raise in Nigeria.",
      },
      {
        letter: "D",
        emoji: "⏳",
        text: "I haven't stayed long enough anywhere to find out.",
      },
      {
        letter: "E",
        emoji: "💣",
        text: "Loyalty is a tax Nigerian workers pay to employers, not the other way around.",
      },
    ],
    type: "single answer",
  },
  {
    id: 13,
    question:
      "How would you rate your non-salary benefits — health, pension, leave, bonuses?",
    section: 5,
    options: [
      {
        letter: "A",
        emoji: "🌟",
        text: "Excellent — they add real value to my total compensation.",
      },
      {
        letter: "B",
        emoji: "👍",
        text: "Decent — they exist but nothing special.",
      },
      {
        letter: "C",
        emoji: "⚪",
        text: "Minimal — what benefits? It's just the salary.",
      },
      {
        letter: "D",
        emoji: "👎",
        text: "On paper they exist. In practice they're inaccessible or unreliable.",
      },
      {
        letter: "E",
        emoji: "✂️",
        text: "I factor them out entirely when calculating if a job is worth it.",
      },
    ],
    type: "single answer",
  },
  {
    id: 14,
    question:
      "Compared to peers with similar experience, how do you feel about your pay?",
    section: 5,
    options: [
      { letter: "A", emoji: "⬆️", text: "I earn more — and I worked for it." },
      { letter: "B", emoji: "⚖️", text: "We're roughly similar. Feels fair." },
      {
        letter: "C",
        emoji: "📉",
        text: "I earn less and I know why — it was a conscious tradeoff.",
      },
      {
        letter: "D",
        emoji: "😠",
        text: "I earn less and I don't fully understand why. It frustrates me.",
      },
      {
        letter: "E",
        emoji: "🚫",
        text: "I stopped comparing. It only makes it worse.",
      },
    ],
    type: "single answer",
  },
  {
    id: 15,
    question:
      "In five years, what do you expect your compensation situation to look like?",
    section: 5,
    options: [
      {
        letter: "A",
        emoji: "📈",
        text: "Better — I have a clear plan and I'm executing it.",
      },
      {
        letter: "B",
        emoji: "🤞",
        text: "Better — if the economy cooperates.",
      },
      {
        letter: "C",
        emoji: "➖",
        text: "About the same. I'm not optimistic.",
      },
      {
        letter: "D",
        emoji: "🌍",
        text: "Honestly? I'm not sure Nigeria is where I'll be building my career.",
      },
      {
        letter: "E",
        emoji: "🛡️",
        text: "I've stopped planning that far ahead. Survival is the current strategy.",
      },
    ],
    type: "single answer",
  },
];

// Street Interview Questions (Text-based)
const streetInterviewQuestions = [
  {
    id: 16,
    question:
      "Can you tell us — roughly — are you earning enough to live comfortably in this city right now?",
    type: "text" as const,
  },
  {
    id: 17,
    question:
      "When last did your salary increase — and did it feel like a real raise, or just a number on paper?",
    type: "text" as const,
  },
  {
    id: 18,
    question:
      "If you found out your colleague doing the exact same job as you earns 40% more — what would you do?",
    type: "text" as const,
  },
  {
    id: 19,
    question:
      "Do you have a side hustle? Be honest — is it a choice or a necessity?",
    type: "text" as const,
  },
  {
    id: 20,
    question:
      "Does your degree or qualification actually show up in your salary? Or was it just a ticket to get in the door?",
    type: "text" as const,
  },
  {
    id: 21,
    question: "Has the dollar rate affected how far your money goes this year?",
    type: "text" as const,
  },
  {
    id: 22,
    question:
      "If you could change one thing about how Nigerian employers pay their staff — what would it be?",
    type: "text" as const,
  },
  {
    id: 23,
    question:
      "Quick one — overpaid, underpaid, or fairly paid. Which one are you right now?",
    type: "text" as const,
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [showSurveyComplete, setShowSurveyComplete] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [textAnswers, setTextAnswers] = useState<{ [key: number]: string }>({});

  // Organization form state - removed email
  const [orgForm, setOrgForm] = useState({
    industry: "",
    companySize: "",
    roleLevel: "",
  });

  // Combine all questions
  const allQuestions = [...questions, ...streetInterviewQuestions];
  const total = allQuestions.length;
  const progress = ((currentQ + 1) / total) * 100;
  const q = allQuestions[currentQ];
  const isLastQuestion = currentQ === total - 1;
  const isMultipleChoiceSection = currentQ < questions.length;

  const selectSingle = (optIndex: number) => {
    setAnswers({ ...answers, [q.id]: optIndex });
  };

  const hasAnswer = (): boolean => {
    if (isMultipleChoiceSection) {
      return answers[q.id] !== undefined;
    } else {
      return textAnswers[q.id] !== undefined && textAnswers[q.id].trim() !== "";
    }
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
      surveyAnswers: { ...answers, ...textAnswers },
      organizationInfo: {
        industry: orgForm.industry,
        companySize: orgForm.companySize,
        roleLevel: orgForm.roleLevel,
      },
      email: "anonymous@streetask.ng", // Dummy email to satisfy backend
    };

    localStorage.setItem("surveyAnswers", JSON.stringify(finalAnswers));
    // console.log("Submitted:", finalAnswers);

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
    return answers[q.id] === optIndex;
  };

  const renderQuestion = () => {
    if (q.type === "text") {
      return (
        <div className="mb-10">
          <textarea
            value={textAnswers[q.id] || ""}
            onChange={(e) =>
              setTextAnswers({ ...textAnswers, [q.id]: e.target.value })
            }
            placeholder="Type your answer here..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-[#c0392b] resize-none min-h-[120px]"
            rows={4}
          />
        </div>
      );
    }

    if (!q.options) {
      return null;
    }

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
          {/* Street Interview Section Header */}
          {currentQ >= questions.length && (
            <div className="text-center mb-8">
              <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#c0392b] mb-2">
                STREET INTERVIEW — 8 QUESTIONS
              </div>
              {/* <p className="text-white/60 text-sm">
                Answer in any order, conversationally. The last one is a great
                closer.
              </p> */}
              <div className="w-16 h-px bg-[#c0392b] mx-auto mt-4"></div>
            </div>
          )}

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
