import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { COMPANY, NAV_LINKS, SERVICES } from "@/lib/site-data";
import { CtaLink } from "@/components/site/cta";
import logo from "@/assets/securelogo.jpg";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-deep text-ivory/70 lg:block">
        <div className="container-page flex items-center justify-between py-2.5 text-[0.7rem] tracking-[0.14em] uppercase">
          <span>{COMPANY.credential}</span>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 transition-colors hover:text-gold"
          >
            <Phone className="size-3.5" />
            {COMPANY.phone}
          </a>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-navy/10 transition-all duration-500",
          scrolled ? "bg-ivory/95 backdrop-blur-md shadow-soft" : "bg-ivory",
        )}
      >
        <div className="container-page flex items-center justify-between gap-6 py-4">
          <Link to="/" className="flex items-center gap-3.5">
            <img
              src={logo}
              alt="Vansh Secure Avenue LLP logo"
              width={120}
              height={120}
              className="size-24 rounded-full object-cover shadow-lg sm:size-28 ring-4 ring-gold/30 hover:ring-gold/50 transition-all"
            />
            <span className="leading-tight">
              <span className="block font-display text-xl tracking-tight text-navy sm:text-2xl">
                Vansh Secure Avenue LLP
              </span>
              <span className="eyebrow block text-[0.6rem] text-gold-deep">
                {COMPANY.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {NAV_LINKS.slice(0, 2).map((l) => (
              <NavItem key={l.to} to={l.to} label={l.label} active={pathname === l.to} />
            ))}

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <NavItem to="/services" label="Services" active={pathname.startsWith("/services")} />
              <div
                className={cn(
                  "absolute left-1/2 top-full w-[26rem] -translate-x-1/2 pt-5 transition-all duration-300",
                  servicesOpen
                    ? "pointer-events-auto opacity-100 translate-y-0"
                    : "pointer-events-none opacity-0 -translate-y-1",
                )}
              >
                <div className="grid grid-cols-1 gap-1 rounded-lg border border-navy/10 bg-card p-3 shadow-lift">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      to={s.path}
                      className="group flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <s.icon className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                      <span>
                        <span className="block text-sm font-medium text-navy">{s.navName}</span>
                        <span className="block text-xs text-muted-foreground">
                          {s.heroKicker}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.slice(3).map((l) => (
              <NavItem key={l.to} to={l.to} label={l.label} active={pathname === l.to} />
            ))}
          </nav>

          <div className="hidden xl:block">
            <CtaLink to="/contact" size="sm">
              Free Portfolio Review
            </CtaLink>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="rounded-md border border-navy/15 p-2.5 text-navy xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open ? (
          <div className="max-h-[70vh] overflow-y-auto border-t border-navy/10 bg-ivory px-6 pb-8 pt-4 xl:hidden">
            <div className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="border-b border-navy/10 py-3 text-sm font-medium text-navy"
                >
                  {l.label}
                </Link>
              ))}
              <p className="eyebrow pt-5 pb-2 text-gold-deep">Our Solutions</p>
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to={s.path}
                  className="flex items-center gap-3 border-b border-navy/5 py-3 text-sm text-navy/80"
                >
                  <s.icon className="size-4 text-gold-deep" />
                  {s.navName}
                </Link>
              ))}
              <CtaLink to="/contact" className="mt-6 w-full">
                Free Portfolio Review
              </CtaLink>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function NavItem({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={cn(
        "relative py-1 text-[0.82rem] font-medium tracking-[0.06em] uppercase transition-colors duration-300",
        active ? "text-gold-deep" : "text-navy/80 hover:text-navy",
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px bg-gold-deep transition-all duration-500",
          active ? "w-full" : "w-0",
        )}
      />
    </Link>
  );
}
