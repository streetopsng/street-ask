"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-[#f5efe6]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-[60px] py-5 bg-[#f5efe6] border-b border-[#8b1a1a]/10 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#8b1a1a] text-white font-bold text-xs w-9 h-9 flex items-center justify-center rounded">
            SO
          </div>
          <span className="font-semibold text-base text-[#1a1009]">
            StreetOps
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          <a href="#" className="text-sm text-[#5c4a32]">
            Street Ask
          </a>
          <a href="#" className="text-sm text-[#5c4a32]">
            Research
          </a>
          <a href="#" className="text-sm text-[#5c4a32]">
            About
          </a>
          <a
            href="#"
            className="bg-[#8b1a1a] text-white px-5.5 py-2.5 rounded text-sm font-semibold"
          >
            Work With Us
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#2c1810] via-[#1a0c06] to-[#3d1515] px-5 md:px-[60px] py-15 md:py-25 overflow-hidden">
        <div className="absolute font-['Playfair_Display'] text-[200px] font-black text-white/3 top-[-40px] right-[-40px] pointer-events-none select-none">
          ❤️
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-0.5 bg-[#c0392b]"></div>
          <span className="text-[11px] font-semibold tracking-[4px] uppercase text-[#c0392b]">
            Street Ask
          </span>
        </div>
        <h1 className="font-['Playfair_Display'] text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] max-w-[700px] mb-2">
          The questions nobody is
          <br />
          asking{" "}
          <em className="italic text-[#d4956a] not-italic">African workers.</em>
        </h1>
        <p className="text-base md:text-[17px] text-white/60 max-w-[520px] leading-relaxed mt-5 mb-12">
          We are asking them. Every month, one topic. Anonymous, honest, and
          published for everyone to see.
        </p>
        <div className="flex flex-wrap items-center gap-8">
          <div className="text-center">
            <div className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white">
              312
            </div>
            <div className="text-[11px] text-white/40 tracking-[1px] uppercase mt-0.5">
              Responses so far
            </div>
          </div>
          <div className="w-px h-10 bg-white/15"></div>
          <div className="text-center">
            <div className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white">
              1,000
            </div>
            <div className="text-[11px] text-white/40 tracking-[1px] uppercase mt-0.5">
              Target
            </div>
          </div>
          <div className="w-px h-10 bg-white/15"></div>
          <div className="text-center">
            <div className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white">
              &lt;5 min
            </div>
            <div className="text-[11px] text-white/40 tracking-[1px] uppercase mt-0.5">
              To complete
            </div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 bg-white/8 rounded-full px-4 py-1.5 text-xs text-white/60 mt-4">
          <span className="w-1.5 h-1.5 bg-[#2d6a4f] rounded-full animate-pulse"></span>
          Live · Updates every 60 seconds
        </div>
      </div>

      {/* Active Survey Card */}
      <div className="bg-[#f5efe6] px-5 md:px-[60px] py-10 md:py-15">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-0.5 bg-[#8b1a1a]"></div>
          <span className="text-[11px] font-semibold tracking-[4px] uppercase text-[#8b1a1a]">
            Active Survey
          </span>
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-black text-[#1a1009] mb-1">
          The State of SME Productivity
        </h2>
        <p className="text-sm md:text-[15px] text-[#5c4a32] mb-7">
          Issue 01 · Romance &amp; Relationships at Work · April 2026
        </p>

        <div className="bg-white border border-[#8b1a1a]/20 rounded-2xl p-7 md:p-12 max-w-[720px] shadow-[0_4px_40px_rgba(139,26,26,0.06)]">
          <div className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#1a1009] mb-3 leading-tight">
            Romance &amp; Relationships at Work —{" "}
            <span className="text-[#8b1a1a] italic">The Office Palava</span>
          </div>
          <p className="text-sm md:text-[15px] text-[#5c4a32] leading-relaxed mb-8">
            We want to understand how Nigerian workers really feel about
            workplace romance, relationships, and all the palava that comes with
            them. Anonymous. Honest. No judgment. Your responses directly shape
            our April Street Pulse.
          </p>

          <div className="mb-8">
            <div className="text-[11px] font-semibold tracking-[2px] uppercase text-[#8a7a68] mb-2.5">
              Responses Collected
            </div>
            <div className="bg-[#ede4d7] rounded-full h-2 overflow-hidden mb-2.5">
              <div className="bg-gradient-to-r from-[#8b1a1a] to-[#c0392b] h-full rounded-full w-[31.2%]"></div>
            </div>
            <div className="text-xs md:text-[13px] text-[#8a7a68]">
              <strong className="text-[#1a1009]">312 responses so far</strong> ·
              Target: 1,000 · Under 5 minutes to complete
            </div>
          </div>

          <button
            onClick={() => router.push("/survey")}
            className="inline-flex items-center gap-2.5 bg-[#8b1a1a] text-white px-9 py-4 rounded-lg text-base font-semibold hover:bg-[#c0392b] transition-all"
          >
            Take the Survey
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Why Participate */}
      <div className="bg-[#ede4d7] px-5 md:px-[60px] py-10 md:py-15">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-0.5 bg-[#8b1a1a]"></div>
          <span className="text-[11px] font-semibold tracking-[4px] uppercase text-[#8b1a1a]">
            Why Participate
          </span>
        </div>
        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-black text-[#1a1009] mb-2 leading-tight">
          Your data builds
          <br />
          <em className="text-[#8b1a1a] italic">the industry's mirror.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-9">
          <div className="bg-white rounded-xl p-7 md:p-8">
            <div className="text-3xl mb-4">🔒</div>
            <div className="font-semibold text-[#1a1009] mb-2">
              100% Anonymous
            </div>
            <div className="text-sm text-[#5c4a32] leading-relaxed">
              Your responses are never tied to your name, company, or identity.
              Say what you actually think.
            </div>
          </div>
          <div className="bg-white rounded-xl p-7 md:p-8 border-2 border-[#8b1a1a]">
            <div className="text-3xl mb-4">📊</div>
            <div className="font-semibold text-[#1a1009] mb-2">
              Shapes Real Research
            </div>
            <div className="text-sm text-[#5c4a32] leading-relaxed">
              Your input feeds the Street Pulse and the State of Nigerian
              Workplace Productivity Report — the first of its kind.
            </div>
          </div>
          <div className="bg-white rounded-xl p-7 md:p-8">
            <div className="text-3xl mb-4">📬</div>
            <div className="font-semibold text-[#1a1009] mb-2">
              You Get the Report
            </div>
            <div className="text-sm text-[#5c4a32] leading-relaxed">
              Drop your email at the end and get early access to the report when
              it drops. No spam. Just the findings.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#1a1009] px-5 md:px-[60px] py-6 flex flex-col md:flex-row items-center justify-between gap-2 mt-auto">
        <span className="text-xs md:text-[13px] text-white/40">
          © 2026 StreetOps · Lagos, Nigeria
        </span>
        <span className="text-xs md:text-[13px] text-white/60 font-semibold">
          Street Ask · Research Programme
        </span>
      </div>
    </div>
  );
}
