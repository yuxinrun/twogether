"use client";

import * as React from "react";
import { Trash2, Save } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { Card, Button, Textarea } from "@/components/ui/primitives";
import { useLocalStorageState } from "@/lib/useLocalStorage";

const FIELDS = [
  { key: "what", label: "发生了什么" },
  { key: "feeling", label: "我当时的感受" },
  { key: "need", label: "我真正需要什么" },
  { key: "otherCares", label: "我认为对方在意什么" },
  { key: "hurt", label: "我做了什么可能伤害了对方" },
  { key: "next", label: "下次可以尝试什么不同做法" },
] as const;

type Perspective = Record<(typeof FIELDS)[number]["key"], string>;

interface Entry {
  mine: Perspective;
  partner: Perspective;
  at: number;
}

const empty = (): Perspective =>
  FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {} as Perspective);

export default function ConflictReviewTool() {
  const [mine, setMine] = React.useState<Perspective>(empty());
  const [partner, setPartner] = React.useState<Perspective>(empty());
  const [saved, setSaved, hydrated] = useLocalStorageState<Entry[]>(
    "twogether:tool:conflict",
    [],
  );

  const set = (
    who: "mine" | "partner",
    key: Perspective extends never ? string : (typeof FIELDS)[number]["key"],
    val: string,
  ) => {
    const updater = who === "mine" ? setMine : setPartner;
    updater((prev) => ({ ...prev, [key]: val }));
  };

  const complete = React.useMemo(
    () =>
      [...FIELDS.map((f) => mine[f.key]), ...FIELDS.map((f) => partner[f.key])].some(
        (v) => v.trim().length > 0,
      ),
    [mine, partner],
  );

  const onSave = () => {
    setSaved((prev) => [{ mine, partner, at: Date.now() }, ...prev].slice(0, 20));
    setMine(empty());
    setPartner(empty());
  };

  return (
    <ToolShell
      title="争吵复盘工具"
      description="引导你（和伴侣，如果愿意）分别从自己的视角记录一场争吵。我们不自动判断谁对谁错，只帮你看见双方各自的故事。"
      disclaimer="本工具用于自我反思，不替代婚姻咨询。若关系中存在暴力或控制，请优先查看关系安全资源。"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <PerspectiveCard
          title="我的视角"
          tone="terracotta"
          data={mine}
          onChange={(k, v) => set("mine", k, v)}
        />
        <PerspectiveCard
          title="伴侣的视角（如愿意，可代填或一起填）"
          tone="sage"
          data={partner}
          onChange={(k, v) => set("partner", k, v)}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button onClick={onSave} disabled={!complete}>
          <Save className="h-4 w-4" /> 保存这次复盘
        </Button>
        <p className="text-sm text-muted">
          保存后可回顾，但不评价对错，只呈现双方的感受与需要。
        </p>
      </div>

      {hydrated && saved.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="font-editorial text-lg font-semibold text-ink">
            历史复盘（{saved.length}）
          </h3>
          {saved.map((e, i) => (
            <Card key={i} className="p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-medium text-terracotta-dark">我</p>
                  <PerspectiveSummary data={e.mine} />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-sage-dark">伴侣</p>
                  <PerspectiveSummary data={e.partner} />
                </div>
              </div>
              <button
                onClick={() => setSaved((prev) => prev.filter((_, j) => j !== i))}
                className="mt-3 inline-flex items-center gap-1 text-sm text-muted hover:text-terracotta"
              >
                <Trash2 className="h-4 w-4" /> 删除
              </button>
            </Card>
          ))}
        </div>
      )}
    </ToolShell>
  );
}

function PerspectiveCard({
  title,
  tone,
  data,
  onChange,
}: {
  title: string;
  tone: "terracotta" | "sage";
  data: Perspective;
  onChange: (k: (typeof FIELDS)[number]["key"], v: string) => void;
}) {
  return (
    <Card className="p-6">
      <h3 className={`mb-4 font-editorial text-lg font-semibold ${tone === "terracotta" ? "text-terracotta-dark" : "text-sage-dark"}`}>
        {title}
      </h3>
      <div className="space-y-3">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-sm font-medium text-ink">{f.label}</label>
            <Textarea
              value={data[f.key]}
              onChange={(e) => onChange(f.key, e.target.value)}
              className="min-h-[60px]"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

function PerspectiveSummary({ data }: { data: Perspective }) {
  return (
    <ul className="space-y-1 text-sm text-muted">
      {FIELDS.map((f) => (
        <li key={f.key}>
          <span className="text-ink/70">{f.label}：</span>
          {data[f.key] || "—"}
        </li>
      ))}
    </ul>
  );
}
