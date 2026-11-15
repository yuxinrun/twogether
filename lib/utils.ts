import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
}

export function readingTimeLabel(min: number): string {
  return `约 ${min} 分钟阅读`;
}

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w\-一-龥]/g, "");
}
