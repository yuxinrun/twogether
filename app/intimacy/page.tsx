import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "亲密关系",
  description:
    "情感亲密、安全感、身体接触与亲密需求、性沟通、亲密需求差异与日常亲密仪式。",
};

export default function Page() {
  return <SectionPage sectionKey="intimacy" />;
}
