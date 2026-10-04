import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/wizard-data";

export function DesktopStepper({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <aside className="panel hidden rounded-2xl p-4 lg:block">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Langkah</p>
      <ol className="relative space-y-4">
        <div className="absolute bottom-5 left-[13px] top-3 w-px bg-border" aria-hidden="true" />
        {STEPS.map((s, i) => {
          const done = i < current;
          const isCurrent = i === current;
          return (
            <li key={s.title} className="relative flex items-start gap-2.5">
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={i > current}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "z-10 grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition",
                  done && "bg-primary text-primary-foreground",
                  isCurrent && "border-2 border-primary bg-card text-primary",
                  !done && !isCurrent && "border border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
              </button>
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={i > current}
                className="min-w-0 text-left"
              >
                <p
                  className={cn(
                    "truncate text-[13px] font-semibold",
                    isCurrent || done ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.title}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">{s.hint}</p>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

export function MobileStepper({ current }: { current: number }) {
  const pct = ((current + 1) / STEPS.length) * 100;
  return (
    <div className="panel rounded-xl px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Langkah <span className="text-primary">{current + 1}</span> dari {STEPS.length}
        </p>
        <p className="truncate text-xs font-semibold text-foreground">{STEPS[current]!.title}</p>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex items-center gap-1.5 overflow-hidden text-[11px] font-medium">
        {STEPS.map((s, i) => (
          <span key={s.title} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <span className="text-muted-foreground/50">›</span>}
            <span
              className={cn(
                "min-w-0 truncate",
                i === current ? "font-semibold text-primary" : i < current ? "text-foreground/70" : "text-muted-foreground/60",
              )}
            >
              {i < current ? "✓ " : `${i + 1}·`}
              {s.title}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
