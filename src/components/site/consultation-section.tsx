import consultation from "@/assets/consultation.jpg";
import { CtaLink } from "@/components/site/cta";
import { COMPANY } from "@/lib/site-data";

export function ConsultationSection({
  title = "Schedule a private appointment",
  body = "An unhurried conversation about your goals, your existing portfolio and what a structured plan could look like for your family.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="surface-navy">
      <div className="container-page py-24 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="absolute -left-4 -top-4 hidden size-full rounded-xl border border-gold/35 lg:block" />
            <img
              src={consultation}
              alt="Expert reviewing a portfolio with clients in a private meeting room"
              width={1408}
              height={1008}
              loading="lazy"
              className="relative rounded-xl object-cover shadow-lift"
            />
          </div>
          <div>
            <p className="eyebrow text-gold">Private Appointment</p>
            <h2 className="mt-5 text-balance text-4xl leading-[1.12] text-ivory sm:text-5xl">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70">{body}</p>
            <ul className="mt-9 space-y-3 text-sm text-ivory/70">
              {[
                "No obligation and no product pitch in the first meeting",
                "A written view on your current allocation",
                "Direct access to an expert throughout",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-11 flex flex-wrap gap-4">
              <CtaLink to="/contact">Schedule Your Appointment</CtaLink>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center rounded-md border border-ivory/30 px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
              >
                Talk to an Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
