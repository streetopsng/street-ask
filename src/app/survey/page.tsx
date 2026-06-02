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
    question: "When your boss calls you outside work hours, what do you do?",
    options: [
      { letter: "A", emoji: "", text: "Pick up immediately — always." },
      { letter: "B", emoji: "", text: "Pick up, but I'm annoyed every time." },
      { letter: "C", emoji: "", text: "Depends on the time and the boss." },
      { letter: "D", emoji: "", text: "I finish what I'm doing, then call back." },
      { letter: "E", emoji: "", text: "I have a whole system for avoiding it." },
    ],
    type: "single answer",
  },
  {
    id: 2,
    question: "What is the lunch break culture at your workplace?",
    options: [
      { letter: "A", emoji: "", text: "One hour, protected, no questions asked." },
      { letter: "B", emoji: "", text: "There's officially a break. Nobody takes it." },
      { letter: "C", emoji: "", text: "Lunch happens at the desk while working." },
      { letter: "D", emoji: "", text: "My boss eats. I watch." },
      { letter: "E", emoji: "", text: "What is lunch." },
    ],
    type: "single answer",
  },
  {
    id: 3,
    question: "How does your boss handle office politics?",
    options: [
      { letter: "A", emoji: "", text: "They rise above it completely." },
      { letter: "B", emoji: "", text: "They play it well — probably too well." },
      { letter: "C", emoji: "", text: "They are the source of most of it." },
      { letter: "D", emoji: "", text: "They ignore it and call it professionalism." },
      { letter: "E", emoji: "", text: "It's chaos and nobody is managing anything." },
    ],
    type: "single answer",
  },
  {
    id: 4,
    question: "Your boss clearly has a favourite. What do you do?",
    options: [
      { letter: "A", emoji: "", text: "Accept it and stay in my lane." },
      { letter: "B", emoji: "", text: "Try to become the favourite too." },
      { letter: "C", emoji: "", text: "Work twice as hard to make results undeniable." },
      { letter: "D", emoji: "", text: "Complain about it with the other non-favourites." },
      { letter: "E", emoji: "", text: "Start updating my CV." },
    ],
    type: "single answer",
  },
  {
    id: 5,
    question: "Has a boss ever taken credit for your work?",
    options: [
      { letter: "A", emoji: "", text: "Yes — regularly." },
      { letter: "B", emoji: "", text: "Yes — once or twice." },
      { letter: "C", emoji: "", text: "I think so, but I can't prove it." },
      { letter: "D", emoji: "", text: "No, my contributions are always acknowledged." },
      { letter: "E", emoji: "", text: "I've learned to make sure they can't." },
    ],
    type: "single answer",
  },
  {
    id: 6,
    question: "Your boss is in a bad mood. What happens to the office?",
    options: [
      { letter: "A", emoji: "", text: "Everyone feels it immediately and adjusts." },
      { letter: "B", emoji: "", text: "The brave ones carry on normally." },
      { letter: "C", emoji: "", text: "Meetings get called. Nobody knows why." },
      { letter: "D", emoji: "", text: "Work slows down until they calm down." },
      { letter: "E", emoji: "", text: "This is just called Tuesday." },
    ],
    type: "single answer",
  },
  {
    id: 7,
    question: "Has a boss ever used your salary or job security as emotional leverage?",
    options: [
      { letter: "A", emoji: "", text: "Yes — openly." },
      { letter: "B", emoji: "", text: "Yes — it was framed as motivation." },
      { letter: "C", emoji: "", text: "It was implied, never said directly." },
      { letter: "D", emoji: "", text: "I don't think so." },
      { letter: "E", emoji: "", text: "I left a job because of this." },
    ],
    type: "single answer",
  },
  {
    id: 8,
    question: "How would you describe the atmosphere your boss creates?",
    options: [
      { letter: "A", emoji: "", text: "Safe — I can be honest with them." },
      { letter: "B", emoji: "", text: "Professional but guarded — I watch what I say." },
      { letter: "C", emoji: "", text: "Anxious — I'm always reading the room." },
      { letter: "D", emoji: "", text: "Unpredictable — it changes with their mood." },
      { letter: "E", emoji: "", text: "I've checked out. It doesn't reach me anymore." },
    ],
    type: "single answer",
  },
  {
    id: 9,
    question: "When you disagree with your boss, what happens?",
    options: [
      { letter: "A", emoji: "", text: "We discuss it — they're genuinely open." },
      { letter: "B", emoji: "", text: "I raise it carefully and it sometimes lands." },
      { letter: "C", emoji: "", text: "I package it so it feels like their idea." },
      { letter: "D", emoji: "", text: "I keep it to myself. It's not worth it." },
      { letter: "E", emoji: "", text: "I learned my lesson. I don't disagree anymore." },
    ],
    type: "single answer",
  },
  {
    id: 10,
    question: "How does your organisation handle promotions?",
    options: [
      { letter: "A", emoji: "", text: "Merit — clear criteria, transparent process." },
      { letter: "B", emoji: "", text: "Seniority — you wait your turn." },
      { letter: "C", emoji: "", text: "Relationships — who your boss likes." },
      { letter: "D", emoji: "", text: "Whoever stays latest and shouts loudest." },
      { letter: "E", emoji: "", text: "I genuinely don't know what the criteria is." },
    ],
    type: "single answer",
  },
  {
    id: 11,
    question: "Does your workplace have an HR department that functions?",
    options: [
      { letter: "A", emoji: "", text: "Yes — accessible, useful, and trusted." },
      { letter: "B", emoji: "", text: "Yes — but they work for the company, not the staff." },
      { letter: "C", emoji: "", text: "It exists on paper. That's about it." },
      { letter: "D", emoji: "", text: "HR is one person who also does three other jobs." },
      { letter: "E", emoji: "", text: "No HR. The boss is HR." },
    ],
    type: "single answer",
  },
  {
    id: 12,
    question: "Have you ever had a workplace right violated?",
    options: [
      { letter: "A", emoji: "", text: "Yes — and I knew immediately." },
      { letter: "B", emoji: "", text: "Yes — I only found out later." },
      { letter: "C", emoji: "", text: "Possibly, but I wasn't sure enough to act." },
      { letter: "D", emoji: "", text: "I don't know enough about my rights to say." },
      { letter: "E", emoji: "", text: "Not that I'm aware of." },
    ],
    type: "single answer",
  },
  {
    id: 13,
    question: "If you had a workplace grievance, what would you do?",
    options: [
      { letter: "A", emoji: "", text: "Raise it formally through the proper channel." },
      { letter: "B", emoji: "", text: "Talk to someone I trust internally first." },
      { letter: "C", emoji: "", text: "Document everything quietly and wait." },
      { letter: "D", emoji: "", text: "Start looking for another job." },
      { letter: "E", emoji: "", text: "Nothing — it wouldn't make a difference." },
    ],
    type: "single answer",
  },
  {
    id: 14,
    question: "How does your organisation talk about staff wellbeing?",
    options: [
      { letter: "A", emoji: "", text: "They walk the talk — it's genuine." },
      { letter: "B", emoji: "", text: "They try, but it's mostly surface level." },
      { letter: "C", emoji: "", text: "It's mentioned in the handbook. That's it." },
      { letter: "D", emoji: "", text: "The concept has not arrived here yet." },
      { letter: "E", emoji: "", text: "My boss thinks long hours are a wellness strategy." },
    ],
    type: "single answer",
  },
  {
    id: 15,
    question: "Does your organisation have HR policies you've seen and understood?",
    options: [
      { letter: "A", emoji: "", text: "Yes — clear, accessible, and enforced." },
      { letter: "B", emoji: "", text: "They exist but nobody reads them." },
      { letter: "C", emoji: "", text: "I was given something at onboarding. Haven't seen it since." },
      { letter: "D", emoji: "", text: "I don't think formal policies exist here." },
      { letter: "E", emoji: "", text: "The policy is whatever the boss decides that day." },
    ],
    type: "single answer",
  },
  {
    id: 16,
    question: "How environmentally or socially conscious is your workplace?",
    options: [
      { letter: "A", emoji: "", text: "Very — sustainability is built into how we operate." },
      { letter: "B", emoji: "", text: "We talk about it but I haven't seen much action." },
      { letter: "C", emoji: "", text: "There's a recycling bin somewhere. That's it." },
      { letter: "D", emoji: "", text: "It has never come up." },
      { letter: "E", emoji: "", text: "We're focused on survival. Green is not on the agenda." },
    ],
    type: "single answer",
  },
  {
    id: 17,
    question: "What is your honest view of the typical Nigerian boss?",
    options: [
      { letter: "A", emoji: "", text: "Hardworking, demanding, but fair when it matters." },
      { letter: "B", emoji: "", text: "Talented but uncomfortable with being challenged." },
      { letter: "C", emoji: "", text: "Loyal to power, not to people." },
      { letter: "D", emoji: "", text: "Managing the way they were managed — and it shows." },
      { letter: "E", emoji: "", text: "Trying their best in a system that wasn't built for good leadership." },
    ],
    type: "single answer",
  },
  {
    id: 18,
    question: "How does your boss respond to feedback?",
    options: [
      { letter: "A", emoji: "", text: "Openly — they encourage it." },
      { letter: "B", emoji: "", text: "They say they want it. The reaction tells a different story." },
      { letter: "C", emoji: "", text: "Feedback flows one direction here." },
      { letter: "D", emoji: "", text: "I've never seen anyone try. I'm not going first." },
      { letter: "E", emoji: "", text: "Someone tried once. We don't talk about it." },
    ],
    type: "single answer",
  },
  {
    id: 19,
    question: "If you could change one thing about how your boss leads, what would it be?",
    options: [
      { letter: "A", emoji: "", text: "Separate their mood from their management." },
      { letter: "B", emoji: "", text: "Give credit where it's due." },
      { letter: "C", emoji: "", text: "Understand that respect is not the same as fear." },
      { letter: "D", emoji: "", text: "Read the labour law." },
      { letter: "E", emoji: "", text: "Just be human about it. That's all." },
    ],
    type: "single answer",
  },
  {
    id: 20,
    question: "How do you feel about your workplace right now?",
    options: [
      { letter: "A", emoji: "", text: "Good — I feel valued and it shows." },
      { letter: "B", emoji: "", text: "Fine. It pays the bills and I've made peace with that." },
      { letter: "C", emoji: "", text: "Tired. I'm doing good work in a system that doesn't reward it." },
      { letter: "D", emoji: "", text: "I'm here physically. I left mentally a while ago." },
      { letter: "E", emoji: "", text: "Looking. This is not it." },
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
  const [showPrelude, setShowPrelude] = useState(true);
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
          {/* Prelude — first slide */}
          {showPrelude ? (
            <div className="text-center">
              <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#c0392b] mb-6">
                Prelude
              </div>
              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed mb-4">
                You've survived the salary conversation. Now we're going deeper.
              </p>
              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed mb-4">
                This month, StreetAsk is asking about the thing that shapes your entire work experience — the Nigerian boss. How they lead. How they make you feel. Whether they follow any rules. And whether any of it is working.
              </p>
              <p className="text-white/70 text-sm md:text-[15px] leading-relaxed mb-4">
                Five topics. Twenty questions. All anonymous. All honest.
              </p>
              <p className="text-white/50 text-sm italic mb-8">
                Because someone has to ask.
              </p>
              <button
                onClick={() => setShowPrelude(false)}
                className="bg-[#8b1a1a] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold flex items-center gap-2 mx-auto transition-all hover:bg-[#c0392b] hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(139,26,26,0.3)]"
              >
                Begin Survey →
              </button>
            </div>
          ) : (
            <div>
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
          )}
        </div>
      </div>
    </div>
  );
}
