"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShareButtons from "@/components/share-buttons";
import toast from "react-hot-toast";
import Link from "next/link";

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
  const [totalResponses, setTotalResponses] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Email state
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [showEmailForm, setShowEmailForm] = useState(true);

  // Fetch total response count from API
  const fetchTotalResponses = async () => {
    try {
      const res = await fetch("/api/survey");
      if (!res.ok) {
        toast.error("sorry, something went wrong");
        return;
      }
      const response = await res.json();
      setTotalResponses(Number(response.data?.count) || 0);
    } catch (error) {
      console.error("Failed to fetch total responses:", error);
      toast.error("something went wrong, please reload the page");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setEmailStatus("loading");
    try {
      const res = await fetch("/api/survey/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setEmailStatus("success");
        setShowEmailForm(false);
        if (data.alreadyExists) {
          toast.success("Email already subscribed!");
        } else {
          toast.success("Thanks for subscribing!");
        }
      } else {
        toast.error(data.error || "Something went wrong");
        setEmailStatus("error");
      }
    } catch (error) {
      console.error("Email submission error:", error);
      toast.error("Failed to subscribe. Please try again.");
      setEmailStatus("error");
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("surveyAnswers");
    if (stored) {
      setAnswers(JSON.parse(stored));
      console.log("Submitted Answers:", JSON.parse(stored));
    }
    fetchTotalResponses();
  }, []);

  const questions: { id: number; text: string; options?: string[] }[] = [
    {
      id: 1,
      text: "When your salary alert drops, what is your honest first thought?",
    },
    {
      id: 2,
      text: "How satisfied are you with your current compensation — total package included?",
    },
    {
      id: 3,
      text: "Has inflation changed how far your salary goes in the last 12 months?",
    },
    {
      id: 4,
      text: "Which statement best describes your relationship with your salary right now?",
    },
    {
      id: 5,
      text: "How does your pay reflect your qualifications and experience?",
    },
    {
      id: 6,
      text: "Did your educational qualifications meaningfully increase your earning power?",
    },
    {
      id: 7,
      text: "Have you ever negotiated your salary — at any point in your career?",
    },
    {
      id: 8,
      text: "Do you know what your colleagues earn — and does it affect you?",
    },
    {
      id: 9,
      text: "Do you have income outside your primary job — and why?",
    },
    {
      id: 10,
      text: "If you earn in naira, how has naira devaluation affected your financial reality?",
    },
    {
      id: 11,
      text: "Do you think your industry pays fairly compared to others in Nigeria?",
    },
    {
      id: 12,
      text: "Has staying loyal to one organisation paid off financially for you?",
    },
    {
      id: 13,
      text: "How would you rate your non-salary benefits — health, pension, leave, bonuses?",
    },
    {
      id: 14,
      text: "Compared to peers with similar experience, how do you feel about your pay?",
    },
    {
      id: 15,
      text: "In five years, what do you expect your compensation situation to look like?",
    },
    // Street Interview Questions
    {
      id: 16,
      text: "Can you tell us — roughly — are you earning enough to live comfortably in this city right now?",
    },
    {
      id: 17,
      text: "When last did your salary increase — and did it feel like a real raise, or just a number on paper?",
    },
    {
      id: 18,
      text: "If you found out your colleague doing the exact same job as you earns 40% more — what would you do?",
    },
    {
      id: 19,
      text: "Do you have a side hustle? Be honest — is it a choice or a necessity?",
    },
    {
      id: 20,
      text: "Does your degree or qualification actually show up in your salary? Or was it just a ticket to get in the door?",
    },
    {
      id: 21,
      text: "Has the dollar rate affected how far your money goes this year?",
    },
    {
      id: 22,
      text: "If you could change one thing about how Nigerian employers pay their staff — what would it be?",
    },
    {
      id: 23,
      text: "Quick one — overpaid, underpaid, or fairly paid. Which one are you right now?",
    },
  ];

  const getAnswerText = (qId: number): string => {
    const answer = answers[qId];
    if (answer === undefined) return "Not answered";

    const q = questions.find((q) => q.id === qId);

    // Handle text questions (16-23)
    if (qId >= 16 && qId <= 23) {
      return typeof answer === "string" ? answer : String(answer);
    }

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

  // Calculate the "others" count (total responses minus the 6 avatars shown)
  const othersCount = Math.max(0, totalResponses - 6);

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
          voice to the <em className="text-[#d4956a] italic">palava.</em>
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
                Pay fairness? I have THOUGHTS. 👀
              </div>
            </div>

            <div className="font-['Playfair_Display'] text-lg font-bold text-[#1a1009] leading-tight mb-2">
              I just took the StreetOps survey on pay and compensation.
            </div>
            <div className="text-[13px] text-[#8a7a68] mb-5 leading-relaxed">
              Nigerian workers are telling the truth about salary, benefits, and
              pay fairness. Anonymous. No judgment. Take yours too.
            </div>
            <div className="text-xs font-semibold text-[#8b1a1a] tracking-[1px] uppercase">
              ask.streetops.ng
            </div>
          </div>

          {/* Email Subscription Section - Added before Share Card */}
          {showEmailForm ? (
            <div className="max-w-[480px] mx-auto mb-8 mt-4">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20">
                {/* <h3 className="text-white font-semibold text-lg mb-2">
                  Get the Report
                </h3> */}
                <div className="text-white/60 text-sm mb-4">
                  Be the first to access this survey's insights and receive
                  curated updates on our products, industry trends, and
                  exclusive reports. Enter your email below to subscribe.
                  <p className="text-green-500">
                    Your response remains anonymous,this is not linked to your
                    survey submission.
                  </p>
                </div>
                <div className="flex lg:flex-row flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#c0392b] "
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={emailStatus === "loading"}
                    className="bg-[#8b1a1a] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#c0392b] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                  >
                    {emailStatus === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
                <button
                  onClick={() => setShowEmailForm(false)}
                  className="text-xs text-white/40 hover:text-white/60 mt-3 text-center w-full transition-all"
                >
                  No thanks, skip for now
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-[480px] mx-auto mb-8 mt-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/60 text-sm text-center">
                  {emailStatus === "success"
                    ? "✓ Subscribed successfully!"
                    : "Thanks for participating!"}
                </p>
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <ShareButtons />
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
          {!isLoading && othersCount > 0 && (
            <span className="ml-2 text-sm font-semibold text-white/60">
              +{othersCount} other{othersCount !== 1 ? "s" : ""}
            </span>
          )}
          {isLoading && (
            <span className="ml-2 text-sm font-semibold text-white/60">
              loading...
            </span>
          )}
        </div>
        <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-white mb-2">
          You are one of{" "}
          <em className="text-[#d4956a] italic">
            {isLoading ? "..." : totalResponses.toLocaleString()}
          </em>{" "}
          Nigerian workers who spoke up.
        </h3>
        <p className="text-sm text-white/40 mb-6">
          The report drops in April. We will tell you what everyone said.
        </p>
        <Link
          href={"https://streetops.ng/"}
          className="bg-transparent border border-white/20 text-white/70 px-7 py-3 rounded-lg text-sm cursor-pointer hover:border-white/50 hover:text-white transition-all"
        >
          Visit StreetOps
        </Link>
      </div>

      {/* Footer */}
      <div className="bg-[#ede4d7] px-5 md:px-[60px] py-10 md:py-15 text-center">
        <p className="text-sm text-[#5c4a32] mb-3">
          The Street Pulse report for Issue 01 drops April 2026. If you dropped
          your email, you will get it first.
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
