import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { CtaButton } from "@/components/site/cta";
import architecture from "@/assets/architecture.jpg";
import { COMPANY, SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Schedule an Appointment | Vansh Secure Avenue LLP" },
      {
        name: "description",
        content:
          "Request a private appointment with an expert at Vansh Secure Avenue LLP for mutual funds, insurance and premium investment solutions.",
      },
      { property: "og:title", content: "Schedule an Appointment | Vansh Secure Avenue LLP" },
      {
        property: "og:description",
        content: "An unhurried conversation about your goals, portfolio and long-term plan.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Private Appointment"
        title="Begin a conversation"
        lede="Share a few details and an expert will reach out to arrange a confidential discussion at a time that suits you."
        image={architecture}
        imageAlt="Luxury financial district architecture at dusk"
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="rounded-xl border border-navy/10 bg-card p-8 shadow-card sm:p-12">
            <SectionHeading
              eyebrow="Request a Meeting"
              title="Tell us what you would like to plan for"
            />
            <form
              className="mt-10 grid gap-6 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Thank you — an advisor will contact you shortly.");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <Field label="Full Name" name="name" required />
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Email Address" name="email" type="email" required className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <label className="eyebrow text-muted-foreground" htmlFor="interest">
                  Area of Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3.5 text-sm text-navy outline-none transition-colors focus:border-gold-deep"
                >
                  <option>General Wealth Office</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="eyebrow text-muted-foreground" htmlFor="message">
                  What would you like to discuss?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3.5 text-sm text-navy outline-none transition-colors focus:border-gold-deep"
                />
              </div>
              <div className="sm:col-span-2">
                <CtaButton type="submit" className="w-full sm:w-auto">
                  Schedule Your Appointment
                </CtaButton>
                {sent ? (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Your request has been noted. We typically respond within one working day.
                  </p>
                ) : null}
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <InfoCard icon={Phone} label="Call or WhatsApp" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} />
            <InfoCard 
              icon={MessageCircle} 
              label="WhatsApp us" 
              value={COMPANY.phone} 
              href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`}
              subtitle={COMPANY.hours}
            />
            <InfoCard icon={Mail} label="Write to us" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
            <InfoCard icon={MapPin} label="Office" value={COMPANY.address} href={COMPANY.mapLink} />
            <InfoCard icon={Clock} label="Office hours" value={COMPANY.hours} />
            <div className="rounded-xl border border-gold/40 bg-secondary p-8">
              <p className="font-display text-2xl text-navy">“{COMPANY.tagline}”</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {COMPANY.arn} | {COMPANY.credential}. Confidentiality is assumed from the first
                conversation.
              </p>

            </div>
          </div>
        </div>
      </Section>

      {/* Google Maps Section */}
      <Section className="bg-ivory-deep">
        <SectionHeading
          eyebrow="Visit Our Office"
          title="Find us on the map"
          align="center"
          lede="Our office is conveniently located in Jasola Vihar, New Delhi. Schedule a visit for a face-to-face consultation."
        />
        <div className="mt-12">
          <div className="overflow-hidden rounded-xl shadow-lift">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.2547891556743!2d77.29530627549767!3d28.54060897571867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5004fc54fbf%3A0x3584d6f8e7b24c18!2sVansh%20Secure%20Avenue%20LLP!5e0!3m2!1sen!2sin!4v1724753893847!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vansh Secure Avenue LLP Office Location"
              className="w-full"
            />
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://www.google.com/maps/place/Vansh+Secure+Avenue+LLP/@28.5406089,77.2953063,17z/data=!3m1!4b1!4m6!3m5!1s0x390ce5004fc54fbf:0x3584d6f8e7b24c18!8m2!3d28.5406089!4d77.2953063!16s%2Fg%2F11y97sj7sz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-gold/50 bg-white px-6 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:border-gold hover:bg-gold/5"
            >
              <MapPin className="size-4" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="eyebrow text-muted-foreground" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full rounded-md border border-input bg-background px-4 py-3.5 text-sm text-navy outline-none transition-colors focus:border-gold-deep"
      />
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  href,
  subtitle,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  subtitle?: string;
}) {
  const content = (
    <>
      <span className="flex size-11 items-center justify-center rounded-full border border-gold/50 bg-secondary text-gold-deep">
        <Icon className="size-4" />
      </span>
      <span className="flex-1">
        <span className="eyebrow block text-muted-foreground">{label}</span>
        <span className="mt-1 block text-sm text-navy">{value}</span>
        {subtitle && (
          <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {subtitle}
          </span>
        )}
      </span>
    </>
  );
  const cls =
    "flex items-start gap-5 rounded-xl border border-navy/10 bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/70";
  return href ? (
    <a href={href} className={cls}>
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  );
}
