import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "认识婚姻",
  description:
    "理解婚姻的本质、长期关系的变化、健康关系的样子，以及婚姻中的边界、承诺与新鲜感。",
};

export default function Page() {
  return <SectionPage sectionKey="marriage" />;
}
