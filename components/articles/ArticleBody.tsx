import type { ArticleBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

function slugifyHeading(text: string): string {
  return text
    .replace(/\s+/g, "-")
    .replace(/[^\w一-龥-]/g, "")
    .slice(0, 40);
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="article-prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading": {
            const id = slugifyHeading(b.text || "");
            if (b.level === 3) {
              return (
                <h3 key={i} id={id}>
                  {b.text}
                </h3>
              );
            }
            return (
              <h2 key={i} id={id}>
                {b.text}
              </h2>
            );
          }
          case "paragraph":
            return <p key={i}>{b.text}</p>;
          case "quote":
            return (
              <blockquote key={i}>
                <p className="font-editorial text-lg text-ink">{b.text}</p>
              </blockquote>
            );
          case "list":
            return b.ordered ? (
              <ol key={i}>
                {b.items?.map((it, j) => <li key={j}>{it}</li>)}
              </ol>
            ) : (
              <ul key={i}>
                {b.items?.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            );
          case "callout": {
            const tone =
              b.variant === "warn"
                ? "border-terracotta/40 bg-terracotta/5"
                : b.variant === "note"
                  ? "border-champagne/50 bg-champagne/5"
                  : "border-sage/40 bg-sage/5";
            return (
              <div
                key={i}
                className={cn(
                  "my-5 rounded-xl border-l-4 p-4 text-sm leading-relaxed text-ink/90",
                  tone,
                )}
              >
                {b.title && (
                  <p className="mb-1 font-semibold text-ink">{b.title}</p>
                )}
                <p className="text-ink/80">{b.text}</p>
              </div>
            );
          }
          case "steps":
            return (
              <ol
                key={i}
                className="my-4 space-y-2 border-l-2 border-sage/40 pl-4"
              >
                {b.steps?.map((s, j) => (
                  <li key={j} className="relative">
                    <span className="absolute -left-[1.4rem] flex h-5 w-5 items-center justify-center rounded-full bg-sage/20 text-xs font-semibold text-sage-dark">
                      {j + 1}
                    </span>
                    <span className="text-ink/90">{s}</span>
                  </li>
                ))}
              </ol>
            );
          case "dialogue":
            return (
              <div
                key={i}
                className="my-5 space-y-2 rounded-xl border border-ink/5 bg-white/60 p-4"
              >
                {b.lines?.map((line, j) => (
                  <div key={j} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 shrink-0 items-center rounded-full bg-terracotta/10 px-2 text-xs font-medium text-terracotta-dark">
                      {line.speaker}
                    </span>
                    <p className="text-sm leading-relaxed text-ink/90">
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            );
          case "tip":
            return (
              <p
                key={i}
                className="my-3 rounded-lg bg-champagne/10 px-4 py-3 text-sm text-ink/80"
              >
                💡 {b.text}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function buildToc(blocks: ArticleBlock[]): { id: string; text: string; level: 2 | 3 }[] {
  return blocks
    .filter((b) => b.type === "heading")
    .map((b) => ({
      id: slugifyHeading(b.text || ""),
      text: b.text || "",
      level: (b.level ?? 2) as 2 | 3,
    }));
}
