import type { Article } from "../../types";
import { marriageArticles } from "./batch-marriage";
import { communicationArticles } from "./batch-communication";
import { conflictArticles } from "./batch-conflict";
import { intimacyArticles } from "./batch-intimacy";
import { trustArticles } from "./batch-trust";
import { familyArticles } from "./batch-family";
import { moneyArticles } from "./batch-money";
import { crisisArticles } from "./batch-crisis";
import { psychologyArticles } from "./batch-psychology";
import { growthArticles } from "./batch-growth";

export const ARTICLES: Article[] = [
  ...marriageArticles,
  ...communicationArticles,
  ...conflictArticles,
  ...intimacyArticles,
  ...trustArticles,
  ...familyArticles,
  ...moneyArticles,
  ...crisisArticles,
  ...psychologyArticles,
  ...growthArticles,
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesBySection(section: string): Article[] {
  return ARTICLES.filter((a) => a.section === section);
}
