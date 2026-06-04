"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { onApiLoadingChange } from "./api";

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ApiLoadingOverlay() {
  const hydrated = useHydrated();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    return onApiLoadingChange(setActive);
  }, [hydrated]);

  if (!hydrated || !active) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-mc-ink/20 backdrop-blur-[2px] transition-opacity">
      <div className="flex flex-col items-center gap-3 rounded-[1.4rem] bg-white px-10 py-8 shadow-card">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-mc-orange border-t-transparent" />
        <p className="text-sm font-semibold text-mc-ink/70">Loading…</p>
      </div>
    </div>
  );
}
