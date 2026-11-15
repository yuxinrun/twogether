"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { Book, BookCategory } from "@/lib/types";
import { BookCard } from "@/components/cards";
import { Input, Select } from "@/components/ui/primitives";

const CATEGORIES: (BookCategory | "all")[] = [
  "all",
  "亲密关系",
  "婚姻经营",
  "夫妻沟通",
  "冲突解决",
  "依恋理论",
  "家庭治疗",
  "性与亲密",
  "心理学基础",
  "情绪管理",
  "家庭与育儿",
];

export function BooksBrowser({ books }: { books: Book[] }) {
  const [q, setQ] = React.useState("");
  const [category, setCategory] = React.useState<BookCategory | "all">("all");
  const [language, setLanguage] = React.useState("all");

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    return books.filter((b) => {
      if (category !== "all" && b.category !== category) return false;
      if (language !== "all" && b.language !== language) return false;
      if (term) {
        const hay = (b.titleZh + b.titleOrig + b.authors.join(" ") + b.coreIdeas).toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [books, q, category, language]);

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-ink/5 bg-card/60 p-4 sm:grid-cols-3">
        <div className="relative sm:col-span-3 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索书名、作者…"
            className="pl-9"
          />
        </div>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as BookCategory | "all")}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "全部分类" : c}
            </option>
          ))}
        </Select>
        <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="all">全部语言</option>
          <option value="中文">中文</option>
          <option value="英文">英文</option>
          <option value="中英对照">中英对照</option>
        </Select>
      </div>

      <p className="mt-4 text-sm text-muted">共 {filtered.length} 本书</p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted">没有符合条件的书籍。</p>
      )}
    </div>
  );
}
