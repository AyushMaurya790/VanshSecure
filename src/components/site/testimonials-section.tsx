import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { useSiteContent } from "@/lib/site-content";

function TestimonialCard({
  testimonial,
}: {
  testimonial: ReturnType<typeof useSiteContent<"home">>["testimonialsSection"]["items"][number];
}) {
  return (
    <div className="mx-3 w-[340px] flex-shrink-0 rounded-xl border border-navy/10 bg-card p-8 shadow-card">
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }, (_, index) => (
          <Star key={index} className="size-4 fill-gold text-gold" />
        ))}
      </div>
      <blockquote className="mt-6 text-sm leading-relaxed text-muted-foreground">
        "{testimonial.content}"
      </blockquote>
      <div className="mt-6 border-t border-navy/10 pt-6">
        <p className="font-semibold text-navy">{testimonial.name}</p>
        <p className="eyebrow mt-1 text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { testimonialsSection } = useSiteContent("home");

  return (
    <Section className="bg-ivory-deep">
      <SectionHeading
        eyebrow={testimonialsSection.eyebrow}
        title={testimonialsSection.title}
        lede={testimonialsSection.lede}
        align="center"
      />
      <div className="relative mt-16 overflow-hidden">
        <div className="flex animate-marquee">
          {testimonialsSection.items.map((testimonial, index) => (
            <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
          ))}
          {testimonialsSection.items.map((testimonial, index) => (
            <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
}
