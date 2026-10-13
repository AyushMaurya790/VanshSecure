import { createFileRoute } from "@tanstack/react-router";
import { Award, Compass, Eye, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import heroOffice from "@/assets/hero-office.jpg";
import { CtaLink } from "@/components/site/cta";
import { Section, SectionHeading } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-card";
import { FaqSection } from "@/components/site/faq-section";
import { ConsultationSection } from "@/components/site/consultation-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { MarqueeBanner } from "@/components/site/marquee-banner";
import { SiteImage } from "@/components/site/site-image";
import { COMPANY } from "@/lib/site-data";
import { getManagedServiceCards, useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vansh Secure Avenue LLP | Premium Wealth Office in India" },
      {
        name: "description",
        content:
          "AMFI-registered mutual fund distributor helping HNI families and business owners plan, protect, and grow wealth with long-term investment strategies.",
      },
      { property: "og:title", content: "Vansh Secure Avenue LLP | Premium Wealth Office" },
      {
        property: "og:description",
        content:
          "Save Karo, Secure Karo. Boutique financial services firm helping families build and manage mutual fund portfolios with a long-term, goal-oriented approach.",
      },
    ],
  }),
  component: Home,
});

const WHY_ICONS = [Compass, Eye, ShieldCheck, Users, Award, HeartHandshake];

function Home() {
  const homeContent = useSiteContent("home");
  const servicesContent = useSiteContent("services");

  return (
    <>
      <section className="relative isolate overflow-hidden surface-navy">
        <SiteImage
          src={homeContent.heroImage}
          fallbackSrc={heroOffice}
          alt="Private wealth Office office overlooking a city skyline at golden hour"
          width={1600}
          height={1200}
          className="absolute inset-0 -z-10 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy/40" />
        <div className="container-page py-32 sm:py-44">
          <div className="max-w-3xl">
            <p className="eyebrow reveal text-gold">{COMPANY.credential}</p>
            <h1 className="reveal mt-6 text-balance text-5xl leading-[1.04] text-ivory sm:text-6xl lg:text-7xl">
              {homeContent.heroTitle}
              <span className="block italic text-gold">{homeContent.heroAccent}</span>
            </h1>
            <p className="reveal mt-9 max-w-xl text-lg leading-relaxed text-ivory/75">
              {homeContent.heroText}
            </p>
            <div className="reveal mt-12 flex flex-wrap gap-4">
              <CtaLink to="/contact" size="lg">
                {homeContent.primaryCta}
              </CtaLink>
              <CtaLink to="/services" variant="outlineLight" size="lg">
                {homeContent.secondaryCta}
              </CtaLink>
            </div>
            <p className="mt-14 font-display text-2xl italic text-ivory/60">
              “{homeContent.tagline}”
            </p>
          </div>
        </div>
      </section>

      <MarqueeBanner />

      <div className="border-b border-navy/10 bg-card">
        <div className="container-page grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {homeContent.trust.map((t) => (
            <div key={t.label} className="px-2 py-9 text-center lg:px-8">
              <p className="font-display text-3xl text-navy">{t.value}</p>
              <p className="eyebrow mt-2 text-muted-foreground">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Section id="services">
        <SectionHeading
          eyebrow={homeContent.servicesEyebrow}
          title={homeContent.sectionTitle}
          lede={homeContent.sectionLede}
          align="center"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getManagedServiceCards(servicesContent.cards).map((service, index) => {
            return (
              <ServiceCard
                key={`${service.slug}-${index}`}
                service={service}
                cta={servicesContent.cardCta}
              />
            );
          })}
        </div>
        <div className="mt-14 flex justify-center">
          <CtaLink to="/services" variant="outlineDark">
            {homeContent.servicesCta}
          </CtaLink>
        </div>
      </Section>

      <section className="surface-navy">
        <div className="container-page py-24 sm:py-32">
          <SectionHeading
            eyebrow={homeContent.goalSection.eyebrow}
            title={homeContent.goalSection.title}
            lede={homeContent.goalSection.lede}
            tone="light"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeContent.goalSection.items.map((g) => (
              <div
                key={g.title}
                className="group relative overflow-hidden rounded-xl border border-ivory/12 bg-ivory/5 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:bg-ivory/10"
              >
                <span className="eyebrow text-teal">{g.horizon}</span>
                <h3 className="mt-5 text-2xl leading-snug text-ivory">{g.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/65">{g.body}</p>
                <span className="mt-7 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
              </div>
            ))}
          </div>
          <div className="mt-14">
            <CtaLink to="/contact">{homeContent.goalSection.cta}</CtaLink>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow={homeContent.whySection.eyebrow}
          title={homeContent.whySection.title}
          lede={homeContent.whySection.lede}
          align="center"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {homeContent.whySection.items.map((item, index) => {
            const Icon = WHY_ICONS[index % WHY_ICONS.length];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-navy/10 bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/70"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-gold/10 text-gold-deep">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-2xl text-navy">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <TestimonialsSection />
      <FaqSection
        faqs={homeContent.faqSection.items}
        eyebrow={homeContent.faqSection.eyebrow}
        title={homeContent.faqSection.title}
        lede={homeContent.faqSection.lede}
        cta={homeContent.appointment.primaryCta}
      />
      <ConsultationSection
        title={homeContent.appointment.title}
        body={homeContent.appointment.body}
        bullets={homeContent.appointment.bullets}
        primaryCta={homeContent.appointment.primaryCta}
        secondaryCta={homeContent.appointment.secondaryCta}
      />
    </>
  );
}
