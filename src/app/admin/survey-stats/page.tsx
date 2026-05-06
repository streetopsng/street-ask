// app/admin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Question texts for display - 15 survey questions + 8 street interview questions
const questionTexts: { [key: number]: string } = {
  1: "When your salary alert drops, what is your honest first thought?",
  2: "How satisfied are you with your current compensation — total package included?",
  3: "Has inflation changed how far your salary goes in the last 12 months?",
  4: "Which statement best describes your relationship with your salary right now?",
  5: "How does your pay reflect your qualifications and experience?",
  6: "Did your educational qualifications meaningfully increase your earning power?",
  7: "Have you ever negotiated your salary — at any point in your career?",
  8: "Do you know what your colleagues earn — and does it affect you?",
  9: "Do you have income outside your primary job — and why?",
  10: "If you earn in naira, how has naira devaluation affected your financial reality?",
  11: "Do you think your industry pays fairly compared to others in Nigeria?",
  12: "Has staying loyal to one organisation paid off financially for you?",
  13: "How would you rate your non-salary benefits — health, pension, leave, bonuses?",
  14: "Compared to peers with similar experience, how do you feel about your pay?",
  15: "In five years, what do you expect your compensation situation to look like?",
  // Street Interview Questions
  16: "Can you tell us — roughly — are you earning enough to live comfortably in this city right now?",
  17: "When last did your salary increase — and did it feel like a real raise, or just a number on paper?",
  18: "If you found out your colleague doing the exact same job as you earns 40% more — what would you do?",
  19: "Do you have a side hustle? Be honest — is it a choice or a necessity?",
  20: "Does your degree or qualification actually show up in your salary? Or was it just a ticket to get in the door?",
  22: "If you could change one thing about how Nigerian employers pay their staff — what would it be?",
};

// Map answer values to readable text
const optionLabels: { [key: number]: { [key: number]: string } } = {
  1: {
    1: "Finally — I earned this.",
    2: "It's fine. Not great, not terrible.",
    3: "It's insulting but I have bills to pay.",
    4: "I immediately open job boards.",
    5: "I don't even check anymore. What's the point.",
  },
  2: {
    1: "Very satisfied — I feel genuinely valued.",
    2: "Somewhat satisfied — it could be better but I'm not complaining.",
    3: "Neutral — I've accepted it.",
    4: "Dissatisfied — I know I am underpaid.",
    5: "Very dissatisfied — this is not sustainable.",
  },
  3: {
    1: "Yes — dramatically. My salary is worth significantly less than it was.",
    2: "Yes — noticeably. I've had to cut back on things.",
    3: "Somewhat — I've felt it but I've managed.",
    4: "Not really — I received a raise that kept pace.",
    5: "No — my expenses haven't changed much.",
  },
  4: {
    1: "It covers my needs and I have something left over.",
    2: "It covers my needs but barely — nothing is left.",
    3: "I cover my needs by supplementing with side income.",
    4: "My salary alone does not cover my basic monthly needs.",
    5: "I rely on family support or savings to bridge the gap.",
  },
  5: {
    1: "Fairly — I am paid in line with what I bring.",
    2: "I am slightly underpaid given my experience.",
    3: "I am significantly underpaid. The gap is real.",
    4: "I am overqualified for this role and it shows in the pay.",
    5: "I've stopped thinking about it. Credentials don't guarantee anything here.",
  },
  6: {
    1: "Yes — my degree or certifications directly unlocked better pay.",
    2: "Somewhat — it got me in the door but the pay hasn't reflected it.",
    3: "Not really — I know people without my qualifications earning more than me.",
    4: "No — experience and connections mattered far more than paper.",
    5: "I'm still paying off the education and the salary hasn't caught up.",
  },
  7: {
    1: "Yes, regularly — I always negotiate.",
    2: "Yes, once or twice — with mixed results.",
    3: "I tried once and it didn't go well. I haven't since.",
    4: "No — I was too uncomfortable to try.",
    5: "No — in Nigerian workplaces, you take what they offer or leave.",
  },
  8: {
    1: "Yes, I know — and I'm fine with it.",
    2: "Yes, I know — and it bothers me significantly.",
    3: "I have a rough idea and I'd rather not confirm it.",
    4: "I don't know and I genuinely don't want to.",
    5: "I don't know but I wish Nigerian workplaces were more open about pay.",
  },
  9: {
    1: "Yes — by choice. I like the extra income and independence.",
    2: "Yes — because my salary alone is not enough to survive on.",
    3: "Yes — because I'm building something in case this job ends.",
    4: "I've tried but haven't found something consistent yet.",
    5: "No — my primary job pays well enough that I don't need to.",
  },
  10: {
    1: "Severely — my effective purchasing power has collapsed.",
    2: "Significantly — I've had to restructure how I spend and save.",
    3: "Somewhat — I've noticed it but adapted.",
    4: "Not much — my expenses are mostly local and stable.",
    5: "I earn in a foreign currency — this doesn't apply to me.",
  },
  11: {
    1: "Yes — my sector is competitive and pays well.",
    2: "It's average. Not the best, not the worst.",
    3: "No — I'm in a sector that is chronically underpaid.",
    4: "Pay varies wildly within my sector — it depends entirely on the employer.",
    5: "I honestly don't know what fair looks like anymore.",
  },
  12: {
    1: "Yes — my raises and promotions have been meaningful over time.",
    2: "Not really — small increments that don't match my growth.",
    3: "No — I've learned that job-hopping is the only real raise in Nigeria.",
    4: "I haven't stayed long enough anywhere to find out.",
    5: "Loyalty is a tax Nigerian workers pay to employers, not the other way around.",
  },
  13: {
    1: "Excellent — they add real value to my total compensation.",
    2: "Decent — they exist but nothing special.",
    3: "Minimal — what benefits? It's just the salary.",
    4: "On paper they exist. In practice they're inaccessible or unreliable.",
    5: "I factor them out entirely when calculating if a job is worth it.",
  },
  14: {
    1: "I earn more — and I worked for it.",
    2: "We're roughly similar. Feels fair.",
    3: "I earn less and I know why — it was a conscious tradeoff.",
    4: "I earn less and I don't fully understand why. It frustrates me.",
    5: "I stopped comparing. It only makes it worse.",
  },
  15: {
    1: "Better — I have a clear plan and I'm executing it.",
    2: "Better — if the economy cooperates.",
    3: "About the same. I'm not optimistic.",
    4: "Honestly? I'm not sure Nigeria is where I'll be building my career.",
    5: "I've stopped planning that far ahead. Survival is the current strategy.",
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

  // All questions: 15 multiple choice + 6 text questions (optional)
  const regularQuestions = Array.from({ length: 15 }, (_, index) => index + 1);
  const textQuestions = [16, 17, 18, 19, 20, 22];
  const allQuestions = [...regularQuestions, ...textQuestions];

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
            const isTextQuestion = questionId >= 16;
            const questionStats = isTextQuestion
              ? null
              : stats?.analytics?.[questionId] || [];
            const textResponses = isTextQuestion
              ? stats?.textResponses?.[questionId] || []
              : null;

            // Calculate total responses for this question
            const totalForQuestion = isTextQuestion
              ? textResponses?.length || 0
              : questionStats?.reduce(
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
                      {isTextQuestion ? "STREET" : `Q${index + 1}`}
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
                    {isTextQuestion ? (
                      // Text question responses
                      textResponses && textResponses.length > 0 ? (
                        <div className="space-y-3">
                          {textResponses.map((response: any, idx: number) => (
                            <div
                              key={idx}
                              className="bg-white/5 rounded-lg p-4"
                            >
                              <p className="text-white/80 text-sm leading-relaxed">
                                "{response.text}"
                              </p>
                              <p className="text-white/40 text-xs mt-2">
                                {new Date(
                                  response.submittedAt,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-white/40 text-center py-4">
                          No responses yet
                        </p>
                      )
                    ) : // Multiple choice question stats
                    questionStats && questionStats.length > 0 ? (
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
