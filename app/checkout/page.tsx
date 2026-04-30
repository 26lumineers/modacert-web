"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  login,
  fetchBrands,
  requestPresignUrls,
  uploadToPresignedUrl,
  confirmUpload,
  createPayPalOrder,
  capturePayPalOrder,
  setAuthToken,
  type Brand,
} from "../_lib/api";
import { getStoredToken, getStoredUser, saveAuth, clearAuth, type AuthUser } from "../_lib/auth";

const PHOTO_FIELDS = [
  { key: "front", label: "Front view", desc: "Full item visible, clear lighting" },
  { key: "back", label: "Back view", desc: "Back stitching and structure" },
  { key: "interior", label: "Inside label", desc: "Interior label and tags" },
  { key: "logo", label: "Brand Logo", desc: "Logo stamp or embossing" },
  { key: "left", label: "Left side", desc: "Left side angle" },
  { key: "right", label: "Right side", desc: "Right side angle" },
  { key: "top", label: "Top view", desc: "Top of the item" },
  { key: "bottom", label: "Bottom view", desc: "Bottom sole/base" },
  { key: "label_tag", label: "Made in label", desc: "Country and factory code" },
  { key: "serial_number", label: "Serial number", desc: "Date code or serial clearly shown" },
] as const;

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

type Step = "auth" | "brand" | "upload" | "payment" | "done" | "error";
type ServiceError = "auth-service" | "brand-service" | "upload-service" | "payment-service" | null;

export default function CheckoutPage() {
  const hydrated = useHydrated();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [step, setStep] = useState<Step>("auth");

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const [photos, setPhotos] = useState<Record<string, File | null>>({});
  const [requestId, setRequestId] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [serviceError, setServiceError] = useState<ServiceError>(null);
  const [loading, setLoading] = useState(false);
  const [brandsLoading, setBrandsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  useEffect(() => {
    const t = getStoredToken();
    const u = getStoredUser();
    if (t && u) {
      setToken(t);
      setUser(u);
      setAuthToken(t);
      setStep("brand");
    }
  }, []);

  useEffect(() => {
    if (step !== "brand") return;
    if (brands.length > 0) return;
    setBrandsLoading(true);
    setServiceError(null);
    fetchBrands()
      .then((data) => {
        setBrands(data);
        setBrandsLoading(false);
      })
      .catch(() => {
        setServiceError("brand-service");
        setBrandsLoading(false);
      });
  }, [step, brands.length]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    setServiceError(null);
    try {
      const res = await login(email, password);
      setToken(res.accessToken);
      setUser(res.user);
      saveAuth(res.accessToken, res.user);
      setStep("brand");
    } catch (err) {
      setServiceError("auth-service");
      setLoginErr(err instanceof Error ? err.message : "Login failed. The authentication service may be unavailable.");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    clearAuth();
    setAuthToken(null);
    setStep("auth");
  };

  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrand(brand);
  };

  const canProceedToUpload = !!selectedBrand;

  const handleProceedToUpload = () => {
    if (canProceedToUpload) {
      setStep("upload");
      setError("");
    }
  };

  const handlePhotoChange = (key: string, file: File | null) => {
    setPhotos((prev) => ({ ...prev, [key]: file }));
  };

  const hasRequiredPhotos = () => {
    const required = ["front", "back", "interior", "logo"];
    return required.every((k) => photos[k]);
  };

  const handleUpload = async () => {
    if (!token || !selectedBrand) return;
    setLoading(true);
    setError("");
    setServiceError(null);
    try {
      const photoTypes: string[] = [];
      const contentTypes: Record<string, string> = {};
      for (const { key } of PHOTO_FIELDS) {
        const file = photos[key];
        if (file) {
          photoTypes.push(key);
          contentTypes[key] = file.type || "image/jpeg";
        }
      }

      const presignRes = await requestPresignUrls({
        brand: selectedBrand.name,
        model: selectedBrand.name,
        photoTypes,
        contentTypes,
      });

      await Promise.all(
        presignRes.uploadUrls.map(async ({ photoType, uploadUrl }) => {
          const file = photos[photoType];
          if (!file) return;
          await uploadToPresignedUrl(uploadUrl, file);
        }),
      );

      await confirmUpload(presignRes.requestId);
      setRequestId(presignRes.requestId);
      setStep("payment");
    } catch (err) {
      setServiceError("upload-service");
      setError(err instanceof Error ? err.message : "Upload failed. The upload service may be unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalCreateOrder = useCallback(async () => {
    if (!selectedBrand || !requestId) {
      throw new Error("Missing brand or request ID");
    }
    const res = await createPayPalOrder({
      amount: selectedBrand.price,
      currency: "USD",
      referenceId: requestId,
    });
    return res.orderId;
  }, [selectedBrand, requestId]);

  const handlePayPalApprove = useCallback(
    async (data: { orderID: string }) => {
      if (!requestId) return;
      try {
        await capturePayPalOrder({
          OrderId: data.orderID,
          referenceId: requestId,
        });
        setStep("done");
      } catch (err) {
        setServiceError("payment-service");
        setError(err instanceof Error ? err.message : "Payment capture failed");
      }
    },
    [requestId],
  );

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mc-cream">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-mc-orange border-t-transparent" />
          <p className="mt-4 text-sm text-mc-ink/60">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mc-cream">
      <header className="sticky top-0 z-50 border-b border-black/8 bg-white/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-mc-ink">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-current text-[11px] font-semibold">M</span>
            <span className="font-logo text-xl tracking-[0.2em] sm:text-2xl">MODACERT</span>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-mc-ink/60">{user.email}</span>
            )}
            {token && (
              <button onClick={handleLogout} className="text-sm font-semibold text-mc-orange hover:text-mc-orange-dark">
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

        {/* Service Error Banner */}
        {serviceError && (
          <div className="mb-6 rounded-[1.2rem] border border-red-200 bg-red-50 p-5">
            <h3 className="text-sm font-bold text-red-800">Service Unavailable</h3>
            <p className="mt-1 text-sm text-red-600">
              {serviceError === "auth-service" && "The authentication service is currently unavailable. Please try again later."}
              {serviceError === "brand-service" && "Could not load brands from the server. Please check your connection and try again."}
              {serviceError === "upload-service" && "The upload service is currently unavailable. Your photos could not be submitted."}
              {serviceError === "payment-service" && "The payment service is currently unavailable. Please try again later."}
            </p>
            <button
              onClick={() => {
                setServiceError(null);
                setError("");
                if (serviceError === "brand-service") {
                  setBrands([]);
                }
              }}
              className="mt-3 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Step indicator */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {(["auth", "brand", "upload", "payment", "done"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold transition ${
                step === s ? "bg-mc-orange text-white shadow-orange" :
                (["auth", "brand", "upload", "payment", "done"].indexOf(step) > i) ? "bg-mc-ink text-white" :
                "bg-mc-muted text-mc-ink/45"
              }`}>
                {i + 1}
              </span>
              {i < 4 && <span className="h-px w-5 bg-mc-muted sm:w-10" />}
            </div>
          ))}
        </div>

        {/* Step: Auth */}
        {step === "auth" && (
          <div className="rounded-[1.6rem] bg-white p-8 shadow-card">
            <h2 className="text-2xl font-semibold">Sign In</h2>
            <p className="mt-2 text-sm text-mc-ink/60">Log in to start your authentication</p>
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label htmlFor="co-email" className="block text-sm font-semibold text-mc-ink">Email</label>
                <input
                  id="co-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-full border border-mc-muted px-4 py-3 text-sm outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="co-pass" className="block text-sm font-semibold text-mc-ink">Password</label>
                <input
                  id="co-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-full border border-mc-muted px-4 py-3 text-sm outline-none placeholder:text-mc-ink/38 focus:border-mc-orange focus:ring-2 focus:ring-mc-orange/30"
                  placeholder="Enter your password"
                />
              </div>
              {loginErr && <p className="text-sm text-red-600">{loginErr}</p>}
              <button
                type="submit"
                className="w-full rounded-full bg-mc-orange px-6 py-3 text-sm font-bold text-white shadow-orange transition hover:bg-mc-orange-dark"
              >
                Sign In
              </button>
            </form>
          </div>
        )}

        {/* Step: Brand */}
        {step === "brand" && (
          <div>
            <div className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-mc-orange">Step 2</p>
              <h2 className="mt-2 text-3xl font-semibold">Select Your Brand</h2>
              <p className="mt-2 text-sm text-mc-ink/60">Choose the brand of your item to see the authentication price</p>
            </div>

            {brandsLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-mc-orange border-t-transparent" />
                <span className="ml-3 text-sm text-mc-ink/60">Loading brands...</span>
              </div>
            )}

            {!brandsLoading && brands.length === 0 && !serviceError && (
              <div className="rounded-[1.4rem] border-2 border-dashed border-mc-muted bg-white p-8 text-center">
                <p className="text-sm font-semibold text-mc-ink/60">No brands available</p>
                <p className="mt-1 text-xs text-mc-ink/40">The brand service may be unavailable</p>
                <button
                  onClick={() => { setBrands([]); setServiceError(null); }}
                  className="mt-4 rounded-full bg-mc-orange px-6 py-2 text-sm font-bold text-white shadow-orange transition hover:bg-mc-orange-dark"
                >
                  Retry
                </button>
              </div>
            )}

            {selectedBrand && (
              <div className="mb-6 rounded-[1.4rem] bg-mc-orange/10 p-4 text-center">
                <p className="text-sm text-mc-ink/60">Selected: <span className="font-bold text-mc-ink">{selectedBrand.name}</span></p>
                <p className="text-2xl font-bold text-mc-orange">${selectedBrand.price}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleSelectBrand(brand)}
                  className={`rounded-[1rem] px-4 py-4 text-center text-sm font-bold text-white shadow-orange transition hover:-translate-y-0.5 ${
                    selectedBrand?.id === brand.id
                      ? "ring-2 ring-mc-orange ring-offset-2 bg-gradient-to-b from-[#ffbe62] to-mc-orange-dark"
                      : "bg-gradient-to-b from-[#ffae42] to-mc-orange hover:from-[#ffbe62] hover:to-mc-orange-dark"
                  }`}
                >
                  <div>{brand.name}</div>
                  <div className="mt-1 text-xs font-normal text-white/80">${brand.price}</div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                disabled={!canProceedToUpload}
                onClick={handleProceedToUpload}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mc-orange px-8 py-3 text-sm font-bold text-white shadow-orange transition hover:-translate-y-0.5 hover:bg-mc-orange-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Upload
              </button>
            </div>

            {error && !serviceError && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
          </div>
        )}

        {/* Step: Upload */}
        {step === "upload" && (
          <div>
            <div className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-mc-orange">Step 3</p>
              <h2 className="mt-2 text-3xl font-semibold">Upload Photos</h2>
              <p className="mt-2 text-sm text-mc-ink/60">
                Upload clear photos of your {selectedBrand?.name || "item"}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PHOTO_FIELDS.map(({ key, label, desc }) => (
                <div key={key} className="rounded-[1.2rem] bg-white p-4 shadow-card">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">{label}</p>
                    {["front", "back", "interior", "logo"].includes(key) && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">Required</span>
                    )}
                  </div>
                  <p className="text-xs text-mc-ink/50">{desc}</p>
                  <label className="mt-3 block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange(key, e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <span className="block w-full rounded-full border border-dashed border-mc-orange/40 bg-mc-orange/5 px-4 py-3 text-center text-sm font-semibold text-mc-orange transition hover:bg-mc-orange/10">
                      {photos[key] ? photos[key]!.name.slice(0, 30) : "Select image"}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep("brand")}
                className="rounded-full border border-mc-muted px-6 py-3 text-sm font-semibold text-mc-ink transition hover:bg-mc-cream"
              >
                Back
              </button>
              <button
                onClick={handleUpload}
                disabled={loading || !hasRequiredPhotos()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-mc-orange px-8 py-3 text-sm font-bold text-white shadow-orange transition hover:-translate-y-0.5 hover:bg-mc-orange-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Submit & Continue to Payment"}
              </button>
            </div>
            {error && !serviceError && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
          </div>
        )}

        {/* Step: Payment */}
        {step === "payment" && selectedBrand && (
          <div>
            <div className="mb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-mc-orange">Step 4</p>
              <h2 className="mt-2 text-3xl font-semibold">Complete Payment</h2>
              <p className="mt-2 text-sm text-mc-ink/60">
                {selectedBrand.name} authentication &mdash; <span className="font-bold">${selectedBrand.price}</span>
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-white p-6 shadow-card">
              <div className="rounded-[1.25rem] bg-gradient-to-r from-mc-orange to-[#ffb15f] p-5 text-center text-white">
                <p className="text-sm font-bold uppercase tracking-[0.16em]">Authentication Fee</p>
                <p className="mt-2 text-4xl font-bold">${selectedBrand.price}</p>
                <p className="mt-1 text-xs text-white/80">Request ID: {requestId}</p>
              </div>

              {PAYPAL_CLIENT_ID ? (
                <div className="mt-6">
                  <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" }}>
                    <PayPalButtons
                      style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                      createOrder={handlePayPalCreateOrder}
                      onApprove={handlePayPalApprove}
                      onError={(err) => {
                        setServiceError("payment-service");
                        setError(err instanceof Error ? err.message : "PayPal error");
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <div className="mt-6 rounded-[1rem] border-2 border-dashed border-mc-muted p-6 text-center">
                  <p className="text-sm font-semibold text-mc-ink/60">PayPal integration pending</p>
                  <p className="mt-1 text-xs text-mc-ink/40">Set NEXT_PUBLIC_PAYPAL_CLIENT_ID in .env.local to enable checkout</p>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setStep("upload")}
                className="rounded-full border border-mc-muted px-6 py-3 text-sm font-semibold text-mc-ink transition hover:bg-mc-cream"
              >
                Back to Upload
              </button>
            </div>
            {error && !serviceError && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
          </div>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <div className="rounded-[1.6rem] bg-white p-10 text-center shadow-card">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-3xl text-green-600">&#10003;</div>
            <h2 className="mt-6 text-2xl font-semibold">Payment Complete!</h2>
            <p className="mt-3 text-sm text-mc-ink/60">
              Your authentication request has been submitted and payment confirmed.
              Our experts will review your item and you&apos;ll receive results soon.
            </p>
            <p className="mt-4 text-xs text-mc-ink/40">Request ID: {requestId}</p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-mc-orange px-8 py-3 text-sm font-bold text-white shadow-orange transition hover:-translate-y-0.5 hover:bg-mc-orange-dark"
            >
              Back to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}