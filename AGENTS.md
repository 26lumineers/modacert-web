<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ModaCert Web

> Luxury authentication platform — Next.js frontend for authenticating designer goods via expert review.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| HTTP | Axios (two instances — user-service & payment-service) |
| Payments | PayPal (`@paypal/react-paypal-js`) |
| Runtime deps | React 19, axios 1.15 |

---

## Project Structure

```
app/
├── _lib/
│   ├── api.ts            # Axios instances, interceptors, all API functions
│   ├── api-loading.tsx   # Global loading overlay (subscribes to api.ts request counter)
│   └── auth.ts           # localStorage token/user helpers
├── layout.tsx            # Root layout — renders <ApiLoadingOverlay/> + children
├── globals.css           # Tailwind v4 @theme config, custom gradients, design tokens
├── page.tsx              # Homepage
├── checkout/page.tsx      # 4-step checkout flow
├── components.tsx         # Shared UI components
├── data.ts                # Static data (categories, etc.)
├── authenticate/          # Authenticate info page
├── brands/                # Brands listing page
├── rates/                 # Rates page
├── signin/                # Sign-in page
├── upload/                # Upload info page
└── payment/               # Payment info page
```

---
 
## Environment Variables (`.env.local`)

| Variable | Example | Purpose |
|---|---|---|
| `NEXT_PUBLIC_USER_SERVICE_URL` | `http://localhost:3005` | User/auth/brand/upload backend |
| `NEXT_PUBLIC_PAYMENT_SERVICE_URL` | `http://localhost:3002` | PayPal payment backend |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | `A...` | PayPal sandbox client ID |
| `NEXT_PUBLIC_PAYMENT_MODE` | `fake` | Frontend payment UI mode: `paypal` renders PayPal Buttons, `fake` renders the local fake pay button |

---

## API Service Layer (`app/_lib/api.ts`)

### Architecture

Two Axios instances share a unified interceptor pipeline:

```
userApi ──┐
          ├── request interceptor (activeRequests++, notify loading overlay)
          ├── response interceptor (activeRequests--, notify; JWT-expired → redirect)
paymentApi ┘
```

### Auto-Features (no per-call code needed)

| Feature | How |
|---|---|
| **Auth header** | `setAuthToken(token)` sets `Authorization: Bearer` on both instances |
| **JWT expiry redirect** | Response interceptor catches `401` or messages like `"jwt expired"` → calls `clearAuth()` + `setAuthToken(null)` + `window.location.href = "/signin"` |
| **Global loading overlay** | Request/response interceptors maintain an `activeRequests` counter; `onApiLoadingChange(listener)` notifies subscribers → `<ApiLoadingOverlay/>` renders a centered spinner with backdrop blur |

### API Endpoints

| Function | Method | Service | Path |
|---|---|---|---|
| `login(email, password)` | POST | user | `/auth/login` |
| `fetchBrands()` | GET | user | `/brands` |
| `fetchBrandModels(brandId)` | GET | user | `/brands/:id/models` |
| `requestPresignUrls(payload)` | POST | user | `/upload/presign` |
| `uploadToPresignedUrl(url, file)` | PUT | S3 | (presigned URL) |
| `confirmUpload(requestId)` | POST | user | `/upload/confirm` |
| `createPayPalOrder(payload)` | POST | payment | `/payments/paypal/create-order` |
| `capturePayPalOrder(payload)` | POST | payment | `/payments/paypal/capture` |

---

## Auth (`app/_lib/auth.ts`)

- **Storage**: `localStorage` keys `modacert_token` and `modacert_user`
- **Functions**: `getStoredToken()`, `getStoredUser()`, `saveAuth(token, user)`, `clearAuth()`
- **Session restore**: `checkout/page.tsx` reads stored token on mount → skips to brand step if found

---

## Global Loading Overlay (`app/_lib/api-loading.tsx`)

- Renders a full-screen semi-transparent overlay (`bg-mc-ink/20 backdrop-blur`) with a white card spinner
- Subscribes to `onApiLoadingChange()` from `api.ts`
- Only visible when `activeRequests > 0`
- Hydration-safe via `useHydrated()` hook
- Wired into `app/layout.tsx` so **every** page gets it for free

---

## Design System

### Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `mc-cream` | `#f4eee6` | Page background |
| `mc-soft` | `#fff9f2` | Light card backgrounds |
| `mc-muted` | `#e8d9ca` | Borders, dividers, disabled states |
| `mc-ink` | `#16120e` | Primary text |
| `mc-brown` | `#4b2b13` | Dark accents |
| `mc-brown-soft` | `#8a4a11` | Secondary accents |
| `mc-orange` | `#f47a13` | Brand accent, CTAs, active states |
| `mc-orange-dark` | `#aa4d00` | Hover states |

### Shadows

| Name | Value |
|---|---|
| `shadow-card` | `0 22px 50px rgba(69, 38, 13, 0.14)` |
| `shadow-soft` | `0 16px 34px rgba(28, 18, 9, 0.2)` |
| `shadow-orange` | `0 18px 36px rgba(244, 122, 19, 0.32)` |

### Conventions

- **Rounded corners**: `rounded-[1.2rem]` (small cards) → `rounded-[1.6rem]` (large panels)
- **Buttons**: `rounded-full`, `bg-mc-orange`, `shadow-orange`, `hover:bg-mc-orange-dark`
- **Fonts**: `font-body` (Avenir Next), `font-logo` / `font-display` (Iowan Old Style)
- **Hydration fix**: Always use `useHydrated()` hook (`useSyncExternalStore`) before rendering client-only UI

### Custom Background Classes

| Class | Purpose |
|---|---|
| `bg-hero` | Dark gradient with orange radial glow — hero section |
| `bg-product` | Warm cream-to-sand gradient — product showcase |
| `bg-rate` | Dark-to-amber gradient — pricing section |
| `bg-cta` | Diagonal dark gradient — call-to-action |
| `bg-why` | Subtle cream fade — "why" section |

---

## Checkout Flow

```
┌─────┐    ┌───────┐    ┌────────┐    ┌─────────┐    ┌──────┐
│ Auth │───▶│ Brand │───▶│ Upload │───▶│ Payment │───▶│ Done │
└─────┘    └───────┘    └────────┘    └─────────┘    └──────┘
  login      select       presign       PayPal          success
             brand        + S3          order +         page
                          upload        capture
```

1. **Auth** — POST `/auth/login` → store token & user
2. **Brand** — GET `/brands` → user picks one (price shown)
3. **Upload** — POST `/upload/presign` → PUT to S3 → POST `/upload/confirm`
4. **Payment** — PayPal Buttons widget → `createPayPalOrder` → user approves in PayPal → `capturePayPalOrder`

Real PayPal mode does not use a payment-service webhook callback. The browser PayPal Buttons `onApprove` handler calls payment-service `/payments/paypal/capture` after the buyer approves the order.

Required photos: `front`, `back`, `interior`, `logo`. Optional: `left`, `right`, `top`, `bottom`, `label_tag`, `serial_number`.

---

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server on `:3000` |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check only |

---

## Known Issues

- **Zombie Bun processes**: Kill stale `bun` processes before starting services (`pkill -f "bun.*main.ts"`). Multiple processes can bind port 3005 → `CONNECTION_ENDED` errors.
- **S3 uploads bypass interceptors**: `uploadToPresignedUrl()` uses native `fetch`, not Axios — no loading overlay for direct S3 PUTs.
- **Payment create-order 500**: A fast `500` from `/payments/paypal/create-order` usually means payment-service is in real PayPal mode but missing runtime PayPal config such as `PAYPAL_CLIENT_SECRET`. This is payment-service runtime env, not a frontend callback bug.

---

## Fake Payment Mode

There are two separate payment-mode knobs:

- `NEXT_PUBLIC_PAYMENT_MODE` in this repo controls the checkout UI.
- `PAYMENT_MODE` in payment-service controls the backend provider.

Use matching modes:

- Real PayPal: set `NEXT_PUBLIC_PAYMENT_MODE=paypal` in this repo and `PAYMENT_MODE=paypal` plus PayPal credentials in payment-service.
- Fake checkout: set `NEXT_PUBLIC_PAYMENT_MODE=fake` in this repo and `PAYMENT_MODE=fake` in payment-service.

When this repo is `fake`, the checkout page shows a test payment button instead of PayPal Buttons. That button still calls `createPayPalOrder()` then `capturePayPalOrder()` against payment-service, so payment-service must also be fake if you want deterministic fake responses and no PayPal API calls.

Do not run this repo in fake mode against a real PayPal payment-service. The fake button has no PayPal buyer approval step, so immediate capture cannot satisfy a real PayPal order flow.

Both fake and real backend modes publish `payment.completed` to SQS after successful capture, so downstream processing stays identical when payment-service is configured correctly.

The route names stay `/payments/paypal/create-order` and `/payments/paypal/capture` in both modes. Route names do not prove whether payment-service is using `FakePayPalService` or real `PayPalService`.

The `PAYMENT_MODE` constant is exported from `app/_lib/api.ts`.

---

## Coding Conventions

- No comments unless explicitly requested
- Follow existing patterns in surrounding code
- Use `app/_lib/api.ts` functions for all backend calls (never raw axios/fetch)
- Always use `useHydrated()` before rendering client-only UI
- Design tokens only — never hardcode colors or shadows
