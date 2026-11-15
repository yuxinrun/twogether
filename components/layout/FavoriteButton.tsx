"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { useApp, type FavId } from "@/components/providers/AppProvider";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  id,
  className,
  label,
}: {
  id: FavId;
  className?: string;
  label?: string;
}) {
  const { isFavorite, toggleFavorite } = useApp();
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  const active = ready && isFavorite(id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "取消收藏" : "收藏"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-sm text-muted transition-colors hover:border-terracotta/40 hover:text-terracotta",
        active && "border-terracotta/50 text-terracotta",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4", active && "fill-terracotta")}
        strokeWidth={2}
      />
      {label && <span>{label}</span>}
    </button>
  );
}
