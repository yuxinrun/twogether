import Link from "next/link";
import { Clock, User, Globe2, CheckCircle2, BookOpen, FileText } from "lucide-react";
import type { Article, Book, ResourceSite, Quote } from "@/lib/types";
import { Card, Badge } from "@/components/ui/primitives";
import { FavoriteButton } from "@/components/layout/FavoriteButton";
import { formatDate, readingTimeLabel, cn } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="group flex h-full flex-col p-5 transition-shadow hover:shadow-soft">
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge tone="terracotta">{sectionLabel(article.section)}</Badge>
        {article.tags.slice(0, 1).map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      <Link href={`/articles/${article.slug}`} className="block">
        <h3 className="font-editorial text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-terracotta">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {article.summary}
      </p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {readingTimeLabel(article.readingMinutes)}
        </span>
        <FavoriteButton id={`article:${article.slug}`} />
      </div>
    </Card>
  );
}

export function BookCard({ book }: { book: Book }) {
  return (
    <Card className="group flex h-full flex-col p-5 transition-shadow hover:shadow-soft">
      <div className="mb-2 flex items-start justify-between gap-2">
        <Badge tone="sage">{book.category}</Badge>
        <FavoriteButton id={`book:${book.slug}`} />
      </div>
      <Link href={`/books/${book.slug}`}>
        <h3 className="font-editorial text-lg font-semibold leading-snug text-ink group-hover:text-terracotta">
          {book.titleZh}
        </h3>
      </Link>
      <p className="mt-1 text-sm text-muted">
        {book.authors.join("、")}
        {book.translators?.length ? ` · 译 ${book.translators.join("、")}` : ""}
      </p>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
        {book.coreIdeas}
      </p>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" /> {book.difficulty}
        </span>
        <span className="flex items-center gap-1">
          <Globe2 className="h-3.5 w-3.5" /> {book.language}
        </span>
      </div>
    </Card>
  );
}

export function ResourceCard({ resource }: { resource: ResourceSite }) {
  return (
    <Card className="flex h-full flex-col p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge tone="champagne">{resource.type}</Badge>
        <Badge>{resource.country}</Badge>
      </div>
      <h3 className="font-editorial text-lg font-semibold text-ink">
        {resource.name}
      </h3>
      {resource.nameEn && (
        <p className="mt-0.5 text-sm text-muted">{resource.nameEn}</p>
      )}
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {resource.services}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {resource.providesMaterials && (
          <span className="inline-flex items-center gap-1 text-sage-dark">
            <CheckCircle2 className="h-3.5 w-3.5" /> 提供资料
          </span>
        )}
        {resource.providesConsulting && (
          <span className="inline-flex items-center gap-1 text-terracotta-dark">
            <CheckCircle2 className="h-3.5 w-3.5" /> 提供咨询
          </span>
        )}
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-terracotta hover:underline"
      >
        访问官网 ↗
      </a>
    </Card>
  );
}

export function QuoteCard({
  quote,
  compact,
}: {
  quote: Quote;
  compact?: boolean;
}) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col justify-between p-6",
        !compact && "bg-gradient-to-br from-card to-bg",
      )}
    >
      <div>
        <span className="text-4xl leading-none text-terracotta/30">“</span>
        <p className="mt-1 font-editorial text-lg leading-relaxed text-ink">
          {quote.text}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Badge tone="sage">{quote.theme}</Badge>
        <FavoriteButton id={`quote:${quote.key}`} label="收藏" />
      </div>
    </Card>
  );
}

function sectionLabel(key: string): string {
  const map: Record<string, string> = {
    marriage: "认识婚姻",
    communication: "沟通",
    conflict: "冲突",
    intimacy: "亲密关系",
    trust: "信任",
    family: "家庭",
    money: "金钱",
    crisis: "危机",
    psychology: "心理学",
    growth: "成长",
  };
  return map[key] ?? key;
}
