import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "信任与忠诚",
  description:
    "信任如何建立、如何面对欺骗与出轨、如何重建信任，以及关系中的边界与控制识别。",
};

export default function Page() {
  return <SectionPage sectionKey="trust" />;
}
