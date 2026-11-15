import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "沟通的艺术",
  description:
    "夫妻沟通的方法：如何表达需求、认真倾听、避免指责、非暴力沟通，以及进行高质量的夫妻对话。",
};

export default function Page() {
  return <SectionPage sectionKey="communication" />;
}
