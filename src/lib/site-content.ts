import { useEffect, useState } from "react";
import { GOALS, HOME_FAQS, SERVICES } from "@/lib/site-data";
import architecture from "@/assets/architecture.jpg";
import consultation from "@/assets/consultation.jpg";
import family from "@/assets/family.jpg";
import founderAnuj from "@/assets/founder-anuj.jpg";
import founderStuti from "@/assets/founder-stuti.jpg";
import heroOffice from "@/assets/hero-office.jpg";
import officeOne from "@/assets/office-1.jpg";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  body: string;
  image: string;
  status: "draft" | "published";
};

export type ManagedPage = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  body: string;
};

export type SiteContent = {
  home: {
    heroImage: string;
    heroTitle: string;
    heroAccent: string;
    heroText: string;
    primaryCta: string;
    secondaryCta: string;
    tagline: string;
    trust: { label: string; value: string }[];
    sectionTitle: string;
    sectionLede: string;
    servicesEyebrow: string;
    servicesCta: string;
    goalSection: {
      eyebrow: string;
      title: string;
      lede: string;
      cta: string;
      items: { title: string; body: string; horizon: string }[];
    };
    whySection: {
      eyebrow: string;
      title: string;
      lede: string;
      items: { title: string; body: string }[];
    };
    faqSection: {
      eyebrow: string;
      title: string;
      lede: string;
      items: { q: string; a: string }[];
    };
    testimonialsSection: {
      eyebrow: string;
      title: string;
      lede: string;
      items: { name: string; role: string; content: string; rating: number }[];
    };
    appointment: {
      title: string;
      body: string;
      bullets: string[];
      primaryCta: string;
      secondaryCta: string;
    };
  };
  about: {
    heroEyebrow: string;
    heroTitle: string;
    heroLede: string;
    heroImage: string;
    appointmentCta: string;
    storyEyebrow: string;
    storyTitle: string;
    storyLede: string;
    storyParagraphs: string[];
    storyImage: string;
    valuesEyebrow: string;
    valuesTitle: string;
    values: { title: string; body: string }[];
    whyCta: string;
    founderEyebrow: string;
    founderMessage: string;
    founderBody: string;
    founderName: string;
    founderRole: string;
    founderImage: string;
    coFounderEyebrow: string;
    coFounderMessage: string;
    coFounderBody: string;
    coFounderName: string;
    coFounderRole: string;
    coFounderImage: string;
  };
  services: {
    eyebrow: string;
    title: string;
    lede: string;
    appointmentCta: string;
    practiceEyebrow: string;
    practiceTitle: string;
    practiceLede: string;
    cardCta: string;
    cards: { slug: string; name: string; summary: string }[];
  };
  blog: {
    pageEyebrow: string;
    pageTitle: string;
    pageLede: string;
    heroImage: string;
    heroImageAlt: string;
    exploreCta: string;
    appointmentCta: string;
    featuredBadge: string;
    featured: {
      title: string;
      category: string;
      date: string;
      readTime: string;
      summary: string;
      image: string;
    };
    topics: string[];
    topicsEyebrow: string;
    whyReadEyebrow: string;
    whyReadItems: string[];
    featuredCta: string;
    latestEyebrow: string;
    latestTitle: string;
    latestLede: string;
    articleCta: string;
    subscribeEyebrow: string;
    subscribeTitle: string;
    subscribeLede: string;
    subscribeCta: string;
    servicesCta: string;
    articles: BlogPost[];
  };
  pages: ManagedPage[];
  seo: Record<
    "home" | "about" | "services" | "blog",
    {
      title: string;
      description: string;
      canonicalUrl: string;
      ogImage: string;
      robots: "index,follow" | "noindex,follow";
    }
  >;
};

export type ManagedServiceCard = {
  slug: string;
  path: string;
  name: string;
  summary: string;
  icon?: (typeof SERVICES)[number]["icon"];
};

export function getManagedServiceCards(
  cards: SiteContent["services"]["cards"],
): ManagedServiceCard[] {
  return cards.flatMap((card) => {
    const existingService = SERVICES.find((service) => service.slug === card.slug);
    const name = card.name.trim() || existingService?.name;
    if (!name) return [];

    return [
      {
        slug: card.slug,
        path: existingService?.path ?? "/contact",
        name,
        summary: card.summary || existingService?.summary || "",
        icon: existingService?.icon,
      },
    ];
  });
}

const defaultSiteContent: SiteContent = {
  home: {
    heroImage: heroOffice,
    heroTitle: "Wealth built with patience.",
    heroAccent: "Protected with intent.",
    heroText:
      "Vansh Secure Avenue LLP is a boutique financial services firm helping families, business owners and professionals build and manage their mutual fund portfolios with a long-term, goal-oriented approach and simplify the complexities of intergenerational wealth transfer through personalised and goal-oriented strategies.",
    primaryCta: "Free Portfolio Review",
    secondaryCta: "Explore Our Services",
    tagline: "Save Karo, Secure Karo",
    trust: [
      { label: "AMFI Registered", value: "Distributor" },
      { label: "Specialised Client Services", value: "HNI & UHNI" },
      { label: "Our Offerings", value: "8 Focus Areas" },
      { label: "Client Relationships", value: "Long Term" },
    ],
    sectionTitle: "Eight solutions. One coherent wealth strategy.",
    sectionLede:
      "Each mandate is delivered with the same discipline: understand the objective, size the risk, document the rationale, then review it continually.",
    servicesEyebrow: "Our Premium Services",
    servicesCta: "Discover Investment Opportunities",
    goalSection: {
      eyebrow: "Goal Based Investment Solutions",
      title: "Money behaves better when it has a purpose",
      lede: "We divide your wealth into goal-specific portfolios, each with its own horizon, risk band and review rhythm — so no single market cycle can derail an entire plan.",
      cta: "Build Your Investment Blueprint",
      items: GOALS,
    },
    whySection: {
      eyebrow: "Why Families Choose Us",
      title: "A practice designed for clarity, continuity and peace of mind",
      lede: "We combine senior attention, transparent advice and disciplined execution so your wealth is shaped by long-term logic instead of short-term noise.",
      items: [
        {
          title: "Goal-first Office",
          body: "Every recommendation begins with a defined objective and horizon — never with a product.",
        },
        {
          title: "Complete transparency",
          body: "Clear disclosure of structure, costs and risk, in language that requires no translation.",
        },
        {
          title: "Protection before growth",
          body: "We secure the downside first so that compounding is never interrupted by an unplanned event.",
        },
        {
          title: "Senior-level attention",
          body: "A deliberately boutique practice, so you always speak with the expert who knows your file.",
        },
        {
          title: "Disciplined process",
          body: "Documented rationale, periodic reviews and rebalancing that removes emotion from decisions.",
        },
        {
          title: "Family continuity",
          body: "Nomination, transmission and succession handled so wealth transitions without friction.",
        },
      ],
    },
    faqSection: {
      eyebrow: "Frequently Asked Questions",
      title: "Clarity before every decision",
      lede: "Straight answers to common questions about investing and working with our team.",
      items: HOME_FAQS,
    },
    testimonialsSection: {
      eyebrow: "Client Testimonials",
      title: "Trusted by families and businesses across India",
      lede: "Real experiences from clients who chose to build their wealth with us.",
      items: [
        {
          name: "Rajesh Mehta",
          role: "Business Owner, Mumbai",
          content:
            "Vansh Secure Avenue transformed our family's wealth management approach. Their goal-based planning gave us clarity we never had before. The team's professionalism and transparency are exceptional.",
          rating: 5,
        },
        {
          name: "Dr. Priya Sharma",
          role: "Healthcare Professional, Delhi",
          content:
            "Best financial Office experience I've had. They took time to understand my long-term goals and crafted a personalized investment strategy. The periodic reviews keep me informed and confident.",
          rating: 5,
        },
        {
          name: "Amit Patel",
          role: "Entrepreneur, Ahmedabad",
          content:
            "Their expertise in mutual funds and tax-saving instruments helped me optimize my portfolio significantly. The team is knowledgeable, responsive and truly client-focused.",
          rating: 5,
        },
        {
          name: "Sneha Kapoor",
          role: "Corporate Executive, Bangalore",
          content:
            "I appreciate their disciplined approach and complete transparency. No hidden charges, clear communication, and they always prioritize my financial goals over product pushing. Highly recommended!",
          rating: 5,
        },
        {
          name: "Vikram Singh",
          role: "Real Estate Developer, Pune",
          content:
            "Outstanding service! They helped me diversify my wealth beyond real estate into structured investments. Their guidance on GIFT City investments was particularly valuable for my portfolio.",
          rating: 5,
        },
        {
          name: "Anjali Desai",
          role: "NRI, Singapore",
          content:
            "As an NRI, managing investments in India was challenging. Vansh Secure Avenue made it seamless with their expert guidance and paperless processes. Truly a world-class Office experience.",
          rating: 5,
        },
        {
          name: "Karthik Reddy",
          role: "IT Professional, Hyderabad",
          content:
            "Their family-first approach to wealth planning impressed me. They don't just manage money; they help build lasting financial security for generations. Professional, ethical, and highly skilled.",
          rating: 5,
        },
        {
          name: "Meera Joshi",
          role: "Chartered Accountant, Mumbai",
          content:
            "Even as a CA, I trust them with my investments. Their research-backed recommendations and risk management strategies are top-notch. They truly understand wealth preservation and growth.",
          rating: 5,
        },
        {
          name: "Suresh Kumar",
          role: "Manufacturing Business, Chennai",
          content:
            "Best decision to partner with Vansh Secure Avenue for our corporate investments. Their structured approach and attention to detail helped us achieve our financial objectives consistently.",
          rating: 5,
        },
        {
          name: "Pooja Malhotra",
          role: "Interior Designer, Jaipur",
          content:
            "They made investing simple and stress-free. The team educates rather than sells, and that makes all the difference. I feel secure knowing my family's financial future is in capable hands.",
          rating: 5,
        },
      ],
    },
    appointment: {
      title: "Schedule a private appointment",
      body: "An unhurried conversation about your goals, your existing portfolio and what a structured plan could look like for your family.",
      bullets: [
        "No obligation and no product pitch in the first meeting",
        "A written view on your current allocation",
        "Direct access to an expert throughout",
      ],
      primaryCta: "Free Portfolio Review",
      secondaryCta: "Talk to an Expert",
    },
  },
  about: {
    heroEyebrow: "About the Firm",
    heroTitle: "Counsel built for the long horizon",
    heroLede:
      "Vansh Secure Avenue LLP is a boutique financial services firm and AMFI registered mutual fund distributor helping families build and manage their mutual fund portfolios with a long-term, goal-oriented approach and simplify intergenerational wealth transfer through personalised strategies.",
    heroImage: family,
    appointmentCta: "Request a Personalized Appointment",
    storyEyebrow: "Our Story",
    storyTitle: "Co-founded by Anuj and Stuti",
    storyLede: "AMFI certified Mutual Fund Distributors with 12+ years in this line of business.",
    storyParagraphs: [
      "Vansh Secure Avenue LLP was co-founded by Anuj and Stuti. We are AMFI certified Mutual Fund Distributors (MFD) and have been in this line of business for the past 12+ years, handling Ultra-HNI and HNI client portfolios for both individuals and corporates, PAN India and overseas.",
      "We have other allied products to offer as well — Life, Health, Travel, Vehicle and Term Insurance, alongside GIFT City investments, SIF, loan against securities, corporate fixed deposits, tax saving bonds and unlisted shares.",
      "Do connect with us in case you need any assistance in relation to your personal wealth or insurance. We would be happy to serve you and get your queries resolved.",
    ],
    storyImage: family,
    valuesEyebrow: "Our Values",
    valuesTitle: "What clients can expect, consistently",
    whyCta: "See Why Families Choose Us",
    values: [
      {
        title: "Independence",
        body: "Recommendations shaped by suitability, never by convenience.",
      },
      {
        title: "Discipline",
        body: "A documented process that outlasts sentiment and market noise.",
      },
      {
        title: "Discretion",
        body: "Client affairs handled with the confidentiality they deserve.",
      },
      { title: "Continuity", body: "Relationships designed to serve the next generation as well." },
    ],
    founderEyebrow: "Founder's Message",
    founderMessage:
      "Our promise is not extraordinary returns. It is extraordinary consistency of judgement, year after year.",
    founderBody:
      "We keep our client roster deliberately limited so that every portfolio receives senior attention. That is the only way advice stays personal as wealth grows.",
    founderName: "Anuj Maheshwari",
    founderRole: "Co-Founder & Designated Partner",
    founderImage: founderAnuj,
    coFounderEyebrow: "Co-Founder's Message",
    coFounderMessage:
      "Financial planning is not about products. It's about understanding people, their dreams, and creating strategies that bring peace of mind.",
    coFounderBody:
      "Every family has unique goals and concerns. Our role is to listen carefully, plan thoughtfully, and guide consistently through every financial decision.",
    coFounderName: "Stuti Saboo",
    coFounderRole: "Co-Founder & Designated Partner",
    coFounderImage: founderStuti,
  },
  services: {
    eyebrow: "Our Premium Services",
    title: "Solutions for every stage of your wealth",
    lede: "From core portfolio construction to protection, liquidity, global access and legacy structuring — delivered with the same discipline throughout.",
    appointmentCta: "Request a Personalized Appointment",
    practiceEyebrow: "The Practice",
    practiceTitle: "Eight mandates, one standard of care",
    practiceLede:
      "Each solution below has a dedicated Office page detailing benefits, process and frequently asked questions.",
    cardCta: "Discover This Solution",
    cards: SERVICES.map(({ slug, name, summary }) => ({ slug, name, summary })),
  },
  blog: {
    pageEyebrow: "Insights & Updates",
    pageTitle: "Financial clarity for every stage of the journey",
    pageLede:
      "Practical guidance on investment decisions, protection, taxation and family wealth planning — created to help you think clearly and act with confidence.",
    heroImage: heroOffice,
    heroImageAlt:
      "Modern office exterior with warm light and a professional financial advisory setting",
    exploreCta: "Explore Articles",
    appointmentCta: "Book a Consultation",
    featuredBadge: "Featured",
    featured: {
      title: "How to build a resilient portfolio through every market cycle",
      category: "Portfolio Strategy",
      date: "12 June 2026",
      readTime: "8 min read",
      summary:
        "A long-term portfolio is not built for perfection. It is built for consistency — with asset allocation, risk clarity and behavioural discipline that hold steady when markets get loud.",
      image: architecture,
    },
    topics: [
      "Mutual Funds",
      "Insurance",
      "Tax Planning",
      "Retirement",
      "GIFT City",
      "Legacy Planning",
    ],
    topicsEyebrow: "Topics",
    whyReadEyebrow: "Why read our blog?",
    whyReadItems: [
      "Goal-based guidance rather than product-first advice.",
      "Insights designed for families, professionals and business owners.",
      "Clear explanations without market jargon or noise.",
    ],
    featuredCta: "Read the insight",
    latestEyebrow: "Latest Articles",
    latestTitle: "The thinking behind better decisions",
    latestLede:
      "Clear, practical content for investors who want to make decisions from perspective instead of pressure.",
    articleCta: "Read more",
    subscribeEyebrow: "Stay informed",
    subscribeTitle: "Get practical wealth insights in your inbox.",
    subscribeLede:
      "Weekly notes on mutual funds, protection planning, tax strategy and family wealth decisions — tailored for long-term clarity.",
    subscribeCta: "Subscribe Now",
    servicesCta: "Explore Services",
    articles: [
      {
        id: "wealth-protection-plan",
        slug: "wealth-protection-plan",
        title: "Three ways to protect your wealth while still growing it",
        category: "Wealth Protection",
        date: "09 June 2026",
        readTime: "6 min read",
        summary:
          "Growing wealth without a protection framework often creates avoidable risk. The right sequence is clarity first, then capital allocation.",
        body: "Growing wealth without a protection framework often creates avoidable risk. The right sequence is clarity first, then capital allocation.\n\nStart by reviewing your family’s emergency reserves, insurance cover, and outstanding liabilities. This foundation helps prevent an unexpected event from forcing long-term investments to be sold at the wrong time.\n\nOnce the protection layer is clear, align investments with specific goals and time horizons. Review the plan regularly as income, responsibilities, and priorities change.",
        image: consultation,
        status: "published",
      },
      {
        id: "sip-strategy-market-volatility",
        slug: "sip-strategy-market-volatility",
        title: "Should your SIP strategy change when markets turn volatile?",
        category: "Mutual Funds",
        date: "01 June 2026",
        readTime: "7 min read",
        summary:
          "Volatility can be unsettling, but systematic investing works best when your plan is designed for the long run rather than short-term sentiment.",
        body: "Volatility can be unsettling, but systematic investing works best when your plan is designed for the long run rather than short-term sentiment.\n\nBefore changing an SIP, revisit the goal, time horizon, and asset allocation it supports. A market movement alone does not necessarily change whether the underlying goal or your capacity for risk has changed.\n\nIf your circumstances or risk tolerance have changed, review the whole plan with a qualified professional rather than reacting to short-term market noise.",
        image: officeOne,
        status: "published",
      },
      {
        id: "family-insurance-checklist",
        slug: "family-insurance-checklist",
        title: "A practical checklist before buying insurance for your family",
        category: "Insurance",
        date: "27 May 2026",
        readTime: "5 min read",
        summary:
          "Adequate cover is not a product decision alone. It starts with understanding dependants, liabilities and the true cost of risk.",
        body: "Adequate cover is not a product decision alone. It starts with understanding dependants, liabilities and the true cost of risk.\n\nList the people who depend on your income, your loans and regular household expenses. Review existing life and health policies to identify coverage gaps, exclusions, waiting periods, and renewal terms.\n\nCompare cover based on suitability and policy terms—not only the premium. Revisit the amount of cover when your family or financial commitments change.",
        image: family,
        status: "published",
      },
      {
        id: "retirement-beyond-sip",
        slug: "retirement-beyond-sip",
        title: "How to think about retirement beyond the monthly SIP",
        category: "Retirement",
        date: "20 May 2026",
        readTime: "9 min read",
        summary:
          "Retirement planning is not only about accumulation. It is about income durability, inflation resilience and clarity of purpose.",
        body: "Retirement planning is not only about accumulation. It is about income durability, inflation resilience and clarity of purpose.\n\nEstimate the income your household may need, accounting for inflation, healthcare, and the lifestyle you want. Then review how savings, investments, and other income sources could work together across different retirement stages.\n\nA sustainable withdrawal plan should be reviewed over time. Returns are not guaranteed, and any plan should reflect your personal circumstances and risk tolerance.",
        image: heroOffice,
        status: "published",
      },
      {
        id: "gift-city-family-guide",
        slug: "gift-city-family-guide",
        title: "What families should know before using GIFT City structures",
        category: "Cross-Border Wealth",
        date: "14 May 2026",
        readTime: "8 min read",
        summary:
          "Global investing can widen opportunity, but the right structure depends on taxation, residency and intended use of capital.",
        body: "Global investing can widen opportunity, but the right structure depends on taxation, residency and intended use of capital.\n\nBefore choosing a route, clarify the investment objective, investor residency, expected holding period, applicable regulatory requirements, and tax treatment. Cross-border rules can vary and may change.\n\nSeek advice from appropriately qualified legal and tax professionals before acting. A structure should serve a clear need and be understood by everyone responsible for it.",
        image: architecture,
        status: "published",
      },
      {
        id: "effective-legacy-planning",
        slug: "effective-legacy-planning",
        title: "How to make legacy planning less emotional and more effective",
        category: "Legacy Planning",
        date: "08 May 2026",
        readTime: "6 min read",
        summary:
          "Succession planning works best when it combines documentation, communication and a calm, structured decision-making process.",
        body: "Succession planning works best when it combines documentation, communication and a calm, structured decision-making process.\n\nStart by making an inventory of assets, account details, nominations, and key documents. Keep information accurate and accessible to the people who may need it.\n\nDiscuss intentions with family members where appropriate, and consult legal and tax professionals to prepare or review formal documents. Revisit the plan after major life or financial changes.",
        image: founderStuti,
        status: "published",
      },
    ],
  },
  seo: {
    home: {
      title: "Vansh Secure Avenue LLP | Premium Wealth Office in India",
      description:
        "AMFI-registered mutual fund distributor helping HNI families and business owners plan, protect, and grow wealth with long-term investment strategies.",
      canonicalUrl: "https://vanshsecure.com/",
      ogImage: "",
      robots: "index,follow",
    },
    about: {
      title: "About Our Wealth Office Practice | Vansh Secure Avenue LLP",
      description:
        "Meet Vansh Secure Avenue LLP, an AMFI-registered firm helping families and business owners build long-term portfolios and plan wealth succession.",
      canonicalUrl: "https://vanshsecure.com/about",
      ogImage: "",
      robots: "index,follow",
    },
    services: {
      title: "Premium Financial Solutions | Vansh Secure Avenue LLP",
      description:
        "Explore mutual funds, insurance, loan against securities, GIFT City, SIF, corporate FDs, tax saving bonds and unlisted shares.",
      canonicalUrl: "https://vanshsecure.com/services",
      ogImage: "",
      robots: "index,follow",
    },
    blog: {
      title: "Insights Blog | Vansh Secure Avenue LLP",
      description:
        "Explore guidance on mutual funds, insurance, tax planning, wealth protection and family financial decision-making from Vansh Secure Avenue LLP.",
      canonicalUrl: "https://vanshsecure.com/blog",
      ogImage: "",
      robots: "index,follow",
    },
  },
  pages: [],
};

function mergeDeep<T>(base: T, override: Partial<T>): T {
  if (Array.isArray(base) || Array.isArray(override)) {
    return (override as T) ?? base;
  }

  if (base && typeof base === "object" && override && typeof override === "object") {
    const merged = { ...(base as Record<string, unknown>) } as Record<string, unknown>;
    Object.entries(override as Record<string, unknown>).forEach(([key, value]) => {
      const currentValue = merged[key];
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        currentValue &&
        typeof currentValue === "object" &&
        !Array.isArray(currentValue)
      ) {
        merged[key] = mergeDeep(currentValue, value as Record<string, unknown>);
      } else {
        merged[key] = value;
      }
    });
    return merged as T;
  }

  return (override as T) ?? base;
}

export const getDefaultSiteContent = (): SiteContent =>
  JSON.parse(JSON.stringify(defaultSiteContent));

function replaceLegacyImageUrls(base: unknown, value: unknown): unknown {
  if (typeof value === "string" && value.includes("images.unsplash.com")) {
    return typeof base === "string" ? base : value;
  }
  if (Array.isArray(value) && Array.isArray(base)) {
    return value.map((item, index) => replaceLegacyImageUrls(base[index], item));
  }
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    base &&
    typeof base === "object" &&
    !Array.isArray(base)
  ) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        replaceLegacyImageUrls((base as Record<string, unknown>)[key], item),
      ]),
    );
  }
  return value;
}

function createPostSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const getStoredSiteContent = (): SiteContent => {
  if (typeof window === "undefined") {
    return getDefaultSiteContent();
  }

  try {
    const stored = window.localStorage.getItem("vansh_site_content");
    if (!stored) {
      return getDefaultSiteContent();
    }

    const defaults = getDefaultSiteContent();
    const saved = JSON.parse(stored) as Partial<SiteContent>;
    const merged = mergeDeep(
      defaults,
      replaceLegacyImageUrls(defaults, saved) as Partial<SiteContent>,
    );
    merged.blog.articles = merged.blog.articles.map((article) => {
      const slug = article.slug || createPostSlug(article.title);
      return {
        ...article,
        id: article.id || slug,
        slug,
        body: article.body || article.summary,
        status: article.status === "draft" ? "draft" : "published",
      };
    });
    return merged;
  } catch {
    return getDefaultSiteContent();
  }
};

export const saveSiteContent = (content: SiteContent) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("vansh_site_content", JSON.stringify(content));
    window.dispatchEvent(new Event("vansh-site-content-updated"));
  }
};

export const resetSiteContent = () => {
  const defaults = getDefaultSiteContent();
  saveSiteContent(defaults);
  return defaults;
};

export function useSiteContent<K extends keyof SiteContent>(key: K) {
  const [state, setState] = useState<SiteContent[K]>(() => getDefaultSiteContent()[key]);

  useEffect(() => {
    const sync = () => setState(getStoredSiteContent()[key]);
    sync();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", sync);
      window.addEventListener("vansh-site-content-updated", sync);
      return () => {
        window.removeEventListener("storage", sync);
        window.removeEventListener("vansh-site-content-updated", sync);
      };
    }
  }, [key]);

  return state;
}
