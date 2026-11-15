"use client";

import * as React from "react";
import { Trash2, Save } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { Card, Button, Textarea } from "@/components/ui/primitives";
import { useLocalStorageState } from "@/lib/useLocalStorage";
import { formatDate } from "@/lib/utils";

const PROMPTS = [
  { key: "happy", label: "本周最开心的时刻" },
  { key: "hard", label: "本周最困难的时刻" },
  { key: "thanks", label: "我感谢你的地方" },
  { key: "improve", label: "我希望下周改善的事情" },
  { key: "together", label: "我们下周共同完成的一件事" },
] as const;

type Review = Record<(typeof PROMPTS)[number]["key"], string> & {
  week: string;
  at: number;
};

const empty = (): Record<(typeof PROMPTS)[number]["key"], string> =>
  PROMPTS.reduce(
    (a, p) => ({ ...a, [p.key]: "" }),
    {} as Record<(typeof PROMPTS)[number]["key"], string>,
  );

export default function WeeklyReviewTool() {
  const [form, setForm] = React.useState(empty());
  const [week, setWeek] = React.useState("本周");
  const [saved, setSaved, hydrated] = useLocalStorageState<Review[]>(
    "twogether:tool:weekly",
    [],
  );

  const complete = PROMPTS.some((p) => form[p.key].trim().length > 0);

  const save = () => {
    if (!complete) return;
    setSaved((prev) => [{ ...form, week, at: Date.now() }, ...prev].slice(0, 30));
    setForm(empty());
  };

  return (
    <ToolShell
      title="每周关系回顾"
      description="一周 20 分钟，轻量复盘。先说感谢，再说困难，最后约定下周的一件小事。把复盘变成温暖的仪式，而不是批斗会。"
    >
      <Card className="p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm font-medium text-ink">这一周：</span>
          <input
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink focus:border-terracotta focus:outline-none"
          />
        </div>
        <div className="space-y-4">
          {PROMPTS.map((p) => (
            <div key={p.key}>
              <label className="mb-1 block text-sm font-medium text-ink">{p.label}</label>
              <Textarea
                value={form[p.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [p.key]: e.target.value }))}
                className="min-h-[60px]"
              />
            </div>
          ))}
        </div>
        <Button className="mt-4" onClick={save} disabled={!complete}>
          <Save className="h-4 w-4" /> 保存本周回顾
        </Button>
      </Card>

      {hydrated && saved.length > 0 && (
        <div className="mt-8">
          <h3 className="font-editorial text-lg font-semibold text-ink">
            历史回顾（{saved.length}）
          </h3>
          <div className="mt-3 space-y-4">
            {saved.map((r, i) => (
              <Card key={i} className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium text-terracotta-dark">{r.week}</span>
                  <span className="text-xs text-muted">{formatDate(new Date(r.at).toISOString())}</span>
                </div>
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  {PROMPTS.map((p) => (
                    <div key={p.key}>
                      <dt className="text-muted">{p.label}</dt>
                      <dd className="text-ink/90">{r[p.key] || "—"}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  onClick={() => setSaved((prev) => prev.filter((_, j) => j !== i))}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-muted hover:text-terracotta"
                >
                  <Trash2 className="h-4 w-4" /> 删除
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}
