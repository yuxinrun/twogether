"use client";

import * as React from "react";
import { Quote as QuoteIcon, RefreshCw } from "lucide-react";
import { QUOTES } from "@/lib/data/quotes";
import { Card, Badge } from "@/components/ui/primitives";
import { FavoriteButton } from "@/components/layout/FavoriteButton";

export function DailyThought() {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    setIdx(Math.floor(Math.random() * QUOTES.length));
  }, []);

  const quote = QUOTES[idx];

  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-br from-card to-bg p-7">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-terracotta">
          <QuoteIcon className="h-4 w-4" /> 今日关系思考
        </span>
        <button
          onClick={() => setIdx(Math.floor(Math.random() * QUOTES.length))}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted hover:text-terracotta"
          aria-label="换一句"
        >
          <RefreshCw className="h-3.5 w-3.5" /> 换一句
        </button>
      </div>
      <p className="font-editorial text-xl leading-relaxed text-ink sm:text-2xl">
        {quote.text}
      </p>
      <div className="flex items-center justify-between">
        <Badge tone="sage">{quote.theme}</Badge>
        <FavoriteButton id={`quote:${quote.key}`} label="收藏" />
      </div>
    </Card>
  );
}
