export interface ToolLink {
  title: string;
  href: string;
  desc: string;
}

export const TOOL_BY_SECTION: Record<string, ToolLink[]> = {
  marriage: [
    { title: "夫妻关系温度计", href: "/tools/relationship-check", desc: "八维度自我评估" },
    { title: "每周关系回顾", href: "/tools/weekly-review", desc: "一周 20 分钟复盘" },
  ],
  communication: [
    { title: "夫妻沟通练习器", href: "/tools/communication", desc: "把指责改写成需求" },
  ],
  conflict: [
    { title: "争吵复盘工具", href: "/tools/conflict-review", desc: "从双方视角理解冲突" },
    { title: "关系温度计", href: "/tools/relationship-check", desc: "评估冲突修复维度" },
  ],
  intimacy: [
    { title: "每周夫妻对话卡", href: "/tools/conversation-cards", desc: "增进亲密的好问题" },
  ],
  trust: [
    { title: "关系温度计", href: "/tools/relationship-check", desc: "评估信任与安全感" },
  ],
  family: [
    { title: "家务分配工具", href: "/tools/housework", desc: "看见隐形劳动" },
    { title: "共同目标计划", href: "/tools/shared-goals", desc: "家庭目标管理" },
  ],
  money: [
    { title: "共同目标计划", href: "/tools/shared-goals", desc: "家庭财务目标" },
  ],
  crisis: [
    { title: "关系温度计", href: "/tools/relationship-check", desc: "评估是否需要帮助" },
    { title: "对话卡", href: "/tools/conversation-cards", desc: "在低谷中保持连接" },
  ],
  psychology: [
    { title: "关系温度计", href: "/tools/relationship-check", desc: "了解关系全貌" },
  ],
  growth: [
    { title: "每周关系回顾", href: "/tools/weekly-review", desc: "持续复盘与成长" },
    { title: "共同目标计划", href: "/tools/shared-goals", desc: "一起向前" },
    { title: "对话卡", href: "/tools/conversation-cards", desc: "每周一个好问题" },
  ],
};

export const ALL_TOOLS: ToolLink[] = [
  { title: "夫妻沟通练习器", href: "/tools/communication", desc: "输入想说的话，引导识别事实、感受、需求与请求，生成更温和的表达。" },
  { title: "争吵复盘工具", href: "/tools/conflict-review", desc: "引导双方分别记录发生的事、感受、需要与可尝试的不同做法。" },
  { title: "夫妻关系温度计", href: "/tools/relationship-check", desc: "八维度自评雷达图，提供优势、关注点与改善建议（非诊断）。" },
  { title: "每周夫妻对话卡", href: "/tools/conversation-cards", desc: "随机问题、收藏、标记完成并保存自己的回答。" },
  { title: "夫妻共同目标计划", href: "/tools/shared-goals", desc: "设定目标、时间、行动步骤与完成进度。" },
  { title: "家务分配工具", href: "/tools/housework", desc: "录入家务与预估时间，看见双方承担与隐形劳动。" },
  { title: "每周关系回顾", href: "/tools/weekly-review", desc: "记录本周开心、困难、感谢与下周改善。" },
];
