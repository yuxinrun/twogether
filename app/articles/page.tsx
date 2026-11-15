import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { ArticlesBrowser } from "@/components/articles/ArticlesBrowser";
import { ARTICLES } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "文章中心",
  description:
    "TWOGETHER 的夫妻关系与婚姻成长文章中心，支持按栏目、地区与阅读时长筛选。",
};

export default function ArticlesIndexPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="文章中心"
        title="系统、实操、有依据的内容"
        description="每篇文章都尽量回答：这是什么、为什么发生、常见错误、具体怎么做、如何判断改善。"
      />
      <div className="mt-8">
        <ArticlesBrowser articles={ARTICLES} />
      </div>
    </Container>
  );
}
