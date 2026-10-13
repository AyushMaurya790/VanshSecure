import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-card";
import { ConsultationSection } from "@/components/site/consultation-section";
import { CtaLink } from "@/components/site/cta";
import architecture from "@/assets/architecture.jpg";
import { getManagedServiceCards, useSiteContent } from "@/lib/site-content";

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
  const servicesContent = useSiteContent("services");

  return (
    <>
      <PageHero
        eyebrow={servicesContent.eyebrow}
        title={servicesContent.title}
        lede={servicesContent.lede}
        image={architecture}
        imageAlt="Luxury financial district architecture at dusk"
        actions={<CtaLink to="/contact">{servicesContent.appointmentCta}</CtaLink>}
      />
      <Section>
        <SectionHeading
          eyebrow={servicesContent.practiceEyebrow}
          title={servicesContent.practiceTitle}
          lede={servicesContent.practiceLede}
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
      </Section>
      <ConsultationSection />
    </>
  );
}
