import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/site-data";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      to={service.path}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-card p-8 shadow-card transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/70 hover:shadow-lift"
    >
      <span className="absolute inset-x-0 top-0 h-px rule-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="flex size-12 items-center justify-center rounded-full border border-gold/50 bg-secondary text-gold-deep transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-7 text-2xl leading-snug text-navy">{service.name}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.summary}
      </p>
      <span className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy transition-colors duration-500 group-hover:text-gold-deep">
        Discover This Solution
        <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
