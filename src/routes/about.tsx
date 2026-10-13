import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { ConsultationSection } from "@/components/site/consultation-section";
import { CtaLink } from "@/components/site/cta";
import { SiteImage } from "@/components/site/site-image";
import { useSiteContent } from "@/lib/site-content";
import family from "@/assets/family.jpg";
import founderAnuj from "@/assets/founder-anuj.jpg";
import founderStuti from "@/assets/founder-stuti.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Our Wealth Office Practice | Vansh Secure Avenue LLP" },
      {
        name: "description",
        content:
          "Meet Vansh Secure Avenue LLP, an AMFI-registered firm helping families and business owners build long-term portfolios and plan wealth succession.",
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

function AboutPage() {
  const about = useSiteContent("about");

  return (
    <>
      <PageHero
        eyebrow={about.heroEyebrow}
        title={about.heroTitle}
        lede={about.heroLede}
        image={about.heroImage}
        imageAlt="Luxury financial district architecture at dusk"
        actions={<CtaLink to="/contact">{about.appointmentCta}</CtaLink>}
      />

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              eyebrow={about.storyEyebrow}
              title={about.storyTitle}
              lede={about.storyLede}
            />
            <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
              {about.storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <SiteImage
            src={about.storyImage}
            fallbackSrc={family}
            alt="A multi-generational Indian family together in their home"
            width={1408}
            height={1008}
            loading="lazy"
            className="rounded-xl object-cover shadow-lift"
          />
        </div>
      </Section>

      <Section className="bg-ivory-deep">
        <SectionHeading eyebrow={about.valuesEyebrow} title={about.valuesTitle} align="center" />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => (
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
          <SiteImage
            src={about.founderImage}
            fallbackSrc={founderAnuj}
            alt="Founder of Vansh Secure Avenue LLP in his office"
            width={1008}
            height={1200}
            loading="lazy"
            className="rounded-xl object-cover shadow-card"
          />
          <div>
            <p className="eyebrow text-gold-deep">{about.founderEyebrow}</p>
            <blockquote className="mt-7 font-display text-3xl leading-[1.3] text-navy sm:text-4xl">
              “{about.founderMessage}”
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              {about.founderBody}
            </p>
            <p className="mt-8 font-display text-2xl text-navy">{about.founderName}</p>
            <p className="eyebrow mt-1 text-muted-foreground">{about.founderRole}</p>

            <div className="mt-10">
              <CtaLink to="/why-choose-us" variant="outlineDark">
                {about.whyCta}
              </CtaLink>
            </div>
          </div>
        </div>

        <div className="mt-24 grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <p className="eyebrow text-gold-deep">{about.coFounderEyebrow}</p>
            <blockquote className="mt-7 font-display text-3xl leading-[1.3] text-navy sm:text-4xl">
              "{about.coFounderMessage}"
            </blockquote>
            <p className="mt-8 text-base leading-relaxed text-muted-foreground">
              {about.coFounderBody}
            </p>
            <p className="mt-8 font-display text-2xl text-navy">{about.coFounderName}</p>
            <p className="eyebrow mt-1 text-muted-foreground">{about.coFounderRole}</p>
          </div>

          <SiteImage
            src={about.coFounderImage}
            fallbackSrc={founderStuti}
            alt="Co-founder of Vansh Secure Avenue LLP"
            width={1008}
            height={1200}
            loading="lazy"
            className="rounded-xl object-cover shadow-card"
          />
        </div>
      </Section>

      <ConsultationSection />
    </>
  );
}
