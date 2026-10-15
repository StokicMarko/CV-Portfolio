import { lazy, Suspense, useEffect, useState } from "react";

const Terminal = lazy(() => import("./Terminal"));

const isTypingTarget = (target) =>
  target instanceof Element &&
  Boolean(target.closest("input, textarea, select, [contenteditable]"));

export default function TerminalLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openOnTilde = (event) => {
      if (event.key !== "~" || isTypingTarget(event.target)) return;
      event.preventDefault();
      setOpen(true);
    };
    window.addEventListener("keydown", openOnTilde);
    return () => window.removeEventListener("keydown", openOnTilde);
  }, []);

  if (!open) return null;

  return (
    <Suspense fallback={null}>
      <Terminal onClose={() => setOpen(false)} />
    </Suspense>
  );
}
