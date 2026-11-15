import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays, User, MapPin, Tag } from "lucide-react";
import { Container, Badge, Card } from "@/components/ui/primitives";
import { ArticleBody, buildToc } from "@/components/articles/ArticleBody";
import { ArticleCard, BookCard, QuoteCard } from "@/components/cards";
import { FavoriteButton } from "@/components/layout/FavoriteButton";
import { RecentTracker } from "@/components/articles/RecentTracker";
import { ARTICLES, getArticle } from "@/lib/data/articles";
import { getBook } from "@/lib/data/books";
import { getQuote } from "@/lib/data/quotes";
import { getSection } from "@/lib/sections";
import { formatDate, readingTimeLabel } from "@/lib/utils";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: "文章未找到" };
  return {
    title: article.title,
    description: article.summary,
    openGraph: { title: article.title, description: article.summary, type: "article" },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const section = getSection(article.section);
  const toc = buildToc(article.blocks);
  const relatedBooks = (article.relatedBookSlugs ?? [])
    .map(getBook)
    .filter(Boolean);
  const relatedArticles = (article.relatedArticleSlugs ?? [])
    .map(getArticle)
    .filter(Boolean);
  const relatedQuotes = (article.relatedQuoteKeys ?? [])
    .map(getQuote)
    .filter(Boolean);

  return (
    <article>
      <RecentTracker
        id={`article:${article.slug}`}
        type="article"
        title={article.title}
        href={`/articles/${article.slug}`}
      />
      <Container className="py-8">
        <nav className="mb-6 flex items-center gap-1 text-sm text-muted">
          <Link href="/" className="hover:text-terracotta">首页</Link>
          <span>/</span>
          <Link
            href={section ? `/${section.slug}` : "/articles"}
            className="hover:text-terracotta"
          >
            {section?.title ?? "文章"}
          </Link>
          <span>/</span>
          <span className="truncate text-ink/70">{article.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {section && <Badge tone="terracotta">{section.title}</Badge>}
              {article.tags.map((t) => (
                <Badge key={t}>
                  <Tag className="mr-1 h-3 w-3" />
                  {t}
                </Badge>
              ))}
            </div>
            <h1 className="mt-4 font-editorial text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 font-editorial text-lg text-terracotta-dark">
              {article.corePoint}
            </p>
            <p className="mt-2 text-base leading-relaxed text-muted">
              {article.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-ink/5 py-3 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> 更新 {formatDate(article.updatedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {readingTimeLabel(article.readingMinutes)}
              </span>
              <FavoriteButton id={`article:${article.slug}`} label="收藏文章" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> 适用地区：
              </span>
              {article.regions.map((r) => (
                <Badge key={r}>{r}</Badge>
              ))}
            </div>

            <div className="mt-6">
              <ArticleBody blocks={article.blocks} />
            </div>

            {article.references && article.references.length > 0 && (
              <div className="mt-10 rounded-2xl border border-ink/10 bg-card/60 p-6">
                <h2 className="font-editorial text-xl font-semibold text-ink">
                  相关研究与参考资料
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {article.references.map((ref, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-terracotta">·</span>
                      <span>
                        {ref.title}
                        {ref.source ? `（${ref.source}）` : ""}
                        {ref.url ? (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-terracotta hover:underline"
                          >
                            查看 ↗
                          </a>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  本站内容以可信的心理学研究、专业协会与公共机构资料为依据，区分研究结论、专业观点与编辑建议。关系自测与练习不替代临床评估或专业咨询。
                </p>
              </div>
            )}
          </div>

          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                目录
              </p>
              <nav className="space-y-1 border-l border-ink/10 pl-3 text-sm">
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className={
                      "block text-muted transition-colors hover:text-terracotta " +
                      (t.level === 3 ? "pl-3 text-xs" : "")
                    }
                  >
                    {t.text}
                  </a>
                ))}
              </nav>
              <Link
                href="/articles"
                className="mt-6 inline-flex items-center gap-1 text-sm text-terracotta hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> 返回文章中心
              </Link>
            </div>
          </aside>
        </div>

        {/* Related */}
        {relatedBooks.length > 0 && (
          <div className="mt-14">
            <h2 className="font-editorial text-2xl font-semibold text-ink">
              相关书籍
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBooks.map((b) => (
                <BookCard key={b!.slug} book={b!} />
              ))}
            </div>
          </div>
        )}

        {relatedQuotes.length > 0 && (
          <div className="mt-14">
            <h2 className="font-editorial text-2xl font-semibold text-ink">
              相关金句
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedQuotes.map((q) => (
                <QuoteCard key={q!.key} quote={q!} />
              ))}
            </div>
          </div>
        )}

        {relatedArticles.length > 0 && (
          <div className="mt-14">
            <h2 className="font-editorial text-2xl font-semibold text-ink">
              相关阅读
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((a) => (
                <ArticleCard key={a!.slug} article={a!} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
