import Link from "next/link";
import {
  ArrowRight,
  MessagesSquare,
  ShieldAlert,
  HeartPulse,
  Home,
  Sprout,
  BookOpen,
  Globe2,
  Wrench,
} from "lucide-react";
import { Container, Button, Card, SectionHeading, Badge } from "@/components/ui/primitives";
import { HeroIllustration } from "@/components/illustrations";
import { DailyThought } from "@/components/home/DailyThought";
import { ArticleCard, BookCard, ResourceCard } from "@/components/cards";
import { ARTICLES } from "@/lib/data/articles";
import { BOOKS } from "@/lib/data/books";
import { RESOURCES } from "@/lib/data/resources";

const ENTRY_LINKS = [
  { label: "学会沟通", href: "/communication", icon: MessagesSquare },
  { label: "解决争吵", href: "/conflict", icon: ShieldAlert },
  { label: "重建信任", href: "/trust", icon: HeartPulse },
  { label: "改善亲密", href: "/intimacy", icon: HeartPulse },
  { label: "经营家庭", href: "/family", icon: Home },
  { label: "共同成长", href: "/growth", icon: Sprout },
];

const ABILITIES = [
  {
    title: "沟通",
    desc: "把想说的，说成对方听得懂、愿意听的话。",
    href: "/communication",
    icon: MessagesSquare,
  },
  {
    title: "倾听",
    desc: "让对方的话先在你心里落下来，再回应。",
    href: "/communication",
    icon: MessagesSquare,
  },
  {
    title: "共情",
    desc: "理解对方的感受，不等于必须同意对方。",
    href: "/psychology",
    icon: HeartPulse,
  },
  {
    title: "修复",
    desc: "冲突之后，仍愿意回到同一张桌子前。",
    href: "/conflict",
    icon: ShieldAlert,
  },
];

const TOOLS = [
  { title: "沟通练习器", href: "/tools/communication", desc: "把指责改写成清晰的需求" },
  { title: "争吵复盘", href: "/tools/conflict-review", desc: "从双方视角理解一场架" },
  { title: "关系温度计", href: "/tools/relationship-check", desc: "八维度自我评估" },
  { title: "对话卡", href: "/tools/conversation-cards", desc: "每周一个好问题" },
  { title: "共同目标", href: "/tools/shared-goals", desc: "把愿望变成计划" },
  { title: "家务分配", href: "/tools/housework", desc: "看见隐形的劳动" },
  { title: "每周回顾", href: "/tools/weekly-review", desc: "一周 20 分钟复盘" },
  { title: "关系修复计划", href: "/tools/relationship-check", desc: "选领域，给行动" },
];

export default function HomePage() {
  const latest = [...ARTICLES]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6);
  const featuredBooks = BOOKS.slice(0, 4);
  const featuredResources = RESOURCES.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-terracotta/10 px-3 py-1 text-sm font-medium text-terracotta-dark">
              Love is a practice, not just a feeling.
            </p>
            <h1 className="font-editorial text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              好的婚姻，
              <br />
              不是找到一个完美的人，
              <br />
              <span className="text-terracotta">而是两个人学会更好地相处。</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              从沟通、理解、信任到亲密关系，用心理学知识和可执行的方法，帮助夫妻建立健康、稳定、长期的关系。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/articles">
                <Button size="lg">探索关系知识</Button>
              </Link>
              <Link href="/tools/relationship-check">
                <Button size="lg" variant="outline">
                  开始夫妻关系自测
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroIllustration className="w-full max-w-md drop-shadow-sm" />
          </div>
        </Container>

        {/* Core entry */}
        <Container className="pb-6">
          <div className="flex flex-wrap gap-3">
            {ENTRY_LINKS.map((e) => (
              <Link
                key={e.label}
                href={e.href}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm text-ink transition-colors hover:border-terracotta/40 hover:text-terracotta"
              >
                <e.icon className="h-4 w-4" />
                {e.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Daily thought + real problems */}
      <Container className="grid gap-6 py-10 lg:grid-cols-2">
        <DailyThought />
        <Card className="flex flex-col justify-center p-7">
          <SectionHeading
            eyebrow="关系中的真实问题"
            title="婚姻里真正难的，不是爱不爱"
            description="而是如何在分歧、疲惫和现实压力面前，依然愿意理解彼此、照顾彼此。"
          />
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {[
              "为什么相爱的人也会为同一件事反复争吵？",
              "冷战到底在伤害什么？",
              "出轨之后，关系还能修复吗？",
              "家务如何分配才算公平？",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                {t}
              </li>
            ))}
          </ul>
          <Link
            href="/crisis"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-terracotta hover:underline"
          >
            查看关系困难时的选择 <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </Container>

      {/* Abilities */}
      <Container className="py-10">
        <SectionHeading
          eyebrow="最值得学习的关系能力"
          title="四种能力，比「找对人」更可靠"
          description="它们都可以通过练习获得，而不只是天赋或运气。"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABILITIES.map((a) => (
            <Link key={a.title} href={a.href}>
              <Card className="h-full p-5 transition-shadow hover:shadow-soft">
                <a.icon className="h-7 w-7 text-terracotta" />
                <h3 className="mt-3 font-editorial text-lg font-semibold text-ink">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{a.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>

      {/* Tools */}
      <section className="bg-card/50 py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="关系工具箱"
              title="不只是阅读，更能真正练习"
              description="所有工具都在你的浏览器本地保存，私密回答不上传。"
            />
            <Link href="/tools" className="hidden sm:block">
              <Button variant="outline">查看全部工具</Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t) => (
              <Link key={t.title} href={t.href}>
                <Card className="h-full p-5 transition-shadow hover:shadow-soft">
                  <Wrench className="h-6 w-6 text-sage-dark" />
                  <h3 className="mt-3 font-medium text-ink">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted">{t.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Books */}
      <Container className="py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="全球精选书籍"
            title="站在研究者的肩膀上"
            description="精选国内外婚姻、亲密关系与心理学经典，附核验信息。"
          />
          <Link href="/books">
            <Button variant="outline">书籍资源库</Button>
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBooks.map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </Container>

      {/* Resources */}
      <section className="bg-card/50 py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="专业网站与研究资源"
              title="去专业的地方，找专业的帮助"
              description="区分学术机构、协会、公共服务与商业平台，链接经核验。"
            />
            <Link href="/resources">
              <Button variant="outline">全部资源</Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredResources.map((r) => (
              <ResourceCard key={r.slug} resource={r} />
            ))}
          </div>
        </Container>
      </section>

      {/* Latest articles */}
      <Container className="py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="最新文章" title="持续更新的原创内容" />
          <Link href="/articles">
            <Button variant="outline">文章中心</Button>
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Container>

      {/* Mission */}
      <Container className="py-12">
        <Card className="bg-gradient-to-br from-terracotta/10 to-sage/10 p-8 sm:p-10">
          <SectionHeading
            eyebrow="我们的使命"
            title="让理解多一点，让关系好一点。"
            description="我们相信，爱不仅是一种感受，也是一种持续的行动。TWOGETHER 不提供情感鸡汤，也不把婚姻问题简单归因于某一方，而是用科学的视角和实操的方法，陪你认真理解彼此、用心经营关系。"
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/methodology">
              <Button variant="secondary">内容原则与来源</Button>
            </Link>
            <Link href="/safety">
              <Button variant="outline">关系安全与求助</Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
