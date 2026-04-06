"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SurveyAnswers {
  [questionId: number]: any;
  email?: string;
  demo?: {
    industry: string;
    size: string;
    role: string;
  };
}

export default function ResultsPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<SurveyAnswers>({});

  useEffect(() => {
    const stored = localStorage.getItem("surveyAnswers");
    if (stored) {
      setAnswers(JSON.parse(stored));
      console.log("Submitted Answers:", JSON.parse(stored));
    }
  }, []);

  const questions = [
    {
      id: 1,
      text: "Has a workplace relationship ever affected your performance at work?",
      options: [
        "Yes, positively — I worked better.",
        "Yes, negatively — it was a distraction.",
        "Both at different times.",
        "No, never been in that situation.",
      ],
    },
    {
      id: 2,
      text: "What is your honest position on office romance?",
      options: [
        "It happens, it is fine, people are adults.",
        "It is risky but I understand why people do it.",
        "It should not happen — too many complications.",
        "I have done it. I am not saying more than that.",
      ],
    },
    {
      id: 3,
      text: "How much does knowing two colleagues are in a relationship change how you see team dynamics?",
    },
    {
      id: 4,
      text: "What would make you uncomfortable about a colleague relationship?",
      options: [
        "One of them is the other's manager.",
        "They discuss team matters in private before meetings.",
        "Everyone can tell but nobody is saying anything.",
        "Things end badly and the whole team feels it.",
        "Actually, nothing — it is their business.",
      ],
    },
    {
      id: 5,
      text: "If you developed feelings for a colleague, what would you actually do?",
      options: [
        "Tell them. Life is short.",
        "Keep it to myself and focus on work.",
        "Start job hunting immediately.",
        "Depends on the person, honestly.",
      ],
    },
    {
      id: 6,
      text: "How open is the culture at your workplace about personal relationships?",
    },
    {
      id: 7,
      text: "What do Nigerian workplaces get most wrong about relationships at work?",
      options: [
        "They pretend it does not happen when everyone knows it does.",
        "They make policies instead of having honest conversations.",
        "They treat it as a discipline issue instead of a people issue.",
        "They only act when things go wrong, never before.",
      ],
    },
  ];

  const getAnswerText = (qId: number): string => {
    const answer = answers[qId];
    if (answer === undefined) return "Not answered";

    const q = questions.find((q) => q.id === qId);

    if (qId === 3 || qId === 6) {
      const labels = [
        "Not at all",
        "Barely",
        "Somewhat",
        "Quite a bit",
        "Very much",
      ];
      return `${answer} out of 5 — ${labels[answer - 1]}`;
    }

    if (typeof answer === "object" && !Array.isArray(answer)) {
      const selected = Object.keys(answer)
        .map((i) => q?.options?.[parseInt(i)])
        .filter(Boolean)
        .join(", ");
      return selected || "Nothing selected";
    }

    if (typeof answer === "number" && q?.options) {
      return q.options[answer];
    }

    return String(answer);
  };

  return (
    <div className="min-h-screen bg-[#f5efe6]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2c1810] via-[#1a0c06] to-[#3d1515] px-5 md:px-[60px] py-10 md:py-15 text-center relative overflow-hidden">
        <div className="absolute text-[300px] opacity-3 top-[-60px] left-1/2 -translate-x-1/2 pointer-events-none select-none">
          🎉
        </div>
        <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-5 py-2 text-[13px] text-white/70 mb-7">
          <span className="w-2 h-2 bg-[#2d6a4f] rounded-full animate-pulse"></span>
          Response recorded
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl md:text-6xl font-black text-white leading-tight mb-3">
          You just added your
          <br />
          voice to the{" "}
          <em className="text-[#d4956a] italic not-italic">palava.</em>
        </h2>
        <p className="text-sm md:text-base text-white/55 max-w-[500px] mx-auto mb-9 leading-relaxed">
          Your anonymous response has been recorded. Share this so others can
          weigh in too.
        </p>

        {/* Share Card */}
        <div className="max-w-[480px] mx-auto">
          <div className="bg-white rounded-2xl p-9 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,26,26,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(212,149,106,0.05)_0%,transparent_50%)] pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-[#8b1a1a] text-white font-bold text-[11px] w-[30px] h-[30px] flex items-center justify-center rounded">
                SO
              </div>
              <div>
                <div className="font-bold text-sm text-[#1a1009]">
                  Street Ask
                </div>
                <div className="text-[11px] text-[#8a7a68]">
                  Issue 01 · April 2026
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#fff0e6] to-[#ffe4d4] rounded-2xl p-7 text-center mb-5 relative">
              <div className="flex items-end justify-center gap-1 text-5xl mb-3">
                <span className="text-5xl">👩🏾‍💼</span>
                <span className="text-4xl mb-1">💌</span>
                <span className="text-5xl">👨🏾‍💼</span>
              </div>
              <div className="bg-white rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#1a1009] inline-block shadow-[0_2px_8px_rgba(0,0,0,0.08)] relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-white after:border-b-0">
                Office romance? I have THOUGHTS. 👀
              </div>
            </div>

            <div className="font-['Playfair_Display'] text-lg font-bold text-[#1a1009] leading-tight mb-2">
              I just took the StreetOps survey on office romance.
            </div>
            <div className="text-[13px] text-[#8a7a68] mb-5 leading-relaxed">
              Nigerian workers are telling the truth about workplace
              relationships. Anonymous. No judgment. Take yours too.
            </div>
            <div className="text-xs font-semibold text-[#8b1a1a] tracking-[1px] uppercase">
              streetask.ng/romance
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap gap-2.5 justify-center mt-7">
            <button className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#25d366] text-white">
              <span>📱</span> WhatsApp
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#1da1f2] text-white">
              <span>🐦</span> Twitter
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#0a66c2] text-white">
              <span>💼</span> LinkedIn
            </button>
            <button className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#8b1a1a] text-white">
              <span>🔗</span> Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* Community Strip */}
      <div className="bg-[#1a1009] px-5 md:px-[60px] py-10 md:py-15 text-center">
        <div className="flex items-center justify-center gap-[-8px] mb-4 flex-wrap">
          <div className="w-10 h-10 rounded-full border-2 border-[#1a1009] text-xl flex items-center justify-center bg-[#ede4d7] -ml-2 first:ml-0">
            👩🏾
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#1a1009] text-xl flex items-center justify-center bg-[#ede4d7] -ml-2">
            👨🏽
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#1a1009] text-xl flex items-center justify-center bg-[#ede4d7] -ml-2">
            👩🏿
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#1a1009] text-xl flex items-center justify-center bg-[#ede4d7] -ml-2">
            👨🏾
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#1a1009] text-xl flex items-center justify-center bg-[#ede4d7] -ml-2">
            👩🏼
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#1a1009] text-xl flex items-center justify-center bg-[#ede4d7] -ml-2">
            👨🏿
          </div>
          <span className="ml-2 text-sm font-semibold text-white/60">
            +307 others
          </span>
        </div>
        <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-white mb-2">
          You are one of{" "}
          <em className="text-[#d4956a] italic not-italic">313</em> Nigerian
          workers who spoke up.
        </h3>
        <p className="text-sm text-white/40 mb-6">
          The report drops in April. We will tell you what everyone said.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-transparent border border-white/20 text-white/70 px-7 py-3 rounded-lg text-sm cursor-pointer hover:border-white/50 hover:text-white transition-all"
        >
          Back to Street Ask
        </button>
      </div>

      {/* Footer */}
      <div className="bg-[#ede4d7] px-5 md:px-[60px] py-10 md:py-15 text-center">
        <p className="text-sm text-[#5c4a32] mb-3">
          The Street Pulse report for Issue 01 drops on the first Tuesday of
          April 2026. If you dropped your email, you will get it first.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-[#8b1a1a] text-white px-8 py-3.5 rounded-lg text-[15px] font-semibold cursor-pointer hover:bg-[#c0392b] transition-all"
        >
          Back to Street Ask
        </button>
      </div>
    </div>
  );
}
