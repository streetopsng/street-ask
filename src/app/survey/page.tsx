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
    question: "If you're 100% honest, how truthful are you with your manager on a typical day at work?",
    options: [
      { letter: "A", emoji: "", text: "Fully honest - I say what I mean, always" },
      { letter: "B", emoji: "", text: "Mostly honest, but I sugarcoat the hard parts" },
      { letter: "C", emoji: "", text: "I tell them what keeps the peace, not what's real" },
      { letter: "D", emoji: "", text: "Honestly? I've mastered the art of \"everything is fine\"" },
    ],
    type: "single answer",
  },
  {
    id: 2,
    question: "Your manager walks past your desk unannounced. What's the first thing that happens?",
    options: [
      { letter: "A", emoji: "", text: "Nothing changes - I'm already focused" },
      { letter: "B", emoji: "", text: "I sit up straighter and look extra busy" },
      { letter: "C", emoji: "", text: "I suddenly remember 3 \"urgent\" tasks" },
      { letter: "D", emoji: "", text: "I greet him like he just walked into a party" },
    ],
    type: "single answer",
  },
  {
    id: 3,
    question: "It's 4:45pm and your manager is still in the office. What's your move?",
    options: [
      { letter: "A", emoji: "", text: "I leave at my normal closing time regardless" },
      { letter: "B", emoji: "", text: "I stay back a little, just to be seen" },
      { letter: "C", emoji: "", text: "I wait until he leaves, then I leave 2 minutes after" },
      { letter: "D", emoji: "", text: "I find one more \"task\" to look busy with" },
    ],
    type: "single answer",
  },
  {
    id: 4,
    question: "How do you talk about your manager when they're not in the room, versus when they are?",
    options: [
      { letter: "A", emoji: "", text: "The same way, always" },
      { letter: "B", emoji: "", text: "Slightly more critical when they're away" },
      { letter: "C", emoji: "", text: "Very different - two completely different conversations" },
      { letter: "D", emoji: "", text: "Let's just say the group chat knows things he doesn't" },
    ],
    type: "single answer",
  },
  {
    id: 5,
    question: "You notice your manager taking credit for a colleague's work. What do you do?",
    options: [
      { letter: "A", emoji: "", text: "I report it to HR or someone above" },
      { letter: "B", emoji: "", text: "I tell my colleague privately but stay out of it" },
      { letter: "C", emoji: "", text: "I say nothing - it's not my business" },
      { letter: "D", emoji: "", text: "I joke about it in the group chat, hoping someone notices" },
    ],
    type: "single answer",
  },
  {
    id: 6,
    question: "If you had to report something wrong at work, how would you prefer to do it?",
    options: [
      { letter: "A", emoji: "", text: "Openly, with my name attached" },
      { letter: "B", emoji: "", text: "Anonymously, but I'd still report it" },
      { letter: "C", emoji: "", text: "I probably wouldn't report it at all" },
      { letter: "D", emoji: "", text: "I'd only report it if others joined me" },
    ],
    type: "single answer",
  },
  {
    id: 7,
    question: "If reporting a wrongdoing could cost you your job, would you still do it?",
    options: [
      { letter: "A", emoji: "", text: "Yes, some things matter more than a job" },
      { letter: "B", emoji: "", text: "It depends on how serious it is" },
      { letter: "C", emoji: "", text: "No - I have bills and responsibilities" },
      { letter: "D", emoji: "", text: "I'd find an anonymous way to raise it" },
    ],
    type: "single answer",
  },
  {
    id: 8,
    question: "In your exit interview (real or imagined), what would you REALLY say about why you're leaving?",
    options: [
      { letter: "A", emoji: "", text: "The exact truth, even if uncomfortable" },
      { letter: "B", emoji: "", text: "A polished version of the truth" },
      { letter: "C", emoji: "", text: "\"Better opportunity\" - even if that's not the full story" },
      { letter: "D", emoji: "", text: "I'd say just enough to leave clean, nothing more" },
    ],
    type: "single answer",
  },
  {
    id: 9,
    question: "Would you mention your manager by name if they were the real reason you left?",
    options: [
      { letter: "A", emoji: "", text: "Yes, they deserve to know" },
      { letter: "B", emoji: "", text: "Only if I'm directly asked" },
      { letter: "C", emoji: "", text: "No, I'd keep it general" },
      { letter: "D", emoji: "", text: "I'd mention it to HR only, never to the manager" },
    ],
    type: "single answer",
  },
  {
    id: 10,
    question: "Would you recommend your current company to a friend looking for a job?",
    options: [
      { letter: "A", emoji: "", text: "Yes, honestly and without hesitation" },
      { letter: "B", emoji: "", text: "Yes, but with a few honest warnings" },
      { letter: "C", emoji: "", text: "I'd be diplomatic and avoid the full truth" },
      { letter: "D", emoji: "", text: "No, but I'd never say that officially" },
    ],
    type: "single answer",
  },
  {
    id: 11,
    question: "If you were rating your manager anonymously, how honest would you be — really?",
    options: [
      { letter: "A", emoji: "", text: "Very honest - that's the whole point" },
      { letter: "B", emoji: "", text: "Honest, but I soften the harsh points" },
      { letter: "C", emoji: "", text: "I rate generously to avoid problems" },
      { letter: "D", emoji: "", text: "I don't fully trust it's anonymous, so I play safe" },
    ],
    type: "single answer",
  },
  {
    id: 12,
    question: "Have you ever given positive feedback you didn't fully believe, just to avoid conflict?",
    options: [
      { letter: "A", emoji: "", text: "Never - I only say what I mean" },
      { letter: "B", emoji: "", text: "Rarely, but it has happened" },
      { letter: "C", emoji: "", text: "Often - it's easier that way" },
      { letter: "D", emoji: "", text: "Almost always, if I'm honest" },
    ],
    type: "single answer",
  },
  {
    id: 13,
    question: "Has fear of being identified ever stopped you from giving honest feedback?",
    options: [
      { letter: "A", emoji: "", text: "Never - I say what I mean regardless" },
      { letter: "B", emoji: "", text: "Occasionally, on sensitive topics" },
      { letter: "C", emoji: "", text: "Often - I always play it safe" },
      { letter: "D", emoji: "", text: "Every single time" },
    ],
    type: "single answer",
  },
  {
    id: 14,
    question: "If your manager could read your mind for one day, how differently would things go?",
    options: [
      { letter: "A", emoji: "", text: "Not much would change - I'm an open book" },
      { letter: "B", emoji: "", text: "They'd learn a few things I've kept to myself" },
      { letter: "C", emoji: "", text: "They'd be shocked by how much I hold back" },
      { letter: "D", emoji: "", text: "Let's just say... it's better they never find out" },
    ],
    type: "single answer",
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [showSurveyComplete, setShowSurveyComplete] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Organization form state - removed email
  const [orgForm, setOrgForm] = useState({
    industry: "",
    companySize: "",
    roleLevel: "",
  });

  // All questions are multiple choice
  const total = questions.length;
  const progress = ((currentQ + 1) / total) * 100;
  const q = questions[currentQ];
  const isLastQuestion = currentQ === total - 1;

  const selectSingle = (optIndex: number) => {
    setAnswers({ ...answers, [q.id]: optIndex });
  };

  const hasAnswer = (): boolean => {
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
      surveyAnswers: { ...answers },
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
