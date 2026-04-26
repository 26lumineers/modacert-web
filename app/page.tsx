import Image from "next/image";
import { AppFrame, ButtonLink, CategoryGrid, SectionTitle } from "./components";
import { rates, uploadRequirements } from "./data";

export default function Home() {
  return (
    <AppFrame>
      <section className="overflow-hidden bg-hero px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white/82">
              Bag authentication only
            </p>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Check Your Brandname Bag &amp; Luxury Accessory
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/74 sm:text-base">
              Upload clear bag photos, select your brand, and receive a static certificate-ready review path designed for ModaCert&apos;s bag launch.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-2 gap-4">
              <div className="rounded-[1.4rem] bg-white/10 p-5 backdrop-blur">
                <p className="text-4xl font-bold text-mc-orange">100k+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/62">Happy customers</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/10 p-5 backdrop-blur">
                <p className="text-4xl font-bold text-mc-orange">500k+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/62">Items checked</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/rates" tone="orange">Start bag check</ButtonLink>
              <ButtonLink href="/brands" tone="light">Choose brand</ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[430px] lg:min-h-[620px]">
            <div className="absolute inset-x-8 bottom-8 h-72 rounded-[2.4rem] bg-white/12 blur-3xl" />
            <div className="absolute left-[8%] top-[3%] aspect-square w-[54%] -rotate-6 rounded-[2rem] bg-white p-4 shadow-2xl">
              <Image src="/landing/hero-bag.png" alt="ModaCert bag authentication example" fill priority sizes="(min-width: 1024px) 32vw, 82vw" className="object-contain p-8" />
            </div>
            <div className="absolute right-0 top-[28%] w-[52%] rounded-[1.6rem] bg-white p-4 shadow-2xl">
              <div className="relative aspect-[4/5]">
                <Image src="/landing/step-1.png" alt="Clear bag photo upload example" fill sizes="(min-width: 1024px) 24vw, 64vw" className="rounded-[1rem] object-cover" />
              </div>
              <ButtonLink href="/rates" tone="orange" className="mt-4 w-full py-2 text-xs">Unlock rates</ButtonLink>
            </div>
            <div className="absolute bottom-0 left-[12%] rounded-[1.4rem] bg-black p-4 text-white shadow-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-white/54">Current launch</p>
              <p className="mt-1 text-2xl font-bold">Bags only</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="3 simple steps"
            title="Choose a bag rate, upload clear photos, receive a focused review path."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {uploadRequirements.slice(0, 3).map((item, index) => (
              <article key={item.title} className="rounded-[1.6rem] bg-white p-4 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-mc-orange text-lg font-bold text-white">{index + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mc-ink/60">{item.description}</p>
                <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-product">
                  <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 28vw, 88vw" className="object-cover" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Unlock our rates"
            title="Bag authentication packages for launch."
            description="Other categories are visible for product direction, but only handbag authentication can continue through this flow."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {rates.map((rate) => (
              <article key={rate.name} className="rounded-[1.6rem] bg-mc-cream p-5 shadow-card">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-mc-orange">{rate.name}</p>
                <p className="mt-4 text-5xl font-bold">{rate.price}</p>
                <p className="mt-2 text-sm text-mc-ink/58">{rate.time}</p>
              </article>
            ))}
          </div>
          <div className="mt-9 text-center">
            <ButtonLink href="/rates" tone="orange">Unlock rates</ButtonLink>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Choose your category"
            title="Handbags are active. Other categories are coming soon."
          />
          <div className="mt-10">
            <CategoryGrid />
          </div>
        </div>
      </section>
    </AppFrame>
  );
}
