"use client";

import * as React from "react";
import { useApp } from "@/components/providers/AppProvider";

export function RecentTracker({
  id,
  type,
  title,
  href,
}: {
  id: string;
  type: "article" | "book" | "quote" | "resource";
  title: string;
  href: string;
}) {
  const { addRecent } = useApp();
  React.useEffect(() => {
    addRecent({ id, type, title, href });
  }, [addRecent, id, type, title, href]);
  return null;
}
