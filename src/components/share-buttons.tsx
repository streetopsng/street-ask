"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { LuLinkedin } from "react-icons/lu";
import { CiTwitter } from "react-icons/ci";

export default function ShareButtons() {
  const [url, setUrl] = useState("");
  // Get base URL (protocol + domain)
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);
  return (
    <div className="flex flex-wrap gap-2.5 justify-center mt-7">
      <a
        href={`https://wa.me/?text=${encodeURIComponent("I just took the StreetOps survey on office romance! 👀 Take yours too: " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#25d366] text-white"
      >
        <span>
          <FaWhatsapp />
        </span>{" "}
        WhatsApp
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just took the StreetOps survey on office romance! 👀 Take yours too: " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#1da1f2] text-white"
      >
        <span>
          <CiTwitter />
        </span>{" "}
        Twitter
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#0a66c2] text-white"
      >
        <span>
          <LuLinkedin />
        </span>{" "}
        LinkedIn
      </a>

      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          toast.success("copied");
        }}
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-[#8b1a1a] text-white"
      >
        <span>
          <MdContentCopy />
        </span>{" "}
        Copy Link
      </button>
    </div>
  );
}
