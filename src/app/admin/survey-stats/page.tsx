// app/admin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Question texts for display - 20 multiple choice questions
const questionTexts: { [key: number]: string } = {
  1: "When your boss calls you outside work hours, what do you do?",
  2: "What is the lunch break culture at your workplace?",
  3: "How does your boss handle office politics?",
  4: "Your boss clearly has a favourite. What do you do?",
  5: "Has a boss ever taken credit for your work?",
  6: "Your boss is in a bad mood. What happens to the office?",
  7: "Has a boss ever used your salary or job security as emotional leverage?",
  8: "How would you describe the atmosphere your boss creates?",
  9: "When you disagree with your boss, what happens?",
  10: "How does your organisation handle promotions?",
  11: "Does your workplace have an HR department that functions?",
  12: "Have you ever had a workplace right violated?",
  13: "If you had a workplace grievance, what would you do?",
  14: "How does your organisation talk about staff wellbeing?",
  15: "Does your organisation have HR policies you've seen and understood?",
  16: "How environmentally or socially conscious is your workplace?",
  17: "What is your honest view of the typical Nigerian boss?",
  18: "How does your boss respond to feedback?",
  19: "If you could change one thing about how your boss leads, what would it be?",
  20: "How do you feel about your workplace right now?",
};

// Map answer values to readable text
const optionLabels: { [key: number]: { [key: number]: string } } = {
  1: {
    1: "Pick up immediately — always.",
    2: "Pick up, but I'm annoyed every time.",
    3: "Depends on the time and the boss.",
    4: "I finish what I'm doing, then call back.",
    5: "I have a whole system for avoiding it.",
  },
  2: {
    1: "One hour, protected, no questions asked.",
    2: "There's officially a break. Nobody takes it.",
    3: "Lunch happens at the desk while working.",
    4: "My boss eats. I watch.",
    5: "What is lunch.",
  },
  3: {
    1: "They rise above it completely.",
    2: "They play it well — probably too well.",
    3: "They are the source of most of it.",
    4: "They ignore it and call it professionalism.",
    5: "It's chaos and nobody is managing anything.",
  },
  4: {
    1: "Accept it and stay in my lane.",
    2: "Try to become the favourite too.",
    3: "Work twice as hard to make results undeniable.",
    4: "Complain about it with the other non-favourites.",
    5: "Start updating my CV.",
  },
  5: {
    1: "Yes — regularly.",
    2: "Yes — once or twice.",
    3: "I think so, but I can't prove it.",
    4: "No, my contributions are always acknowledged.",
    5: "I've learned to make sure they can't.",
  },
  6: {
    1: "Everyone feels it immediately and adjusts.",
    2: "The brave ones carry on normally.",
    3: "Meetings get called. Nobody knows why.",
    4: "Work slows down until they calm down.",
    5: "This is just called Tuesday.",
  },
  7: {
    1: "Yes — openly.",
    2: "Yes — it was framed as motivation.",
    3: "It was implied, never said directly.",
    4: "I don't think so.",
    5: "I left a job because of this.",
  },
  8: {
    1: "Safe — I can be honest with them.",
    2: "Professional but guarded — I watch what I say.",
    3: "Anxious — I'm always reading the room.",
    4: "Unpredictable — it changes with their mood.",
    5: "I've checked out. It doesn't reach me anymore.",
  },
  9: {
    1: "We discuss it — they're genuinely open.",
    2: "I raise it carefully and it sometimes lands.",
    3: "I package it so it feels like their idea.",
    4: "I keep it to myself. It's not worth it.",
    5: "I learned my lesson. I don't disagree anymore.",
  },
  10: {
    1: "Merit — clear criteria, transparent process.",
    2: "Seniority — you wait your turn.",
    3: "Relationships — who your boss likes.",
    4: "Whoever stays latest and shouts loudest.",
    5: "I genuinely don't know what the criteria is.",
  },
  11: {
    1: "Yes — accessible, useful, and trusted.",
    2: "Yes — but they work for the company, not the staff.",
    3: "It exists on paper. That's about it.",
    4: "HR is one person who also does three other jobs.",
    5: "No HR. The boss is HR.",
  },
  12: {
    1: "Yes — and I knew immediately.",
    2: "Yes — I only found out later.",
    3: "Possibly, but I wasn't sure enough to act.",
    4: "I don't know enough about my rights to say.",
    5: "Not that I'm aware of.",
  },
  13: {
    1: "Raise it formally through the proper channel.",
    2: "Talk to someone I trust internally first.",
    3: "Document everything quietly and wait.",
    4: "Start looking for another job.",
    5: "Nothing — it wouldn't make a difference.",
  },
  14: {
    1: "They walk the talk — it's genuine.",
    2: "They try, but it's mostly surface level.",
    3: "It's mentioned in the handbook. That's it.",
    4: "The concept has not arrived here yet.",
    5: "My boss thinks long hours are a wellness strategy.",
  },
  15: {
    1: "Yes — clear, accessible, and enforced.",
    2: "They exist but nobody reads them.",
    3: "I was given something at onboarding. Haven't seen it since.",
    4: "I don't think formal policies exist here.",
    5: "The policy is whatever the boss decides that day.",
  },
  16: {
    1: "Very — sustainability is built into how we operate.",
    2: "We talk about it but I haven't seen much action.",
    3: "There's a recycling bin somewhere. That's it.",
    4: "It has never come up.",
    5: "We're focused on survival. Green is not on the agenda.",
  },
  17: {
    1: "Hardworking, demanding, but fair when it matters.",
    2: "Talented but uncomfortable with being challenged.",
    3: "Loyal to power, not to people.",
    4: "Managing the way they were managed — and it shows.",
    5: "Trying their best in a system that wasn't built for good leadership.",
  },
  18: {
    1: "Openly — they encourage it.",
    2: "They say they want it. The reaction tells a different story.",
    3: "Feedback flows one direction here.",
    4: "I've never seen anyone try. I'm not going first.",
    5: "Someone tried once. We don't talk about it.",
  },
  19: {
    1: "Separate their mood from their management.",
    2: "Give credit where it's due.",
    3: "Understand that respect is not the same as fear.",
    4: "Read the labour law.",
    5: "Just be human about it. That's all.",
  },
  20: {
    1: "Good — I feel valued and it shows.",
    2: "Fine. It pays the bills and I've made peace with that.",
    3: "Tired. I'm doing good work in a system that doesn't reward it.",
    4: "I'm here physically. I left mentally a while ago.",
    5: "Looking. This is not it.",
  },
};

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/survey");
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderPercentageBar = (percentage: number) => (
    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
      <div
        className="bg-gradient-to-r from-[#8b1a1a] to-[#c0392b] h-full rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1009] flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  // All 20 multiple choice questions
  const allQuestions = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-[#1a1009]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2c1810] via-[#1a0c06] to-[#3d1515] px-6 md:px-[60px] py-10 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-white">
            Survey Analytics Dashboard
          </h1>
          <div className="flex gap-6 mt-2">
            <p className="text-white/50">
              Total Responses:{" "}
              <span className="text-[#c0392b] font-bold text-xl">
                {stats?.totalResponses || 0}
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="bg-[#c0392b] text-white px-4 py-2 rounded-full cursor-pointer"
        >
          Home
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10">
        <div className="space-y-6">
          {allQuestions.map((questionId, index) => {
            const questionStats = stats?.analytics?.[questionId] || [];

            // Calculate total responses for this question
            const totalForQuestion = questionStats?.reduce(
              (sum: number, item: any) => sum + item.count,
              0,
            ) || 0;

            return (
              <div
                key={questionId}
                className="bg-white/5 rounded-xl overflow-hidden border border-white/10"
              >
                {/* Question Header - Click to expand/collapse */}
                <button
                  onClick={() =>
                    setExpandedQuestion(
                      expandedQuestion === questionId ? null : questionId,
                    )
                  }
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <div>
                    <span className="text-[#c0392b] font-bold text-sm">
                      Q{index + 1}
                    </span>
                    <h3 className="text-white font-semibold text-lg mt-1">
                      {questionTexts[questionId]}
                    </h3>
                  </div>
                  <div className="text-white/40 text-sm">
                    {totalForQuestion} responses
                    <span className="ml-2">
                      {expandedQuestion === questionId ? "▼" : "▶"}
                    </span>
                  </div>
                </button>

                {/* Expandable content */}
                {expandedQuestion === questionId && (
                  <div className="px-6 pb-6 space-y-4">
                    {questionStats && questionStats.length > 0 ? (
                      questionStats.map((item: any, idx: number) => {
                        const label =
                          optionLabels[questionId]?.[item.answerValue] ||
                          `Option ${item.answerValue}`;
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-white/70 text-sm">
                                {label}
                              </span>
                              <div className="text-right">
                                <span className="text-[#c0392b] font-bold">
                                  {item.percentage}%
                                </span>
                                <span className="text-white/40 text-xs ml-2">
                                  ({item.count})
                                </span>
                              </div>
                            </div>
                            {renderPercentageBar(item.percentage)}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-white/40 text-center py-4">
                        No responses yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Demographics Section - Always visible */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">Demographics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Industry */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">🏢 Industry</h3>
              <div className="space-y-3">
                {stats?.demographics
                  ?.filter((d: any) => d.type === "industry")
                  .map((item: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">{item.name}</span>
                        <span className="text-white">
                          {item.percentage}% ({item.count})
                        </span>
                      </div>
                      {renderPercentageBar(item.percentage)}
                    </div>
                  ))}
              </div>
            </div>

            {/* Company Size */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">📊 Company Size</h3>
              <div className="space-y-3">
                {stats?.demographics
                  ?.filter((d: any) => d.type === "company_size")
                  .map((item: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">{item.name}</span>
                        <span className="text-white">
                          {item.percentage}% ({item.count})
                        </span>
                      </div>
                      {renderPercentageBar(item.percentage)}
                    </div>
                  ))}
              </div>
            </div>

            {/* Role Level */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">👔 Role Level</h3>
              <div className="space-y-3">
                {stats?.demographics
                  ?.filter((d: any) => d.type === "role_level")
                  .map((item: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/60">{item.name}</span>
                        <span className="text-white">
                          {item.percentage}% ({item.count})
                        </span>
                      </div>
                      {renderPercentageBar(item.percentage)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
