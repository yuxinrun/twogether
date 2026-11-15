"use client";

import * as React from "react";
import { Shuffle, Star, Check, Save } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { Card, Button, Textarea } from "@/components/ui/primitives";
import { useLocalStorageState } from "@/lib/useLocalStorage";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  "最近有什么事情让你感到被支持？",
  "我做什么会让你感到更被理解？",
  "最近我们之间有什么值得感谢的小事？",
  "有什么事情你希望我多了解一点？",
  "下周我们可以一起做什么？",
  "最近一次你感到孤单是什么时候，是因为什么？",
  "我们之间哪件事，你一直想聊但没找到机会？",
  "你最近在担心什么，愿意和我说说吗？",
  "我哪些做法让你觉得被尊重？",
  "如果我们能改变家里的一件小事，你希望是什么？",
  "上一次我们笑得很开心，是因为什么？",
  "你希望我们在哪些方面更像一个团队？",
];

interface Answer {
  q: string;
  a: string;
  at: number;
}
interface Prefs {
  fav: string[];
  done: string[];
  answers: Answer[];
}

export default function ConversationCardsTool() {
  const [prefs, setPrefs, hydrated] = useLocalStorageState<Prefs>(
    "twogether:tool:cards",
    { fav: [], done: [], answers: [] },
  );
  const [idx, setIdx] = React.useState(0);
  const [answer, setAnswer] = React.useState("");

  const current = QUESTIONS[idx];
  const isFav = prefs.fav.includes(current);
  const isDone = prefs.done.includes(current);

  const shuffle = () =>
    setIdx(Math.floor(Math.random() * QUESTIONS.length));

  const toggleFav = () =>
    setPrefs((p) => ({
      ...p,
      fav: isFav ? p.fav.filter((x) => x !== current) : [...p.fav, current],
    }));

  const toggleDone = () =>
    setPrefs((p) => ({
      ...p,
      done: isDone ? p.done.filter((x) => x !== current) : [...p.done, current],
    }));

  const saveAnswer = () => {
    if (!answer.trim()) return;
    setPrefs((p) => ({
      ...p,
      answers: [{ q: current, a: answer, at: Date.now() }, ...p.answers].slice(0, 50),
    }));
    setAnswer("");
  };

  return (
    <ToolShell
      title="每周夫妻对话卡"
      description="每周抽一个问题，认真聊一聊。可以收藏、标记完成，并保存你自己的回答。适合夫妻在安静的时候一起完成。"
    >
      <Card className="bg-gradient-to-br from-card to-bg p-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-terracotta">
          本周问题
        </p>
        <p className="mx-auto mt-4 max-w-xl font-editorial text-2xl leading-relaxed text-ink">
          {current}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={shuffle}>
            <Shuffle className="h-4 w-4" /> 换一张
          </Button>
          <Button
            variant={isFav ? "primary" : "outline"}
            onClick={toggleFav}
          >
            <Star className={cn("h-4 w-4", isFav && "fill-white")} />
            {isFav ? "已收藏" : "收藏"}
          </Button>
          <Button
            variant={isDone ? "secondary" : "outline"}
            onClick={toggleDone}
          >
            <Check className="h-4 w-4" /> {isDone ? "已完成" : "标记完成"}
          </Button>
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h3 className="font-editorial text-lg font-semibold text-ink">
          写下你的回答（仅保存在本地）
        </h3>
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="可以说说你的真实想法，也欢迎记下伴侣的回答。"
          className="mt-3 min-h-[100px]"
        />
        <Button className="mt-3" onClick={saveAnswer} disabled={!answer.trim()}>
          <Save className="h-4 w-4" /> 保存回答
        </Button>
      </Card>

      {hydrated && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {prefs.fav.length > 0 && (
            <div>
              <h3 className="font-editorial text-lg font-semibold text-ink">
                收藏的问题（{prefs.fav.length}）
              </h3>
              <ul className="mt-3 space-y-2">
                {prefs.fav.map((q, i) => (
                  <li key={i} className="rounded-xl border border-ink/5 bg-card p-3 text-sm text-ink/90">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {prefs.answers.length > 0 && (
            <div>
              <h3 className="font-editorial text-lg font-semibold text-ink">
                已保存的回答（{prefs.answers.length}）
              </h3>
              <ul className="mt-3 space-y-2">
                {prefs.answers.map((x, i) => (
                  <li key={i} className="rounded-xl border border-ink/5 bg-card p-3">
                    <p className="text-sm font-medium text-terracotta-dark">{x.q}</p>
                    <p className="mt-1 text-sm text-ink/80">{x.a}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
}
