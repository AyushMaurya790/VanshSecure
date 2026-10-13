import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { useEffect } from "react";
import { CtaLink } from "@/components/site/cta";
import { Section } from "@/components/site/section";
import { SiteImage } from "@/components/site/site-image";
import { useSiteContent } from "@/lib/site-content";
import architecture from "@/assets/architecture.jpg";
import consultation from "@/assets/consultation.jpg";
import family from "@/assets/family.jpg";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [{ title: "Financial Insights | Vansh Secure Avenue LLP" }],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const blog = useSiteContent("blog");
  const post = blog.articles.find(
    (article) => article.slug === slug && article.status === "published",
  );

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Vansh Secure Avenue LLP`;
    let description = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }
    description.content = post.summary;
  }, [post]);

  if (!post) {
    return (
      <Section>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <p className="eyebrow text-gold-deep">Article unavailable</p>
          <h1 className="mt-4 font-display text-4xl text-navy">This post may have been removed.</h1>
          <p className="mt-4 text-muted-foreground">
            Browse the latest published insights instead.
          </p>
          <div className="mt-8">
            <CtaLink to="/blog">Back to Blog</CtaLink>
          </div>
        </div>
      </Section>
    );
  }

  const fallbackImage = post.category.toLowerCase().includes("insurance")
    ? family
    : post.category.toLowerCase().includes("portfolio") ||
        post.category.toLowerCase().includes("investment")
      ? architecture
      : consultation;

  return (
    <article>
      <Section className="pb-10 sm:pb-12">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold-deep"
          >
            <ArrowLeft className="size-4" /> All insights
          </Link>
          <p className="eyebrow mt-10 text-gold-deep">{post.category}</p>
          <h1 className="mt-4 text-balance font-display text-4xl leading-tight text-navy sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.summary}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-gold-deep" /> {post.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-4 text-gold-deep" /> {post.readTime}
            </span>
          </div>
        </div>
      </Section>
      <div className="container-page">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl">
          <SiteImage
            src={post.image}
            fallbackSrc={fallbackImage}
            alt={post.title}
            className="max-h-[560px] w-full object-cover"
          />
        </div>
      </div>
      <Section className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 text-base leading-8 text-slate-700 sm:text-lg">
            {post.body
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
          <div className="mt-14 rounded-2xl bg-navy p-8 text-ivory sm:p-10">
            <p className="eyebrow text-gold">Need a personal perspective?</p>
            <h2 className="mt-4 font-display text-3xl">
              Discuss your financial goals with our team.
            </h2>
            <div className="mt-6">
              <CtaLink to="/contact">Book a Consultation</CtaLink>
            </div>
          </div>
        </div>
      </Section>
    </article>
  );
}
