"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Heart, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { SearchModal } from "./SearchModal";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

const NAV: NavItem[] = [
  { label: "首页", href: "/" },
  {
    label: "婚姻认知",
    href: "/marriage",
    children: [
      { label: "认识婚姻", href: "/marriage", desc: "理解长期关系的本质" },
      { label: "信任与忠诚", href: "/trust", desc: "信任的建立与修复" },
    ],
  },
  {
    label: "沟通与冲突",
    href: "/communication",
    children: [
      { label: "沟通的艺术", href: "/communication", desc: "表达、倾听与共情" },
      { label: "冲突与争吵", href: "/conflict", desc: "停止争吵与修复" },
    ],
  },
  { label: "亲密关系", href: "/intimacy" },
  {
    label: "家庭生活",
    href: "/family",
    children: [
      { label: "家庭与责任", href: "/family", desc: "家务、育儿与边界" },
      { label: "金钱与婚姻", href: "/money", desc: "财务沟通与目标" },
    ],
  },
  {
    label: "婚姻心理学",
    href: "/psychology",
    children: [
      { label: "婚姻心理学", href: "/psychology", desc: "依恋、情绪与边界" },
      { label: "婚姻危机与修复", href: "/crisis", desc: "关系困难时的选择" },
      { label: "夫妻共同成长", href: "/growth", desc: "长期经营的方法" },
    ],
  },
  {
    label: "书籍与资源",
    href: "/books",
    children: [
      { label: "书籍资源库", href: "/books", desc: "精选中外好书" },
      { label: "专业网站资源", href: "/resources", desc: "机构与求助渠道" },
      { label: "关系金句", href: "/quotes", desc: "每日关系思考" },
    ],
  },
  { label: "关系工具", href: "/tools" },
];

const MOBILE_GROUPS = [
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
    title: "资源",
    links: [
      { label: "书籍资源库", href: "/books" },
      { label: "专业网站资源", href: "/resources" },
      { label: "关系金句", href: "/quotes" },
      { label: "文章中心", href: "/articles" },
      { label: "关于我们", href: "/about" },
      { label: "内容原则", href: "/methodology" },
      { label: "关系安全", href: "/safety" },
    ],
  },
  {
    title: "工具箱",
    links: [
      { label: "全部工具", href: "/tools" },
      { label: "沟通练习器", href: "/tools/communication" },
      { label: "争吵复盘", href: "/tools/conflict-review" },
      { label: "关系温度计", href: "/tools/relationship-check" },
      { label: "对话卡", href: "/tools/conversation-cards" },
      { label: "共同目标", href: "/tools/shared-goals" },
      { label: "家务分配", href: "/tools/housework" },
      { label: "每周回顾", href: "/tools/weekly-review" },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/5 bg-bg/85 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <HeartHandshake className="h-7 w-7 text-terracotta" />
            <span className="font-editorial text-xl font-semibold tracking-tight text-ink">
              TWOGETHER
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "text-terracotta"
                      : "text-ink/80 hover:text-terracotta",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full w-64 pt-2">
                    <div className="rounded-2xl border border-ink/5 bg-white p-2 shadow-soft">
                      {item.children.map((c) => (
                        <Link
                          key={c.href + c.label}
                          href={c.href}
                          className="block rounded-xl px-3 py-2 hover:bg-card"
                        >
                          <span className="block text-sm font-medium text-ink">
                            {c.label}
                          </span>
                          {c.desc && (
                            <span className="block text-xs text-muted">
                              {c.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              aria-label="搜索"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2 text-ink/80 hover:bg-card hover:text-terracotta"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/favorites"
              aria-label="收藏"
              className="hidden rounded-full p-2 text-ink/80 hover:bg-card hover:text-terracotta sm:block"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <button
              aria-label="菜单"
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-full p-2 text-ink/80 hover:bg-card lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>

        {mobileOpen && (
          <div className="border-t border-ink/5 bg-bg lg:hidden">
            <Container className="max-h-[80vh] overflow-y-auto py-4 scrollbar-thin">
              {MOBILE_GROUPS.map((g) => (
                <div key={g.title} className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    {g.title}
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {g.links.map((l) => (
                      <Link
                        key={l.href + l.label}
                        href={l.href}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm",
                          isActive(l.href)
                            ? "bg-terracotta/10 text-terracotta"
                            : "text-ink/80 hover:bg-card",
                        )}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/favorites"
                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-card"
              >
                <Heart className="h-4 w-4" /> 我的收藏
              </Link>
            </Container>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
