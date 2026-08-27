import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Compass,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import heroOffice from "@/assets/hero-office.jpg";
import founderAnuj from "@/assets/founder-anuj.jpg";
import founderStuti from "@/assets/founder-stuti.jpg";
import family from "@/assets/family.jpg";
import office1 from "@/assets/office-1.jpg";
import office2 from "@/assets/office-2.jpg";
import office3 from "@/assets/office-3.jpg";
import office4 from "@/assets/office-4.jpg";
import office5 from "@/assets/office-5.jpg";
import office6 from "@/assets/office-6.jpg";
import { CtaLink } from "@/components/site/cta";
import { Section, SectionHeading } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-card";
import { FaqSection } from "@/components/site/faq-section";
import { ConsultationSection } from "@/components/site/consultation-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { MarqueeBanner } from "@/components/site/marquee-banner";

import { COMPANY, GOALS, HOME_FAQS, SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vansh Secure Avenue LLP | Premium Wealth Office in India" },
      {
        name: "description",
        content:
          "AMFI registered mutual fund distributor offering mutual funds, insurance, GIFT City, SIF, corporate FDs, bonds and unlisted shares for HNI families and business owners.",
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

const TRUST = [
  { label: "AMFI Registered", value: "Distributor" },
  { label: "Specialised Client Services", value: "HNI & UHNI" },
  { label: "Our Offerings", value: "8 Focus Areas" },
  { label: "Client Relationships", value: "Long Term" },
];

const WHY = [
  {
    icon: Compass,
    title: "Goal-first Office",
    body: "Every recommendation begins with a defined objective and horizon — never with a product.",
  },
  {
    icon: Eye,
    title: "Complete transparency",
    body: "Clear disclosure of structure, costs and risk, in language that requires no translation.",
  },
  {
    icon: ShieldCheck,
    title: "Protection before growth",
    body: "We secure the downside first so that compounding is never interrupted by an unplanned event.",
  },
  {
    icon: Users,
    title: "Senior-level attention",
    body: "A deliberately boutique practice, so you always speak with the advisor who knows your file.",
  },
  {
    icon: Award,
    title: "Disciplined process",
    body: "Documented rationale, periodic reviews and rebalancing that removes emotion from decisions.",
  },
  {
    icon: HeartHandshake,
    title: "Family continuity",
    body: "Nomination, transmission and succession handled so wealth transitions without friction.",
  },
];

const JOURNEY = [
  { title: "Discovery", body: "A private conversation about goals, obligations, income and temperament." },
  { title: "Financial Blueprint", body: "A written plan mapping each goal to an allocation and timeline." },
  { title: "Implementation", body: "Paperless onboarding and staggered, disciplined deployment of capital." },
  { title: "Review & Stewardship", body: "Periodic reviews, rebalancing and guidance through market cycles." },
];

const AUDIENCE = [
  "High Net Worth Individuals",
  "Ultra HNI Families",
  "Business Owners",
  "Corporate Clients",
  "Doctors & Professionals",
  "Entrepreneurs",
  "NRIs",
  "Families Planning Legacy",
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden surface-navy">
        <img
          src={heroOffice}
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
              Wealth built with patience.
              <span className="block italic text-gold">Protected with intent.</span>
            </h1>
            <p className="reveal mt-9 max-w-xl text-lg leading-relaxed text-ivory/75">
              Vansh Secure Avenue LLP is a boutique financial services firm helping families,
              business owners and professionals build and manage their mutual fund portfolios with
              a long-term, goal-oriented approach and simplify the complexities of
              intergenerational wealth transfer through personalised and goal-oriented strategies.
            </p>
            <div className="reveal mt-12 flex flex-wrap gap-4">
              <CtaLink to="/contact" size="lg">
                Schedule Your Appointment
              </CtaLink>
              <CtaLink to="/services" variant="outlineLight" size="lg">
                Explore Our Services
              </CtaLink>
            </div>
            <p className="mt-14 font-display text-2xl italic text-ivory/60">
              “{COMPANY.tagline}”
            </p>
          </div>
        </div>
      </section>

      <MarqueeBanner />


      <div className="border-b border-navy/10 bg-card">
        <div className="container-page grid divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {TRUST.map((t) => (
            <div key={t.label} className="px-2 py-9 text-center lg:px-8">
              <p className="font-display text-3xl text-navy">{t.value}</p>
              <p className="eyebrow mt-2 text-muted-foreground">{t.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <Section id="services">
        <SectionHeading
          eyebrow="Our Premium Services"
          title="Eight solutions. One coherent wealth strategy."
          lede="Each mandate is delivered with the same discipline: understand the objective, size the risk, document the rationale, then review it continually."
          align="center"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <CtaLink to="/services" variant="outlineDark">
            Discover Investment Opportunities
          </CtaLink>
        </div>
      </Section>

      {/* Goal based investing */}
      <section className="surface-navy">
        <div className="container-page py-24 sm:py-32">
          <SectionHeading
            eyebrow="Goal Based Investment Solutions"
            title="Money behaves better when it has a purpose"
            lede="We divide your wealth into goal-specific portfolios, each with its own horizon, risk band and review rhythm — so no single market cycle can derail an entire plan."
            tone="light"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GOALS.map((g) => (
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
            <CtaLink to="/contact">Build Your Investment Portfolio</CtaLink>
          </div>
        </div>
      </section>

      {/* About */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div className="relative">
            <img
              src={family}
              alt="A multi-generational Indian family together in their home"
              width={1408}
              height={1008}
              loading="lazy"
              className="rounded-xl object-cover shadow-lift"
            />
            <div className="absolute -bottom-8 -right-4 hidden rounded-xl border border-gold/40 bg-card p-7 shadow-card lg:block">
              <p className="font-display text-4xl text-navy">3 Generations</p>
              <p className="eyebrow mt-2 text-muted-foreground">Planning Horizon</p>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="About Vansh Secure Avenue LLP"
              title="A private practice for families who think in decades"
              lede="We are an AMFI registered mutual fund distributor built around a simple conviction: serious wealth deserves unhurried, independent counsel."
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Our clients are business owners, professionals, NRIs and families who have already
              created wealth and now want it structured — protected against shocks, positioned for
              growth, and ready to pass on cleanly to the next generation.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaLink to="/about" variant="outlineDark">
                Our Story & Philosophy
              </CtaLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Founder message */}
      <Section className="bg-ivory-deep">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="relative">
            <div className="absolute -left-4 -top-4 hidden size-full rounded-xl border border-gold/40 lg:block" />
            <img
              src={founderAnuj}
              alt="Founder of Vansh Secure Avenue LLP in his office"
              width={1008}
              height={1200}
              loading="lazy"
              className="relative rounded-xl object-cover shadow-card"
            />
          </div>
          <div>
            <p className="eyebrow text-gold-deep">Founder's Message</p>
            <blockquote className="mt-7 font-display text-3xl leading-[1.3] text-navy sm:text-4xl">
              “Wealth is not created by predicting markets. It is created by making sound
              decisions consistently, and by refusing to abandon them when the noise gets loud.”
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Every family that comes to us arrives with a different story — a business being
              built, a child's education abroad, a retirement to be secured, a legacy to be
              protected. Our work is to convert those intentions into a structure that survives
              market cycles and life's surprises alike. That is what “Save Karo, Secure Karo”
              means to us.
            </p>
            <p className="mt-8 font-display text-2xl text-navy">Founder & Managing Partner</p>
            <p className="eyebrow mt-1 text-muted-foreground">{COMPANY.name}</p>
            <div className="mt-10">
              <CtaLink to="/contact" variant="outlineDark">
                Connect with Our Experts
              </CtaLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Office Gallery */}
      <Section>
        <SectionHeading
          eyebrow="Our Office"
          title="Where Your Financial Future Takes Shape"
          align="center"
          lede="Visit our office space designed for confidential appointments and strategic wealth planning."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
            <img
              src={office1}
              alt="Vansh Secure Avenue Office - Reception Area"
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="group relative overflow-hidden rounded-xl shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
            <img
              src={office2}
              alt="Vansh Secure Avenue Office - Appointment Room"
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="group relative overflow-hidden rounded-xl shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
            <img
              src={office3}
              alt="Vansh Secure Avenue Office - Meeting Space"
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="group relative overflow-hidden rounded-xl shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
            <img
              src={office4}
              alt="Vansh Secure Avenue Office - Work Environment"
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="group relative overflow-hidden rounded-xl shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
            <img
              src={office5}
              alt="Vansh Secure Avenue Office - Team Space"
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="group relative overflow-hidden rounded-xl shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-lift">
            <img
              src={office6}
              alt="Vansh Secure Avenue Office - Professional Environment"
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>
        <div className="mt-12 text-center">
          <CtaLink to="/contact" variant="outlineDark">
            Schedule an Office Visit
          </CtaLink>
        </div>
      </Section>

      {/* Why choose us */}
      <Section>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The standards we hold ourselves to"
          align="center"
          lede="Boutique by design, so that judgement, access and accountability never get diluted."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="group rounded-xl border border-navy/10 bg-card p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lift"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-gold/50 bg-secondary text-gold-deep transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
                <w.icon className="size-5" />
              </span>
              <h3 className="mt-6 text-xl text-navy">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <CtaLink to="/why-choose-us" variant="outlineDark">
            See Our Full Approach
          </CtaLink>
        </div>
      </Section>

      {/* Journey */}
      <section className="surface-navy">
        <div className="container-page py-24 sm:py-32">
          <SectionHeading
            eyebrow="Investment Journey"
            title="Four deliberate steps"
            tone="light"
            align="center"
          />
          <div className="mt-16 grid gap-10 lg:grid-cols-4">
            {JOURNEY.map((s, i) => (
              <div key={s.title} className="relative">
                <span className="font-display text-5xl text-gold/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-5 block h-px w-full bg-ivory/15">
                  <span className="block h-px w-10 bg-gold" />
                </span>
                <h3 className="mt-6 text-2xl text-ivory">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/65">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <CtaLink to="/contact">Start Your Wealth Journey</CtaLink>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <Section className="bg-ivory-deep">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <SectionHeading
            eyebrow="Who We Serve"
            title="Clients who value counsel over commentary"
            lede="Our practice is built for investors with real complexity — multiple goals, business cash flows, cross-border considerations and a long family horizon."
          />
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-navy/10 bg-border sm:grid-cols-2">
            {AUDIENCE.map((a) => (
              <div
                key={a}
                className="bg-card px-7 py-6 text-sm font-medium text-navy transition-colors duration-500 hover:bg-secondary"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <FaqSection faqs={HOME_FAQS} />

      <ConsultationSection />

      <TestimonialsSection />

      <Section className="bg-card">
        <div className="rounded-xl border border-navy/10 bg-secondary px-8 py-14 text-center sm:px-16">
          <p className="eyebrow text-gold-deep">Ready When You Are</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl leading-tight text-navy sm:text-5xl">
            Secure your financial future with advisors who take the long view
          </h2>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <CtaLink to="/contact">Schedule Your Consultation</CtaLink>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-md border border-navy/25 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-navy transition-colors duration-500 hover:border-gold-deep hover:bg-navy hover:text-ivory"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
