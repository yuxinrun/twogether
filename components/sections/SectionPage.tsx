import Link from "next/link";
import { Container, SectionHeading, Card } from "@/components/ui/primitives";
import { SectionIllustration } from "@/components/illustrations";
import { ArticleCard } from "@/components/cards";
import { getSection } from "@/lib/sections";
import { getArticlesBySection } from "@/lib/data/articles";
import { TOOL_BY_SECTION } from "@/lib/toolLinks";

export function SectionPage({ sectionKey }: { sectionKey: string }) {
  const section = getSection(sectionKey);
  if (!section) return null;
  const articles = getArticlesBySection(sectionKey);
  const tools = TOOL_BY_SECTION[sectionKey] ?? [];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink/5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-sage/10 blur-3xl" />
        <Container className="grid items-center gap-8 py-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-terracotta">
              {section.navTitle}
            </p>
            <h1 className="font-editorial text-3xl font-semibold text-ink sm:text-4xl">
              {section.title}
            </h1>
            <p className="mt-3 text-lg text-terracotta-dark">{section.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              {section.description}
            </p>
          </div>
          <div className="flex justify-center">
            <SectionIllustration
              name={section.illustration}
              title={section.title}
              className="w-full max-w-xs"
            />
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <SectionHeading
          eyebrow="本栏目关注"
          title="我们系统梳理这些真实议题"
        />
        <div className="mt-5 flex flex-wrap gap-2">
          {section.topics.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-sm text-ink/80"
            >
              {t}
            </span>
          ))}
        </div>
      </Container>

      {tools.length > 0 && (
        <Container className="pb-4">
          <SectionHeading eyebrow="相关工具" title="可以直接用起来的练习" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link key={t.href} href={t.href}>
                <Card className="h-full p-5 transition-shadow hover:shadow-soft">
                  <h3 className="font-medium text-ink">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted">{t.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <Container className="py-10">
        <SectionHeading
          eyebrow="文章"
          title={`${section.title} · 深度文章`}
        />
        {articles.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-muted">该栏目的文章正在陆续补充中。</p>
        )}
      </Container>
    </div>
  );
}
