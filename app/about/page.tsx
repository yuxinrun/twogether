import type { Metadata } from "next";
import { Container, SectionHeading, Card } from "@/components/ui/primitives";
import { HeartHandshake, Compass, BookOpen, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "TWOGETHER 是一个专业、温暖、科学的夫妻关系与婚姻成长知识平台。理解彼此，学会沟通，共同成长。",
};

const VALUES = [
  { icon: Compass, title: "科学而非鸡汤", desc: "以可信的心理学研究、专业协会与公共机构资料为依据，拒绝空洞情感口号。" },
  { icon: BookOpen, title: "系统而非碎片", desc: "围绕真实议题建立内容体系，而不是追热点、堆标题。" },
  { icon: ShieldCheck, title: "伦理先于流量", desc: "不贴标签、不制造性别对立、不承诺速效修复，安全优先。" },
  { icon: HeartHandshake, title: "理解先于评判", desc: "把复杂的关系问题，还原成两个人都可以被理解的故事。" },
];

export default function AboutPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="关于 TWOGETHER"
        title="我们想做的，是一个认真的关系知识平台"
        description="Love is a practice, not just a feeling. 爱不仅是一种感受，也是一种持续的行动。"
      />

      <Card className="mt-8 bg-gradient-to-br from-terracotta/10 to-sage/10 p-8">
        <p className="font-editorial text-lg leading-relaxed text-ink">
          好的婚姻，不是找到一个完美的人，而是两个人学会更好地相处。我们相信，绝大多数婚姻困境，都可以通过更科学的认知、更可执行的方法，以及更愿意理解彼此的意愿，得到缓解——而不是靠几句安慰。
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          TWOGETHER 系统收集国内外夫妻关系、婚姻心理学、亲密关系、家庭沟通与伴侣咨询的优质书籍、网站、研究与工具，并把它们组织成可被日常使用的内容。我们不做婚庆式的浪漫想象，也不制造性别对立，而是陪你认真理解彼此、用心经营关系。
        </p>
      </Card>

      <div className="mt-12">
        <SectionHeading eyebrow="我们坚持的四件事" title="内容价值观" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <Card key={v.title} className="p-6">
              <v.icon className="h-7 w-7 text-terracotta" />
              <h3 className="mt-3 font-medium text-ink">{v.title}</h3>
              <p className="mt-1 text-sm text-muted">{v.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-12 p-8">
        <SectionHeading
          eyebrow="我们的使命"
          title="让理解多一点，让关系好一点。"
          description="认真理解彼此，用心经营关系。这是一个可以长期更新的中文原创内容体系，也会持续补充文章、书籍与工具。"
        />
      </Card>
    </Container>
  );
}
