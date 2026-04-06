// app/admin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Question texts for display
const questionTexts: { [key: number]: string } = {
  1: "How common is romantic attraction between colleagues?",
  2: "Have you ever had romantic feelings for someone you worked with?",
  3: "How many people do you know who were involved with a colleague?",
  4: "What Actually Happens (Open ended)",
  5: "Have you ever been in a romantic relationship with a colleague?",
  6: "How did it start? (Select all that apply)",
  7: "Was the relationship between same level or senior?",
  8: "Did anyone at work find out?",
  9: "THE WORK PART (Open ended)",
  10: "What happens to work performance?",
  11: "Have you ever felt uncomfortable?",
  12: "If relationship ended badly, what happens?",
  13: "WHAT DOES THE ORGANIZATION DO? (Open ended)",
  14: "Does your organisation have a formal policy?",
  15: "Who would you tell first?",
  16: "Do Nigerian workplaces handle this well?",
  17: "Final thoughts (Open ended)",
};

// Map answer values to readable text
const optionLabels: { [key: number]: { [key: number]: string } } = {
  1: {
    1: "Very common — happens everywhere",
    2: "Fairly common — more than people admit",
    3: "It happens but people keep it quiet",
    4: "Rare — most people are professional",
    5: "I genuinely don't know",
  },
  2: {
    1: "Yes, and I acted on it",
    2: "Yes, but I kept it to myself",
    3: "No, never",
    4: "I'm not sure — maybe",
  },
  3: {
    1: "None that I know of",
    2: "One or two people",
    3: "A lot — it's an open secret",
    4: "I'd rather not say",
  },
  5: {
    1: "Yes, after one of us left",
    2: "Yes, while at same company",
    3: "No, but it came close",
    4: "No, never",
  },
  6: {
    1: "Working closely together on a project",
    2: "After-work drinks or a team event",
    3: "WhatsApp or DM conversations",
    4: "It was obvious from day one",
    5: "One person made a move",
    6: "It just happened gradually",
    7: "Prefer not to say",
  },
  7: {
    1: "Same level",
    2: "One person was more senior",
    3: "Manager and direct report",
    4: "Not applicable",
    5: "Prefer not to say",
  },
  8: {
    1: "Yes — most people knew",
    2: "Yes — a few people knew",
    3: "Only one or two people",
    4: "No — completely private",
    5: "Prefer not to say",
  },
  10: {
    1: "Performance improves",
    2: "No real change",
    3: "Depends how they handle it",
    4: "Performance drops",
    5: "Creates team problems",
  },
  11: {
    1: "Yes, significantly",
    2: "Yes, mildly",
    3: "Not really",
    4: "No, never",
  },
  12: {
    1: "One person leaves",
    2: "Stay professional but awkward",
    3: "Team feels it for months",
    4: "Depends on seniority",
    5: "Never seen it end badly",
    6: "Never seen it end well",
  },
  14: {
    1: "Yes and I know it",
    2: "Yes but never read it",
    3: "Think there is one",
    4: "Definitely no policy",
    5: "I don't know",
  },
  15: {
    1: "Nobody — keep private",
    2: "Close colleague I trust",
    3: "HR or management",
    4: "Whoever relevant",
    5: "Friends outside work",
  },
  16: {
    1: "Yes — professionally",
    2: "Somewhat — manage obvious cases",
    3: "No — ignored or handled badly",
    4: "Shouldn't need managing",
    5: "Never thought about it",
  },
};

// Helper to get readable answer text
const getAnswerLabel = (questionId: number, answerValue: any): string => {
  // Handle text answers (open ended questions)
  if ([4, 9, 13, 17].includes(questionId)) {
    const text = answerValue?.text || answerValue;
    return text
      ? text.length > 50
        ? text.substring(0, 50) + "..."
        : text
      : "No response";
  }

  // Handle single choice answers (just a number)
  if (typeof answerValue === "number") {
    return optionLabels[questionId]?.[answerValue] || `Option ${answerValue}`;
  }

  // Handle multiple choice answers (object with true/false)
  if (typeof answerValue === "object" && !Array.isArray(answerValue)) {
    const selected = Object.entries(answerValue)
      .filter(([, selected]) => selected === true)
      .map(
        ([key]) => optionLabels[questionId]?.[parseInt(key)] || `Option ${key}`,
      );
    return selected.length > 0 ? selected.join(", ") : "None selected";
  }

  // Handle scale answers
  if (typeof answerValue === "object" && answerValue.rating) {
    return `Rating: ${answerValue.rating}/5`;
  }

  return String(answerValue);
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

  // Questions that are open-ended (just show sample responses)
  const openEndedQuestions = [4, 9, 13, 17];
  // Regular questions with percentages
  const regularQuestions = [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16];

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
        {/* ALL QUESTIONS ON ONE PAGE - No need to click through */}
        <div className="space-y-6">
          {regularQuestions.map((questionId) => {
            const questionStats = stats?.analytics?.[questionId] || [];
            const totalForQuestion = questionStats.reduce(
              (sum: number, item: any) => sum + item.count,
              0,
            );

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
                      Q{questionId}
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
                    {questionStats.map((item: any, idx: number) => {
                      const label = getAnswerLabel(
                        questionId,
                        item.answerValue,
                      );
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
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Open Ended Questions Section - Show sample responses */}
          <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
            <button
              onClick={() =>
                setExpandedQuestion(expandedQuestion === 999 ? null : 999)
              }
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
            >
              <div>
                <h3 className="text-white font-semibold text-lg">
                  📝 Open Ended Responses
                </h3>
                <p className="text-white/40 text-sm">
                  What people actually said
                </p>
              </div>
              <div className="text-white/40 text-sm">
                {expandedQuestion === 999 ? "▼" : "▶"}
              </div>
            </button>

            {expandedQuestion === 999 && (
              <div className="px-6 pb-6">
                {openEndedQuestions.map((questionId) => {
                  const responses = stats?.analytics?.[questionId] || [];
                  return (
                    <div key={questionId} className="mb-6 last:mb-0">
                      <h4 className="text-[#c0392b] font-semibold mb-3">
                        Q{questionId}: {questionTexts[questionId]}
                      </h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {responses
                          .slice(0, 10)
                          .map((item: any, idx: number) => {
                            const text = getAnswerLabel(
                              questionId,
                              item.answerValue,
                            );
                            return (
                              <div
                                key={idx}
                                className="bg-white/5 rounded-lg p-3"
                              >
                                <p className="text-white/70 text-sm">
                                  "{text}"
                                </p>
                              </div>
                            );
                          })}
                        {responses.length === 0 && (
                          <p className="text-white/40 text-sm italic">
                            No responses yet
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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
