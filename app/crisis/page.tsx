import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "婚姻危机与修复",
  description:
    "婚姻倦怠、关系疏远、如何判断婚姻是否值得修复、分居沟通、离婚前思考与专业求助。",
};

export default function Page() {
  return <SectionPage sectionKey="crisis" />;
}
