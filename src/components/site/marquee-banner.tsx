import { Sparkles } from "lucide-react";

const ITEMS = [
  "Goal Planning SIP",
  "Retirement Planning",
  "Tax Harvesting",
  "Investment through GIFT City",
  "Specialized Investment Funds",
  "Loan Against Securities",
  "Life · Health · Travel · Vehicle Insurance",
  "Tax Saving Bonds",
  "Unlisted Shares",
  "Corporate Fixed Deposits",
  "Save Karo, Secure Karo",
];

export function MarqueeBanner() {
  return (
    <div className="group relative isolate overflow-hidden border-y border-gold/25 bg-navy-deep py-4">
      <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-deep to-transparent" />
      <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-deep to-transparent" />
      <div className="flex w-max marquee-track group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 whitespace-nowrap px-7 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ivory/75"
              >
                <Sparkles className="size-3.5 shrink-0 text-gold marquee-twinkle" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
