import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "婚姻心理学",
  description:
    "依恋理论、情绪调节、原生家庭、情绪劳动、认知偏差、负面互动循环与心理边界。",
};

export default function Page() {
  return <SectionPage sectionKey="psychology" />;
}
