import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock3, Sparkles } from "lucide-react";
import { CtaLink } from "@/components/site/cta";
import { PageHero } from "@/components/site/page-hero";
import { SiteImage } from "@/components/site/site-image";
import { Section, SectionHeading } from "@/components/site/section";
import { useSiteContent } from "@/lib/site-content";
import architecture from "@/assets/architecture.jpg";
import consultation from "@/assets/consultation.jpg";
import family from "@/assets/family.jpg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Insights Blog | Vansh Secure Avenue LLP" },
      {
        name: "description",
        content:
          "Explore guidance on mutual funds, insurance, tax planning, wealth protection and family financial decision-making from Vansh Secure Avenue LLP.",
      },
      { property: "og:title", content: "Wealth Insights Blog | Vansh Secure Avenue LLP" },
      {
        property: "og:description",
        content:
          "Practical financial insights to help families plan, protect and grow wealth with confidence.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const blog = useSiteContent("blog");
  const publishedArticles = blog.articles.filter((article) => article.status === "published");

  return (
    <>
      <PageHero
        eyebrow={blog.pageEyebrow}
        title={blog.pageTitle}
        lede={blog.pageLede}
        image={blog.heroImage}
        imageAlt={blog.heroImageAlt}
        actions={
          <>
            <CtaLink to="#latest-insights">{blog.exploreCta}</CtaLink>
            <CtaLink to="/contact" variant="outlineLight">
              {blog.appointmentCta}
            </CtaLink>
          </>
        }
      />

      <section className="border-b border-navy/10 bg-card">
        <div className="container-page py-20">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <article className="overflow-hidden rounded-[2rem] border border-navy/10 bg-card shadow-card">
              <SiteImage
                src={blog.featured.image}
                fallbackSrc={architecture}
                alt={blog.featured.title}
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="space-y-6 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="rounded-full bg-gold/15 px-3 py-1.5 text-gold-deep">
                    {blog.featuredBadge}
                  </span>
                  <span>{blog.featured.category}</span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {blog.featured.date}
                  </span>
                </div>

                <div>
                  <h2 className="max-w-2xl font-display text-4xl leading-tight text-navy sm:text-5xl">
                    {blog.featured.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {blog.featured.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-5">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 className="size-4 text-gold-deep" />
                    {blog.featured.readTime}
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold-deep"
                  >
                    {blog.featuredCta}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>

            <aside className="rounded-[2rem] border border-navy/10 bg-ivory-deep p-6 shadow-card sm:p-7">
              <div className="flex items-center gap-3 text-gold-deep">
                <Sparkles className="size-5" />
                <p className="eyebrow text-gold-deep">{blog.topicsEyebrow}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {blog.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-navy/10 bg-card px-3 py-2 text-xs font-medium tracking-[0.08em] text-navy uppercase"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-navy/10 bg-card p-5">
                <p className="eyebrow text-gold-deep">{blog.whyReadEyebrow}</p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {blog.whyReadItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Section id="latest-insights">
        <SectionHeading
          eyebrow={blog.latestEyebrow}
          title={blog.latestTitle}
          lede={blog.latestLede}
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {publishedArticles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-[1.75rem] border border-navy/10 bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-gold/70 hover:shadow-lift"
            >
              <SiteImage
                src={article.image}
                fallbackSrc={article.category === "Insurance" ? family : consultation}
                alt={article.title}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="p-5">
                <div className="flex items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                  <span>{article.category}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="size-3.5 text-gold-deep" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-3xl leading-tight text-navy group-hover:text-gold-deep">
                  {article.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {article.summary}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-navy/10 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {article.date}
                  </span>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: article.slug }}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy hover:text-gold-deep"
                  >
                    {blog.articleCta}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-ivory-deep">
        <div className="rounded-[2rem] border border-navy/10 bg-card p-8 shadow-card sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-gold-deep">{blog.subscribeEyebrow}</p>
              <h3 className="mt-4 font-display text-4xl leading-tight text-navy sm:text-5xl">
                {blog.subscribeTitle}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {blog.subscribeLede}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CtaLink to="/contact" size="lg">
                {blog.subscribeCta}
              </CtaLink>
              <CtaLink to="/services" variant="outlineDark" size="lg">
                {blog.servicesCta}
              </CtaLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
