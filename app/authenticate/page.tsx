import Image from "next/image";
import Link from "next/link";
import { AppFrame, ButtonLink, SectionTitle } from "../components";
import { categories, nfcPhotoSlots, nonNfcPhotoSlots, clothingPhotoSlots } from "../data";

export default function AuthenticatePage() {
  return (
    <AppFrame currentStep={2}>
      {/* Category Selection */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Search your brand"
            title="Choose your category"
            description="Select the item type you want to authenticate"
          />
          <div className="mt-10 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {categories.filter(c => c.active).map((cat) => (
              <Link
                key={cat.title}
                href="#nfc-section"
                className="group relative overflow-hidden rounded-[1.4rem] border border-mc-orange/20 bg-white p-3 shadow-card transition hover:-translate-y-1"
              >
                <div className="relative aspect-square overflow-hidden rounded-[1rem] bg-product p-4">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 42vw"
                    className="object-contain p-3 transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-center text-sm font-bold">{cat.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NFC Flow */}
      <section id="nfc-section" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="NFC microchip"
            title="How would you like to authenticate?"
            description="Choose the authentication path based on your item"
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* NFC Path */}
            <div className="rounded-[1.6rem] border-2 border-mc-orange bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-mc-orange text-sm font-bold text-white">1</span>
                <h3 className="text-xl font-bold">For items with visible NFC chips</h3>
              </div>
              <p className="text-sm leading-6 text-mc-ink/60">
                Scan the QR Code to use NFC Microchip scanner, then upload photos of your item.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {nfcPhotoSlots.map((slot) => (
                  <div key={slot.key} className="rounded-[1.1rem] bg-mc-cream p-2">
                    <div className="relative aspect-square overflow-hidden rounded-[0.8rem] bg-product">
                      <Image src={slot.image} alt={slot.label} fill sizes="(min-width: 1024px) 14vw, 42vw" className="object-cover" />
                    </div>
                    <p className="mt-2 text-xs font-bold">{slot.label}</p>
                    <p className="text-[11px] text-mc-ink/50">{slot.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-mc-ink/50">Photo example for each required angle</p>
              <ButtonLink href="/payment" tone="orange" className="mt-6 w-full">Authenticate Now</ButtonLink>
            </div>

            {/* Non-NFC Path */}
            <div className="rounded-[1.6rem] border border-mc-muted bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-mc-ink text-sm font-bold text-white">2</span>
                <h3 className="text-xl font-bold">For items without NFC chips</h3>
              </div>
              <p className="text-sm leading-6 text-mc-ink/60">
                My items have no NFC Microchip. Upload the required photos one by one.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {nonNfcPhotoSlots.slice(0, 3).map((slot) => (
                  <div key={slot.key} className="rounded-[1.1rem] bg-mc-cream p-2">
                    <div className="relative aspect-square overflow-hidden rounded-[0.8rem] bg-product">
                      <Image src={slot.image} alt={slot.label} fill sizes="(min-width: 1024px) 14vw, 42vw" className="object-cover" />
                    </div>
                    <p className="mt-2 text-xs font-bold">{slot.label}</p>
                    <p className="text-[11px] text-mc-ink/50">{slot.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {nonNfcPhotoSlots.slice(3).map((slot) => (
                  <div key={slot.key} className="rounded-[1.1rem] bg-mc-cream p-2">
                    <div className="relative aspect-square overflow-hidden rounded-[0.8rem] bg-product">
                      <Image src={slot.image} alt={slot.label} fill sizes="(min-width: 1024px) 14vw, 42vw" className="object-cover" />
                    </div>
                    <p className="mt-2 text-xs font-bold">{slot.label}</p>
                    <p className="text-[11px] text-mc-ink/50">{slot.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-mc-ink/50">Photo example for each required angle</p>
              <ButtonLink href="/payment" tone="dark" className="mt-6 w-full">Authenticate Now</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Clothing-specific photo slots */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Clothing authentication"
            title="Louis Vuitton Clothing Authenticate"
            description="Required photo angles for clothing verification"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clothingPhotoSlots.map((slot) => (
              <article key={slot.key} className="rounded-[1.5rem] bg-white p-4 shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-product">
                  <Image src={slot.image} alt={slot.label} fill sizes="(min-width: 1024px) 28vw, 86vw" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-mc-ink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                    Photo example
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold">{slot.label}</h3>
                <p className="mt-1 text-xs text-mc-ink/50">{slot.description}</p>
              </article>
            ))}
            {/* Additional photos */}
            <article className="grid min-h-[280px] place-items-center rounded-[1.5rem] border-2 border-dashed border-mc-orange/42 bg-white/68 p-6 text-center">
              <div>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mc-orange text-4xl leading-none text-white">+</span>
                <h3 className="mt-4 text-lg font-bold">Additional photos</h3>
                <p className="mt-2 text-sm leading-6 text-mc-ink/58">Drag and drop your file or browse</p>
              </div>
            </article>
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/payment" tone="dark">Submit</ButtonLink>
          </div>
        </div>
      </section>
    </AppFrame>
  );
}