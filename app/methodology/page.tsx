import type { Metadata } from "next";
import { Container, SectionHeading, Card } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "内容原则与参考来源",
  description:
    "TWOGETHER 的内容原则、参考来源、伦理规范与核验方式，以及明确的免责声明。",
};

const PRINCIPLES = [
  "以可信的心理学研究、专业协会、学术资料与公共机构资料为依据。",
  "重要理论注明提出者、理论出处或可靠参考资料。",
  "区分研究结论、专业观点和网站编辑建议。",
  "不虚构研究数据和专家观点。",
  "不随意给用户或伴侣贴人格障碍、心理疾病等诊断标签。",
  "不以性别刻板印象解释夫妻问题。",
  "不把所有婚姻问题归因于沟通技巧不足。",
  "不要求受害者单方面承担关系修复责任。",
];

const SOURCES = [
  { name: "Gottman Institute", note: "婚姻关系实证研究、沟通与冲突修复。" },
  { name: "Sue Johnson / EFT", note: "情绪聚焦疗法与成人依恋在亲密关系中的应用。" },
  { name: "Marshall Rosenberg", note: "非暴力沟通（观察—感受—需要—请求）。" },
  { name: "依恋理论（Bowlby, Hazan & Shaver）", note: "成人亲密关系中的依恋模式。" },
  { name: "专业协会与公共机构", note: "APA、AAMFT、NCFR、中国心理学会等（见资源页）。" },
];

export default function MethodologyPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="内容原则与参考来源"
        title="我们如何生产内容"
        description="这个页面说明 TWOGETHER 的内容原则、参考来源与伦理规范，帮助你判断信息的可靠性。"
      />

      <Card className="mt-8 p-8">
        <h2 className="font-editorial text-xl font-semibold text-ink">内容原则</h2>
        <ul className="mt-4 space-y-3">
          {PRINCIPLES.map((p) => (
            <li key={p} className="flex gap-3 text-ink/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
              {p}
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-10">
        <SectionHeading eyebrow="参考来源" title="主要的理论与资料基础" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {SOURCES.map((s) => (
            <Card key={s.name} className="p-5">
              <h3 className="font-medium text-ink">{s.name}</h3>
              <p className="mt-1 text-sm text-muted">{s.note}</p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-10 border border-champagne/40 bg-champagne/5 p-8">
        <h2 className="font-editorial text-xl font-semibold text-ink">免责声明</h2>
        <p className="mt-3 leading-relaxed text-muted">
          本网站提供婚姻关系、心理学和家庭沟通方面的一般教育信息，不构成心理诊断、心理治疗、法律意见或针对个人情况的专业婚姻咨询。涉及暴力、胁迫、严重心理困扰或人身安全时，请优先联系当地专业机构和紧急服务。
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          关系自测与练习工具仅用于自我反思，不替代临床评估。我们不保证任何工具或练习一定能够修复关系，也不将原谅、继续婚姻或离婚作为唯一正确答案。
        </p>
      </Card>
    </Container>
  );
}
