<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ModaCert Web (Next.js Frontend)

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS v4
- PayPal: `@paypal/react-paypal-js`
- HTTP: `axios` (API clients in `app/_lib/api.ts`)

## API Service Layer
- `app/_lib/api.ts` — axios instances for user-service (`/api/v1`) and payment-service (`/api/v1`)
- `app/_lib/auth.ts` — localStorage token/user persistence

## Service URLs (from `.env.local`)
- `NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:3005`
- `NEXT_PUBLIC_PAYMENT_SERVICE_URL=http://localhost:3002`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` — PayPal sandbox client ID

## Key Pages
- `/` — Homepage (hero, trust bar, categories, brand search, how-it-works, NFC, rates, CTA, footer)
- `/checkout` — 4-step flow: auth → brand selection → photo upload → PayPal payment
- `/brands`, `/rates`, `/authenticate`, `/signin`, `/upload` — Content pages

## Design System
- Tailwind v4 with custom theme in `app/globals.css` (CSS-first config)
- Color tokens: `mc-cream`, `mc-ink`, `mc-orange`, `mc-orange-dark`, `mc-muted`
- Font: Inter via Google Fonts
- Rounded corners: `rounded-[1.2rem]` to `rounded-[1.6rem]` for cards
- Shadows: `shadow-card`, `shadow-orange`
- Hydration fix: `useHydrated()` hook using `useSyncExternalStore`

## Checkout Flow
1. Auth — login via user-service `/api/v1/auth/login`
2. Brand — fetch brands from `/api/v1/brands`, select one (no model selection needed)
3. Upload — presign URLs via `/api/v1/upload/presign`, upload to S3, confirm
4. Payment — PayPal order via payment-service `/api/v1/payments/paypal/create-order`

## Commands
- `npm run dev` — Next.js dev server on :3000
- `npm run build` — Production build
- `npm run lint` — ESLint

## Known Issues
- Kill zombie `bun` processes before starting services: `pkill -f "bun.*main.ts"`
- Multiple stale Bun processes can bind port 3005, causing `CONNECTION_ENDED` errors
