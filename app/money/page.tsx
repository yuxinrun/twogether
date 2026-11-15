import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = {
  title: "金钱与婚姻",
  description:
    "夫妻为什么因钱争吵、共同账户与独立账户、家庭预算、消费观差异与共同财务目标。",
};

export default function Page() {
  return <SectionPage sectionKey="money" />;
}
