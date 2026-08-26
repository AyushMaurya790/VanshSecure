import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/site-data";
import { SectionHeading, Section } from "@/components/site/section";
import { CtaLink } from "@/components/site/cta";

export function FaqSection({
  faqs,
  eyebrow = "Clarity First",
  title = "Frequently asked questions",
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <Section className="bg-ivory-deep">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            lede="If your question is not answered here, a short conversation with an advisor usually resolves it in minutes."
          />
          <div className="mt-10">
            <CtaLink to="/contact" variant="outlineDark">
              Speak with an Investment Advisor
            </CtaLink>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="border-b border-navy/12 last:border-b-0"
            >
              <AccordionTrigger className="py-6 text-left font-display text-xl font-normal text-navy hover:no-underline data-[state=open]:text-gold-deep">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-7 pr-6 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
