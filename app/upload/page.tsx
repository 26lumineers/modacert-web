import Image from "next/image";
import { AppFrame, ButtonLink, SectionTitle } from "../components";
import { nonNfcPhotoSlots } from "../data";

export default function UploadPage() {
  return (
    <AppFrame currentStep={4}>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Step 2"
            title="Upload the photos of your item one by one"
            description="Drag and drop your file or browse to select"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nonNfcPhotoSlots.map((item) => (
              <article key={item.key} className="rounded-[1.5rem] bg-white p-4 shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-product">
                  <Image src={item.image} alt={item.label} fill sizes="(min-width: 1024px) 28vw, 86vw" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                    Photo example
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold">{item.label}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-mc-ink/60">{item.description}</p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full border border-mc-orange bg-mc-orange/10 px-4 py-3 text-sm font-bold text-mc-orange"
                >
                  Select image
                </button>
              </article>
            ))}
            <article className="grid min-h-[280px] place-items-center rounded-[1.5rem] border-2 border-dashed border-mc-orange/42 bg-white/68 p-6 text-center">
              <div>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mc-orange text-4xl leading-none text-white">+</span>
                <h2 className="mt-4 text-lg font-bold">Additional photos</h2>
                <p className="mt-2 text-sm leading-6 text-mc-ink/58">Optional extra angle for unusual marks, repairs, or serial details.</p>
              </div>
            </article>
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/" tone="orange">Submit</ButtonLink>
          </div>
        </div>
      </section>
    </AppFrame>
  );
}