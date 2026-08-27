import { Check } from "lucide-react";
import architecture from "@/assets/architecture.jpg";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { FaqSection } from "@/components/site/faq-section";
import { ConsultationSection } from "@/components/site/consultation-section";
import { CtaLink } from "@/components/site/cta";
import type { Service } from "@/lib/site-data";

export function ServicePage({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow={service.heroKicker}
        title={service.heroTitle}
        lede={service.heroLede}
        image={architecture}
        imageAlt="Luxury financial district architecture at dusk"
        actions={
          <>
            <CtaLink to="/contact">Schedule Your Appointment</CtaLink>
            <CtaLink to="/services" variant="outlineLight">
              Explore Our Services
            </CtaLink>
          </>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="Overview" title={service.overviewTitle} />
            <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
              {service.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-navy/10 bg-card p-9 shadow-card">
            <span className="flex size-12 items-center justify-center rounded-full border border-gold/50 bg-secondary text-gold-deep">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-6 text-2xl text-navy">{service.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {service.summary}
            </p>
            <div className="my-7 h-px w-full bg-border" />
            <ul className="space-y-3">
              {service.reasons.slice(0, 3).map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-navy/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-verdant" />
                  {r}
                </li>
              ))}
            </ul>
            <CtaLink to="/contact" size="sm" className="mt-8 w-full">
              Talk to an Advisor
            </CtaLink>
          </div>
        </div>
      </Section>

      {service.offerings ? (
        <Section className="bg-card">
          <SectionHeading
            eyebrow="What We Offer"
            title={`${service.name} — areas we advise on`}
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o) => (
              <div
                key={o.name}
                className="group rounded-xl border border-navy/10 bg-secondary p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lift"
              >
                <h3 className="text-xl leading-snug text-navy">{o.name}</h3>
                <span className="mt-4 block h-px w-10 bg-gold-deep transition-all duration-500 group-hover:w-20" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="bg-ivory-deep">

        <SectionHeading
          eyebrow="Benefits"
          title="What this solution delivers"
          lede="Every benefit below is something we are prepared to be measured against."
          align="center"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.benefits.map((b, i) => (
            <div
              key={b.title}
              className="group rounded-xl border border-navy/10 bg-card p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lift"
            >
              <span className="font-display text-3xl text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl leading-snug text-navy">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Why Vansh Secure Avenue LLP"
              title="Advice you can hold us to"
              lede="We keep our practice deliberately boutique so that every client relationship receives senior attention."
            />
            <ul className="mt-10 space-y-5">
              {service.reasons.map((r) => (
                <li key={r} className="flex items-start gap-4">
                  <span className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/60">
                    <Check className="size-3 text-gold-deep" />
                  </span>
                  <span className="text-sm leading-relaxed text-navy/80">{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Our Process" title="How we work together" />
            <ol className="mt-10 space-y-0">
              {service.process.map((step, i) => (
                <li key={step.title} className="relative pl-14 pb-10 last:pb-0">
                  <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-navy/15 bg-card font-display text-lg text-navy">
                    {i + 1}
                  </span>
                  {i < service.process.length - 1 ? (
                    <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-border" />
                  ) : null}
                  <h3 className="text-xl text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <FaqSection faqs={service.faqs} eyebrow={`${service.name} · FAQ`} />

      <ConsultationSection title={service.ctaTitle} body={service.ctaBody} />
    </>
  );
}
