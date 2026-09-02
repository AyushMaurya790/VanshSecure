import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { ConsultationSection } from "@/components/site/consultation-section";
import { FaqSection } from "@/components/site/faq-section";
import { CtaLink } from "@/components/site/cta";
import architecture from "@/assets/architecture.jpg";
import { HOME_FAQS } from "@/lib/site-data";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Vansh Secure Avenue LLP | Boutique Wealth Office" },
      {
        name: "description",
        content:
          "Independent advice, senior-level attention, documented process and protection-first planning for HNI families, business owners and NRIs.",
      },
      { property: "og:title", content: "Why Choose Vansh Secure Avenue LLP" },
      {
        property: "og:description",
        content: "Boutique by design — judgement, access and accountability that stay undiluted.",
      },
    ],
  }),
  component: WhyPage,
});

const PILLARS = [
  {
    title: "Independent by construction",
    body: "We compare across fund houses, insurers and issuers, and we document why each recommendation was chosen over the alternatives.",
  },
  {
    title: "Protection before growth",
    body: "Adequate cover and liquidity are established first, so a single event can never undo a decade of compounding.",
  },
  {
    title: "Senior attention, always",
    body: "You speak with the expert who knows your file — not a rotating relationship desk.",
  },
  {
    title: "Process over prediction",
    body: "Asset allocation, rebalancing rules and review cadence replace forecasting and market timing.",
  },
];

const STANDARDS = [
  "Written rationale for every portfolio recommendation",
  "Transparent disclosure of structure and compensation",
  "Periodic reviews with clear, jargon-free reporting",
  "Documentation, nomination and transmission support",
  "Coordination with your chartered accountant where required",
  "Dedicated support for NRI and cross-border requirements",
];

function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title="The difference is in the discipline"
        lede="A boutique practice, an independent process and a standard of care that does not change with portfolio size."
        image={architecture}
        imageAlt="Luxury financial district architecture at dusk"
        actions={<CtaLink to="/contact">Speak with an Expert</CtaLink>}
      />

      <Section>
        <SectionHeading
          eyebrow="Our Pillars"
          title="Four commitments that shape every engagement"
          align="center"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="rounded-xl border border-navy/10 bg-card p-9 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lift"
            >
              <span className="font-display text-3xl text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-2xl leading-snug text-navy">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="surface-navy">
        <div className="container-page py-24 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <SectionHeading
              eyebrow="Service Standards"
              title="What we hold ourselves accountable for"
              tone="light"
              lede="These are not aspirations. They are the operating standards of the practice."
            />
            <ul className="space-y-5">
              {STANDARDS.map((s) => (
                <li key={s} className="flex items-start gap-4">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-gold/60">
                    <Check className="size-3 text-gold" />
                  </span>
                  <span className="text-sm leading-relaxed text-ivory/75">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16">
            <CtaLink to="/contact">Protect &amp; Grow Your Wealth</CtaLink>
          </div>
        </div>
      </section>

      <FaqSection faqs={HOME_FAQS} eyebrow="Common Questions" />
      <ConsultationSection />
    </>
  );
}
