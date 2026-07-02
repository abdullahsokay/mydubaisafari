"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/catalog/repository";

/** Sort control that updates the URL `sort` param (keeps the page SEO-friendly). */
export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "popular";

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-midnight/60">
      Sort
      <select
        value={current}
        onChange={onChange}
        className="h-10 rounded-full border border-midnight/15 bg-surface px-4 text-sm text-midnight focus:border-gold focus:outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
