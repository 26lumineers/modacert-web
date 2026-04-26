import Image from "next/image";
import Link from "next/link";
import { categories, footerColumns, navItems, steps, type Category, type Rate } from "./data";

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
          href="/rates"
          className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-mc-brown"
        >
          Start
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
      <ArrowIcon />
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
      <h1 className="mt-3 text-3xl font-semibold leading-tight text-mc-ink sm:text-5xl">{title}</h1>
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
          Active
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
        Authenticate bag
      </ButtonLink>
    </article>
  );
}

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        <div>
          <BrandMark />
          <div className="mt-8 grid gap-7 text-sm text-mc-ink/60 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-mc-ink">{column.title}</h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[1.4rem] bg-mc-brown p-5 text-white shadow-soft">
          <p className="font-display text-2xl">Subscribe</p>
          <p className="mt-3 text-sm leading-6 text-white/72">Launch news, bag resale notes, and authentication updates.</p>
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
            <button type="submit" className="mt-3 w-full rounded-full bg-black px-4 py-3 text-sm font-bold text-white">
              Subscribe
            </button>
          </form>
          <a href="mailto:modacert.support@gmail.com" className="mt-5 inline-flex text-sm text-mc-orange">
            modacert.support@gmail.com
          </a>
        </div>
      </div>
      <div className="bg-black px-4 py-9 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-logo text-3xl tracking-[0.2em] sm:text-5xl">MODACERT</p>
          <p className="text-xs uppercase tracking-[0.18em] text-white/42">Bag authentication only for this launch phase</p>
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
