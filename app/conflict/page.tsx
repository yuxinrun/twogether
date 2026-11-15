import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "冲突与争吵",
  description:
    "夫妻为什么总为同一件事争吵、如何停止无意义争吵、结束冷战，以及冲突后的修复步骤。",
};

export default function Page() {
  return <SectionPage sectionKey="conflict" />;
}
