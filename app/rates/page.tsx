import { AppFrame, ButtonLink, RateCard, SectionEyebrow } from "../components";
import { rates } from "../data";

export default function RatesPage() {
  return (
    <AppFrame>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[1.6rem] bg-white p-6 shadow-card lg:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <SectionEyebrow>Unlock our Rates</SectionEyebrow>
                <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight text-mc-ink sm:text-5xl">
                  Double-verified by Two Experts for 99% accuracy at an affordable price
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-mc-ink/60">
                  Choose a supported brand or start checkout to search the full list. Most authentications start from $20.
                </p>
              </div>
              <ButtonLink href="/checkout" tone="orange">Search Your Brand</ButtonLink>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-4">
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
        </div>
      </section>
    </AppFrame>
  );
}
