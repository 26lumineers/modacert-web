import { AppFrame, RateCard, SectionTitle } from "../components";
import { rates } from "../data";

export default function RatesPage() {
  return (
    <AppFrame currentStep={0}>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Unlock our rates"
            title="Simple, Transparent Pricing"
            description="Double-verified by Two Experts for 99% accuracy at an affordable price"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {rates.map((rate) => (
              <RateCard key={rate.name} rate={rate} />
            ))}
          </div>
          <div className="mt-9 text-center">
            <p className="mt-4 text-sm text-mc-ink/60">
              Starting from $20 per authentication
            </p>
          </div>
        </div>
      </section>
    </AppFrame>
  );
}