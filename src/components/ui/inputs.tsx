import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-xs font-semibold text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {hint && !error && <p className="mt-0.5 text-[11px] font-normal text-muted-foreground">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p role="alert" className="mt-1 text-[11px] font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "field-input w-full rounded-lg px-3 py-2 text-sm text-foreground outline-none transition",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20",
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
        "field-input w-full resize-none rounded-lg px-3 py-2 text-sm leading-relaxed text-foreground outline-none transition",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20",
        className,
      )}
      {...props}
    />
  );
}
