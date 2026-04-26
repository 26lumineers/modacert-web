import { AppFrame, RateCard, SectionTitle } from "../components";
import { rates } from "../data";

export default function RatesPage() {
  return (
    <AppFrame currentStep={0}>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Unlock our rates"
            title="Select a bag authentication rate."
            description="The current launch flow only accepts handbags. Other luxury categories stay disabled until their review process is ready."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {rates.map((rate) => (
              <RateCard key={rate.name} rate={rate} />
            ))}
          </div>
        </div>
      </section>
    </AppFrame>
  );
}
