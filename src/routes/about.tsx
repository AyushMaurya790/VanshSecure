import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { ConsultationSection } from "@/components/site/consultation-section";
import { CtaLink } from "@/components/site/cta";
import founderAnuj from "@/assets/founder-anuj.jpg";
import founderStuti from "@/assets/founder-stuti.jpg";
import family from "@/assets/family.jpg";
import architecture from "@/assets/architecture.jpg";
import office1 from "@/assets/office-1.jpg";
import office2 from "@/assets/office-2.jpg";
import office3 from "@/assets/office-3.jpg";
import office4 from "@/assets/office-4.jpg";
import office5 from "@/assets/office-5.jpg";
import office6 from "@/assets/office-6.jpg";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Our Wealth Office Practice | Vansh Secure Avenue LLP" },
      {
        name: "description",
        content:
          "Vansh Secure Avenue LLP is a boutique AMFI registered financial services firm helping families, business owners and professionals build and manage mutual fund portfolios and simplify intergenerational wealth transfer.",
      },
      { property: "og:title", content: "About Vansh Secure Avenue LLP" },
      {
        property: "og:description",
        content: "A private practice built on independence, discipline and long-horizon counsel.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { title: "Independence", body: "Recommendations shaped by suitability, never by convenience." },
  { title: "Discipline", body: "A documented process that outlasts sentiment and market noise." },
  { title: "Discretion", body: "Client affairs handled with the confidentiality they deserve." },
  { title: "Continuity", body: "Relationships designed to serve the next generation as well." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Firm"
        title="Counsel built for the long horizon"
        lede="Vansh Secure Avenue LLP is a boutique financial services firm and AMFI registered mutual fund distributor helping families build and manage their mutual fund portfolios with a long-term, goal-oriented approach and simplify intergenerational wealth transfer through personalised strategies."
        image={architecture}
        imageAlt="Luxury financial district architecture at dusk"
        actions={<CtaLink to="/contact">Request a Personalized Appointment</CtaLink>}
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Co-founded by Anuj and Stuti"
              lede="AMFI certified Mutual Fund Distributors with 12+ years in this line of business."
            />
            <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                {COMPANY.name} was co-founded by Anuj and Stuti. We are AMFI certified Mutual
                Fund Distributors (MFD) and have been in this line of business for the past 12+
                years, handling Ultra-HNI and HNI client portfolios for both individuals and
                corporates, PAN India and overseas.
              </p>
              <p>
                We have other allied products to offer as well — Life, Health, Travel, Vehicle
                and Term Insurance, alongside GIFT City investments, SIF, loan against
                securities, corporate fixed deposits, tax saving bonds and unlisted shares.
              </p>
              <p>
                Do connect with us in case you need any assistance in relation to your personal
                wealth or insurance. We would be happy to serve you and get your queries
                resolved.
              </p>
            </div>

          </div>
          <img
            src={family}
            alt="A multi-generational Indian family together in their home"
            width={1408}
            height={1008}
            loading="lazy"
            className="rounded-xl object-cover shadow-lift"
          />
        </div>
      </Section>

      <Section className="bg-ivory-deep">
        <SectionHeading
          eyebrow="Our Values"
          title="What clients can expect, consistently"
          align="center"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="rounded-xl border border-navy/10 bg-card p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lift"
            >
              <span className="font-display text-3xl text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl text-navy">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <img
            src={founderAnuj}
            alt="Founder of Vansh Secure Avenue LLP in his office"
            width={1008}
            height={1200}
            loading="lazy"
            className="rounded-xl object-cover shadow-card"
          />
          <div>
            <p className="eyebrow text-gold-deep">Founder's Message</p>
            <blockquote className="mt-7 font-display text-3xl leading-[1.3] text-navy sm:text-4xl">
              “Our promise is not extraordinary returns. It is extraordinary consistency of
              judgement, year after year.”
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              We keep our client roster deliberately limited so that every portfolio receives
              senior attention. That is the only way advice stays personal as wealth grows.
            </p>
            <p className="mt-8 font-display text-2xl text-navy">Anuj Maheshwari</p>
            <p className="eyebrow mt-1 text-muted-foreground">
              Co-Founder & Designated Partner · {COMPANY.arn} · {COMPANY.credential}
            </p>

            <div className="mt-10">
              <CtaLink to="/why-choose-us" variant="outlineDark">
                See Why Families Choose Us
              </CtaLink>
            </div>
          </div>
        </div>

        {/* Founder 2 - Stuti Saboo */}
        <div className="mt-24 grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <p className="eyebrow text-gold-deep">Co-Founder's Message</p>
            <blockquote className="mt-7 font-display text-3xl leading-[1.3] text-navy sm:text-4xl">
              "Financial planning is not about products. It's about understanding people, their dreams, and creating strategies that bring peace of mind."
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              Every family has unique goals and concerns. Our role is to listen carefully, plan thoughtfully, and guide consistently through every financial decision.
            </p>
            <p className="mt-8 font-display text-2xl text-navy">Stuti Saboo</p>
            <p className="eyebrow mt-1 text-muted-foreground">
              Co-Founder & Designated Partner
            </p>
          </div>
          <img
            src={founderStuti}
            alt="Stuti Saboo - Co-Founder of Vansh Secure Avenue LLP"
            width={1008}
            height={1200}
            loading="lazy"
            className="rounded-xl object-cover shadow-card"
          />
        </div>
      </Section>

      {/* Office Gallery */}
      <Section className="bg-ivory-deep">
        <SectionHeading
          eyebrow="Our Workspace"
          title="Where Trust Meets Expertise"
          align="center"
          lede="Visit our office in the heart of the financial district."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a 
            href={office1} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-lift"
          >
            <img
              src={office1}
              alt="Vansh Secure Avenue Office View 1"
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/30 group-hover:opacity-100">
              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-navy shadow-lg">
                Click to view full image
              </span>
            </div>
          </a>
          <a 
            href={office2} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-lift"
          >
            <img
              src={office2}
              alt="Vansh Secure Avenue Office View 2"
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/30 group-hover:opacity-100">
              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-navy shadow-lg">
                Click to view full image
              </span>
            </div>
          </a>
          <a 
            href={office3} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-lift"
          >
            <img
              src={office3}
              alt="Vansh Secure Avenue Office View 3"
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/30 group-hover:opacity-100">
              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-navy shadow-lg">
                Click to view full image
              </span>
            </div>
          </a>
          <a 
            href={office4} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-lift"
          >
            <img
              src={office4}
              alt="Vansh Secure Avenue Office View 4"
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/30 group-hover:opacity-100">
              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-navy shadow-lg">
                Click to view full image
              </span>
            </div>
          </a>
          <a 
            href={office5} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-lift"
          >
            <img
              src={office5}
              alt="Vansh Secure Avenue Office View 5"
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/30 group-hover:opacity-100">
              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-navy shadow-lg">
                Click to view full image
              </span>
            </div>
          </a>
          <a 
            href={office6} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg shadow-card transition-all duration-300 hover:shadow-lift"
          >
            <img
              src={office6}
              alt="Vansh Secure Avenue Office View 6"
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all duration-300 group-hover:bg-navy/30 group-hover:opacity-100">
              <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-navy shadow-lg">
                Click to view full image
              </span>
            </div>
          </a>
        </div>
      </Section>

      <ConsultationSection />
    </>
  );
}
