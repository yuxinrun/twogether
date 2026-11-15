"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { ResourceSite } from "@/lib/types";
import { ResourceCard } from "@/components/cards";
import { Input, Select } from "@/components/ui/primitives";

export function ResourceBrowser({ resources }: { resources: ResourceSite[] }) {
  const [q, setQ] = React.useState("");
  const [type, setType] = React.useState("all");
  const [country, setCountry] = React.useState("all");

  const filtered = React.useMemo(() => {
    const term = q.trim().toLowerCase();
    return resources.filter((r) => {
      if (type !== "all" && r.type !== type) return false;
      if (country !== "all" && r.country !== country) return false;
      if (term) {
        const hay = (r.name + r.nameEn + r.services + r.goodFor).toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [resources, q, type, country]);

  const countries = React.useMemo(
    () => Array.from(new Set(resources.map((r) => r.country))),
    [resources],
  );

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-ink/5 bg-card/60 p-4 sm:grid-cols-3">
        <div className="relative sm:col-span-3 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索机构或国家…"
            className="pl-9"
          />
        </div>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">全部类型</option>
          {["学术机构", "专业协会", "公共服务机构", "公益组织", "商业内容平台"].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </Select>
        <Select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="all">全部地区</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
      </div>

      <p className="mt-4 text-sm text-muted">共 {filtered.length} 个资源</p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <div key={r.slug} id={r.slug}>
              <ResourceCard resource={r} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-muted">没有符合条件的资源。</p>
      )}
    </div>
  );
}
