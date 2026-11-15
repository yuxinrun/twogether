"use client";

import * as React from "react";
import { Trash2, Save, Wand2 } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { Card, Button, Textarea, Input } from "@/components/ui/primitives";
import { useLocalStorageState } from "@/lib/useLocalStorage";

interface Saved {
  original: string;
  gentle: string;
  at: number;
}

const EXAMPLES = [
  {
    original: "你根本不在乎这个家！",
    observe: "最近家里的很多事都由我一个人处理",
    feel: "我感到疲惫、有点孤单",
    need: "我需要我们一起分担",
    request: "你愿意每周和我一起规划一次家务吗？",
  },
  {
    original: "你从来都不听我说话！",
    observe: "刚才我说话时你在看手机",
    feel: "我觉得没有被重视",
    need: "我需要被认真听",
    request: "你愿意放下手机，听我说完这三分钟吗？",
  },
];

export default function CommunicationTool() {
  const [original, setOriginal] = React.useState("");
  const [observe, setObserve] = React.useState("");
  const [feel, setFeel] = React.useState("");
  const [need, setNeed] = React.useState("");
  const [request, setRequest] = React.useState("");
  const [saved, setSaved, hydrated] = useLocalStorageState<Saved[]>(
    "twogether:tool:communication",
    [],
  );

  const gentle = React.useMemo(() => {
    const parts: string[] = [];
    if (observe) parts.push(`我看到${observe}`);
    if (feel) parts.push(`我感到${feel}`);
    if (need) parts.push(`因为我需要${need}`);
    if (request) parts.push(`你愿意${request}`);
    return parts.join("，") + (parts.length ? "？" : "");
  }, [observe, feel, need, request]);

  const onSave = () => {
    if (!gentle) return;
    setSaved((prev) => [
      { original, gentle, at: Date.now() },
      ...prev,
    ].slice(0, 30));
    setOriginal("");
    setObserve("");
    setFeel("");
    setNeed("");
    setRequest("");
  };

  const loadExample = (ex: (typeof EXAMPLES)[number]) => {
    setOriginal(ex.original);
    setObserve(ex.observe);
    setFeel(ex.feel);
    setNeed(ex.need);
    setRequest(ex.request);
  };

  return (
    <ToolShell
      title="夫妻沟通练习器"
      description="把你心里的话，从「指责」改写成「事实 + 感受 + 需要 + 请求」。我们不替你说话，只帮你把意思说得更清楚、更容易被听进去。"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-editorial text-lg font-semibibold text-ink">
            第一步：写下你想说的话
          </h3>
          <Textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="例如：你根本不在乎这个家！"
            className="mt-3 min-h-[90px]"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm text-muted">试试示例：</span>
            {EXAMPLES.map((ex, i) => (
              <button
                key={i}
                onClick={() => loadExample(ex)}
                className="rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-xs text-ink/80 hover:text-terracotta"
              >
                「{ex.original}」
              </button>
            ))}
          </div>

          <h3 className="mt-6 font-editorial text-lg font-semibold text-ink">
            第二步：拆成四个部分
          </h3>
          <div className="mt-3 space-y-3">
            <Field label="观察（事实，不加评判）" value={observe} setValue={setObserve} placeholder="我看到……" />
            <Field label="感受（你的情绪）" value={feel} setValue={setFeel} placeholder="我感到……" />
            <Field label="需要（背后的需求）" value={need} setValue={setNeed} placeholder="因为我需要……" />
            <Field label="请求（具体、可操作）" value={request} setValue={setRequest} placeholder="你愿意……吗？" />
          </div>
        </Card>

        <Card className="flex flex-col bg-gradient-to-br from-card to-bg p-6">
          <h3 className="flex items-center gap-2 font-editorial text-lg font-semibold text-ink">
            <Wand2 className="h-5 w-5 text-terracotta" /> 改写参考
          </h3>
          <div className="mt-4 rounded-xl border border-ink/5 bg-white/70 p-4">
            <p className="text-xs font-medium text-muted">原话</p>
            <p className="mt-1 text-ink/80">{original || "（在左侧写下原话）"}</p>
            <p className="mt-4 text-xs font-medium text-muted">更温和、清晰的表达</p>
            <p className="mt-1 font-editorial text-lg leading-relaxed text-terracotta-dark">
              {gentle || "填写右侧四个部分，这里会实时生成。"}
            </p>
          </div>
          <div className="mt-4 rounded-xl bg-terracotta/5 p-4 text-sm leading-relaxed text-ink/80">
            <p className="font-medium text-terracotta-dark">为什么这样更容易被接住？</p>
            <p className="mt-1">
              指责把对方定义成「坏伴侣」，会立刻触发防御；而暴露你的脆弱与需求，给对方一个「可以帮上忙」的入口，而不是「必须辩护」的战场。
            </p>
          </div>
          <Button onClick={onSave} className="mt-auto" disabled={!gentle}>
            <Save className="h-4 w-4" /> 保存这次练习
          </Button>
        </Card>
      </div>

      {hydrated && saved.length > 0 && (
        <div className="mt-8">
          <h3 className="font-editorial text-lg font-semibold text-ink">
            已保存的练习（{saved.length}）
          </h3>
          <div className="mt-3 space-y-3">
            {saved.map((s, i) => (
              <Card key={i} className="flex items-start justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="text-sm text-muted line-through">{s.original}</p>
                  <p className="mt-1 text-ink/90">{s.gentle}</p>
                </div>
                <button
                  onClick={() => setSaved((prev) => prev.filter((_, j) => j !== i))}
                  aria-label="删除"
                  className="text-muted hover:text-terracotta"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

function Field({
  label,
  value,
  setValue,
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink">{label}</label>
      <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
