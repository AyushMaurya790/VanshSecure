import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES } from "@/lib/site-data";
import { CtaLink } from "@/components/site/cta";
import logo from "@/assets/securelogo.jpg";

export function SiteFooter() {
  return (
    <footer className="surface-navy">
      <div className="container-page py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Vansh Secure Avenue LLP logo"
                width={80}
                height={80}
                loading="lazy"
                className="size-18 rounded-full object-cover"
              />
              <span>
                <span className="block font-display text-2xl text-ivory">
                  Vansh Secure Avenue LLP
                </span>
                <span className="eyebrow block text-[0.75rem] text-gold uppercase tracking-wider">{COMPANY.tagline}</span>
                <span className="block text-[0.8rem] text-ivory/80 mt-1 font-medium">
                  {COMPANY.arn} · {COMPANY.credential}
                </span>
              </span>
            </div>
            <div className="mt-8 space-y-3 text-sm text-ivory/70">
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <Phone className="size-4 text-gold" /> {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <Mail className="size-4 text-gold" /> {COMPANY.email}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {COMPANY.address}
              </p>
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Solutions</h3>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={s.path}
                    className="text-sm text-ivory/65 transition-colors hover:text-gold"
                  >
                    {s.navName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Firm</h3>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-ivory/65 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <CtaLink to="/contact" size="sm">
                Talk to an Expert
              </CtaLink>
            </div>
          </div>
        </div>

        <div className="mt-16 h-px rule-gold opacity-50" />

        <div className="mt-8 flex flex-col gap-4 text-xs text-ivory/45 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. {COMPANY.arn} | {COMPANY.credential}.
          </p>

          <p className="max-w-2xl leading-relaxed">
            Mutual fund investments are subject to market risks. Please read all scheme related
            documents carefully before investing. Past performance is not indicative of future
            returns.
          </p>
        </div>
      </div>
    </footer>
  );
}
