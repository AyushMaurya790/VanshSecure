import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  actions,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  actions?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative isolate overflow-hidden surface-navy">
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-10 size-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-navy-deep/55" />
      <div className="container-page py-28 sm:py-36">
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          <p className="eyebrow text-gold reveal">{eyebrow}</p>
          <h1 className="reveal mt-5 text-balance text-5xl leading-[1.06] text-ivory sm:text-6xl">
            {title}
          </h1>
          <span
            className={cn(
              "mt-8 block h-px w-24 rule-gold",
              align === "center" && "mx-auto",
            )}
          />
          <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-ivory/70">{lede}</p>
          {actions ? (
            <div
              className={cn(
                "mt-11 flex flex-wrap gap-4",
                align === "center" && "justify-center",
              )}
            >
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
