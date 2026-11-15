import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "家庭与责任",
  description:
    "家务公平分配、育儿责任分担、双方父母与婚姻边界、共同决策与事业家庭的平衡。",
};

export default function Page() {
  return <SectionPage sectionKey="family" />;
}
