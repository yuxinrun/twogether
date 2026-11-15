// 全站核心数据类型定义

export type Region =
  | "中国大陆"
  | "香港"
  | "台湾"
  | "新加坡"
  | "美国"
  | "英国"
  | "全球通用";

// ---------------- 文章 ----------------

export type ArticleBlockType =
  | "paragraph"
  | "heading"
  | "quote"
  | "list"
  | "callout"
  | "dialogue"
  | "steps"
  | "tip";

export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface ArticleBlock {
  type: ArticleBlockType;
  // paragraph / heading / quote / tip
  text?: string;
  // heading level
  level?: 2 | 3;
  // list
  items?: string[];
  ordered?: boolean;
  // callout
  title?: string;
  variant?: "info" | "warn" | "note";
  // dialogue
  lines?: DialogueLine[];
  // steps
  steps?: string[];
}

export interface Reference {
  title: string;
  source: string;
  url?: string;
}

export interface Article {
  slug: string;
  title: string;
  section: SectionKey;
  summary: string; // 一句话核心观点
  corePoint: string;
  author: string;
  editor?: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  audience: string[];
  tags: string[];
  regions: Region[];
  blocks: ArticleBlock[];
  references?: Reference[];
  relatedBookSlugs?: string[];
  relatedArticleSlugs?: string[];
  relatedQuoteKeys?: string[];
}

// ---------------- 书籍 ----------------

export type BookCategory =
  | "亲密关系"
  | "婚姻经营"
  | "夫妻沟通"
  | "冲突解决"
  | "依恋理论"
  | "家庭治疗"
  | "性与亲密"
  | "心理学基础"
  | "情绪管理"
  | "家庭与育儿";

export interface Book {
  slug: string;
  titleZh: string;
  titleOrig?: string;
  authors: string[];
  translators?: string[];
  publisher?: string;
  year?: string;
  isbn?: string;
  category: BookCategory;
  language: "中文" | "英文" | "中英对照";
  audience: string;
  coreIdeas: string;
  worthLearning: string;
  practicalValue: string;
  difficulty: "入门" | "进阶" | "专业";
  relatedTopics: string[];
  buyLink?: string;
  verified: boolean; // 元信息是否经过核验
  note?: string;
}

// ---------------- 专业网站 / 机构 ----------------

export type ResourceType =
  | "学术机构"
  | "专业协会"
  | "公共服务机构"
  | "公益组织"
  | "商业内容平台";

export interface ResourceSite {
  slug: string;
  name: string;
  nameEn?: string;
  country: string;
  type: ResourceType;
  services: string;
  goodFor: string;
  providesMaterials: boolean;
  providesConsulting: boolean;
  url: string;
  language: string;
  reliability: string;
  regions: Region[];
  verified: boolean;
  note?: string;
}

// ---------------- 金句 ----------------

export type QuoteTheme =
  | "爱与理解"
  | "沟通与倾听"
  | "尊重与边界"
  | "信任与承诺"
  | "冲突与修复"
  | "亲密与陪伴"
  | "责任与成长"
  | "婚姻与现实";

export interface Quote {
  key: string;
  text: string;
  theme: QuoteTheme;
  author?: string; // 原创则留空
  relatedArticleSlugs?: string[];
}

// ---------------- 栏目 ----------------

export type SectionKey =
  | "marriage"
  | "communication"
  | "conflict"
  | "intimacy"
  | "trust"
  | "family"
  | "money"
  | "crisis"
  | "psychology"
  | "growth";

export interface Section {
  key: SectionKey;
  slug: string;
  title: string;
  navTitle: string;
  tagline: string;
  description: string;
  illustration: string; // 对应的 SVG 组件名
  topics: string[];
}
