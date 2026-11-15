import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/primitives";

const COLUMNS = [
  {
    title: "知识与栏目",
    links: [
      { label: "认识婚姻", href: "/marriage" },
      { label: "沟通的艺术", href: "/communication" },
      { label: "冲突与争吵", href: "/conflict" },
      { label: "亲密关系", href: "/intimacy" },
      { label: "信任与忠诚", href: "/trust" },
      { label: "家庭与责任", href: "/family" },
      { label: "金钱与婚姻", href: "/money" },
      { label: "婚姻危机与修复", href: "/crisis" },
      { label: "婚姻心理学", href: "/psychology" },
      { label: "夫妻共同成长", href: "/growth" },
    ],
  },
  {
    title: "资源与工具",
    links: [
      { label: "书籍资源库", href: "/books" },
      { label: "专业网站资源", href: "/resources" },
      { label: "关系金句", href: "/quotes" },
      { label: "文章中心", href: "/articles" },
      { label: "关系工具箱", href: "/tools" },
    ],
  },
  {
    title: "关于",
    links: [
      { label: "关于我们", href: "/about" },
      { label: "内容原则与来源", href: "/methodology" },
      { label: "关系安全与求助", href: "/safety" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-card/60">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-6 w-6 text-terracotta" />
            <span className="font-editorial text-lg font-semibold text-ink">
              TWOGETHER
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            一个专业、温暖、科学的夫妻关系与婚姻成长知识平台。理解彼此，学会沟通，共同成长。
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-sm font-semibold text-ink">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-terracotta"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-ink/5">
        <Container className="flex flex-col gap-2 py-6 text-xs leading-relaxed text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} TWOGETHER · 本站为教育类公益内容，不构成心理诊断、心理治疗或法律意见。
          </p>
          <Link href="/safety" className="font-medium text-terracotta hover:underline">
            遇到安全问题？查看求助资源 →
          </Link>
        </Container>
      </div>
    </footer>
  );
}
