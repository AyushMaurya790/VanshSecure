import { Link } from "@tanstack/react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "group inline-flex items-center justify-center gap-2.5 rounded-md font-sans text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        gold: "bg-gold text-navy-deep shadow-gold hover:bg-gold-deep hover:-translate-y-0.5",
        outlineLight:
          "border border-ivory/35 text-ivory hover:border-gold hover:text-gold",
        outlineDark:
          "border border-navy/25 text-navy hover:border-gold-deep hover:bg-navy hover:text-ivory",
        quiet:
          "text-navy hover:text-gold-deep px-0! tracking-[0.14em] border-b border-navy/20 hover:border-gold-deep rounded-none",
      },
      size: {
        default: "px-7 py-4",
        sm: "px-5 py-3 text-[0.7rem]",
        lg: "px-9 py-5",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  },
);

type CtaProps = Omit<ComponentProps<typeof Link>, "children"> &
  VariantProps<typeof ctaVariants> & { withArrow?: boolean; children?: ReactNode };


export function CtaLink({
  className,
  variant,
  size,
  withArrow = true,
  children,
  ...props
}: CtaProps) {
  return (
    <Link className={cn(ctaVariants({ variant, size }), className)} {...props}>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}

export function CtaButton({
  className,
  variant,
  size,
  withArrow = true,
  children,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof ctaVariants> & { withArrow?: boolean }) {
  return (
    <button className={cn(ctaVariants({ variant, size }), className)} {...props}>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
      ) : null}
    </button>
  );
}
