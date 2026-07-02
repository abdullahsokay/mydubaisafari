"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * History-aware back button: goes to the previous page (router.back) when
 * there is history, otherwise falls back to the given href.
 */
export function BackButton({
  fallback = "/",
  label = "Back",
  className,
}: {
  fallback?: string;
  label?: string;
  className?: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-midnight/20 bg-surface/80 px-4 py-2 text-sm font-medium text-midnight/80 shadow-sm backdrop-blur-sm transition-all hover:-translate-x-0.5 hover:border-gold hover:text-midnight",
        className,
      )}
    >
      <ArrowLeft className="size-4" />
      {label}
    </button>
  );
}
