"use client";

import * as React from "react";

export type FavId = string; // e.g. "article:slug" | "book:slug" | "quote:key"

export interface RecentItem {
  id: FavId;
  type: "article" | "book" | "quote" | "resource";
  title: string;
  href: string;
  at: number;
}

interface AppContextValue {
  favorites: FavId[];
  isFavorite: (id: FavId) => boolean;
  toggleFavorite: (id: FavId) => void;
  recents: RecentItem[];
  addRecent: (item: Omit<RecentItem, "at">) => void;
}

const AppContext = React.createContext<AppContextValue | null>(null);

const FAV_KEY = "twogether:favorites";
const RECENT_KEY = "twogether:recents";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<FavId[]>([]);
  const [recents, setRecents] = React.useState<RecentItem[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const f = localStorage.getItem(FAV_KEY);
      if (f) setFavorites(JSON.parse(f));
      const r = localStorage.getItem(RECENT_KEY);
      if (r) setRecents(JSON.parse(r));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  };

  const toggleFavorite = React.useCallback(
    (id: FavId) => {
      setFavorites((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        persist(FAV_KEY, next);
        return next;
      });
    },
    [],
  );

  const isFavorite = React.useCallback(
    (id: FavId) => favorites.includes(id),
    [favorites],
  );

  const addRecent = React.useCallback((item: Omit<RecentItem, "at">) => {
    setRecents((prev) => {
      const filtered = prev.filter((x) => x.id !== item.id);
      const next = [{ ...item, at: Date.now() }, ...filtered].slice(0, 24);
      persist(RECENT_KEY, next);
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, recents, addRecent }),
    [favorites, isFavorite, toggleFavorite, recents, addRecent],
  );

  return (
    <AppContext.Provider value={value}>
      {/* hydrated flag prevents SSR/client mismatch on favorites UI */}
      <span data-hydrated={hydrated} hidden />
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
