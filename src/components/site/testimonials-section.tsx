import { Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Mehta",
    role: "Business Owner, Mumbai",
    content: "Vansh Secure Avenue transformed our family's wealth management approach. Their goal-based planning gave us clarity we never had before. The team's professionalism and transparency are exceptional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    role: "Healthcare Professional, Delhi",
    content: "Best financial advisory experience I've had. They took time to understand my long-term goals and crafted a personalized investment strategy. The periodic reviews keep me informed and confident.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Entrepreneur, Ahmedabad",
    content: "Their expertise in mutual funds and tax-saving instruments helped me optimize my portfolio significantly. The team is knowledgeable, responsive and truly client-focused.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Corporate Executive, Bangalore",
    content: "I appreciate their disciplined approach and complete transparency. No hidden charges, clear communication, and they always prioritize my financial goals over product pushing. Highly recommended!",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Real Estate Developer, Pune",
    content: "Outstanding service! They helped me diversify my wealth beyond real estate into structured investments. Their guidance on GIFT City investments was particularly valuable for my portfolio.",
    rating: 5,
  },
  {
    id: 6,
    name: "Anjali Desai",
    role: "NRI, Singapore",
    content: "As an NRI, managing investments in India was challenging. Vansh Secure Avenue made it seamless with their expert guidance and paperless processes. Truly a world-class advisory experience.",
    rating: 5,
  },
  {
    id: 7,
    name: "Karthik Reddy",
    role: "IT Professional, Hyderabad",
    content: "Their family-first approach to wealth planning impressed me. They don't just manage money; they help build lasting financial security for generations. Professional, ethical, and highly skilled.",
    rating: 5,
  },
  {
    id: 8,
    name: "Meera Joshi",
    role: "Chartered Accountant, Mumbai",
    content: "Even as a CA, I trust them with my investments. Their research-backed recommendations and risk management strategies are top-notch. They truly understand wealth preservation and growth.",
    rating: 5,
  },
  {
    id: 9,
    name: "Suresh Kumar",
    role: "Manufacturing Business, Chennai",
    content: "Best decision to partner with Vansh Secure Avenue for our corporate investments. Their structured approach and attention to detail helped us achieve our financial objectives consistently.",
    rating: 5,
  },
  {
    id: 10,
    name: "Pooja Malhotra",
    role: "Interior Designer, Jaipur",
    content: "They made investing simple and stress-free. The team educates rather than sells, and that makes all the difference. I feel secure knowing my family's financial future is in capable hands.",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="mx-3 w-[340px] flex-shrink-0 rounded-xl border border-navy/10 bg-card p-8 shadow-card">
      <div className="flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="size-4 fill-gold text-gold" />
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
  return (
    <Section className="bg-ivory-deep">
      <SectionHeading
        eyebrow="Client Testimonials"
        title="Trusted by families and businesses across India"
        lede="Real experiences from clients who chose to build their wealth with us."
        align="center"
      />
      <div className="relative mt-16 overflow-hidden">
        <div className="flex animate-marquee">
          {/* First set of testimonials */}
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={`first-${testimonial.id}`} testimonial={testimonial} />
          ))}
          {/* Duplicate set for seamless loop */}
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={`second-${testimonial.id}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
      {/* Add pause on hover effect */}
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
