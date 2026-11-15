"use client";

import * as React from "react";
import Link from "next/link";
import { Search, X, FileText, BookOpen, Globe, Quote as QuoteIcon } from "lucide-react";
import { ARTICLES } from "@/lib/data/articles";
import { BOOKS } from "@/lib/data/books";
import { RESOURCES } from "@/lib/data/resources";
import { QUOTES } from "@/lib/data/quotes";
import { cn } from "@/lib/utils";

type Result = {
  type: "article" | "book" | "resource" | "quote";
  title: string;
  sub: string;
  href: string;
};

function buildIndex(): Result[] {
  const a: Result[] = ARTICLES.map((x) => ({
    type: "article",
    title: x.title,
    sub: x.summary,
    href: `/articles/${x.slug}`,
  }));
  const b: Result[] = BOOKS.map((x) => ({
    type: "book",
    title: x.titleZh,
    sub: x.authors.join("、"),
    href: `/books/${x.slug}`,
  }));
  const r: Result[] = RESOURCES.map((x) => ({
    type: "resource",
    title: x.name,
    sub: x.country + " · " + x.type,
    href: `/resources#${x.slug}`,
  }));
  const q: Result[] = QUOTES.map((x) => ({
    type: "quote",
    title: x.text,
    sub: x.theme,
    href: `/quotes#${x.key}`,
  }));
  return [...a, ...b, ...r, ...q];
}

const ICONS = {
  article: FileText,
  book: BookOpen,
  resource: Globe,
  quote: QuoteIcon,
};

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const index = React.useMemo(() => buildIndex(), []);

  React.useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return index
      .filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.sub.toLowerCase().includes(term),
      )
      .slice(0, 30);
  }, [q, index]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-bg shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-4">
          <Search className="h-5 w-5 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索文章、书籍、资源、金句…"
            className="w-full bg-transparent py-4 text-base text-ink outline-none placeholder:text-muted/70"
          />
          <button onClick={onClose} aria-label="关闭" className="text-muted hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q.trim() === "" ? (
            <p className="px-3 py-8 text-center text-sm text-muted">
              输入关键词，跨文章、书籍、资源与金句搜索。
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted">
              没有找到「{q}」相关的内容。
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((r, i) => {
                const Icon = ICONS[r.type];
                return (
                  <li key={r.type + i}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-card"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-ink">
                          {r.title}
                        </span>
                        <span className="block truncate text-xs text-muted">
                          {r.sub}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
