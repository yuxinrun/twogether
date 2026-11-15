import type { Metadata } from "next";
import { Container, SectionHeading, Card, Badge } from "@/components/ui/primitives";
import { AlertTriangle, Phone, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "关系安全与求助资源",
  description:
    "当关系中存在暴力、胁迫或人身安全风险时，优先保护安全并寻求专业支持。按地区整理求助渠道。",
};

const SIGNS = [
  "身体暴力、性暴力或威胁使用暴力。",
  "持续的贬低、羞辱与冷暴力，让你长期自我怀疑。",
  "限制你与家人、朋友、同事的联系（孤立）。",
  "监控你的行踪、手机、消费或社交。",
  "用愤怒、自伤或经济控制让你屈服。",
  "你开始为小事道歉、隐瞒、自我审查。",
];

const REGIONS = [
  {
    region: "中国大陆",
    items: [
      { label: "报警", value: "110", desc: "紧急情况立即拨打。" },
      { label: "妇女维权公益服务热线", value: "12338", desc: "全国妇联，婚姻家庭教育与权益保护。" },
      { label: "公共法律服务热线", value: "12348", desc: "免费法律咨询与援助指引。" },
      { label: "心理援助热线", value: "12320 / 当地心理危机热线", desc: "情绪与心理支持。" },
    ],
  },
  {
    region: "香港",
    items: [
      { label: "紧急求助", value: "999", desc: "生命与人身安全紧急情况。" },
      { label: "社会福利署 — 家庭危机支援", value: "2343 2255", desc: "24 小时家庭危机支持。" },
      { label: "撒玛利亚防止自杀会", value: "2389 2222", desc: "情绪支援热线。" },
    ],
  },
  {
    region: "台湾",
    items: [
      { label: "紧急求助", value: "110 / 113", desc: "报警与保护专线。" },
      { label: "心理健康咨询专线", value: "1925", desc: "卫生福利部心理支持。" },
    ],
  },
  {
    region: "新加坡",
    items: [
      { label: "紧急求助", value: "999", desc: "人身安全紧急情况。" },
      { label: "国家反家暴中心", value: "1800 777 0000", desc: "妇女援助组织热线。" },
      { label: "心理健康支援", value: "Mindline.sg", desc: "资源导航与自评。" },
    ],
  },
  {
    region: "美国 / 英国",
    items: [
      { label: "美国 全国家庭暴力热线", value: "1-800-799-7233", desc: "thehotline.org，24/7 保密支持。" },
      { label: "英国 Refuge / Women's Aid", value: "0808 2000 247", desc: "免费家庭暴力热线。" },
      { label: "紧急求助", value: "911 / 999", desc: "人身安全紧急情况。" },
    ],
  },
];

const SAFETY_PLAN = [
  "把安全放在首位：准备紧急联系人、重要证件与离开路线。",
  "保留证据：伤情记录、聊天截图、报警回执。",
  "联系当地求助资源，而非只靠亲友调解。",
  "在暴力关系中，不要单独对质或强行修复，先制定安全计划。",
  "涉及法律、子女与财产分割，依据所在地区寻求专业服务。",
];

export default function SafetyPage() {
  return (
    <Container className="py-12">
      <div className="flex items-center gap-2 text-terracotta">
        <ShieldAlert className="h-5 w-5" />
        <span className="text-sm font-medium uppercase tracking-widest">关系安全</span>
      </div>
      <h1 className="mt-2 font-editorial text-3xl font-semibold text-ink sm:text-4xl">
        当关系不再安全时，先保护好自己
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        如果你们的关系中存在暴力、胁迫、控制或人身安全风险，请优先保护人身安全并寻求专业支持。本站明确反对在存在暴力或胁迫的关系中，单方面对质或强行修复。
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="border border-terracotta/30 bg-terracotta/5 p-6">
          <h2 className="flex items-center gap-2 font-editorial text-xl font-semibold text-ink">
            <AlertTriangle className="h-5 w-5 text-terracotta" /> 需要警惕的信号
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/90">
            {SIGNS.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                {s}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="font-editorial text-xl font-semibold text-ink">
            安全计划要点
          </h2>
          <ol className="mt-4 space-y-2 text-sm text-ink/90">
            {SAFETY_PLAN.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/20 text-xs font-semibold text-sage-dark">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <div className="mt-12">
        <SectionHeading
          eyebrow="地区求助资源"
          title="按所在地区查找帮助"
          description="以下信息可能因地区与政策调整而变化，请以当地官方发布为准。涉及婚姻法律、家暴求助与心理咨询资格，务必确认适用性。"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {REGIONS.map((r) => (
            <Card key={r.region} className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-editorial text-lg font-semibold text-ink">
                  {r.region}
                </h3>
                <Badge tone="champagne">{r.items.length} 个渠道</Badge>
              </div>
              <ul className="space-y-3">
                {r.items.map((it) => (
                  <li key={it.label} className="text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-terracotta" />
                      <span className="font-medium text-ink">{it.label}</span>
                      <span className="ml-auto font-mono text-terracotta-dark">
                        {it.value}
                      </span>
                    </div>
                    <p className="mt-0.5 pl-6 text-muted">{it.desc}</p>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      <Card className="mt-12 border border-champagne/40 bg-champagne/5 p-8">
        <p className="leading-relaxed text-muted">
          本页信息为公开可查证的公共求助资源整理，不构成紧急救援本身。如果你正处于紧急危险中，请立即拨打当地紧急电话。TWOGETHER 不提供心理咨询或危机干预服务，遇到严重困扰请尽快联系专业机构。
        </p>
      </Card>
    </Container>
  );
}
