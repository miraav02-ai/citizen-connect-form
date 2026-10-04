import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-xs font-bold text-muted-foreground">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-[11px] font-medium text-muted-foreground/70">{hint}</p>}
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "field-input w-full rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground outline-none transition",
        className,
      )}
      {...props}
    />
  );
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "field-input w-full resize-none rounded-xl px-3.5 py-2.5 text-sm font-medium leading-relaxed text-foreground outline-none transition",
        className,
      )}
      {...props}
    />
  );
}
