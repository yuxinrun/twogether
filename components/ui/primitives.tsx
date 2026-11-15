import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-terracotta text-white hover:bg-terracotta-dark shadow-sm",
  secondary: "bg-sage text-white hover:bg-sage-dark shadow-sm",
  ghost: "bg-transparent text-ink hover:bg-card",
  outline:
    "border border-terracotta/40 text-terracotta hover:bg-terracotta/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}) {
  const Comp = asChild ? "span" : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-terracotta disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink/5 bg-card shadow-card",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Badge({
  className,
  children,
  tone = "neutral",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "neutral" | "terracotta" | "sage" | "champagne";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-ink/5 text-muted",
    terracotta: "bg-terracotta/10 text-terracotta-dark",
    sage: "bg-sage/15 text-sage-dark",
    champagne: "bg-champagne/15 text-[#9a7a45]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-terracotta">
          {eyebrow}
        </p>
      )}
      <h2 className="font-editorial text-2xl font-semibold text-ink sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border border-ink/10 bg-white px-3 py-2.5 text-sm text-ink focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
