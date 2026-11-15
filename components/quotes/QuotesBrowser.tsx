"use client";

import * as React from "react";
import { Shuffle } from "lucide-react";
import type { Quote, QuoteTheme } from "@/lib/types";
import { QuoteCard } from "@/components/cards";
import { cn } from "@/lib/utils";

const THEMES: (QuoteTheme | "all")[] = [
  "all",
  "爱与理解",
  "沟通与倾听",
  "尊重与边界",
  "信任与承诺",
  "冲突与修复",
  "亲密与陪伴",
  "责任与成长",
  "婚姻与现实",
];

export function QuotesBrowser({ quotes }: { quotes: Quote[] }) {
  const [theme, setTheme] = React.useState<QuoteTheme | "all">("all");
  const [seed, setSeed] = React.useState(0);

  const list = React.useMemo(() => {
    let arr = quotes;
    if (theme !== "all") arr = arr.filter((q) => q.theme === theme);
    // shuffle deterministically by seed for a fresh feel
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes, theme, seed]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                theme === t
                  ? "border-terracotta bg-terracotta/10 text-terracotta-dark"
                  : "border-ink/10 bg-white/70 text-muted hover:text-terracotta",
              )}
            >
              {t === "all" ? "全部" : t}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-sm text-muted hover:text-terracotta"
        >
          <Shuffle className="h-4 w-4" /> 随机排序
        </button>
      </div>

      <p className="mt-4 text-sm text-muted">
        共 {list.length} 句 · 均为本站原创，不冒充名人名言
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((q) => (
          <div key={q.key} id={q.key}>
            <QuoteCard quote={q} />
          </div>
        ))}
      </div>
    </div>
  );
}
