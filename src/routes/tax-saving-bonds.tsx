import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/service-page";
import { getService } from "@/lib/site-data";

const service = getService("tax-saving-bonds");

export const Route = createFileRoute("/tax-saving-bonds")({
  head: () => ({
    meta: [
      { title: `${service.name} | Vansh Secure Avenue LLP` },
      { name: "description", content: service.summary },
      { property: "og:title", content: `${service.name} | Vansh Secure Avenue LLP` },
      { property: "og:description", content: service.heroLede },
    ],
  }),
  component: () => <ServicePage service={service} />,
});
