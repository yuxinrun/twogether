import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "夫妻共同成长",
  description:
    "经营长期婚姻、每周对话、约会习惯、共同目标、欣赏感激与共同面对人生变化。",
};

export default function Page() {
  return <SectionPage sectionKey="growth" />;
}
