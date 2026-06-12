"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { figma } from "./data";
import { FloatingChatWidget, NavBrandLink, NavMenuMark, navCtaClass, navHeaderClass, navMenuClass, navPillClass } from "./components";

export function AuthShell({
  children,
  switchHref,
  switchLabel,
  imageHeight = "min-h-[636px]",
}: {
  children: React.ReactNode;
  switchHref: string;
  switchLabel: string;
  imageHeight?: string;
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-auth-page text-mc-ink">
      <AuthNav />
      <section className="px-4 pb-10 pt-16 sm:px-8 lg:px-20 lg:pt-[126px]">
        <div className="relative mx-auto grid max-w-[1265px] overflow-hidden rounded-[2rem] bg-white p-4 shadow-auth-panel sm:p-6 lg:grid-cols-[508px_1fr] lg:gap-16 lg:rounded-[50px] lg:p-8">
          <AuthImage className={imageHeight} />
          <div className="relative flex min-h-[560px] items-center px-2 py-10 sm:px-6 lg:min-h-[636px] lg:px-0 lg:py-0">
            <AuthGlowLink href={switchHref}>{switchLabel}</AuthGlowLink>
            {children}
          </div>
        </div>
      </section>
      <FloatingChatWidget />
    </main>
  );
}

export function AuthNav() {
  return (
    <header className={navHeaderClass} style={{ viewTransitionName: "site-header" }}>
      <div className={navPillClass}>
        <NavMenuMark />
        <NavBrandLink />
        <nav className={navMenuClass}>
          <Link href="/" transitionTypes={["nav-back"]}>Home</Link>
          <Link href="/checkout" transitionTypes={["nav-forward"]}>Authenticate</Link>
          <Link href="/rates" transitionTypes={["nav-forward"]}>Rates</Link>
          <Link href="/checkout" transitionTypes={["nav-forward"]} className="relative h-5 w-5">
            <Image src={figma.cart} alt="Checkout" fill sizes="20px" className="object-contain" />
          </Link>
          <Link href="/signin" transitionTypes={["nav-forward"]} className={navCtaClass}>
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function AuthImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative hidden overflow-hidden rounded-[1.6rem] bg-mc-muted lg:block lg:rounded-l-[50px] lg:rounded-r-none ${className}`}>
      <Image src={figma.hero} alt="Luxury handbag carried for authentication" fill priority sizes="508px" className="object-cover object-[58%_52%]" />
      <div className="absolute inset-0 bg-white/10" />
    </div>
  );
}

export function AuthMiniBrand() {
  return (
    <div className="inline-flex items-center gap-2 text-black">
      <span className="relative h-[42px] w-[42px]">
        <Image src={figma.mark} alt="" fill sizes="42px" className="object-contain" />
      </span>
      <span className="font-logo text-xl tracking-[0.08em]">MODACERT</span>
    </div>
  );
}

function AuthGlowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      transitionTypes={["nav-forward"]}
      className="absolute right-[-42px] top-[-38px] grid h-40 w-40 place-items-center rounded-full bg-auth-glow pr-7 pt-8 text-center font-auth text-xl text-white underline underline-offset-4 sm:right-[-32px] sm:top-[-48px] sm:h-52 sm:w-52 lg:right-0 lg:top-0 lg:h-[286px] lg:w-[286px] lg:text-2xl"
    >
      {children}
    </Link>
  );
}

export function AuthHeading({ title, description }: { title: string; description: string }) {
  return (
    <>
      <AuthMiniBrand />
      <h1 className="mt-7 font-auth text-6xl leading-[1.02] text-mc-orange sm:text-[64px]">{title}</h1>
      <p className="font-auth text-2xl leading-tight text-mc-ink">{description}</p>
    </>
  );
}

export function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  reveal = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  reveal?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const inputType = reveal && visible ? "text" : type;

  return (
    <label htmlFor={id} className="mt-5 block">
      <span className="block font-auth text-[13px] leading-5 text-mc-form-muted">{label}</span>
      <span className="relative mt-1 block">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
          className="h-[46px] w-full rounded-[20px] bg-white px-5 pr-12 text-sm text-mc-ink shadow-auth-input outline-none ring-1 ring-black/5 focus:ring-2 focus:ring-mc-orange/45"
        />
        {reveal ? (
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((current) => !current)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-black"
          >
            {visible ? "Hide" : "Show"}
          </button>
        ) : null}
      </span>
    </label>
  );
}

export function AuthDivider() {
  return (
    <div className="my-6 flex items-center gap-3 font-auth text-base text-mc-line">
      <span className="h-px flex-1 bg-mc-line" />
      <span>or</span>
      <span className="h-px flex-1 bg-mc-line" />
    </div>
  );
}

export function GoogleButton({
  children = "Sign in With Google",
  className = "",
  loading = false,
  onClick,
}: {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={loading}
      onClick={onClick}
      className={`flex h-[65px] w-full items-center justify-center gap-5 rounded-[10px] bg-white text-xl text-mc-ink shadow-auth-google disabled:opacity-55 ${className}`}
    >
      <Image src={figma.google} alt="" width={40} height={40} sizes="40px" className="object-contain" />
      {loading ? "Connecting to Google" : children}
    </button>
  );
}

export function AuthPrimaryButton({ children, loading }: { children: React.ReactNode; loading?: boolean }) {
  return (
    <button type="submit" disabled={loading} className="mt-5 h-[46px] w-full rounded-[20px] bg-black px-6 font-auth text-2xl text-white shadow-auth-input transition hover:bg-mc-brown disabled:opacity-55">
      {children}
    </button>
  );
}
