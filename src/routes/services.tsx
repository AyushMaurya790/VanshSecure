import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-card";
import { ConsultationSection } from "@/components/site/consultation-section";
import { CtaLink } from "@/components/site/cta";
import architecture from "@/assets/architecture.jpg";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Premium Financial Solutions | Vansh Secure Avenue LLP" },
      {
        name: "description",
        content:
          "Explore mutual funds, insurance, loan against securities, GIFT City, SIF, corporate FDs, tax saving bonds and unlisted shares Office.",
      },
      { property: "og:title", content: "Premium Financial Solutions | Vansh Secure Avenue LLP" },
      {
        property: "og:description",
        content: "Eight premium wealth solutions delivered with one disciplined Office process.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Premium Services"
        title="Solutions for every stage of your wealth"
        lede="From core portfolio construction to protection, liquidity, global access and legacy structuring — delivered with the same discipline throughout."
        image={architecture}
        imageAlt="Luxury financial district architecture at dusk"
        actions={<CtaLink to="/contact">Request a Personalized Appointment</CtaLink>}
      />
      <Section>
        <SectionHeading
          eyebrow="The Practice"
          title="Eight mandates, one standard of care"
          lede="Each solution below has a dedicated Office page detailing benefits, process and frequently asked questions."
          align="center"
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>
      <ConsultationSection />
    </>
  );
}
