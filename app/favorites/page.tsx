"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Clock, Trash2 } from "lucide-react";
import { Container, SectionHeading, Card, Badge } from "@/components/ui/primitives";
import { useApp } from "@/components/providers/AppProvider";
import { ARTICLES } from "@/lib/data/articles";
import { BOOKS } from "@/lib/data/books";
import { QUOTES } from "@/lib/data/quotes";
import { RESOURCES } from "@/lib/data/resources";

export default function FavoritesPage() {
  const { favorites, recents, toggleFavorite } = useApp();

  const favItems = favorites
    .map((id) => {
      const [type, key] = id.split(":");
      if (type === "article") {
        const a = ARTICLES.find((x) => x.slug === key);
        return a && { type: "文章", title: a.title, href: `/articles/${a.slug}`, id };
      }
      if (type === "book") {
        const b = BOOKS.find((x) => x.slug === key);
        return b && { type: "书籍", title: b.titleZh, href: `/books/${b.slug}`, id };
      }
      if (type === "quote") {
        const q = QUOTES.find((x) => x.key === key);
        return q && { type: "金句", title: q.text, href: `/quotes#${q.key}`, id };
      }
      if (type === "resource") {
        const r = RESOURCES.find((x) => x.slug === key);
        return r && { type: "资源", title: r.name, href: `/resources#${r.slug}`, id };
      }
      return null;
    })
    .filter(Boolean) as { type: string; title: string; href: string; id: string }[];

  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="我的收藏"
        title="你标记过的内容"
        description="收藏保存在本浏览器本地。也可以查看你最近浏览过的内容。"
      />

      <div className="mt-8">
        <h3 className="font-editorial text-lg font-semibold text-ink">
          已收藏（{favItems.length}）
        </h3>
        {favItems.length === 0 ? (
          <p className="mt-3 text-muted">
            还没有收藏。在文章、书籍或金句上点击收藏按钮，就会出现在这里。
          </p>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favItems.map((it) => (
              <Card key={it.id} className="flex items-center justify-between gap-3 p-4">
                <Link href={it.href} className="min-w-0">
                  <Badge tone="terracotta">{it.type}</Badge>
                  <p className="mt-1 truncate text-sm text-ink/90">{it.title}</p>
                </Link>
                <button
                  onClick={() => toggleFavorite(it.id)}
                  aria-label="取消收藏"
                  className="text-muted hover:text-terracotta"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h3 className="flex items-center gap-2 font-editorial text-lg font-semibold text-ink">
          <Clock className="h-4 w-4 text-sage-dark" /> 最近浏览（{recents.length}）
        </h3>
        {recents.length === 0 ? (
          <p className="mt-3 text-muted">还没有浏览记录。</p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {recents.map((r) => (
              <Link
                key={r.id}
                href={r.href}
                className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-sm text-ink/80 hover:text-terracotta"
              >
                {r.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
