import { lazy, Suspense, useEffect, useState } from "react";

const Terminal = lazy(() => import("./Terminal"));

const OPEN_KEY = "-";

const hasModifier = (event) => event.ctrlKey || event.metaKey || event.altKey;

const isTypingTarget = (target) =>
  target instanceof Element &&
  Boolean(target.closest("input, textarea, select, [contenteditable]"));

export default function TerminalLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openOnKey = (event) => {
      if (event.key !== OPEN_KEY || hasModifier(event)) return;
      if (isTypingTarget(event.target)) return;
      event.preventDefault();
      setOpen(true);
    };
    window.addEventListener("keydown", openOnKey);
    return () => window.removeEventListener("keydown", openOnKey);
  }, []);

  if (!open) return null;

  return (
    <Suspense fallback={null}>
      <Terminal onClose={() => setOpen(false)} />
    </Suspense>
  );
}
