import Image from "next/image";
import { AppFrame, ButtonLink, CategoryGrid, SectionTitle } from "../components";
import { uploadRequirements } from "../data";

export default function AuthenticatePage() {
  return (
    <AppFrame currentStep={2}>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Step 1"
            title="Choose bag category and prepare clear photos."
            description="Handbags are active. Other categories are visible but locked for this release."
          />
          <div className="mt-10">
            <CategoryGrid />
          </div>
          <div className="mt-12 rounded-[2rem] bg-white p-5 shadow-card sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-mc-orange">Photo guide</p>
                <h2 className="mt-3 text-3xl font-semibold">Upload-ready bag angles</h2>
                <p className="mt-4 text-sm leading-7 text-mc-ink/62">
                  Use these examples to prepare a clean set of images before the static payment and upload screens.
                </p>
                <ButtonLink href="/payment" tone="orange" className="mt-6">Continue to payment</ButtonLink>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {uploadRequirements.slice(0, 6).map((item) => (
                  <article key={item.title} className="rounded-[1.25rem] bg-mc-cream p-3">
                    <div className="relative aspect-square overflow-hidden rounded-[1rem] bg-product">
                      <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 14vw, 42vw" className="object-cover" />
                    </div>
                    <h3 className="mt-3 text-sm font-bold">{item.title}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppFrame>
  );
}
