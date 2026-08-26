import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { ConsultationSection } from "@/components/site/consultation-section";
import { CtaLink } from "@/components/site/cta";
import founder from "@/assets/founder.jpg";
import family from "@/assets/family.jpg";
import architecture from "@/assets/architecture.jpg";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Our Wealth Advisory Practice | Vansh Secure Avenue LLP" },
      {
        name: "description",
        content:
          "Vansh Secure Avenue LLP is a boutique AMFI registered advisory practice serving HNI families, business owners, professionals and NRIs across India.",
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
        lede="Vansh Secure Avenue LLP is a boutique wealth advisory practice and AMFI registered mutual fund distributor, working with families who measure outcomes in decades."
        image={architecture}
        imageAlt="Luxury financial district architecture at dusk"
        actions={<CtaLink to="/contact">Request a Personalized Consultation</CtaLink>}
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
            src={founder}
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
              Designated Partner · {COMPANY.arn} · {COMPANY.credential}
            </p>

            <div className="mt-10">
              <CtaLink to="/why-choose-us" variant="outlineDark">
                See Why Families Choose Us
              </CtaLink>
            </div>
          </div>
        </div>
      </Section>

      <ConsultationSection />
    </>
  );
}
