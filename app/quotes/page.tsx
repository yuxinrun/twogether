import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { QuotesBrowser } from "@/components/quotes/QuotesBrowser";
import { QUOTES } from "@/lib/data/quotes";

export const metadata: Metadata = {
  title: "关系金句",
  description:
    "TWOGETHER 原创关系金句，涵盖爱与理解、沟通、边界、信任、冲突、亲密、责任与婚姻现实。",
};

export default function QuotesPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="关系金句"
        title="每日一句，关于关系的事"
        description="这些金句均为本站的原创内容，用于每日关系思考，不冒充名人名言。你可以收藏、随机翻阅，也可以关联到相关文章。"
      />
      <div className="mt-8">
        <QuotesBrowser quotes={QUOTES} />
      </div>
    </Container>
  );
}
