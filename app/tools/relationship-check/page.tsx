"use client";

import * as React from "react";
import Link from "next/link";
import { ToolShell } from "@/components/tools/ToolShell";
import { Card, Button } from "@/components/ui/primitives";
import EChart from "@/components/charts/EChart";
import type { EChartsOption } from "echarts";
import { useLocalStorageState } from "@/lib/useLocalStorage";

const DIMENSIONS = [
  { key: "communication", label: "沟通质量", section: "/communication", article: "ten-communication-mistakes" },
  { key: "connection", label: "情感连接", section: "/intimacy", article: "rebuild-emotional-connection" },
  { key: "trust", label: "信任程度", section: "/trust", article: "how-trust-is-built" },
  { key: "repair", label: "冲突修复", section: "/conflict", article: "repair-after-fight" },
  { key: "intimacy", label: "亲密关系", section: "/intimacy", article: "what-is-emotional-intimacy" },
  { key: "responsibility", label: "家庭责任", section: "/family", article: "fair-housework-division" },
  { key: "money", label: "金钱沟通", section: "/money", article: "have-a-money-talk" },
  { key: "goals", label: "共同目标", section: "/growth", article: "build-shared-goals" },
] as const;

type Scores = Record<(typeof DIMENSIONS)[number]["key"], number>;

const DEFAULT: Scores = DIMENSIONS.reduce(
  (acc, d) => ({ ...acc, [d.key]: 5 }),
  {} as Scores,
);

export default function RelationshipCheckTool() {
  const [scores, setScores, hydrated] = useLocalStorageState<Scores>(
    "twogether:tool:check",
    DEFAULT,
  );
  const [done, setDone] = React.useState(false);

  const option: EChartsOption = React.useMemo(
    () => ({
      tooltip: {},
      radar: {
        indicator: DIMENSIONS.map((d) => ({ name: d.label, max: 10 })),
        radius: "68%",
        splitNumber: 5,
        axisName: { color: "#34312E", fontSize: 12 },
        splitArea: { areaStyle: { color: ["#FAF8F4", "#F0ECE5"] } },
        splitLine: { lineStyle: { color: "#D9D2C7" } },
        axisLine: { lineStyle: { color: "#D9D2C7" } },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: DIMENSIONS.map((d) => scores[d.key]),
              name: "关系自评",
              areaStyle: { color: "rgba(185,119,91,0.25)" },
              lineStyle: { color: "#B9775B", width: 2 },
              itemStyle: { color: "#B9775B" },
            },
          ],
        },
      ],
    }),
    [scores],
  );

  const ranked = React.useMemo(
    () =>
      [...DIMENSIONS].sort((a, b) => scores[b.key] - scores[a.key]),
    [scores],
  );
  const strengths = ranked.slice(0, 3);
  const concerns = ranked.slice(-3).reverse();

  return (
    <ToolShell
      title="夫妻关系温度计"
      description="从八个维度对你的关系做一次非诊断性的自我评估。结果仅供自我反思，不用总分判断婚姻是否幸福或是否应该离婚。"
      disclaimer="这是自评工具，不是经过临床验证的心理测验，也不能替代专业评估。如果关系中存在暴力、控制或安全风险，请优先查看关系安全资源。"
    >
      <Card className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="font-editorial text-lg font-semibold text-ink">
              为每个维度打分（1–10）
            </h3>
            <p className="mt-1 text-sm text-muted">
              凭你的直觉与整体感受打分，没有标准答案。
            </p>
            <div className="mt-4 space-y-4">
              {DIMENSIONS.map((d) => (
                <div key={d.key}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-ink">{d.label}</span>
                    <span className="font-medium text-terracotta-dark">{scores[d.key]}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={scores[d.key]}
                    onChange={(e) =>
                      setScores((prev) => ({ ...prev, [d.key]: Number(e.target.value) }))
                    }
                    className="w-full accent-terracotta"
                  />
                </div>
              ))}
            </div>
            <Button className="mt-5" onClick={() => setDone(true)}>
              查看结果
            </Button>
          </div>

          <div>
            <h3 className="mb-2 text-center font-editorial text-lg font-semibold text-ink">
              关系自评雷达图
            </h3>
            <EChart option={option} height={360} />
          </div>
        </div>
      </Card>

      {(done || hydrated) && (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-editorial text-lg font-semibold text-sage-dark">
              当前优势
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/90">
              {strengths.map((d) => (
                <li key={d.key} className="flex justify-between gap-2">
                  <span>{d.label}</span>
                  <span className="text-sage-dark">{scores[d.key]} / 10</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">
              这些维度是你关系的资源，可以有意识地继续维护。
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="font-editorial text-lg font-semibold text-terracotta-dark">
              值得关注的方面
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/90">
              {concerns.map((d) => (
                <li key={d.key} className="flex justify-between gap-2">
                  <span>{d.label}</span>
                  <span className="text-terracotta-dark">{scores[d.key]} / 10</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">
              分数较低的维度，往往是关系里被忽略的需求。
            </p>
          </Card>
        </div>
      )}

      {(done || hydrated) && (
        <Card className="mt-6 p-6">
          <h3 className="font-editorial text-lg font-semibold text-ink">
            可执行的改善建议
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {concerns.map((d) => (
              <Link
                key={d.key}
                href={`/articles/${d.article}`}
                className="rounded-xl border border-ink/5 bg-white/70 p-4 transition-shadow hover:shadow-card"
              >
                <p className="font-medium text-ink">{d.label}</p>
                <p className="mt-1 text-sm text-muted">
                  阅读《{articleTitle(d.article)}》并挑一个小练习开始 →
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            想从整体入手？也可以浏览
            <Link href={concerns[0]?.section ?? "/growth"} className="text-terracotta hover:underline">
              对应栏目
            </Link>
            。记住：改善是渐进的，不需要一次解决所有问题。
          </p>
        </Card>
      )}
    </ToolShell>
  );
}

function articleTitle(slug: string): string {
  const map: Record<string, string> = {
    "ten-communication-mistakes": "夫妻沟通最容易犯的十个错误",
    "rebuild-emotional-connection": "如何重新建立夫妻之间的亲密感",
    "how-trust-is-built": "信任是如何在婚姻中建立的",
    "repair-after-fight": "争吵之后如何有效修复关系",
    "what-is-emotional-intimacy": "什么是真正的情感亲密",
    "fair-housework-division": "家务如何分配才算公平",
    "have-a-money-talk": "如何进行一次夫妻财务沟通",
    "build-shared-goals": "如何建立两个人的共同目标",
  };
  return map[slug] ?? "相关文章";
}
