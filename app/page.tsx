import Image from "next/image";
import {
  AppFrame,
  BrandSearchSection,
  ButtonLink,
  CTABanner,
  HeroCategoryStack,
  HowItWorks,
  RatingBanner,
  RatesPreview,
  WhySection,
} from "./components";
import { figma, trustStats } from "./data";

export default function Home() {
  return (
    <AppFrame>
      <section className="relative -mt-20 overflow-hidden bg-figma-hero px-4 pb-14 pt-28 text-white sm:px-6 lg:px-8 lg:pb-0">
        <Image src={figma.hero} alt="" fill priority sizes="100vw" className="object-cover opacity-70 mix-blend-screen" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="pb-8 pt-10 lg:pb-20">
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.92] sm:text-6xl lg:text-7xl">
              Check Your <span className="font-display">Brandname Bag</span> &amp; <span className="font-display">Luxury Accessory</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/72">
              Authenticated by <span className="font-bold text-mc-orange">100+ world-class specialists</span>
            </p>
            <div className="mt-9 flex flex-wrap gap-6">
              {trustStats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="min-w-36 border-r border-white/18 pr-6 last:border-r-0">
                  <p className="font-display text-5xl leading-none">{stat.value.replace(",", ".").replace("+", "")}</p>
                  <p className="mt-2 text-sm text-white/72">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/checkout" tone="orange">Start Moda Check</ButtonLink>
              <ButtonLink href="/rates" tone="light">Unlock Our Rates</ButtonLink>
            </div>
            <RatingBanner />
          </div>
          <HeroCategoryStack />
        </div>
        <div className="relative h-10 bg-black lg:h-12" />
      </section>

      <HowItWorks />
      <RatesPreview />
      <WhySection />
      <CTABanner />
      <BrandSearchSection />
    </AppFrame>
  );
}
