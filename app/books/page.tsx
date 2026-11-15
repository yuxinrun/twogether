import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { BooksBrowser } from "@/components/books/BooksBrowser";
import { BOOKS } from "@/lib/data/books";

export const metadata: Metadata = {
  title: "书籍资源库",
  description:
    "精选国内外夫妻关系、婚姻心理学、亲密关系与家庭治疗的好书，附核验的出版信息与购买渠道。",
};

export default function BooksPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="书籍资源库"
        title="站在研究者的肩膀上阅读"
        description="我们尽量核验每本书的作者、出版社与年份；标注「待核验」的信息请以出版社官方为准。本站不提供任何盗版下载。"
      />
      <div className="mt-8">
        <BooksBrowser books={BOOKS} />
      </div>
    </Container>
  );
}
