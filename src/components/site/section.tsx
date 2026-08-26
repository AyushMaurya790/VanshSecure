import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "light" ? "text-gold" : "text-gold-deep")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-4 text-balance text-4xl leading-[1.12] sm:text-5xl",
          tone === "light" ? "text-ivory" : "text-navy",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed",
            tone === "light" ? "text-ivory/70" : "text-muted-foreground",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-24 sm:py-32", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
