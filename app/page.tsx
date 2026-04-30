import Image from "next/image";
import {
  AppFrame,
  ButtonLink,
  CategoryGrid,
  CTABanner,
  HowItWorks,
  NFCSection,
  ProvenBanner,
  RatingBanner,
  TrustBar,
  WhySection,
  BrandSearchSection,
} from "./components";
import { rates } from "./data";

export default function Home() {
  return (
    <AppFrame>
      {/* Hero */}
      <section className="overflow-hidden bg-hero px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/82">
              Authenticated by 100+ world-class specialists
            </p>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Check Your Brandname Bag &amp; Luxury Accessory
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/74 sm:text-base">
              Double-verified by Two Experts for 99% accuracy at an affordable price. Unlock our rates and get your authentication certificate.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
              <div className="rounded-[1.4rem] bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-bold text-mc-orange sm:text-4xl">100,000+</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/62">Happy Customers</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-bold text-mc-orange sm:text-4xl">500,000+</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/62">Items Authenticated</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-bold text-mc-orange sm:text-4xl">40+</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/62">Brand</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/authenticate" tone="orange">Check The Price</ButtonLink>
              <ButtonLink href="/brands" tone="light">Choose your Brand</ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[430px] lg:min-h-[620px]">
            <div className="absolute inset-x-8 bottom-8 h-72 rounded-[2.4rem] bg-white/12 blur-3xl" />
            <div className="absolute left-[8%] top-[3%] aspect-square w-[54%] -rotate-6 rounded-[2rem] bg-white p-4 shadow-2xl">
              <Image src="/landing/hero-bag.png" alt="Luxury bag authentication" fill priority sizes="(min-width: 1024px) 32vw, 82vw" className="object-contain p-8" />
            </div>
            <div className="absolute right-0 top-[28%] w-[52%] rounded-[1.6rem] bg-white p-4 shadow-2xl">
              <div className="relative aspect-[4/5]">
                <Image src="/landing/step-1.png" alt="Authentication step example" fill sizes="(min-width: 1024px) 24vw, 64vw" className="rounded-[1rem] object-cover" />
              </div>
              <ButtonLink href="/rates" tone="orange" className="mt-4 w-full py-2 text-xs">Unlock Our Rates</ButtonLink>
            </div>
            <div className="absolute bottom-0 left-[12%] rounded-[1.4rem] bg-black p-4 text-white shadow-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-white/54">Starting at</p>
              <p className="mt-1 text-2xl font-bold">$19.9</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* Rating */}
      <RatingBanner />

      {/* Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-mc-orange">Choose your category</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-mc-ink sm:text-5xl">
              Handbags, Clothing, Sneaker, Accessories &amp; More
            </h2>
          </div>
          <div className="mt-10">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Brand search */}
      <BrandSearchSection />

      {/* How it works */}
      <HowItWorks />

      {/* NFC / Photo upload */}
      <NFCSection />

      {/* Rates */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-mc-orange">Unlock our rates</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-mc-ink sm:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-sm leading-7 text-mc-ink/64 sm:text-base">
              Double-verified by Two Experts for 99% accuracy at an affordable price
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {rates.map((rate) => (
              <article key={rate.name} className="overflow-hidden rounded-[1.8rem] border bg-white p-4 shadow-card">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-rate">
                  <Image src={rate.image} alt="" fill sizes="(min-width: 1024px) 24vw, 86vw" className="object-contain p-6" />
                  <div className="absolute inset-x-4 bottom-4 rounded-[1.1rem] bg-black/74 p-4 text-white backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/62">{rate.name}</p>
                    <p className="mt-1 text-4xl font-bold">{rate.price}</p>
                    <p className="mt-1 text-xs text-white/68">{rate.time}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-9 text-center">
            <ButtonLink href="/rates" tone="orange">Authenticate Now</ButtonLink>
          </div>
        </div>
      </section>

      {/* Why MODACERT */}
      <WhySection />

      {/* Proven banner */}
      <ProvenBanner />

      {/* CTA */}
      <CTABanner />
    </AppFrame>
  );
}