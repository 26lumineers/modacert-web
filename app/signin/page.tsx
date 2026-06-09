"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { login } from "../_lib/api";
import { saveAuth, getStoredEmail, isRemembered } from "../_lib/auth";
import { AuthDivider, AuthField, AuthHeading, AuthPrimaryButton, AuthShell, GoogleButton } from "../auth-ui";

function messageFromError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "Authentication service is not available.";
    if (error.response.status === 401) return "Invalid email or password.";
    const data = error.response.data;
    const msg = data?.error?.message || data?.message || data?.error || error.message;
    return typeof msg === "string" ? msg : JSON.stringify(msg);
  }
  return error instanceof Error ? error.message : "Sign in failed.";
}

export default function SignInPage() {
  const router = useRouter();
  const registered = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("registered");
  const [email, setEmail] = useState(() => getStoredEmail() ?? "");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(() => isRemembered());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await login(email, password);
      saveAuth(response.accessToken, response.user, remember);
      router.push("/checkout", { transitionTypes: ["nav-forward"] });
    } catch (err) {
      setError(messageFromError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell switchHref="/signup" switchLabel="Sign up">
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-[416px]">
        <AuthHeading title="Sign in" description="Please enter your details to sign in" />
        {registered ? (
          <p className="mt-4 rounded-[0.8rem] bg-mc-orange/10 px-4 py-2 text-sm font-semibold text-mc-orange-dark">
            Account created. Sign in to continue.
          </p>
        ) : null}
        <AuthField id="signin-email" label="Your Email Address" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <AuthField id="signin-password" label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" reveal />
        <div className="mt-3 flex items-center justify-between font-auth text-xs">
          <label className="inline-flex items-center gap-2 text-mc-form-muted">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="h-3.5 w-3.5 rounded border-mc-line accent-mc-orange" />
            Remember me
          </label>
          <Link href="/signin" className="text-black underline underline-offset-2">
            Forget Password?
          </Link>
        </div>
        {error ? <p className="mt-4 rounded-[0.8rem] bg-mc-orange/10 px-4 py-2 text-sm font-semibold text-mc-orange-dark">{error}</p> : null}
        <AuthPrimaryButton loading={loading}>{loading ? "Signing in" : "Sign in"}</AuthPrimaryButton>
        <p className="mt-4 text-center font-auth text-xs text-mc-orange-dark">
          Don&apos;t have an account?{" "}
          <Link href="/signup" transitionTypes={["nav-forward"]} className="text-mc-ink">
            Sign up
          </Link>
        </p>
        <AuthDivider />
        <GoogleButton />
      </form>
    </AuthShell>
  );
}
