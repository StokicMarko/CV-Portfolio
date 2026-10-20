import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getLenis } from "../hooks/useLenis";
import { completeInput, runCommand } from "./terminalCommands";
import { Prompt } from "./TerminalParts";
import "./terminal.css";

const WELCOME = "Welcome. Type 'help' to see what you can do here.";
const FOCUSABLE = "a[href], button:not([disabled]), input:not([disabled])";
const NON_BREAKING_SPACE = "\u00a0";

export default function Terminal({ onClose }) {
  const [entries, setEntries] = useState([
    { id: 0, kind: "output", node: WELCOME },
  ]);
  const [value, setValue] = useState("");
  const [caret, setCaret] = useState(0);
  const nextId = useRef(1);
  const history = useRef([]);
  const historyPosition = useRef(0);
  const listedOptionsFor = useRef(null);
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

  const replaceValue = (next) => {
    setValue(next);
    setCaret(next.length);
  };

  const followCaret = (event) => setCaret(event.target.selectionStart ?? 0);

  const submit = (event) => {
    event.preventDefault();
    const command = value.trim();
    replaceValue("");
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
    replaceValue(history.current[position] ?? "");
  };

  const autocomplete = () => {
    const { value: completed, options } = completeInput(value);
    if (completed !== value) {
      listedOptionsFor.current = options.length > 1 ? completed : null;
      replaceValue(completed);
      return;
    }
    if (options.length < 2) return;

    if (listedOptionsFor.current !== value) {
      listedOptionsFor.current = value;
      return;
    }
    listedOptionsFor.current = null;
    setEntries((current) => [
      ...current,
      { id: nextId.current++, kind: "input", node: value },
      { id: nextId.current++, kind: "output", node: options.join("   ") },
    ]);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      autocomplete();
      return;
    }
    browseHistory(event);
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
          <span className="terminal-hint">Tab to complete · Esc to close</span>
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
              {entry.kind === "input" && <Prompt />}
              {entry.node}
            </p>
          ))}
        </div>

        <form className="terminal-prompt" onSubmit={submit}>
          <Prompt />
          <span className="terminal-field">
            <span className="terminal-typed" aria-hidden="true">
              {value.slice(0, caret)}
              <span className="terminal-cursor">
                {value[caret] ?? NON_BREAKING_SPACE}
              </span>
              {value.slice(caret + 1)}
            </span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={value}
              onChange={(event) => {
                listedOptionsFor.current = null;
                setValue(event.target.value);
                followCaret(event);
              }}
              onKeyDown={handleInputKeyDown}
              onKeyUp={followCaret}
              onSelect={followCaret}
              aria-label="Command"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </span>
        </form>
      </div>
    </div>
  );
}
