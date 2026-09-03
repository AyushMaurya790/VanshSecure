import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  ShieldCheck,
  Landmark,
  Globe2,
  Layers,
  PiggyBank,
  ReceiptText,
  LineChart,
} from "lucide-react";

export const COMPANY = {
  name: "Vansh Secure Avenue LLP",
  short: "Vansh Secure Avenue LLP",
  tagline: "Save Karo, Secure Karo",
  credential: "AMFI Registered Mutual Fund Distributor",
  arn: "ARN-287084",
  phone: "+91 81782 24594",
  whatsapp: "+918178224594",
  altPhone: "+91 99537 51304",
  email: "support@vanshsecure.com",
  altEmail: "vanshsecureavenue@gmail.com",
  address: "84, Basement, Pocket 1, Jasola Vihar, New Delhi, Delhi 110025",
  mapLink: "https://maps.app.goo.gl/BdZD6MeJRz3TJxBh6",
  hours: "Mon – Sat · 10:00 AM to 7:00 PM IST",
  founders: "Anuj Maheshwari & Stuti Saboo",
  partner: "Anuj Maheshwari · Co-Founder & Designated Partner",
  experience: "12+ years",
  social: {
    instagram: "https://www.instagram.com/vanshsecureavenue/",
    facebook: "https://www.facebook.com/vanshsecureavenue/",
    linkedin: "https://www.linkedin.com/company/vansh-secure-avenue-llp/",
    twitter: "https://twitter.com/vanshsecure",
  },
};


export type ProcessStep = { title: string; body: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  path: string;
  name: string;
  navName: string;
  icon: LucideIcon;
  summary: string;
  heroKicker: string;
  heroTitle: string;
  heroLede: string;
  overviewTitle: string;
  overview: string[];
  benefits: { title: string; body: string }[];
  reasons: string[];
  process: ProcessStep[];
  faqs: Faq[];
  offerings?: { name: string; body: string }[];

  ctaTitle: string;
  ctaBody: string;
};

export const SERVICES: Service[] = [
  {
    slug: "mutual-funds",
    path: "/mutual-funds",
    name: "Mutual Funds",
    navName: "Mutual Funds",
    icon: TrendingUp,
    summary:
      "Research-led portfolios across equity, debt and hybrid strategies, structured around your goals rather than market noise.",
    heroKicker: "Core Wealth Engine",
    heroTitle: "Mutual Fund Office",
    heroLede:
      "Disciplined portfolio construction, reviewed continuously and aligned to the milestones that matter to your family.",
    overviewTitle: "A portfolio built around your life, not the market cycle",
    overview: [
      "As an AMFI registered mutual fund distributor, we curate portfolios from across fund houses with a single filter: suitability. Every recommendation is mapped to a defined objective, a time horizon and a risk band you have consciously accepted.",
      "We combine systematic investing, asset allocation discipline and periodic rebalancing so that your wealth compounds quietly through cycles, without reactive decisions during volatility.",
    ],
    benefits: [
      {
        title: "Goal-mapped allocation",
        body: "Each rupee is assigned a purpose — education, retirement, liquidity or legacy — with its own strategy.",
      },
      {
        title: "Curated fund selection",
        body: "Schemes evaluated on rolling returns, downside capture, portfolio quality and manager consistency.",
      },
      {
        title: "Systematic discipline",
        body: "SIP, STP and SWP architecture that removes timing pressure and builds behavioural resilience.",
      },
      {
        title: "Continuous review",
        body: "Structured reviews with rebalancing recommendations and clear, jargon-free reporting.",
      },
    ],
    reasons: [
      "Independent, distributor-agnostic recommendations across major asset management companies",
      "Written investment rationale for every portfolio you own",
      "Direct access to an expert, not a call centre",
      "Documentation, transmission and nomination support handled end to end",
    ],
    process: [
      { title: "Discovery", body: "We understand cash flows, obligations, goals and your temperament for risk." },
      { title: "Blueprint", body: "An allocation blueprint with fund selection and expected outcome ranges." },
      { title: "Execution", body: "Paperless onboarding, mandate setup and staggered deployment where required." },
      { title: "Stewardship", body: "Periodic reviews, rebalancing and disciplined course corrections." },
    ],
    faqs: [
      {
        q: "How do you select which funds enter my portfolio?",
        a: "We screen on long-term rolling performance, downside protection, portfolio concentration, expense structure and fund management stability — then shortlist only those that fit your specific mandate.",
      },
      {
        q: "What is the minimum investment to work with you?",
        a: "We work with investors across ticket sizes, though our Office model is best suited to families and business owners building portfolios over the long term.",
      },
      {
        q: "How often will my portfolio be reviewed?",
        a: "Formal reviews are conducted periodically, with interim communication whenever an allocation or scheme-level action is warranted.",
      },
    ],
    offerings: [
      { name: "Goal Planning SIP", body: "Systematic plans mapped to specific milestones — education, home, wealth creation." },
      { name: "Retirement Planning", body: "Accumulation and withdrawal strategies that fund a self-reliant retirement." },
      { name: "Tax Harvesting", body: "ELSS and allocation choices that improve post-tax outcomes within your plan." },
    ],
    ctaTitle: "Build a portfolio with intent",

    ctaBody:
      "Sit down with an expert and translate your goals into a structured, reviewable mutual fund portfolio.",
  },
  {
    slug: "insurance",
    path: "/insurance",
    name: "Insurance Solutions",
    navName: "Insurance",
    icon: ShieldCheck,
    summary:
      "Protection architecture for families and businesses — adequate cover, correctly structured, without product clutter.",
    heroKicker: "Wealth Protection",
    heroTitle: "Insurance Solutions",
    heroLede:
      "Cover that protects the plan. We size protection to liabilities and dependants, never to product incentives.",
    overviewTitle: "Protection is the foundation, not an afterthought",
    overview: [
      "Wealth creation loses meaning if a single event can undo decades of effort. We begin with a protection audit — human life value, outstanding liabilities, health exposure and business continuity risk.",
      "Only then do we recommend the right structure of term, health and specialised covers, and we review adequacy as income, family and liabilities evolve.",
    ],
    benefits: [
      { title: "Needs-based cover sizing", body: "Cover calculated from liabilities and dependant needs, not thumb rules." },
      { title: "Family health strategy", body: "Base and super top-up structures designed for medical inflation." },
      { title: "Business continuity", body: "Keyman, partnership and loan-protection structures for promoters." },
      { title: "Claim-side assistance", body: "Documentation and coordination support when your family needs it most." },
    ],
    reasons: [
      "Advice separated from product push — protection first, always",
      "Transparent comparison of insurer claim settlement track records",
      "Annual adequacy review as your net worth grows",
      "Coordinated with your investment and estate plan",
    ],
    process: [
      { title: "Risk audit", body: "We quantify what would be at stake in adverse scenarios." },
      { title: "Cover design", body: "A structure of policies that closes gaps without overlaps." },
      { title: "Onboarding", body: "Medical, underwriting and documentation coordination." },
      { title: "Annual review", body: "Cover recalibrated to changing income and liabilities." },
    ],
    faqs: [
      { q: "How much life cover is actually adequate?", a: "As a working principle, cover should clear all liabilities and replace income for the dependency period. We calculate this precisely using your human life value." },
      { q: "Do you recommend investment-linked insurance?", a: "We keep protection and investment separate unless a specific goal, tax or legacy structure genuinely justifies a combined product." },
      { q: "Can you help my family at claim time?", a: "Yes. Claim documentation and insurer coordination support is part of our engagement." },
    ],
    offerings: [
      { name: "Life Insurance", body: "Term and life cover sized to liabilities, dependants and income replacement." },
      { name: "Health Insurance", body: "Family floater and super top-up structures designed for medical inflation." },
      { name: "Travel Insurance", body: "Domestic and international cover for medical, baggage and trip disruption." },
      { name: "Vehicle Insurance", body: "Motor own-damage and third-party cover with hassle-free renewals." },
      { name: "Personal Accidental Insurance", body: "Cover for disability and loss of income following an accident." },
    ],
    ctaTitle: "Protect what you have built",

    ctaBody: "A short conversation is enough to identify the gaps in your current protection cover.",
  },
  {
    slug: "loan-against-securities",
    path: "/loan-against-securities",
    name: "Loan Against Securities",
    navName: "Loan Against Securities",
    icon: Landmark,
    summary:
      "Unlock liquidity from your portfolio without breaking compounding — structured credit against mutual funds and shares.",
    heroKicker: "Portfolio Liquidity",
    heroTitle: "Loan Against Securities",
    heroLede:
      "Access capital when opportunity or obligation arrives, while your long-term investments stay invested.",
    overviewTitle: "Liquidity without liquidation",
    overview: [
      "Redeeming quality assets to meet a short-term need is often the most expensive decision an investor makes. Loan against securities allows you to pledge mutual funds, listed shares or bonds and draw a credit line against them.",
      "We help you evaluate eligibility, lender terms, loan-to-value ratios and interest structures — and, equally important, whether borrowing is the right decision at all.",
    ],
    benefits: [
      { title: "Compounding preserved", body: "Your portfolio continues to stay invested and earn returns." },
      { title: "Overdraft flexibility", body: "Interest typically applies only on the amount actually utilised." },
      { title: "Competitive pricing", body: "Secured lending generally costs far less than unsecured borrowing." },
      { title: "Quick turnaround", body: "Digital pledge mechanisms enable fast sanction and disbursal." },
    ],
    reasons: [
      "Independent comparison across lenders and loan-to-value structures",
      "Clear stress-testing of margin call scenarios before you borrow",
      "Documentation and pledge coordination handled for you",
      "Repayment strategy designed alongside your investment plan",
    ],
    process: [
      { title: "Eligibility review", body: "We assess pledgeable holdings and realistic drawdown limits." },
      { title: "Lender selection", body: "Terms, rates and covenants compared side by side." },
      { title: "Pledge & sanction", body: "Digital pledge, documentation and limit activation." },
      { title: "Monitoring", body: "Ongoing margin monitoring and repayment guidance." },
    ],
    faqs: [
      { q: "Which securities can be pledged?", a: "Approved mutual fund schemes, listed equity shares and select bonds, subject to each lender's approved list." },
      { q: "What happens if markets fall sharply?", a: "A margin shortfall may require partial repayment or additional pledge. We stress-test this before you draw the facility." },
      { q: "Is there interest on the unused limit?", a: "In most overdraft structures, interest applies only on the utilised amount." },
    ],
    ctaTitle: "Create liquidity, keep your compounding",
    ctaBody: "Review whether a securities-backed credit line fits your current requirement.",
  },
  {
    slug: "gift-city",
    path: "/gift-city",
    name: "Investment through GIFT City",
    navName: "GIFT City Investments",
    icon: Globe2,
    summary:
      "Global diversification through India's international financial services centre, with regulated, dollar-denominated access.",
    heroKicker: "Global Access",
    heroTitle: "GIFT City Investments",
    heroLede:
      "Participate in global markets through a regulated Indian jurisdiction designed for international investing.",
    overviewTitle: "Global portfolios, structured from India",
    overview: [
      "GIFT City — India's International Financial Services Centre — allows resident and non-resident investors to access dollar-denominated funds and global strategies within a purpose-built regulatory framework.",
      "We help you understand permissible routes, remittance considerations, fund structures and reporting requirements, and then build a global sleeve that complements your domestic portfolio.",
    ],
    benefits: [
      { title: "Currency diversification", body: "Dollar-denominated exposure alongside rupee assets." },
      { title: "Global strategies", body: "Access to international funds and specialised offshore mandates." },
      { title: "Regulated framework", body: "IFSCA-governed structures with defined investor protections." },
      { title: "NRI-friendly", body: "Structures designed to suit non-resident investors and global families." },
    ],
    reasons: [
      "Clear explanation of remittance limits, taxation and reporting obligations",
      "Suitability-first assessment before any global allocation",
      "Coordination with your existing domestic portfolio",
      "Documentation support for onboarding and compliance",
    ],
    process: [
      { title: "Eligibility", body: "Residency status, remittance route and objective are established." },
      { title: "Structure selection", body: "Fund and vehicle chosen to fit the mandate." },
      { title: "Onboarding", body: "KYC, remittance and account setup coordinated end to end." },
      { title: "Review", body: "Currency, allocation and reporting reviewed periodically." },
    ],
    faqs: [
      { q: "Who can invest through GIFT City?", a: "Both resident Indians, within applicable remittance rules, and non-resident investors can participate through permitted structures." },
      { q: "Is this suitable for every investor?", a: "No. Global allocation suits investors with an established domestic core, dollar liabilities or genuine diversification needs." },
      { q: "How is taxation handled?", a: "Treatment depends on residency and structure. We outline the implications clearly and coordinate with your tax advisor." },
    ],
    ctaTitle: "Add a global dimension to your wealth",
    ctaBody: "Understand whether a GIFT City allocation belongs in your portfolio.",
  },
  {
    slug: "sif",
    path: "/sif",
    name: "Specialized Investment Fund (SIF)",
    navName: "Specialized Investment Fund",
    icon: Layers,
    summary:
      "A new regulated category between mutual funds and PMS, offering sophisticated strategies for experienced investors.",
    heroKicker: "Sophisticated Strategies",
    heroTitle: "Specialized Investment Fund",
    heroLede:
      "Differentiated, strategy-led investing for investors who have outgrown a purely traditional allocation.",
    overviewTitle: "Where advanced strategy meets regulated structure",
    overview: [
      "The Specialized Investment Fund category bridges the gap between conventional mutual funds and higher-ticket portfolio services, permitting more flexible, strategy-driven mandates within a regulated framework.",
      "We assess whether such strategies genuinely add value to your portfolio — considering correlation, liquidity, minimum commitments and your capacity to hold through drawdowns.",
    ],
    benefits: [
      { title: "Strategy diversification", body: "Exposure to approaches beyond conventional long-only investing." },
      { title: "Regulated oversight", body: "A defined framework with disclosure and governance norms." },
      { title: "Institutional discipline", body: "Professional mandates with clearly stated investment philosophies." },
      { title: "Portfolio complement", body: "Deployed as a satellite allocation around a stable core." },
    ],
    reasons: [
      "Honest suitability assessment — we will advise against it where it does not fit",
      "Plain-language explanation of strategy, risk and liquidity terms",
      "Sizing discipline so satellite allocations never destabilise the core",
      "Ongoing monitoring against the stated mandate",
    ],
    process: [
      { title: "Suitability", body: "Experience, liquidity needs and risk capacity are evaluated first." },
      { title: "Strategy review", body: "Mandate, philosophy and drawdown history examined." },
      { title: "Allocation", body: "Position sized as a measured satellite to your core portfolio." },
      { title: "Monitoring", body: "Performance reviewed against the strategy's own benchmark." },
    ],
    faqs: [
      { q: "How is an SIF different from a mutual fund?", a: "It permits more flexible, sophisticated strategies with higher minimum commitments and typically a longer investment horizon." },
      { q: "What commitment is generally required?", a: "Minimum investment thresholds are materially higher than mutual funds and vary by strategy." },
      { q: "Is it riskier?", a: "Strategy risk differs from conventional funds, which is why we size these allocations conservatively." },
    ],
    ctaTitle: "Explore strategy-led allocation",
    ctaBody: "Find out whether a specialised mandate deserves a place in your portfolio.",
  },
  {
    slug: "corporate-fixed-deposits",
    path: "/corporate-fixed-deposits",
    name: "Corporate Fixed Deposits",
    navName: "Corporate Fixed Deposits",
    icon: PiggyBank,
    summary:
      "Rated corporate deposits offering predictable income, selected on credit quality before yield.",
    heroKicker: "Stability & Income",
    heroTitle: "Corporate Fixed Deposits",
    heroLede:
      "Contracted returns for the part of your wealth that must remain predictable, chosen on credit strength first.",
    overviewTitle: "Predictable income, credit-first selection",
    overview: [
      "Corporate fixed deposits from well-rated issuers can offer higher contracted returns than conventional deposits, making them useful for income requirements and near-term goals.",
      "Yield is never our first filter. We evaluate credit rating, promoter strength, financial track record and tenure ladder before recommending any issuer.",
    ],
    benefits: [
      { title: "Contracted returns", body: "Known payouts that support planned income requirements." },
      { title: "Rated issuers only", body: "Selection restricted to strong, well-rated corporate entities." },
      { title: "Tenure laddering", body: "Maturities staggered to maintain liquidity and reinvestment flexibility." },
      { title: "Income scheduling", body: "Monthly, quarterly or cumulative options mapped to your cash flows." },
    ],
    reasons: [
      "Credit quality prioritised above headline interest rates",
      "Concentration limits per issuer to contain risk",
      "Renewal and maturity tracking handled for you",
      "Integrated with the fixed-income sleeve of your overall plan",
    ],
    process: [
      { title: "Income mapping", body: "We define how much stability your plan actually requires." },
      { title: "Issuer screening", body: "Ratings, financials and history reviewed before shortlisting." },
      { title: "Laddering", body: "Tenures structured for liquidity and reinvestment efficiency." },
      { title: "Tracking", body: "Maturity, payout and renewal reminders managed proactively." },
    ],
    faqs: [
      { q: "How safe are corporate fixed deposits?", a: "They carry issuer credit risk, unlike bank deposits. We mitigate this through rating discipline and issuer diversification." },
      { q: "Can I withdraw before maturity?", a: "Premature withdrawal is usually permitted after a lock-in, generally with a rate reduction." },
      { q: "How is the interest taxed?", a: "Interest is taxable at your applicable slab rate, and TDS provisions may apply." },
    ],
    ctaTitle: "Structure your stable income",
    ctaBody: "Design a fixed-income ladder that supports your cash flow with disciplined credit selection.",
  },
  {
    slug: "tax-saving-bonds",
    path: "/tax-saving-bonds",
    name: "Tax Saving Bonds",
    navName: "Tax Saving Bonds",
    icon: ReceiptText,
    summary:
      "Tax-efficient bond allocations that improve post-tax outcomes for investors in the highest brackets.",
    heroKicker: "Post-Tax Efficiency",
    heroTitle: "Tax Saving Bonds",
    heroLede:
      "For investors in the highest brackets, what you retain matters more than what you earn.",
    overviewTitle: "Optimising the return you actually keep",
    overview: [
      "Tax-efficient bonds — including capital gain and tax-free categories where available — can meaningfully improve post-tax outcomes for high-bracket investors and those managing capital gains events.",
      "We evaluate effective post-tax yield, lock-in, liquidity and issuer quality before positioning bonds within your fixed-income allocation.",
    ],
    benefits: [
      { title: "Higher effective yield", body: "Post-tax outcomes that often exceed comparable taxable instruments." },
      { title: "Capital gain planning", body: "Structures that can help manage gains from property or asset sales." },
      { title: "Strong issuers", body: "Focus on government-backed and highly rated entities." },
      { title: "Predictable income", body: "Defined coupon flows that anchor the conservative sleeve." },
    ],
    reasons: [
      "Post-tax, not headline, yield drives every recommendation",
      "Timely guidance around capital gain deadlines",
      "Lock-in and liquidity implications explained upfront",
      "Coordinated with your chartered accountant where required",
    ],
    process: [
      { title: "Tax position review", body: "We map your bracket, gains and timelines." },
      { title: "Instrument selection", body: "Suitable bond categories and issuers identified." },
      { title: "Application", body: "Allotment, documentation and demat credit coordinated." },
      { title: "Maturity planning", body: "Reinvestment planned well before maturity." },
    ],
    faqs: [
      { q: "Who benefits most from these bonds?", a: "Investors in the highest tax brackets and those with recent long-term capital gains to manage." },
      { q: "Are they liquid?", a: "Most carry a lock-in. Certain listed bonds may trade on exchange, though liquidity varies." },
      { q: "Are availability windows limited?", a: "Yes. Many issuances are time-bound, so we alert clients when suitable windows open." },
    ],
    ctaTitle: "Improve what you keep",
    ctaBody: "Review your post-tax fixed-income position with an expert.",
  },
  {
    slug: "unlisted-shares",
    path: "/unlisted-shares",
    name: "Unlisted Shares",
    navName: "Unlisted Shares",
    icon: LineChart,
    summary:
      "Curated pre-IPO and unlisted equity access for investors with long horizons and genuine risk capacity.",
    heroKicker: "Pre-IPO Access",
    heroTitle: "Unlisted Shares",
    heroLede:
      "Participate in quality businesses before they reach public markets — with clear eyes on liquidity and risk.",
    overviewTitle: "Early access, held to a strict standard",
    overview: [
      "Unlisted and pre-IPO equity can offer participation in businesses at an earlier stage of their journey. It also carries illiquidity, valuation opacity and timeline uncertainty that must be respected.",
      "We source only through credible counterparties, focus on businesses with demonstrable fundamentals, and size positions as a small, deliberate satellite within a diversified portfolio.",
    ],
    benefits: [
      { title: "Early participation", body: "Access to quality businesses ahead of public listing." },
      { title: "Portfolio differentiation", body: "Return drivers distinct from listed market cycles." },
      { title: "Verified execution", body: "Transfers executed through credible, verifiable channels." },
      { title: "Transparent pricing", body: "Valuation context and transaction terms disclosed clearly." },
    ],
    reasons: [
      "Fundamentals-first shortlisting, never hype-led narratives",
      "Explicit disclosure of illiquidity and timeline risk",
      "Disciplined position sizing within your overall allocation",
      "Demat transfer and documentation handled carefully",
    ],
    process: [
      { title: "Suitability", body: "Risk capacity and horizon confirmed before anything is shown." },
      { title: "Opportunity review", body: "Business quality, financials and valuation examined." },
      { title: "Execution", body: "Transaction and demat transfer completed through verified channels." },
      { title: "Exit planning", body: "Listing or secondary exit routes planned in advance." },
    ],
    faqs: [
      { q: "How liquid are unlisted shares?", a: "They are illiquid. Exit typically depends on a listing event or a negotiated secondary transaction." },
      { q: "How much should be allocated here?", a: "A small satellite allocation only, sized so that an adverse outcome does not affect your core plan." },
      { q: "How are shares transferred?", a: "Through off-market demat transfer executed with verified counterparties and full documentation." },
    ],
    ctaTitle: "Explore pre-IPO opportunities",
    ctaBody: "Discuss whether unlisted equity has a measured place in your portfolio.",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug)!;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Why Choose Us", to: "/why-choose-us" },
  { label: "Contact", to: "/contact" },
];

export const GOALS = [
  {
    title: "Retirement Freedom",
    body: "A corpus engineered to replace income for decades, indexed to the lifestyle you intend to keep.",
    horizon: "15 – 30 years",
  },
  {
    title: "Children's Education",
    body: "Milestone-linked planning for domestic and overseas education, protected against currency and fee inflation.",
    horizon: "8 – 18 years",
  },
  {
    title: "Build Your Dream Home",
    body: "Planning for buying a home with structured savings and investment strategy to achieve your homeownership goals.",
    horizon: "5 – 15 years",
  },
  {
    title: "Legacy & Succession",
    body: "Structuring, nomination and transmission planning so wealth passes to the next generation cleanly.",
    horizon: "Generational",
  },
];

export const HOME_FAQS: Faq[] = [
  {
    q: "What does an AMFI registered mutual fund distributor do?",
    a: "An AMFI registered distributor is authorised to facilitate mutual fund investments and provide suitability-based guidance. Our role is to help you select, structure and review investments — with your money always held directly with the respective fund houses and custodians.",
  },
  {
    q: "Do you work only with high net worth investors?",
    a: "Our Office model is designed for serious long-term investors — business owners, professionals, families and NRIs. While much of our work is with HNI and UHNI clients, our first question is always about intent and horizon, not ticket size.",
  },
  {
    q: "How is your advice compensated?",
    a: "As a distributor, we are compensated through standard distribution arrangements with product manufacturers. There are no hidden charges layered on to your investments, and we disclose the structure openly during onboarding.",
  },
  {
    q: "Can NRIs invest through Vansh Secure Avenue LLP?",
    a: "Yes. We work with non-resident investors across permissible routes, including domestic mutual funds and GIFT City structures, with support on documentation, repatriation and reporting considerations.",
  },
  {
    q: "How often will my investments get reviewed?",
    a: "You will have structured periodic reviews, plus proactive communication whenever a decision, rebalancing action or regulatory change is relevant to your portfolio.",
  },
];
