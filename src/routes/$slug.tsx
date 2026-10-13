import { createFileRoute } from "@tanstack/react-router";
import { useSiteContent } from "@/lib/site-content";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";
import { Link } from "@tanstack/react-router";
import consultation from "@/assets/consultation.jpg";

export const Route = createFileRoute("/$slug")({
  component: ManagedPageRoute,
});

function ManagedPageRoute() {
  const { slug } = Route.useParams();
  const page = useSiteContent("pages").find((item) => item.slug === slug);

  if (!page) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <p className="eyebrow text-gold-deep">Page unavailable</p>
          <h1 className="mt-4 font-display text-4xl text-navy">This page does not exist.</h1>
          <p className="mt-4 text-muted-foreground">
            The page may have been removed or the address may be incorrect.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy/90"
            >
              Return home
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Vansh Secure Avenue LLP"
        title={page.title}
        lede={page.description}
        image={page.image || consultation}
        imageAlt={page.title}
        actions={<CtaLink to="/contact">Book a Consultation</CtaLink>}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-8 text-slate-700 sm:text-lg">
          {page.body
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </Section>
    </>
  );
}
