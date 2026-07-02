"use client";

import { useState, useEffect } from "react";
import { Link2, Check } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const id = requestAnimationFrame(() => setUrl(window.location.href));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const encodedUrl = () => encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <span className="text-sm font-medium text-midnight/60">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition-colors"
      >
        Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl()}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm text-white hover:bg-neutral-800 transition-colors"
      >
        X (Twitter)
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600 transition-colors"
      >
        WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-full border border-midnight/20 px-4 py-2 text-sm text-midnight hover:bg-midnight/5 transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
