const env = (key: string, fallback: string): string =>
  process.env[key] || fallback;

export const config = {
  services: {
    user: env("NEXT_PUBLIC_USER_SERVICE_URL", "http://localhost:3005"),
    payment: env("NEXT_PUBLIC_PAYMENT_SERVICE_URL", "http://localhost:3002"),
  },
  apiPrefix: "/api/v1",
  paypal: {
    clientId: env("NEXT_PUBLIC_PAYPAL_CLIENT_ID", ""),
  },
  paymentMode: env("NEXT_PUBLIC_PAYMENT_MODE", "paypal") as "fake" | "paypal",
  endpoints: {
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      refresh: "/auth/refresh",
      logout: "/auth/logout",
      me: "/auth/me",
      google: "/auth/google",
      googleCallback: "/auth/google/callback",
      googleLogin: "/auth/google/login",
    },
    brands: {
      list: "/brands",
      tiers: "/brands/tiers",
      models: (brandId: string) => `/brands/${brandId}/models`,
    },
    upload: {
      presign: "/upload/presign",
      confirm: "/upload/confirm",
    },
    payments: {
      paypal: {
        createOrder: "/payments/paypal/create-order",
        capture: "/payments/paypal/capture",
      },
    },
  },
} as const;
