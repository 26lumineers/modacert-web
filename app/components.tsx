import Image from "next/image";
import Link from "next/link";
import {
  categories,
  footerCategories,
  footerColumns,
  navItems,
  nfcPhotoSlots,
  nonNfcPhotoSlots,
  steps,
  trustStats,
  whyItems,
  type Category,
  type Rate,
  type WhyItem,
  type PhotoSlot,
} from "./data";

type ButtonTone = "dark" | "orange" | "light";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={cx("inline-flex items-center gap-2", light ? "text-white" : "text-mc-ink")}>
      <span className="grid h-7 w-7 place-items-center rounded-full border border-current text-[11px] font-semibold">
        M
      </span>
      <span className="font-logo text-xl tracking-[0.2em] sm:text-2xl">MODACERT</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.18em] text-mc-ink/62 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-mc-orange">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/authenticate"
          className="inline-flex items-center gap-2 rounded-full bg-mc-orange px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-orange transition hover:-translate-y-0.5 hover:bg-mc-orange-dark"
        >
          Authenticate Now
          <ArrowIcon />
        </Link>
      </div>
    </header>
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
    dark: "bg-black text-white hover:bg-mc-brown shadow-soft",
    orange: "bg-mc-orange text-white hover:bg-mc-orange-dark shadow-orange",
    light: "bg-white text-mc-ink hover:bg-mc-cream shadow-soft",
  }[tone];

  return (
    <Link
      href={href}
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
    <ol className="mx-auto flex max-w-2xl items-center justify-center gap-2 px-4">
      {steps.map((step, index) => {
        const isCurrent = index === current;
        const isPast = index < current;

        return (
          <li key={step.href} className="flex items-center gap-2">
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
            {index < steps.length - 1 ? <span className="h-px w-5 bg-mc-muted sm:w-10" /> : null}
          </li>
        );
      })}
    </ol>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  if (!category.active) {
    return (
      <div
        aria-disabled="true"
        className="group relative overflow-hidden rounded-[1.6rem] border border-mc-muted bg-white/70 p-3 opacity-55 grayscale"
      >
        <CategoryImage category={category} />
        <div className="mt-4 flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-mc-ink">{category.title}</h3>
          <span className="rounded-full bg-mc-muted px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-mc-ink/54">
            Coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <Link
      href="/rates"
      className="group relative overflow-hidden rounded-[1.6rem] border border-mc-orange/20 bg-white p-3 shadow-card transition hover:-translate-y-1"
    >
      <CategoryImage category={category} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-mc-ink">{category.title}</h3>
        <span className="rounded-full bg-mc-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
          Authenticate
        </span>
      </div>
    </Link>
  );
}

function CategoryImage({ category }: { category: Category }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-[1.2rem] bg-product p-5">
      <Image
        src={category.image}
        alt={category.alt}
        fill
        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 32vw, 82vw"
        className="object-contain p-4 transition duration-500 group-hover:scale-105"
      />
    </div>
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

export function RateCard({ rate }: { rate: Rate }) {
  return (
    <article
      className={cx(
        "relative overflow-hidden rounded-[1.8rem] border bg-white p-4 shadow-card",
        rate.featured ? "border-mc-orange" : "border-mc-muted",
      )}
    >
      {rate.featured ? (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-mc-orange px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
          Popular
        </div>
      ) : null}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-rate">
        <Image
          src={rate.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 24vw, 86vw"
          className="object-contain p-6"
        />
        <div className="absolute inset-x-4 bottom-4 rounded-[1.1rem] bg-black/74 p-4 text-white backdrop-blur">
          <p className="text-xs uppercase tracking-[0.16em] text-white/62">{rate.name}</p>
          <p className="mt-1 text-4xl font-bold">{rate.price}</p>
          <p className="mt-1 text-xs text-white/68">{rate.time}</p>
        </div>
      </div>
      <p className="mt-4 min-h-14 text-sm leading-6 text-mc-ink/64">{rate.description}</p>
      <ButtonLink href="/brands" tone={rate.featured ? "orange" : "dark"} className="mt-5 w-full">
        Authenticate Now
      </ButtonLink>
    </article>
  );
}

export function TrustBar() {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 sm:grid-cols-4">
        {trustStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-mc-orange sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mc-ink/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhyCard({ item }: { item: WhyItem }) {
  const iconMap = {
    global: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.558" />
      </svg>
    ),
    affordable: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.634 12 12 12c-.634 0-1.536-.219-2.121-.659C9.303 10.464 9.303 9.03 10.476 8.151c1.171-.879 3.07-.879 4.242 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    payment: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    expert: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  };

  return (
    <article className="rounded-[1.6rem] bg-white p-6 shadow-card">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-mc-orange/10 text-mc-orange">
        {iconMap[item.icon]}
      </span>
      <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-mc-ink/60">{item.description}</p>
    </article>
  );
}

export function WhySection() {
  return (
    <section className="bg-why px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Why MODACERT"
          title="Why MODACERT is Your Best Option"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((item) => (
            <WhyCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProvenBanner() {
  return (
    <section className="bg-hero px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-display text-3xl font-semibold sm:text-5xl">True Luxury, Truly Verified</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
          We are the industry leader in luxury item verification, providing 99% accuracy through our network of elite global experts
        </p>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <div className="rounded-[1.4rem] bg-white/12 p-5 backdrop-blur">
            <p className="text-4xl font-bold text-mc-orange">99%</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/62">Proven Accuracy</p>
          </div>
          <div className="rounded-[1.4rem] bg-white/12 p-5 backdrop-blur">
            <p className="text-4xl font-bold text-mc-orange">100+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/62">Specialists</p>
          </div>
          <div className="rounded-[1.4rem] bg-white/12 p-5 backdrop-blur">
            <p className="text-4xl font-bold text-mc-orange">40+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/62">Brands</p>
          </div>
          <div className="rounded-[1.4rem] bg-white/12 p-5 backdrop-blur">
            <p className="text-4xl font-bold text-mc-orange">4.9</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/62">Excellent Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="bg-cta px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-display text-3xl font-semibold sm:text-5xl">
          Don&apos;t Wait, Get Your Moda Check Now
        </p>
        <p className="mt-4 text-sm leading-7 text-white/74 sm:text-base">
          Double-verified by Two Experts for 99% accuracy at an affordable price
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/authenticate" tone="orange" className="px-8 py-3.5 text-base">
            Start Moda Check
          </ButtonLink>
          <ButtonLink href="/rates" tone="light" className="px-8 py-3.5 text-base">
            Unlock Our Rates
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const stepsData = [
    { num: "1", title: "Upload clear photos of your item", image: "/landing/step-1.png" },
    { num: "2", title: "Our experts verify it", image: "/landing/step-2.png" },
    { num: "3", title: "Get your certificate starting at 40 mins", image: "/landing/step-3.png" },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Simple Steps" title="How We Authenticate Your Items" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stepsData.map((step) => (
            <article key={step.num} className="rounded-[1.6rem] bg-white p-4 shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-product">
                <Image src={step.image} alt="" fill sizes="(min-width: 1024px) 28vw, 88vw" className="object-cover" />
                <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-mc-orange text-sm font-bold text-white">
                  {step.num}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NFCSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="NFC microchip"
          title="Upload the photos of your item"
          description="Choose your authentication path based on your item type"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.6rem] border-2 border-mc-orange bg-white p-6 shadow-card">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-mc-orange px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                1
              </span>
            </div>
            <h3 className="text-xl font-bold">For items with visible NFC chips</h3>
            <p className="mt-2 text-sm leading-6 text-mc-ink/60">
              Scan the QR Code to use NFC Microchip scanner, then upload photos of your item.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {nfcPhotoSlots.map((slot) => (
                <PhotoSlotCard key={slot.key} slot={slot} />
              ))}
            </div>
            <ButtonLink href="/authenticate" tone="orange" className="mt-6 w-full">
              Authenticate Now
            </ButtonLink>
          </div>
          <div className="rounded-[1.6rem] border border-mc-muted bg-white p-6 shadow-card">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-mc-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                2
              </span>
            </div>
            <h3 className="text-xl font-bold">For items without NFC chips</h3>
            <p className="mt-2 text-sm leading-6 text-mc-ink/60">
              My items have no NFC Microchip. Upload the required photos one by one.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {nonNfcPhotoSlots.slice(0, 3).map((slot) => (
                <PhotoSlotCard key={slot.key} slot={slot} />
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {nonNfcPhotoSlots.slice(3).map((slot) => (
                <PhotoSlotCard key={slot.key} slot={slot} />
              ))}
            </div>
            <ButtonLink href="/authenticate" tone="dark" className="mt-6 w-full">
              Authenticate Now
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoSlotCard({ slot }: { slot: PhotoSlot }) {
  return (
    <div className="rounded-[1.1rem] bg-mc-cream p-2">
      <div className="relative aspect-square overflow-hidden rounded-[0.8rem] bg-product">
        <Image src={slot.image} alt={slot.label} fill sizes="(min-width: 1024px) 14vw, 42vw" className="object-cover" />
      </div>
      <p className="mt-2 text-xs font-bold">{slot.label}</p>
    </div>
  );
}

export function BrandSearchSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Search your brand"
          title="Let us know your brand before verify"
        />
        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Specify your brand here"
              className="w-full rounded-full border border-mc-muted bg-white px-6 py-4 text-sm text-mc-ink outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/30"
            />
            <Link
              href="/brands"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-mc-orange px-5 py-2.5 text-sm font-bold text-white shadow-orange transition hover:bg-mc-orange-dark"
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RatingBanner() {
  return (
    <div className="flex items-center justify-center gap-2 py-3 text-sm">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="h-4 w-4 text-mc-orange" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="font-bold">Excellent 4.9 out of 5</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <BrandMark />
            <p className="mt-4 font-display text-2xl font-semibold text-mc-ink">
              True Luxury, Truly Verified
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-mc-ink/60">
              We are the industry leader in luxury item verification, providing 99% accuracy through our network of elite global experts
            </p>
            <div className="mt-8 grid gap-7 text-sm text-mc-ink/60 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-mc-ink">{column.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {column.links.map((link) => (
                      <li key={link} className="transition hover:text-mc-orange">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-mc-ink">Categories</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {footerCategories.map((cat) => (
                  <span key={cat} className="rounded-full border border-mc-muted px-3 py-1 text-xs font-semibold">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-[1.4rem] bg-mc-brown p-5 text-white shadow-soft">
            <p className="font-display text-2xl">Subscribe</p>
            <p className="mt-3 text-sm leading-6 text-white/72">
              Subscribe for our newsletter and best promotions
            </p>
            <form action="/" className="mt-5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="My Email"
                className="w-full rounded-full border border-white/15 bg-white px-4 py-3 text-sm text-mc-ink outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/45"
              />
              <button type="submit" className="mt-3 w-full rounded-full bg-mc-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-mc-orange-dark">
                Subscribe Now
              </button>
            </form>
            <a href="mailto:modacert.support@gmail.com" className="mt-5 inline-flex text-sm text-mc-orange">
              modacert.support@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="bg-black px-4 py-9 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-logo text-3xl tracking-[0.2em] sm:text-5xl">MODACERT</p>
          <p className="text-xs uppercase tracking-[0.18em] text-white/42">True Luxury, Truly Verified</p>
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
    </main>
  );
}