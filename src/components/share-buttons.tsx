// components/ShareButtons.tsx
"use client";

export default function ShareButtons() {
  // Get base URL (protocol + domain)
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";

  return (
    <div className="flex flex-wrap gap-2.5 justify-center mt-7">
      <a
        href={`https://wa.me/?text=${encodeURIComponent("I just took the StreetOps survey on office romance! 👀 Take yours too: " + baseUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#25d366] text-white"
      >
        <span>📱</span> WhatsApp
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just took the StreetOps survey on office romance! 👀 Take yours too: " + baseUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#1da1f2] text-white"
      >
        <span>🐦</span> Twitter
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(baseUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#0a66c2] text-white"
      >
        <span>💼</span> LinkedIn
      </a>

      <button
        onClick={() => {
          navigator.clipboard.writeText(baseUrl);
          alert("Link copied!");
        }}
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#8b1a1a] text-white"
      >
        <span>🔗</span> Copy Link
      </button>
    </div>
  );
}
