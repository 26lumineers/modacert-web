import Image from "next/image";

const promoMessages = new Array(4).fill("10% off for new customers");

const categoryCards = [
  {
    title: "Handbags",
    image: "/landing/category-handbag.png",
    alt: "Luxury handbag example for authentication",
  },
  {
    title: "Shoes",
    image: "/landing/category-shoe.png",
    alt: "Luxury sneaker example for authentication",
  },
  {
    title: "Clothing",
    image: "/landing/category-clothing.png",
    alt: "Luxury clothing example for authentication",
  },
  {
    title: "Watches",
    image: "/landing/category-watch.png",
    alt: "Luxury watch example for authentication",
  },
  {
    title: "Jewelry & Accessories",
    image: "/landing/category-jewelry.png",
    alt: "Luxury jewelry example for authentication",
  },
] as const;

const featureCards = [
  {
    title: "Global Service",
    description:
      "Our team can verify your items no matter where you are, with a clear process and consistent turnaround.",
    image: "/landing/why-global.png",
    alt: "Golden globe illustration",
    imageClassName: "mx-auto h-40 w-40 sm:h-48 sm:w-48",
  },
  {
    title: "Expert Review",
    description:
      "Verified by real people who know the brands inside and out, with a second expert review for extra precision.",
    image: "/landing/why-expert.png",
    alt: "ModaCert experts reviewing luxury goods",
    imageClassName: "h-48 w-full",
  },
  {
    title: "Flexible Payments",
    description:
      "We support various payment methods to make your checkout seamless, secure, and simple for first-time customers.",
    image: "/landing/why-payment.png",
    alt: "Credit card held in hand",
    imageClassName: "mx-auto h-44 w-44 sm:h-52 sm:w-52",
  },
] as const;

const steps = [
  {
    number: "1",
    title: "Upload clear photos of your item",
    image: "/landing/step-1.png",
    alt: "Luxury handbag photo example",
  },
  {
    number: "2",
    title: "Our experts verify it",
    image: "/landing/step-2.png",
    alt: "ModaCert specialists reviewing an item",
  },
  {
    number: "3",
    title: "Get your certificate starting at 40 mins",
    image: "/landing/step-3.png",
    alt: "Authentication certificate example",
  },
] as const;

const footerColumns = [
  {
    title: "Authentication",
    links: ["Authenticate now", "Business solutions", "Verify your certificate"],
  },
  {
    title: "Learn",
    links: [
      "Courses",
      "Real vs Fake guides",
      "Reseller guides",
      "Case studies",
      "Free authentication",
      "About",
      "Reviews",
    ],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Refund policy", "Sitemap", "Help Center"],
  },
  {
    title: "Categories",
    links: ["Handbags", "Clothing", "Shoes", "Jewelry", "Watches", "Eyewear"],
  },
] as const;

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function PrimaryLink({
  href,
  children,
  large = false,
}: {
  href: string;
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-black text-white shadow-[0_18px_35px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[var(--mc-accent)] focus:ring-offset-2 focus:ring-offset-transparent ${
        large ? "px-7 py-4 text-base sm:px-9 sm:py-5 sm:text-lg" : "px-6 py-3 text-sm sm:text-base"
      }`}
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1">
      <p
        className="text-5xl leading-none text-white sm:text-6xl lg:text-7xl"
        style={{ fontFamily: "var(--font-number)" }}
      >
        {value}
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.24em] text-white/70 sm:text-base">
        {label}
      </p>
    </div>
  );
}

function CategoryCard({
  title,
  image,
  alt,
}: {
  title: string;
  image: string;
  alt: string;
}) {
  return (
    <article className="group min-w-[220px] overflow-hidden rounded-[2rem] bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 sm:min-w-0">
      <div className="relative flex aspect-[1/1.08] items-center justify-center overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_top,_rgba(255,85,36,0.16),_transparent_55%),linear-gradient(180deg,#f8f6f2_0%,#ebe4da_100%)] p-6">
        <Image src={image} alt={alt} fill sizes="(min-width: 1280px) 16vw, (min-width: 768px) 28vw, 55vw" className="object-contain p-4 transition duration-500 group-hover:scale-105" />
      </div>
      <h3 className="mt-5 text-center text-lg font-semibold text-[var(--mc-ink)] sm:text-xl">
        {title}
      </h3>
    </article>
  );
}

function FeatureCard({
  title,
  description,
  image,
  alt,
  imageClassName,
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
  imageClassName: string;
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_26px_50px_rgba(0,0,0,0.22)] sm:p-6">
      <div className="inline-flex rounded-full bg-[var(--mc-muted)] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-[var(--mc-ink)]/72 uppercase">
        {title}
      </div>
      <p className="mt-5 max-w-[28ch] text-sm leading-7 text-[var(--mc-ink)]/72 sm:text-base">
        {description}
      </p>
      <div className={`relative mt-8 overflow-hidden rounded-[1.6rem] bg-[linear-gradient(180deg,#f7f4ef_0%,#ece4d8_100%)] ${imageClassName}`}>
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 768px) 28vw, 80vw" className="object-contain p-4" />
      </div>
    </article>
  );
}

function StepCard({
  number,
  title,
  image,
  alt,
}: {
  number: string;
  title: string;
  image: string;
  alt: string;
}) {
  return (
    <article className="relative overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_24px_45px_rgba(28,24,18,0.15)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--mc-ink)] text-xl font-semibold text-white shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
        {number}
      </div>
      <h3 className="mx-auto mt-5 max-w-[18ch] text-center text-lg font-semibold text-[var(--mc-ink)] sm:text-xl">
        {title}
      </h3>
      <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,#f6f2ec_0%,#e6ddd2_100%)]">
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 24vw, (min-width: 768px) 30vw, 82vw" className="object-cover" />
      </div>
    </article>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly string[] }) {
  return (
    <div id={title === "Categories" ? "footer-nav" : undefined}>
      <h3 className="font-display text-lg text-white sm:text-xl">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-white/68 sm:text-[15px]">
        {links.map((link) => (
          <li key={link}>
            <a href="#top" className="transition hover:text-[var(--mc-accent)]">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top" className="bg-[var(--mc-light)] text-[var(--mc-ink)]">
      <div className="bg-[radial-gradient(circle_at_top,_rgba(255,85,36,0.12),_transparent_32%),linear-gradient(180deg,#1c1812_0%,#1c1812_68%,#201b15_100%)] text-white">
        <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(28,24,18,0.9)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a
              href="#footer-nav"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 transition hover:border-white/25 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-[var(--mc-accent)]"
              aria-label="Jump to footer navigation"
            >
              <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
                <span className="h-[1.5px] w-full rounded-full bg-white" />
                <span className="h-[1.5px] w-full rounded-full bg-white" />
                <span className="h-[1.5px] w-full rounded-full bg-white" />
              </span>
            </a>

            <a href="#top" className="font-logo text-2xl tracking-[0.12em] text-white sm:text-3xl">
              ModaCert
            </a>

            <a
              href="#service"
              className="hidden rounded-full border border-white/18 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--mc-accent)] hover:text-[var(--mc-accent)] md:inline-flex"
            >
              Start Check
            </a>
            <span className="h-11 w-11 md:hidden" aria-hidden="true" />
          </div>

          <div className="overflow-hidden border-t border-[rgba(0,0,0,0.18)] bg-[var(--mc-accent)] py-2">
            <div className="mx-auto flex max-w-7xl justify-between gap-6 whitespace-nowrap px-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-black/88 sm:px-6 sm:text-[12px] lg:px-8">
              {promoMessages.map((message, index) => (
                <span key={`${message}-${index}`} className="shrink-0">
                  {message}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_72%_18%,_rgba(255,85,36,0.26),_transparent_30%),radial-gradient(circle_at_20%_62%,_rgba(255,255,255,0.06),_transparent_25%)]" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(460px,0.9fr)] lg:px-8 lg:pb-32 lg:pt-20">
            <div className="relative z-10 max-w-2xl">
              <p className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/72">
                <span className="h-2 w-2 rounded-full bg-[var(--mc-accent)]" />
                Authenticated by 100+ world-class specialists
              </p>

              <h1 className="mt-8 max-w-[13ch] text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-[4.25rem]">
                <span className="text-[var(--mc-accent)]">Check Your</span> Brandname Bag{" "}
                <span className="text-[var(--mc-accent)]">&amp;</span> Luxury Accessory
              </h1>

              <div className="mt-6 flex items-center gap-4 text-sm text-white/78 sm:text-base">
                <div className="flex gap-1 text-[var(--mc-accent)]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div>
                <p>Excellent 4.9 out of 5</p>
                <Image
                  src="/landing/trustpilot.svg"
                  alt="Trustpilot"
                  width={114}
                  height={28}
                  className="h-5 w-auto sm:h-6"
                />
              </div>

              <div className="mt-10 flex max-w-xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur sm:flex-row sm:items-end sm:p-7">
                <Stat value="100.000" label="Happy Customers" />
                <div className="h-px w-full bg-white/10 sm:h-24 sm:w-px" aria-hidden="true" />
                <Stat value="500.000" label="Items Authenticated" />
              </div>

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <PrimaryLink href="#service" large>
                  Start Moda Check
                </PrimaryLink>
                <a
                  href="#steps"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-white/78 transition hover:text-[var(--mc-accent)]"
                >
                  How it works
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <div className="relative min-h-[26rem] sm:min-h-[30rem] lg:min-h-[42rem]">
              <div className="absolute right-[4%] top-[8%] h-52 w-52 rounded-full bg-[var(--mc-accent)]/12 blur-3xl sm:h-64 sm:w-64" />
              <div className="absolute left-[6%] top-[20%] h-40 w-40 rounded-full bg-white/6 blur-3xl sm:h-48 sm:w-48" />

              <div className="absolute left-[34%] top-0 aspect-square w-[10rem] -rotate-[28deg] sm:left-[37%] sm:w-[13rem] lg:left-[31%] lg:w-[18rem]">
                <Image
                  src="/landing/hero-watch.png"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 18rem, 13rem"
                  className="object-contain drop-shadow-[0_28px_34px_rgba(0,0,0,0.45)]"
                />
              </div>

              <div className="absolute right-[-3%] top-[12%] aspect-square w-[12rem] rotate-[18deg] sm:right-[4%] sm:w-[16rem] lg:right-[1%] lg:top-[8%] lg:w-[23rem]">
                <Image
                  src="/landing/hero-bag.png"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 23rem, 16rem"
                  className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.42)]"
                />
              </div>

              <div className="absolute left-[12%] top-[54%] aspect-square w-[11rem] -rotate-[26deg] sm:left-[18%] sm:w-[15rem] lg:left-[8%] lg:top-[56%] lg:w-[18rem]">
                <Image
                  src="/landing/hero-shoe.png"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 18rem, 15rem"
                  className="object-contain drop-shadow-[0_26px_26px_rgba(0,0,0,0.42)]"
                />
              </div>

              <div className="absolute bottom-[10%] right-[4%] aspect-square w-[9rem] rotate-[14deg] sm:w-[11rem] lg:bottom-[8%] lg:right-[6%] lg:w-[14rem]">
                <Image
                  src="/landing/category-jewelry.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 14rem, 11rem"
                  className="object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,0.38)]"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="service" className="relative overflow-hidden pb-28">
          <div className="absolute inset-x-0 top-28 h-[28rem] bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_58%)]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.36em] text-white/66">
                Our Service
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                Precision authentication with a luxury-grade experience
              </h2>
            </div>

            <div className="relative mt-14 overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,#6b6256_0%,rgba(107,98,86,0.38)_48%,rgba(107,98,86,0)_100%)] p-5 shadow-[0_35px_90px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
                <div className="relative min-h-[21rem] sm:min-h-[24rem]">
                  <div className="absolute left-0 top-[18%] h-[14rem] w-[88%] overflow-hidden rounded-[2rem] shadow-[0_26px_40px_rgba(0,0,0,0.28)] sm:h-[18rem]">
                    <Image
                      src="/landing/service-collage.png"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 34vw, 88vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute left-[12%] top-0 h-[10rem] w-[60%] overflow-hidden rounded-[1.6rem] shadow-[0_18px_34px_rgba(0,0,0,0.3)] sm:h-[13rem]">
                    <Image
                      src="/landing/service-bag.png"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 20vw, 48vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-[22%] h-[7rem] w-[48%] -rotate-[6deg] overflow-hidden rounded-[1.5rem] shadow-[0_18px_34px_rgba(0,0,0,0.3)] sm:h-[9rem]">
                    <Image
                      src="/landing/service-shoe.png"
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 16vw, 36vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-black/24 px-4 py-2 text-sm uppercase tracking-[0.25em] text-white/72">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[var(--mc-accent)]">
                      99%
                    </span>
                    Trusted result accuracy
                  </div>
                  <h3 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
                    Authentication Service
                  </h3>
                  <p className="mt-5 max-w-[42ch] text-sm leading-8 text-white/74 sm:text-base">
                    Our platform provides professional authentication for branded
                    products, verifying authenticity through two independent
                    experts per item to ensure maximum reliability. With a
                    proven accuracy rate of up to 99%, we deliver trusted
                    results you can rely on.
                  </p>
                  <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <PrimaryLink href="#categories">Start my check now</PrimaryLink>
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-3 text-sm text-white/70">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                        ✓
                      </span>
                      Two-expert review on every item
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section
        id="categories"
        className="relative -mt-12 rounded-t-[3rem] bg-[var(--mc-light)] px-4 pb-24 pt-20 sm:-mt-16 sm:rounded-t-[4rem] sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[var(--mc-accent)]">
              We Authenticate
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--mc-ink)] sm:text-4xl lg:text-5xl">
              Luxury categories covered across the items people buy, resell, and collect
            </h2>
          </div>

          <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-5 lg:overflow-visible">
            {categoryCards.map((card) => (
              <div key={card.title} className="snap-start lg:min-w-0">
                <CategoryCard {...card} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <PrimaryLink href="#steps">Check the price now</PrimaryLink>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#1f1a15_0%,#1c1812_100%)] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-8 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />
        <div className="absolute left-[8%] top-32 h-72 w-72 rounded-full bg-[var(--mc-accent)]/8 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white/62">
              Why ModaCert
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Why Modacert is Your Best Choice
            </h2>
          </div>

          <div className="relative mt-14 grid gap-6 lg:grid-cols-3">
            {featureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="steps"
        className="relative rounded-t-[3rem] bg-[linear-gradient(180deg,#efebe4_0%,#e6e0d8_100%)] px-4 py-24 sm:rounded-t-[4rem] sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[var(--mc-accent)]">
              Fast Process
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[var(--mc-ink)] sm:text-4xl lg:text-5xl">
              3 Simple Steps
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section id="footer-cta" className="bg-[var(--mc-dark)] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-white/28 bg-[linear-gradient(135deg,#f1efea_0%,#d7d0c4_52%,#7c6f5d_100%)] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
              <div className="relative min-h-[19rem] sm:min-h-[22rem]">
                <div className="absolute -left-4 -top-6 aspect-square w-40 -rotate-[12deg] sm:w-52 lg:w-64">
                  <Image
                    src="/landing/cta-watch.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16rem, 13rem"
                    className="object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.22)]"
                  />
                </div>
                <div className="absolute -left-2 bottom-0 h-[15rem] w-[50%] overflow-hidden rounded-[1.8rem] shadow-[0_18px_36px_rgba(0,0,0,0.25)] sm:h-[18rem]">
                  <Image
                    src="/landing/cta-bag.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 20vw, 44vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-2 left-[38%] aspect-square w-40 rotate-[10deg] sm:w-52 lg:left-[42%] lg:w-64">
                  <Image
                    src="/landing/cta-shoe.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16rem, 13rem"
                    className="object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.24)]"
                  />
                </div>
              </div>

              <div className="relative z-10 lg:text-right">
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[var(--mc-accent)]">
                  Final Call
                </p>
                <h2 className="font-display mt-4 text-4xl leading-[0.95] text-[var(--mc-ink)] sm:text-5xl lg:text-[5rem]">
                  Don’t Wait,
                  <br />
                  Get Your <span className="text-[var(--mc-accent)]">Moda</span>
                  <br />
                  Check Now
                </h2>
                <p className="mt-5 max-w-[36ch] text-sm leading-7 text-[var(--mc-ink)]/72 lg:ml-auto">
                  Turn uncertainty into a trusted answer with the same refined
                  visual experience your customers expect from luxury products.
                </p>
                <div className="mt-8">
                  <PrimaryLink href="#newsletter" large>
                    Start Moda Check
                  </PrimaryLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[var(--mc-dark)] px-4 pb-16 pt-6 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-logo text-3xl tracking-[0.12em] text-white">ModaCert</p>
                  <p className="mt-3 max-w-[30ch] text-sm leading-7 text-white/64">
                    Luxury authentication designed to feel as premium as the
                    items it protects.
                  </p>
                </div>
                <a
                  href="mailto:modacert.support@gmail.com"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--mc-accent)] transition hover:text-white"
                >
                  modacert.support@gmail.com
                  <ArrowIcon />
                </a>
              </div>

              <div className="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
                {footerColumns.map((column) => (
                  <FooterColumn key={column.title} {...column} />
                ))}
              </div>
            </div>

            <div
              id="newsletter"
              className="self-start rounded-[2rem] bg-[linear-gradient(180deg,#504333_0%,#42382a_100%)] p-6 shadow-[0_24px_45px_rgba(0,0,0,0.28)] sm:p-8"
            >
              <p className="font-display text-3xl text-[#f0ebe5] sm:text-4xl">Subscribe</p>
              <p className="mt-4 max-w-[26ch] text-sm leading-7 text-[#f0ebe5]/76">
                Join our <span className="font-semibold text-[var(--mc-accent)]">newsletter</span> for launch news, resale insights, and the best promotions.
              </p>
              <form action="#newsletter" className="mt-8">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="My Email"
                  className="w-full rounded-full border border-white/10 bg-[#d9d2c8] px-5 py-3 text-[15px] text-[var(--mc-ink)] outline-none placeholder:text-[var(--mc-ink)]/48 focus:border-[var(--mc-accent)] focus:ring-2 focus:ring-[var(--mc-accent)]/50"
                />
                <button
                  type="submit"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#121212] focus:outline-none focus:ring-2 focus:ring-[var(--mc-accent)]"
                >
                  Subscribe
                </button>
              </form>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-display text-2xl text-[#f0ebe5]">Contact us</p>
                <a
                  href="mailto:modacert.support@gmail.com"
                  className="mt-4 inline-flex text-sm text-[var(--mc-accent)] transition hover:text-white"
                >
                  modacert.support@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/46 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 ModaCert. Luxury authentication with a verified human review workflow.</p>
            <p>Designed for mobile-first conversion and premium trust signals.</p>
          </div>
        </div>
      </footer>

      <a
        href="mailto:modacert.support@gmail.com"
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--mc-accent)] text-white shadow-[0_18px_35px_rgba(255,85,36,0.42)] transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--mc-accent)]"
        aria-label="Email ModaCert support"
      >
        <svg
          aria-hidden="true"
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5C5 6.67157 5.67157 6 6.5 6H17.5C18.3284 6 19 6.67157 19 7.5V15.5C19 16.3284 18.3284 17 17.5 17H9.41421L5 20.5V7.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
          <path
            d="M8 10L12 13L16 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      </a>
    </main>
  );
}
