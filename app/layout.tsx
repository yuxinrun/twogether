import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://twogether.example.com"),
  title: {
    default: "TWOGETHER · 夫妻关系与婚姻成长知识平台",
    template: "%s · TWOGETHER",
  },
  description:
    "TWOGETHER 是一个专业、温暖、科学的夫妻关系与婚姻成长知识平台，系统收集国内外婚姻心理学、亲密关系、家庭沟通、伴侣咨询的优质书籍、网站、研究与实操工具。",
  keywords: [
    "婚姻",
    "夫妻关系",
    "亲密关系",
    "婚姻心理学",
    "沟通",
    "家庭沟通",
    "伴侣咨询",
    "关系工具",
  ],
  openGraph: {
    title: "TWOGETHER · 夫妻关系与婚姻成长知识平台",
    description:
      "理解彼此，学会沟通，共同成长。Love is a practice, not just a feeling.",
    type: "website",
    locale: "zh_CN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        <AppProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
