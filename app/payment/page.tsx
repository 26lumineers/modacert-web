import Image from "next/image";
import { AppFrame, ButtonLink, SectionTitle } from "../components";

const qrCells = new Set([0, 1, 2, 6, 7, 8, 9, 18, 20, 24, 26, 27, 28, 29, 33, 35, 36, 39, 41, 44, 47, 50, 53, 54, 55, 56, 60, 62, 63, 65, 68, 72, 73, 74, 78, 79, 80]);

export default function PaymentPage() {
  return (
    <AppFrame currentStep={3}>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Step 2"
            title="Complete your payment"
            description="Scan the QR Code to use NFC Microchip scanner or choose your payment method"
          />
          <div className="mt-10 overflow-hidden rounded-[2rem] bg-rate p-5 shadow-card sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-[1.6rem] bg-black p-5 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.18em] text-mc-orange">Louis Vuitton &middot; Handbags Authenticate</p>
                <div className="relative mt-5 aspect-square rounded-[1.2rem] bg-[#1f120b]">
                  <Image src="/landing/category-handbag.png" alt="Selected handbag example" fill sizes="(min-width: 1024px) 28vw, 80vw" className="object-contain p-8" />
                </div>
                <p className="mt-5 text-sm leading-6 text-white/68">Priority Check selected. Double-verified by Two Experts for 99% accuracy.</p>
              </div>
              <div className="rounded-[1.6rem] bg-mc-soft p-5 sm:p-7">
                <div className="mx-auto max-w-[260px] rounded-[1.1rem] bg-white p-5 shadow-soft">
                  <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-mc-ink/50">Scan to pay</p>
                  <div className="mt-3 qr-grid aspect-square">
                    {Array.from({ length: 81 }).map((_, index) => (
                      <span key={index} className={qrCells.has(index) ? "rounded-sm bg-black" : "rounded-sm bg-mc-muted"} />
                    ))}
                  </div>
                </div>
                <div className="mt-6 rounded-[1.25rem] bg-gradient-to-r from-mc-orange to-[#ffb15f] p-5 text-center text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.16em]">Double-verified</p>
                  <p className="mt-2 text-3xl font-bold">$29.9</p>
                  <p className="mt-1 text-xs text-white/80">9+ payment methods available</p>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-mc-ink/50">Other payment methods available</p>
                </div>
                <ButtonLink href="/upload" tone="dark" className="mt-6 w-full">I have paid</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppFrame>
  );
}