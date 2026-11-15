import Link from "next/link";
import { Container, Button } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-editorial text-6xl font-semibold text-terracotta/40">404</p>
      <h1 className="mt-4 font-editorial text-2xl font-semibold text-ink">
        没有找到这个页面
      </h1>
      <p className="mt-2 text-muted">
        页面可能已经被移动或删除。不如回到首页，或从文章中心继续探索。
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
        <Link href="/articles">
          <Button variant="outline">文章中心</Button>
        </Link>
      </div>
    </Container>
  );
}
