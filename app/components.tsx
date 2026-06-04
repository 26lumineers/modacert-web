import Image from "next/image";
import Link from "next/link";
import {
  categories,
  figma,
  footerCategories,
  footerColumns,
  navItems,
  rates,
  socialLinks,
  steps,
  trustStats,
  type Category,
  type Rate,
} from "./data";

type ButtonTone = "dark" | "orange" | "light" | "outline";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const navHeaderClass = "sticky top-0 z-50 px-4 py-5 sm:px-8 lg:px-20";
export const navPillClass =
  "mx-auto grid h-[73px] max-w-[1265px] grid-cols-[1fr_auto_1fr] items-center rounded-full border border-white/45 bg-mc-nav-gray/95 px-5 shadow-[0_16px_38px_rgba(28,18,9,0.12)] backdrop-blur-xl sm:px-8";
export const navMenuClass = "ml-auto hidden items-center gap-8 text-xs font-semibold text-black md:flex";
export const navCtaClass = "rounded-full bg-black px-5 py-3 text-xs font-bold text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] transition hover:bg-mc-brown";

export function NavMenuMark() {
  return (
    <span aria-hidden="true" className="flex h-10 w-10 items-center justify-start text-2xl leading-none text-black">
      =
    </span>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

export function BrandMark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" transitionTypes={["nav-back"]} className={cx("inline-flex items-center gap-2", light ? "text-white" : "text-mc-ink")}>
      <span className={cx("relative shrink-0 overflow-hidden rounded-full", compact ? "h-7 w-7" : "h-9 w-9")}>
        <Image src={figma.mark} alt="" fill sizes="36px" className="object-contain" />
      </span>
      <span className={cx("font-logo tracking-[0.2em]", compact ? "text-lg" : "text-xl sm:text-2xl")}>MODACERT</span>
    </Link>
  );
}

export function NavBrandLink({ className = "" }: { className?: string }) {
  return (
    <Link href="/" transitionTypes={["nav-back"]} className={cx("inline-flex items-center gap-2 text-black", className)}>
      <span className="relative h-[42px] w-[42px] sm:h-[54px] sm:w-[54px]">
        <Image src={figma.mark} alt="" fill sizes="54px" className="object-contain" />
      </span>
      <span className="font-logo text-base tracking-[0.08em] sm:text-xl">MODACERT</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className={navHeaderClass} style={{ viewTransitionName: "site-header" }}>
      <div className={navPillClass}>
        <NavMenuMark />
        <NavBrandLink />
        <nav className={navMenuClass}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} transitionTypes={["nav-forward"]} className="transition hover:text-mc-orange">
              {item.label}
            </Link>
          ))}
          <span className="relative h-5 w-5">
            <Image src={figma.cart} alt="" fill sizes="20px" className="object-contain" />
          </span>
          <Link href="/signin" transitionTypes={["nav-forward"]} className={navCtaClass}>
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function FloatingChatWidget() {
  return (
    <Link
      href="/checkout"
      transitionTypes={["nav-forward"]}
      aria-label="Start authentication chat"
      className="fixed bottom-5 right-5 z-[60] grid h-[74px] w-[74px] place-items-center rounded-[1.35rem] bg-mc-orange shadow-[0_18px_36px_rgba(244,122,19,0.38)] transition hover:-translate-y-1 hover:bg-mc-orange-dark focus:outline-none focus:ring-2 focus:ring-mc-orange focus:ring-offset-2 sm:bottom-7 sm:right-7 sm:h-[92px] sm:w-[92px]"
    >
      <Image src={figma.chat} alt="" width={92} height={92} sizes="(min-width: 640px) 92px, 74px" className="h-full w-full object-contain" />
    </Link>
  );
}

export function ButtonLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: ButtonTone;
  className?: string;
}) {
  const toneClass = {
    dark: "bg-mc-ink text-white hover:bg-mc-brown shadow-soft",
    orange: "bg-mc-orange text-white hover:bg-mc-orange-dark shadow-orange",
    light: "bg-white text-mc-ink hover:bg-mc-cream shadow-soft",
    outline: "border border-mc-muted bg-white/70 text-mc-ink hover:border-mc-orange hover:text-mc-orange",
  }[tone];

  return (
    <Link
      href={href}
      transitionTypes={["nav-forward"]}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-mc-orange focus:ring-offset-2",
        toneClass,
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.28em] text-mc-orange">{children}</p>;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={cx("max-w-3xl", centered && "mx-auto text-center")}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-mc-ink sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-mc-ink/64 sm:text-base">{description}</p> : null}
    </div>
  );
}

export function FlowSteps({ current }: { current: number }) {
  return (
    <ol className="mx-auto flex max-w-3xl items-center justify-center gap-1 px-4 sm:gap-2">
      {steps.map((step, index) => {
        const isCurrent = index === current;
        const isPast = index < current;

        return (
          <li key={step.href} className="flex items-center gap-1 sm:gap-2">
            <Link
              href={step.href}
              aria-current={isCurrent ? "step" : undefined}
              className={cx(
                "grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition",
                isCurrent && "bg-mc-orange text-white shadow-orange",
                isPast && "bg-mc-ink text-white",
                !isCurrent && !isPast && "bg-mc-muted text-mc-ink/45",
              )}
            >
              {index + 1}
            </Link>
            {index < steps.length - 1 ? <span className="h-px w-4 bg-mc-muted sm:w-8" /> : null}
          </li>
        );
      })}
    </ol>
  );
}

export function RatingBanner() {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white">
      <span className="font-bold">Excellent 4.9 out of 5</span>
      <span className="relative h-5 w-16">
        <Image src={figma.trustpilot} alt="Trustpilot" fill sizes="64px" className="object-contain" />
      </span>
    </div>
  );
}

export function HeroCategoryStack() {
  const visible = categories.slice(0, 5);

  return (
    <div className="relative min-h-[430px] lg:min-h-[610px]">
      {visible.map((category, index) => (
        <FloatingCategoryCard key={category.title} category={category} index={index} />
      ))}
      <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 lg:block">
        <ButtonLink href="/checkout" tone="orange" className="px-6 py-2.5 text-xs">
          Authenticate Now
        </ButtonLink>
      </div>
    </div>
  );
}

function FloatingCategoryCard({ category, index }: { category: Category; index: number }) {
  const positions = [
    "left-[3%] top-[18%] w-[43%] z-20 lg:left-[0%] lg:top-[25%] lg:w-[32%]",
    "left-[35%] top-[26%] w-[34%] z-10 lg:left-[27%] lg:top-[25%] lg:w-[25%]",
    "right-[3%] top-[17%] w-[34%] z-0 lg:left-[48%] lg:right-auto lg:top-[25%] lg:w-[25%]",
    "right-[13%] bottom-[3%] w-[31%] z-0 hidden sm:block lg:left-[67%] lg:right-auto lg:bottom-auto lg:top-[25%] lg:w-[23%]",
    "right-[-4%] bottom-[12%] w-[28%] z-0 hidden lg:block lg:left-[84%] lg:right-auto lg:bottom-auto lg:top-[25%] lg:w-[22%]",
  ];

  return (
    <Link href="/checkout" transitionTypes={["nav-forward"]} className={cx("absolute block rounded-[1.6rem] bg-white p-3 text-mc-ink shadow-figma-deep transition hover:-translate-y-1", positions[index])}>
      {index === 0 ? <p className="text-xs font-bold text-mc-orange">40+ Brand Authenticate</p> : null}
      <div className="relative mt-1 aspect-square overflow-hidden rounded-[1.1rem] bg-figma-panel">
        <Image src={category.image} alt={category.alt} fill sizes="(min-width: 1024px) 22vw, 48vw" className="object-contain p-3" priority={index === 0} />
      </div>
      <p className="font-category text-center text-base font-bold leading-normal sm:text-lg">{category.title}</p>
    </Link>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href="/checkout" transitionTypes={["nav-forward"]} className="group relative overflow-hidden rounded-[1.4rem] bg-white p-4 shadow-card transition hover:-translate-y-1">
      <div className="relative aspect-square rounded-[1.1rem] bg-figma-panel">
        <Image src={category.image} alt={category.alt} fill sizes="(min-width: 1024px) 18vw, 42vw" className="object-contain p-5 transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-mc-ink">{category.title}</h3>
        <span className="rounded-full bg-mc-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">Authenticate</span>
      </div>
    </Link>
  );
}

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.title} category={category} />
      ))}
    </div>
  );
}

export function HowItWorks() {
  const stepsData = [
    { num: "1", title: "Upload clear photos of your item", image: "/figma/step-bag.png" },
    { num: "2", title: "Our experts verify it", image: "/figma/step-expert.png" },
    { num: "3", title: "Get your certificate starting at 40 mins", image: "/figma/step-certificate.png" },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          <div className="rounded-[1.6rem] bg-figma-card p-6 shadow-card">
            <p className="font-display text-7xl text-mc-orange">3</p>
            <SectionEyebrow>Simple Steps</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-mc-ink">How We Authenticate Your Items</h2>
            <ButtonLink href="/checkout" tone="dark" className="mt-6 px-5 py-2.5 text-xs">
              Authenticate Now
            </ButtonLink>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {stepsData.map((step) => (
              <article key={step.num} className="relative rounded-[1.4rem] bg-white p-4 shadow-card">
                <span className="absolute -top-5 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-mc-orange text-sm font-bold text-white shadow-orange">
                  {step.num}
                </span>
                <h3 className="min-h-12 pt-5 text-center text-sm font-bold">{step.title}</h3>
                <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-[1rem] bg-figma-panel">
                  <Image src={step.image} alt="" fill sizes="(min-width: 1024px) 20vw, 82vw" className="object-cover" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function RateCard({ rate }: { rate: Rate }) {
  return (
    <article className={cx("relative overflow-hidden rounded-[1.5rem] bg-figma-rate p-4 text-white shadow-card", rate.featured && "ring-2 ring-mc-orange ring-offset-2 ring-offset-white")}>
      <div className="relative h-52 overflow-hidden rounded-[1.2rem] bg-gradient-to-b from-mc-muted to-mc-brown">
        {rate.images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt=""
            width={220}
            height={220}
            className={cx(
              "absolute object-contain",
              index === 0 && "bottom-0 left-0 h-40 w-40",
              index === 1 && "bottom-0 right-0 h-36 w-36",
              index === 2 && "bottom-2 left-1/2 h-24 w-28 -translate-x-1/2",
            )}
          />
        ))}
      </div>
      <p className="mt-5 font-display text-2xl">{rate.name}</p>
      <p className="mt-1 text-sm font-bold text-mc-orange">Start from</p>
      <p className="mt-1 text-4xl font-bold">{rate.price}</p>
      <p className="mt-2 min-h-10 text-xs leading-5 text-white/68">{rate.time}</p>
      <ButtonLink href="/checkout" tone="orange" className="mt-5 w-full py-2 text-xs">
        Authenticate Now
      </ButtonLink>
    </article>
  );
}

export function RatesPreview() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow>Unlock our Rates</SectionEyebrow>
            <h2 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-mc-ink sm:text-5xl">
              Double-verified by Two Experts for 99% accuracy at an affordable price
            </h2>
          </div>
          <ButtonLink href="/checkout" tone="orange">Search Your Brand</ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {rates.map((rate) => (
            <RateCard key={rate.name} rate={rate} />
          ))}
          <article className="grid min-h-96 place-items-center rounded-[1.5rem] bg-mc-brown p-6 text-center text-white shadow-card">
            <div>
              <p className="text-5xl font-bold text-mc-orange">100+</p>
              <p className="mt-4 font-display text-3xl leading-tight">Discover Our Supported Brands</p>
              <ButtonLink href="/checkout" tone="orange" className="mt-6 py-2 text-xs">
                Click to find out
              </ButtonLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="bg-why px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="relative flex flex-col gap-4 lg:h-[166px] lg:block">
          <div className="flex min-w-0 items-center gap-3 lg:block">
            <span className="relative grid h-[58px] w-[58px] shrink-0 place-items-center bg-white lg:absolute lg:left-[-31px] lg:top-0 lg:h-[163px] lg:w-[163px]">
              <Image src={figma.mark} alt="" fill sizes="(min-width: 1024px) 163px, 58px" className="object-contain p-2 lg:p-5" />
            </span>
            <h2 className="max-w-[300px] text-[27px] font-semibold leading-[0.95] tracking-[-0.01em] text-black sm:max-w-[360px] sm:text-[32px] lg:absolute lg:left-[119px] lg:top-[54px] lg:max-w-[439px] lg:text-[36px]">
              Why <span className="text-mc-orange">MODACERT</span> is Your <span className="text-mc-orange">Best Option</span>
            </h2>
          </div>
          <div className="hidden h-px bg-mc-brown lg:absolute lg:left-[500px] lg:top-[92px] lg:block lg:w-[460px]" />
          <ButtonLink href="/checkout" tone="dark" className="h-10 shrink-0 px-6 py-0 text-[11px] lg:absolute lg:left-[980px] lg:top-[59px] lg:h-[63px] lg:w-[249px] lg:px-0 lg:text-base">
            Authenticate Now
          </ButtonLink>
        </div>

        <div className="mt-4 grid gap-2.5 lg:mt-0 lg:grid-cols-[441px_441px_373px] lg:grid-rows-[234px_234px] lg:gap-x-[12px] lg:gap-y-[17px]">
          <article className="relative min-h-[152px] overflow-hidden rounded-[0.45rem] bg-why-global-card p-6 text-black lg:h-[234px] lg:p-[37px]">
            <div className="relative z-10 max-w-[58%]">
              <h3 className="text-xl font-bold leading-tight lg:text-[32px]">Global Service</h3>
              <p className="mt-4 text-xs leading-5 text-white lg:mt-[18px] lg:text-base lg:leading-[1.55] lg:text-white">Our team can verify your items no matter where you are.</p>
            </div>
            <Image src={figma.whyGlobal} alt="" width={151} height={211} className="absolute -right-1 bottom-3 h-[211px] w-[151px] object-contain lg:right-0 lg:top-[11px]" />
          </article>

          <article className="min-h-[152px] overflow-hidden rounded-[0.45rem] bg-why-pricing-card p-6 text-white lg:h-[234px] lg:p-[35px]">
            <h3 className="text-xl font-bold leading-tight text-mc-ink lg:text-[32px]">Affordable Pricing</h3>
            <p className="mt-4 max-w-[270px] text-xs leading-5 text-white lg:mt-[18px] lg:max-w-[350px] lg:text-base lg:leading-[1.55]">Designed for collectors and resellers, we make legit checks accessible.</p>
          </article>

          <article className="relative min-h-[312px] overflow-hidden rounded-[0.45rem] bg-why-payment-card p-6 text-white lg:row-span-2 lg:h-[485px] lg:p-[16px]">
            <div className="relative z-10">
              <h3 className="text-xl font-bold leading-tight lg:text-[32px]">Flexible Payments</h3>
              <p className="mt-4 max-w-[230px] text-xs leading-5 text-white/90 lg:mt-[14px] lg:max-w-[318px] lg:text-base lg:leading-[1.55]">We support various payment methods to make your checkout simple and secure.</p>
            </div>
            <Image src={figma.whyPayment} alt="" width={340} height={328} className="absolute -bottom-7 right-[-22px] h-[328px] w-[340px] object-contain" />
          </article>

          <article className="relative min-h-[152px] overflow-hidden rounded-[0.45rem] bg-why-expert-card p-6 text-white lg:col-span-2 lg:h-[234px] lg:p-[37px]">
            <div className="relative z-10 max-w-[54%] lg:max-w-[536px]">
              <h3 className="text-xl font-bold leading-tight lg:text-[32px]">Expert Review</h3>
              <p className="mt-4 text-xs leading-5 text-white lg:mt-[18px] lg:text-base lg:leading-[1.55]">Verified by real people who know the brands inside and out, combined with second expert for extra precision and 99% accuracy.</p>
            </div>
            <Image src={figma.whyExpertPeople} alt="" width={538} height={316} className="absolute bottom-[-86px] right-0 hidden h-[316px] w-[538px] object-contain sm:block" />
          </article>
        </div>
      </div>
    </section>
  );
}

export function BrandSearchSection() {
  return (
    <section className="bg-figma-search px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <h2 className="max-w-lg text-4xl font-semibold leading-tight">
          We support your authenticated more than <span className="text-mc-orange">100 brand</span>
        </h2>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-mc-orange">Choose your Categories</p>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-3 hide-scrollbar">
            {categories.slice(0, 7).map((category) => (
              <Link key={category.title} href="/checkout" transitionTypes={["nav-forward"]} className="grid min-w-24 place-items-center rounded-full bg-mc-soft p-4 text-mc-ink shadow-soft">
                <div className="relative h-12 w-12">
                  <Image src={category.icon} alt={category.title} fill sizes="48px" className="object-contain" />
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <input type="text" placeholder="Search your brand" className="w-full rounded-full border border-white/20 bg-white px-6 py-4 text-sm text-mc-ink outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/30" />
              <ButtonLink href="/checkout" tone="orange" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 text-xs">
                <ArrowIcon />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[1.6rem] bg-figma-panel p-6 shadow-card lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div className="relative min-h-[330px]">
          <Image src={figma.ctaBag} alt="Luxury bag" fill sizes="(min-width: 1024px) 30vw, 88vw" className="object-contain object-left-bottom" />
          <Image src={figma.ctaWatch} alt="Luxury watch" width={190} height={190} className="absolute right-[18%] top-[4%]" />
          <Image src={figma.ctaShoe} alt="Luxury shoe" width={300} height={220} className="absolute bottom-0 right-[4%]" />
        </div>
        <div className="self-center text-center lg:text-left">
          <h2 className="font-display text-5xl leading-[0.95] text-mc-ink sm:text-6xl">
            Don&apos;t Wait, Get Your <span className="text-mc-orange">Moda</span> Check Now
          </h2>
          <ButtonLink href="/checkout" tone="dark" className="mt-8">
            Start Moda Check
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function ProvenBanner() {
  return (
    <section className="bg-figma-rate px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-display text-3xl font-semibold sm:text-5xl">True Luxury, Truly Verified</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
          We are the industry leader in luxury item verification, providing 99% accuracy through our network of elite global experts.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="rounded-[1.2rem] bg-white/12 p-5 backdrop-blur">
              <p className="text-4xl font-bold text-mc-orange">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/62">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <BrandMark />
            <div className="mt-8 grid gap-7 text-sm text-mc-ink/60 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-bold text-mc-ink">{column.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {column.links.map((link) => (
                      <li key={link} className="transition hover:text-mc-orange">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <h3 className="text-sm font-bold text-mc-ink">Categories</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {footerCategories.map((cat) => (
                  <span key={cat} className="rounded-full border border-mc-muted px-3 py-1 text-xs font-semibold">{cat}</span>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-bold text-mc-ink">Follow us</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <span key={item.label} className="relative h-7 w-7">
                    <Image src={item.image} alt={item.label} fill sizes="28px" className="object-contain" />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.4rem] bg-mc-brown p-6 text-white shadow-soft">
            <p className="font-display text-3xl">Subscribe</p>
            <p className="mt-3 text-sm leading-6 text-white/72">Subscribe for our newsletter and best promotions</p>
            <form action="/" className="mt-5">
              <label htmlFor="newsletter-email" className="sr-only">Email</label>
              <input id="newsletter-email" name="email" type="email" placeholder="My Email" className="w-full rounded-full border border-white/15 bg-white px-4 py-3 text-sm text-mc-ink outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/45" />
              <button type="submit" className="mt-3 w-full rounded-full bg-mc-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-mc-orange-dark">
                Subscribe
              </button>
            </form>
            <p className="mt-7 font-display text-2xl">Contact us</p>
            <a href="mailto:modacert.support@gmail.com" className="mt-3 inline-flex text-sm text-mc-orange">modacert.support@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-logo text-5xl tracking-[0.18em] sm:text-7xl">MODACERT</p>
        </div>
      </div>
    </footer>
  );
}

export function AppFrame({ children, currentStep }: { children: React.ReactNode; currentStep?: number }) {
  return (
    <main className="min-h-screen bg-mc-cream text-mc-ink">
      <SiteHeader />
      {typeof currentStep === "number" ? (
        <div className="border-b border-black/8 bg-white py-5">
          <FlowSteps current={currentStep} />
        </div>
      ) : null}
      {children}
      <Footer />
      <FloatingChatWidget />
    </main>
  );
}
