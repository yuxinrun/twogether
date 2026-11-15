import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { Container, Badge, Card, SectionHeading } from "@/components/ui/primitives";
import { FavoriteButton } from "@/components/layout/FavoriteButton";
import { RecentTracker } from "@/components/articles/RecentTracker";
import { BOOKS, getBook } from "@/lib/data/books";
import { ARTICLES } from "@/lib/data/articles";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const book = getBook(params.slug);
  if (!book) return { title: "书籍未找到" };
  return {
    title: book.titleZh,
    description: book.coreIdeas,
  };
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getBook(params.slug);
  if (!book) notFound();

  const relatedArticles = ARTICLES.filter((a) =>
    a.relatedBookSlugs?.includes(book.slug),
  );

  const meta = [
    { label: "作者", value: book.authors.join("、") },
    { label: "译者", value: book.translators?.join("、") || "—" },
    { label: "出版社", value: book.publisher || "—" },
    { label: "出版年份", value: book.year || "—" },
    { label: "ISBN", value: book.isbn || "待核验" },
    { label: "语言", value: book.language },
    { label: "阅读难度", value: book.difficulty },
    { label: "分类", value: book.category },
  ];

  return (
    <Container className="py-10">
      <RecentTracker
        id={`book:${book.slug}`}
        type="book"
        title={book.titleZh}
        href={`/books/${book.slug}`}
      />
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted">
        <Link href="/books" className="hover:text-terracotta">书籍资源库</Link>
        <span>/</span>
        <span className="truncate text-ink/70">{book.titleZh}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="sage">{book.category}</Badge>
            <Badge>{book.language}</Badge>
            {book.verified ? (
              <Badge tone="sage">
                <CheckCircle2 className="mr-1 h-3 w-3" /> 信息已核验
              </Badge>
            ) : (
              <Badge>
                <AlertCircle className="mr-1 h-3 w-3" /> 待核验
              </Badge>
            )}
          </div>
          <h1 className="mt-4 font-editorial text-3xl font-semibold text-ink">
            {book.titleZh}
          </h1>
          {book.titleOrig && (
            <p className="mt-1 text-lg text-muted">{book.titleOrig}</p>
          )}

          <div className="mt-6 space-y-6">
            <section>
              <h2 className="font-editorial text-xl font-semibold text-ink">核心观点</h2>
              <p className="mt-2 leading-relaxed text-ink/90">{book.coreIdeas}</p>
            </section>
            <section>
              <h2 className="font-editorial text-xl font-semibold text-ink">值得学习的内容</h2>
              <p className="mt-2 leading-relaxed text-ink/90">{book.worthLearning}</p>
            </section>
            <section>
              <h2 className="font-editorial text-xl font-semibold text-ink">实操价值</h2>
              <p className="mt-2 leading-relaxed text-ink/90">{book.practicalValue}</p>
            </section>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <FavoriteButton id={`book:${book.slug}`} label="收藏" />
            {book.buyLink && (
              <a
                href={book.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-white hover:bg-terracotta-dark"
              >
                查看正版购买 / 官网 <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {book.note && (
            <p className="mt-4 rounded-xl border border-champagne/40 bg-champagne/5 p-4 text-sm text-muted">
              {book.note}
            </p>
          )}
        </div>

        <aside>
          <Card className="p-6">
            <h3 className="mb-4 font-editorial text-lg font-semibold text-ink">
              出版信息
            </h3>
            <dl className="space-y-3 text-sm">
              {meta.map((m) => (
                <div key={m.label} className="flex justify-between gap-4 border-b border-ink/5 pb-2">
                  <dt className="text-muted">{m.label}</dt>
                  <dd className="text-right text-ink/90">{m.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-ink">相关主题</p>
              <div className="flex flex-wrap gap-2">
                {book.relatedTopics.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <p className="mb-1 text-sm font-medium text-ink">适合读者</p>
              <p className="text-sm text-muted">{book.audience}</p>
            </div>
          </Card>
        </aside>
      </div>

      {relatedArticles.length > 0 && (
        <div className="mt-14">
          <SectionHeading eyebrow="相关文章" title="延伸阅读" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="rounded-2xl border border-ink/5 bg-card p-5 hover:shadow-soft"
              >
                <h3 className="font-medium text-ink">{a.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{a.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link
          href="/books"
          className="inline-flex items-center gap-1 text-sm text-terracotta hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> 返回书籍资源库
        </Link>
      </div>
    </Container>
  );
}
