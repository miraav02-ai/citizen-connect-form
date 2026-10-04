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
    <aside className="glass hidden rounded-3xl p-6 lg:block">
      <p className="mb-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Langkah</p>
      <ol className="relative space-y-7">
        <div className="absolute bottom-6 left-[15px] top-3 w-px bg-border" aria-hidden="true" />
        {STEPS.map((s, i) => {
          const done = i < current;
          const isCurrent = i === current;
          return (
            <li key={s.title} className="relative flex items-start gap-3">
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={i > current}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "z-10 grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold transition",
                  done && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                  isCurrent && "border border-primary/40 bg-card text-primary ring-4 ring-primary/10",
                  !done && !isCurrent && "border border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
              </button>
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={i > current}
                className="min-w-0 text-left"
              >
                <p
                  className={cn(
                    "truncate text-sm font-bold",
                    isCurrent || done ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">{s.hint}</p>
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
    <div className="glass rounded-2xl p-4 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Langkah <span className="text-primary">{current + 1}</span> dari {STEPS.length}
        </p>
        <p className="truncate text-xs font-bold text-foreground">{STEPS[current]!.title}</p>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 overflow-hidden text-[11px] font-semibold">
        {STEPS.map((s, i) => (
          <span key={s.title} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <span className="text-muted-foreground/50">›</span>}
            <span
              className={cn(
                "min-w-0 truncate",
                i === current ? "text-primary" : i < current ? "text-foreground/70" : "text-muted-foreground/60",
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
