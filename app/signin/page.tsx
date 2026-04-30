import { AppFrame, BrandMark, ButtonLink } from "../components";

export default function SignInPage() {
  return (
    <AppFrame>
      <section className="flex min-h-[80vh] items-center justify-center px-4 py-14 sm:px-6">
        <div className="w-full max-w-md">
          <div className="rounded-[1.6rem] bg-white p-8 shadow-card">
            <div className="mb-6 text-center">
              <BrandMark />
              <h1 className="mt-4 text-2xl font-semibold">Sign In</h1>
              <p className="mt-2 text-sm text-mc-ink/60">Access your authentication dashboard</p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-mc-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="My Email"
                  className="mt-1 w-full rounded-full border border-mc-muted px-4 py-3 text-sm text-mc-ink outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/30"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-mc-ink">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full rounded-full border border-mc-muted px-4 py-3 text-sm text-mc-ink outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/30"
                />
              </div>
              <ButtonLink href="/authenticate" tone="orange" className="w-full justify-center">
                Sign In
              </ButtonLink>
            </div>
            <p className="mt-6 text-center text-sm text-mc-ink/60">
              Don&apos;t have an account?{" "}
              <span className="cursor-pointer font-bold text-mc-orange">Create one</span>
            </p>
          </div>
        </div>
      </section>
    </AppFrame>
  );
}