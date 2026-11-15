"use client";

import * as React from "react";
import { Trash2, Plus, Target } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { Card, Button, Input, Textarea, Select } from "@/components/ui/primitives";
import { useLocalStorageState } from "@/lib/useLocalStorage";

interface Goal {
  id: string;
  title: string;
  category: string;
  deadline: string;
  detail: string;
  progress: number;
  at: number;
}

const CATEGORIES = ["家庭财务", "旅行", "育儿", "健康", "共同学习", "生活方式"];

export default function SharedGoalsTool() {
  const [goals, setGoals, hydrated] = useLocalStorageState<Goal[]>(
    "twogether:tool:goals",
    [],
  );
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [deadline, setDeadline] = React.useState("");
  const [detail, setDetail] = React.useState("");

  const add = () => {
    if (!title.trim()) return;
    setGoals((prev) => [
      {
        id: String(Date.now()),
        title: title.trim(),
        category,
        deadline: deadline.trim(),
        detail: detail.trim(),
        progress: 0,
        at: Date.now(),
      },
      ...prev,
    ]);
    setTitle("");
    setDeadline("");
    setDetail("");
  };

  const updateProgress = (id: string, v: number) =>
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, progress: v } : g)));
  const remove = (id: string) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  return (
    <ToolShell
      title="夫妻共同目标计划"
      description="把愿望变成可执行的计划：设定目标、时间、行动步骤和完成进度。目标可以是财务、旅行、育儿、健康或共同学习。"
    >
      <Card className="p-6">
        <h3 className="font-editorial text-lg font-semibold text-ink">
          新建一个共同目标
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="目标，例如：建立 6 个月应急金"
          />
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
          <Input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="时间，例如：一年内"
          />
          <div className="sm:col-span-2">
            <Textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="行动步骤或备注，例如：每月各存 2000 元，设共同账户。"
              className="min-h-[70px]"
            />
          </div>
        </div>
        <Button className="mt-4" onClick={add} disabled={!title.trim()}>
          <Plus className="h-4 w-4" /> 添加目标
        </Button>
      </Card>

      <div className="mt-8">
        <h3 className="font-editorial text-lg font-semibold text-ink">
          我们的目标（{goals.length}）
        </h3>
        {hydrated && goals.length === 0 ? (
          <p className="mt-3 text-muted">还没有目标，先添加一个吧。</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {goals.map((g) => (
              <Card key={g.id} className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sage/15 px-2 py-0.5 text-xs text-sage-dark">
                      <Target className="h-3 w-3" /> {g.category}
                    </span>
                    <h4 className="mt-2 font-medium text-ink">{g.title}</h4>
                    {g.deadline && (
                      <p className="text-xs text-muted">目标时间：{g.deadline}</p>
                    )}
                  </div>
                  <button
                    onClick={() => remove(g.id)}
                    aria-label="删除"
                    className="text-muted hover:text-terracotta"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {g.detail && (
                  <p className="mt-2 text-sm text-muted">{g.detail}</p>
                )}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>进度</span>
                    <span>{g.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={g.progress}
                    onChange={(e) => updateProgress(g.id, Number(e.target.value))}
                    className="mt-1 w-full accent-terracotta"
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
