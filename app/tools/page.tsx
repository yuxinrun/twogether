import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, Card } from "@/components/ui/primitives";
import { ALL_TOOLS } from "@/lib/toolLinks";
import { Wrench, ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "夫妻实操工具箱",
  description:
    "沟通练习器、争吵复盘、关系温度计、对话卡、共同目标、家务分配与每周回顾，全部在本地保存。",
};

export default function ToolsPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="关系工具箱"
        title="不只是阅读，更能真正练习"
        description="这些工具帮助你把文章里的方法变成可操作的行动。所有数据默认保存在你的浏览器本地，未经授权不上传。"
      />
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
        <span className="inline-flex items-center gap-1 rounded-full bg-sage/15 px-3 py-1.5 text-sage-dark">
          <ShieldCheck className="h-4 w-4" /> 本地保存
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/10 px-3 py-1.5 text-terracotta-dark">
          <Lock className="h-4 w-4" /> 私密不上传
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_TOOLS.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card className="flex h-full flex-col p-6 transition-shadow hover:shadow-soft">
              <Wrench className="h-7 w-7 text-terracotta" />
              <h3 className="mt-3 font-editorial text-lg font-semibold text-ink">
                {t.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {t.desc}
              </p>
              <span className="mt-4 text-sm font-medium text-terracotta">
                打开工具 →
              </span>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-10 bg-gradient-to-br from-card to-bg p-6 text-sm leading-relaxed text-muted">
        <p className="font-medium text-ink">关于这些工具</p>
        <p className="mt-2">
          工具用于自我反思与关系练习，不替代临床心理评估、婚姻咨询或法律意见。如果你们的关系中存在暴力、胁迫或人身安全风险，请优先查看
          <Link href="/safety" className="text-terracotta hover:underline"> 关系安全与求助资源</Link>。
        </p>
      </Card>
    </Container>
  );
}
