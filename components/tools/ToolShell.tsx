import Link from "next/link";
import { Container, SectionHeading, Card } from "@/components/ui/primitives";
import { AlertTriangle } from "lucide-react";

export function ToolShell({
  title,
  description,
  children,
  disclaimer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  disclaimer?: string;
}) {
  return (
    <Container className="py-12">
      <SectionHeading eyebrow="关系工具" title={title} description={description} />
      <div className="mt-8">{children}</div>
      <Card className="mt-8 border border-champagne/40 bg-champagne/5 p-5 text-sm leading-relaxed text-muted">
        <p className="flex items-center gap-2 font-medium text-ink">
          <AlertTriangle className="h-4 w-4 text-terracotta" /> 使用说明
        </p>
        <p className="mt-2">
          {disclaimer ??
            "本工具用于自我反思与关系练习，所有数据保存在你的浏览器本地，不上传。它不替代心理诊断、婚姻咨询或法律意见。"}
        </p>
        <p className="mt-2">
          如果关系中存在暴力、胁迫或人身安全风险，请优先查看
          <Link href="/safety" className="text-terracotta hover:underline"> 关系安全与求助资源</Link>。
        </p>
      </Card>
    </Container>
  );
}
