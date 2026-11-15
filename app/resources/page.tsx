import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { ResourceBrowser } from "@/components/resources/ResourceBrowser";
import { RESOURCES, RESOURCE_TYPE_ORDER } from "@/lib/data/resources";

export const metadata: Metadata = {
  title: "国内外专业网站资源",
  description:
    "区分学术机构、专业协会、公共服务、公益组织与商业平台，链接经核验的婚姻、家庭与心理健康资源。",
};

export default function ResourcesPage() {
  return (
    <Container className="py-12">
      <SectionHeading
        eyebrow="专业网站与机构资源"
        title="去专业的地方，找专业的帮助"
        description="我们明确区分学术机构、专业协会、公共服务机构、公益组织与商业内容平台，不把商业情感博主与专业心理学机构混为一谈。资源链接经过核验，具体服务以官网为准。"
      />
      <div className="mt-8">
        <ResourceBrowser resources={RESOURCES} />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESOURCE_TYPE_ORDER.map((t) => (
          <div key={t} className="rounded-2xl border border-ink/5 bg-card/50 p-5">
            <p className="font-medium text-ink">{t}</p>
            <p className="mt-1 text-sm text-muted">
              {RESOURCES.filter((r) => r.type === t).length} 个资源
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
