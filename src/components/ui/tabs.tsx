"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

/** Lightweight tabbed panel (SRS §7.4.3 tour-detail tabs). */
export function Tabs({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") {
      next = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      next = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActive(tabs[next].id);
    buttonRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-midnight/10"
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { buttonRefs.current[i] = el; }}
            id={`tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => setActive(t.id)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn(
              "border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
              active === t.id
                ? "border-gold text-midnight font-semibold"
                : "border-transparent text-midnight/70 hover:text-midnight",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          id={`panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${t.id}`}
          tabIndex={0}
          hidden={active !== t.id}
          className="py-6 focus:outline-none"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
