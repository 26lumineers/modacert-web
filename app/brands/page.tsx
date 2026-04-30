"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppFrame, ButtonLink, SectionTitle } from "../components";
import { brandTiers } from "../data";

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState(brandTiers[0].label);

  const activeTier = brandTiers.find((t) => t.label === activeTab) ?? brandTiers[0];
  const filtered = search
    ? activeTier.brands.filter((b) => b.toLowerCase().includes(search.toLowerCase()))
    : activeTier.brands;

  return (
    <AppFrame currentStep={1}>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            eyebrow="Search your brand"
            title="Let us know your brand before verify"
          />

          {/* Search */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Specify your brand here"
                className="w-full rounded-full border border-mc-muted bg-white px-6 py-3.5 text-sm text-mc-ink outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/30"
              />
              <svg className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mc-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 flex justify-center gap-2">
            {brandTiers.map((tier) => (
              <button
                key={tier.label}
                onClick={() => setActiveTab(tier.label)}
                className={`
                  rounded-full px-5 py-2 text-sm font-bold transition
                  ${activeTab === tier.label
                    ? "bg-mc-orange text-white shadow-orange"
                    : "bg-mc-muted text-mc-ink/62 hover:bg-mc-cream"
                  }
                `}
              >
                {tier.label}
              </button>
            ))}
            <Link
              href="/authenticate"
              className="rounded-full border border-mc-orange bg-mc-orange/10 px-5 py-2 text-sm font-bold text-mc-orange transition hover:bg-mc-orange hover:text-white"
            >
              + Others Brand
            </Link>
          </div>

          {/* Brand grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((brand) => (
              <Link
                key={brand}
                href="/authenticate"
                className="rounded-[1rem] bg-gradient-to-b from-[#ffae42] to-mc-orange px-4 py-4 text-center text-sm font-bold text-white shadow-orange transition hover:-translate-y-0.5 hover:from-[#ffbe62] hover:to-mc-orange-dark"
              >
                {brand}
              </Link>
            ))}
          </div>

          {/* Featured brands with pricing */}
          <div className="mt-14">
            <SectionTitle
              eyebrow="Featured authentication"
              title="Brand-specific authentication"
              description="Select your brand for specialized verification"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["Louis Vuitton", "Chanel", "Hermes"].map((brand) => (
                <div key={brand} className="rounded-[1.6rem] bg-white p-5 shadow-card">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-product">
                    <Image src="/landing/category-handbag.png" alt={brand} fill sizes="28vw" className="object-contain p-4" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 text-white">
                      <p className="font-display text-lg font-bold">{brand}</p>
                      <p className="text-xs text-white/72">Handbags Authenticate</p>
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-bold">$19.9</p>
                  <ButtonLink href="/authenticate" tone="orange" className="mt-3 w-full text-xs">Authenticate Now</ButtonLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppFrame>
  );
}