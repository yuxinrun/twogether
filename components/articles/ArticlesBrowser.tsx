"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { Article } from "@/lib/types";
import { ArticleCard } from "@/components/cards";
import { Input, Select } from "@/components/ui/primitives";
import { SECTIONS } from "@/lib/sections";

export function ArticlesBrowser({ articles }: { articles: Article[] }) {
  const [q, setQ] = React.useState("");
  const [section, setSection] = React.useState("all");
  const [region, setRegion] = React.useState("all");
  const [maxTime, setMaxTime] = React.useState("all");

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    return articles.filter((a) => {
      if (section !== "all" && a.section !== section) return false;
      if (region !== "all" && !a.regions.includes(region as never)) return false;
      if (maxTime !== "all" && a.readingMinutes > Number(maxTime)) return false;
      if (term) {
        const hay = (a.title + a.summary + a.tags.join(" ") + a.corePoint).toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [articles, q, section, region, maxTime]);

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-ink/5 bg-card/60 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索标题或标签…"
            className="pl-9"
          />
        </div>
        <Select value={section} onChange={(e) => setSection(e.target.value)}>
          <option value="all">全部栏目</option>
          {SECTIONS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.title}
            </option>
          ))}
        </Select>
        <Select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="all">全部地区</option>
          {["中国大陆", "香港", "台湾", "新加坡", "美国", "英国", "全球通用"].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Select>
        <Select value={maxTime} onChange={(e) => setMaxTime(e.target.value)}>
          <option value="all">阅读时长不限</option>
          <option value="6">6 分钟以内</option>
          <option value="8">8 分钟以内</option>
        </Select>
      </div>

      <p className="mt-4 text-sm text-muted">共 {filtered.length} 篇文章</p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted">没有符合条件的文章。</p>
      )}
    </div>
  );
}
