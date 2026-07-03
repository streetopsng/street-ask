// app/admin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Question texts for display - 14 multiple choice questions
const questionTexts: { [key: number]: string } = {
  1: "If you're 100% honest, how truthful are you with your manager on a typical day at work?",
  2: "Your manager walks past your desk unannounced. What's the first thing that happens?",
  3: "It's 4:45pm and your manager is still in the office. What's your move?",
  4: "How do you talk about your manager when they're not in the room, versus when they are?",
  5: "You notice your manager taking credit for a colleague's work. What do you do?",
  6: "If you had to report something wrong at work, how would you prefer to do it?",
  7: "If reporting a wrongdoing could cost you your job, would you still do it?",
  8: "In your exit interview (real or imagined), what would you REALLY say about why you're leaving?",
  9: "Would you mention your manager by name if they were the real reason you left?",
  10: "Would you recommend your current company to a friend looking for a job?",
  11: "If you were rating your manager anonymously, how honest would you be — really?",
  12: "Have you ever given positive feedback you didn't fully believe, just to avoid conflict?",
  13: "Has fear of being identified ever stopped you from giving honest feedback?",
  14: "If your manager could read your mind for one day, how differently would things go?",
};

// Map answer values to readable text
const optionLabels: { [key: number]: { [key: number]: string } } = {
  1: {
    1: "Fully honest - I say what I mean, always",
    2: "Mostly honest, but I sugarcoat the hard parts",
    3: "I tell them what keeps the peace, not what's real",
    4: "Honestly? I've mastered the art of \"everything is fine\"",
  },
  2: {
    1: "Nothing changes - I'm already focused",
    2: "I sit up straighter and look extra busy",
    3: "I suddenly remember 3 \"urgent\" tasks",
    4: "I greet him like he just walked into a party",
  },
  3: {
    1: "I leave at my normal closing time regardless",
    2: "I stay back a little, just to be seen",
    3: "I wait until he leaves, then I leave 2 minutes after",
    4: "I find one more \"task\" to look busy with",
  },
  4: {
    1: "The same way, always",
    2: "Slightly more critical when they're away",
    3: "Very different - two completely different conversations",
    4: "Let's just say the group chat knows things he doesn't",
  },
  5: {
    1: "I report it to HR or someone above",
    2: "I tell my colleague privately but stay out of it",
    3: "I say nothing - it's not my business",
    4: "I joke about it in the group chat, hoping someone notices",
  },
  6: {
    1: "Openly, with my name attached",
    2: "Anonymously, but I'd still report it",
    3: "I probably wouldn't report it at all",
    4: "I'd only report it if others joined me",
  },
  7: {
    1: "Yes, some things matter more than a job",
    2: "It depends on how serious it is",
    3: "No - I have bills and responsibilities",
    4: "I'd find an anonymous way to raise it",
  },
  8: {
    1: "The exact truth, even if uncomfortable",
    2: "A polished version of the truth",
    3: "\"Better opportunity\" - even if that's not the full story",
    4: "I'd say just enough to leave clean, nothing more",
  },
  9: {
    1: "Yes, they deserve to know",
    2: "Only if I'm directly asked",
    3: "No, I'd keep it general",
    4: "I'd mention it to HR only, never to the manager",
  },
  10: {
    1: "Yes, honestly and without hesitation",
    2: "Yes, but with a few honest warnings",
    3: "I'd be diplomatic and avoid the full truth",
    4: "No, but I'd never say that officially",
  },
  11: {
    1: "Very honest - that's the whole point",
    2: "Honest, but I soften the harsh points",
    3: "I rate generously to avoid problems",
    4: "I don't fully trust it's anonymous, so I play safe",
  },
  12: {
    1: "Never - I only say what I mean",
    2: "Rarely, but it has happened",
    3: "Often - it's easier that way",
    4: "Almost always, if I'm honest",
  },
  13: {
    1: "Never - I say what I mean regardless",
    2: "Occasionally, on sensitive topics",
    3: "Often - I always play it safe",
    4: "Every single time",
  },
  14: {
    1: "Not much would change - I'm an open book",
    2: "They'd learn a few things I've kept to myself",
    3: "They'd be shocked by how much I hold back",
    4: "Let's just say... it's better they never find out",
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
  const allQuestions = Array.from({ length: 14 }, (_, index) => index + 1);

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
