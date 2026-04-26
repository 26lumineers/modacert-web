import Link from "next/link";
import { AppFrame, SectionTitle } from "../components";
import { brands } from "../data";

export default function BrandsPage() {
  return (
    <AppFrame currentStep={1}>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            eyebrow="Choose your brand"
            title="Let us know your handbag brand."
            description="All brand choices continue to the bag photo step. Non-bag categories remain disabled elsewhere in the flow."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand) => (
              <Link
                key={brand}
                href="/authenticate"
                className="rounded-[1rem] bg-gradient-to-b from-[#ffae42] to-mc-orange px-4 py-4 text-center text-sm font-bold text-white shadow-orange transition hover:-translate-y-0.5 hover:from-[#ffbe62] hover:to-mc-orange-dark"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </AppFrame>
  );
}
