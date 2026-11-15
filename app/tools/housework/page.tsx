"use client";

import * as React from "react";
import { Trash2, Plus } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { Card, Button, Input, Select } from "@/components/ui/primitives";
import EChart from "@/components/charts/EChart";
import type { EChartsOption } from "echarts";
import { useLocalStorageState } from "@/lib/useLocalStorage";

interface Chore {
  id: string;
  name: string;
  who: "me" | "partner" | "both";
  minutes: number;
}

const PRESETS = ["做饭", "洗碗", "清洁", "采购", "接送孩子", "育儿安排", "家庭行政事务"];

export default function HouseworkTool() {
  const [chores, setChores, hydrated] = useLocalStorageState<Chore[]>(
    "twogether:tool:housework",
    [],
  );
  const [name, setName] = React.useState("");
  const [who, setWho] = React.useState<Chore["who"]>("me");
  const [minutes, setMinutes] = React.useState(30);

  const add = () => {
    if (!name.trim()) return;
    setChores((prev) => [
      { id: String(Date.now()), name: name.trim(), who, minutes },
      ...prev,
    ]);
    setName("");
  };

  const remove = (id: string) =>
    setChores((prev) => prev.filter((c) => c.id !== id));

  const totals = React.useMemo(() => {
    const me = chores
      .filter((c) => c.who === "me" || c.who === "both")
      .reduce((s, c) => s + c.minutes / (c.who === "both" ? 2 : 1), 0);
    const partner = chores
      .filter((c) => c.who === "partner" || c.who === "both")
      .reduce((s, c) => s + c.minutes / (c.who === "both" ? 2 : 1), 0);
    return { me: Math.round(me), partner: Math.round(partner) };
  }, [chores]);

  const option: EChartsOption = React.useMemo(
    () => ({
      tooltip: { trigger: "axis" },
      grid: { left: 10, right: 10, top: 20, bottom: 10, containLabel: true },
      xAxis: { type: "category", data: ["我", "伴侣"], axisLine: { lineStyle: { color: "#D9D2C7" } }, axisLabel: { color: "#34312E" } },
      yAxis: { type: "value", name: "预估时长(分钟/周)", splitLine: { lineStyle: { color: "#ECE6DC" } }, axisLabel: { color: "#827D75" } },
      series: [
        {
          type: "bar",
          data: [totals.me, totals.partner],
          barWidth: "40%",
          itemStyle: { color: "#B9775B", borderRadius: [6, 6, 0, 0] },
          label: { show: true, position: "top", color: "#34312E" },
        },
      ],
    }),
    [totals],
  );

  return (
    <ToolShell
      title="家务公平分配工具"
      description="录入家务事项与预估时间，看见双方各自承担了多少。我们提醒：公平不只是数量相等，也包括计划、提醒与心理负担。"
      disclaimer="本工具帮助可视化分工，但不自动判断「谁对谁错」。若一方以收入为由完全不承担照护与家务，那是权力失衡，值得认真讨论。"
    >
      <Card className="p-6">
        <h3 className="font-editorial text-lg font-semibold text-ink">
          添加一项家务
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <Select value={name} onChange={(e) => setName(e.target.value)}>
            <option value="">选择或自定义…</option>
            {PRESETS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </Select>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="或输入自定义"
          />
          <Select value={who} onChange={(e) => setWho(e.target.value as Chore["who"])}>
            <option value="me">主要由我</option>
            <option value="partner">主要由伴侣</option>
            <option value="both">共同</option>
          </Select>
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value) || 0)}
            />
            <Button onClick={add} disabled={!name.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-3 font-editorial text-lg font-semibold text-ink">
            时间分配（按周预估）
          </h3>
          <EChart option={option} height={280} />
        </Card>
        <Card className="p-6">
          <h3 className="font-editorial text-lg font-semibold text-ink">
            清单（{chores.length}）
          </h3>
          {hydrated && chores.length === 0 ? (
            <p className="mt-3 text-muted">还没有记录家务。</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {chores.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between rounded-xl border border-ink/5 bg-white/60 px-3 py-2 text-sm"
                >
                  <span className="text-ink/90">{c.name}</span>
                  <span className="flex items-center gap-3 text-muted">
                    <span>
                      {c.who === "me" ? "我" : c.who === "partner" ? "伴侣" : "共同"} · {c.minutes} 分钟
                    </span>
                    <button
                      onClick={() => remove(c.id)}
                      aria-label="删除"
                      className="text-muted hover:text-terracotta"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs leading-relaxed text-muted">
            提示：「共同」按每人一半计时，但仍需考虑谁在计划与提醒。真正的公平，是双方都觉得被看见、被尊重。
          </p>
        </Card>
      </div>
    </ToolShell>
  );
}
