import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getLenis } from "../hooks/useLenis";
import { runCommand } from "./terminalCommands";
import "./terminal.css";

const WELCOME = "Welcome. Type 'help' to see what you can do here.";
const FOCUSABLE = "a[href], button:not([disabled]), input:not([disabled])";

export default function Terminal({ onClose }) {
  const [entries, setEntries] = useState([
    { id: 0, kind: "output", node: WELCOME },
  ]);
  const [value, setValue] = useState("");
  const nextId = useRef(1);
  const history = useRef([]);
  const historyPosition = useRef(0);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const keepFocusInside = (event) => {
      if (!dialogRef.current?.contains(event.target)) inputRef.current?.focus();
    };
    document.addEventListener("focusin", keepFocusInside);

    return () => {
      document.removeEventListener("focusin", keepFocusInside);
      getLenis()?.start();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [entries]);

  const submit = (event) => {
    event.preventDefault();
    const command = value.trim();
    setValue("");
    if (!command) return;

    history.current.push(command);
    historyPosition.current = history.current.length;

    const result = runCommand(command);
    if (result.clear) {
      setEntries([]);
      return;
    }

    const added = [
      { id: nextId.current++, kind: "input", node: command },
      ...result.lines.map((node) => ({
        id: nextId.current++,
        kind: result.tone ?? "output",
        node,
      })),
    ];
    setEntries((current) => [...current, ...added]);
  };

  const browseHistory = (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const step = event.key === "ArrowUp" ? -1 : 1;
    const position = Math.min(
      history.current.length,
      Math.max(0, historyPosition.current + step),
    );
    historyPosition.current = position;
    setValue(history.current[position] ?? "");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const focusInputUnlessSelecting = () => {
    if (!window.getSelection()?.toString()) inputRef.current?.focus();
  };

  return (
    <div
      className="terminal-overlay"
      data-lenis-prevent
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="terminal"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onKeyDown={handleKeyDown}
        onClick={focusInputUnlessSelecting}
      >
        <header className="terminal-bar">
          <span className="terminal-title">marko@portfolio: ~</span>
          <span className="terminal-hint">Esc to close</span>
          <button
            type="button"
            className="terminal-close"
            aria-label="Close terminal"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </header>

        <div
          ref={logRef}
          className="terminal-log"
          role="log"
          aria-live="polite"
        >
          {entries.map((entry) => (
            <p key={entry.id} className={`terminal-line is-${entry.kind}`}>
              {entry.kind === "input" && (
                <span className="terminal-mark" aria-hidden="true">
                  ${" "}
                </span>
              )}
              {entry.node}
            </p>
          ))}
        </div>

        <form className="terminal-prompt" onSubmit={submit}>
          <span className="terminal-mark" aria-hidden="true">
            $
          </span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={browseHistory}
            aria-label="Command"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
