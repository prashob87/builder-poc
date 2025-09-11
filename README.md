
## Fusion Starter – React + Express (SPA) Template

A production-ready full-stack starter using React 18, Vite, TailwindCSS, and an integrated Express server. Ships with React Router 6 in SPA mode, TypeScript, Vitest, Zod, and a modern UI component kit (Radix UI + shadcn-style components).

### Tech Stack
- **Package manager**: pnpm
- **Frontend**: React 18, React Router 6 (SPA), TypeScript, Vite, TailwindCSS 3
- **UI**: Radix UI + Tailwind + shadcn components, Sonner toasts
- **State/Data**: @tanstack/react-query
- **Backend**: Express (mounted in Vite dev server); Stripe server routes
- **Testing**: Vitest

### Quickstart
```bash
pnpm install
pnpm dev
```
- Dev server runs on `http://localhost:8080` (SPA + Express on a single port in development).

### Scripts
```bash
pnpm dev         # Start Vite dev server with Express middleware
pnpm build       # Build client + server bundles
pnpm start       # Run production server build
pnpm typecheck   # Run TypeScript type checking
pnpm test        # Run Vitest tests
pnpm format.fix  # Prettier write
```

### Environment Variables
Create a `.env` at the repo root for local development. Common variables:
```
PING_MESSAGE="ping"
STRIPE_SECRET_KEY=sk_test_...
```
- In development, `dotenv` loads variables automatically for the server.
- For production, configure your hosting provider’s environment settings.

### Project Structure
```
client/                   # React SPA frontend
├── pages/                # Route components (Index.tsx = home)
├── components/ui/        # Pre-built UI components
├── App.tsx               # App entry point + SPA routing
└── global.css            # Tailwind theme and global styles

server/                   # Express API backend
├── index.ts              # Express app factory + routes
└── routes/               # API handlers (demo, stripe,...)

shared/                   # Cross-cutting types/interfaces
└── api.ts

netlify/                  # Optional: serverless function example
└── functions/api.ts

vite.config.ts            # Vite (dev) + Express integration
vite.config.server.ts     # Server build configuration
tailwind.config.ts        # Tailwind setup and design tokens
```

### Routing (SPA)
- Routes are declared in `client/App.tsx` using `react-router-dom`.
- Example:
```tsx
<Routes>
  <Route path="/" element={<Index />} />
  {/* Add custom routes above the catch-all */}
  <Route path="*" element={<NotFound />} />
  
  {/* Existing routes include: /account-data, /pdp, /cart, /payment, /thank-you, /stripe-payment, /assign-warranty, /assign-warranty-detail, /order-history, /warranty-certificate, /forgot-password, /email-password-reset, /reset-password, /header */}
  
</Routes>
```

### Styling
- TailwindCSS with extended design tokens in `tailwind.config.ts` and CSS variables in `client/global.css`.
- Utility `cn()` is available (clsx + tailwind-merge) in `client/lib/utils.ts`.
- Includes custom theme tokens (e.g., `panasonic` palette and `sidebar` tokens).

### Server (Express)
- Dev mode mounts Express into the Vite dev server via a small plugin inside `vite.config.ts`.
- Example API routes (prefixed with `/api/`):
  - `GET /api/ping`
  - `GET /api/demo`
  - `POST /api/stripe/create-checkout-session`
  - `GET /api/stripe/session-status`

### Stripe
- Server routes are implemented in `server/routes/stripe.ts`.
- Keep Stripe secret keys and server-side logic within the server only.

### Testing
- Uses Vitest. Example test in `client/lib/utils.spec.ts`.
```bash
pnpm test
```

### Type Safety & Shared Types
- Use `shared/` for types/interfaces shared between client and server.
- Path aliases:
  - `@/*` → `client/*`
  - `@shared/*` → `shared/*`

### Deployment
Two typical approaches:
1) Node server hosting
   - Build: `pnpm build`
   - Start: `pnpm start`
   - Ensure environment variables are set in the host.

2) Serverless (Netlify)
   - `netlify/functions/` contains an example function.
   - Configure redirects for SPA fallback and route `/api/*` to functions or backend as needed.

Choose one primary deployment target and prune the other approach to avoid duplication.

### Production Hardening
- Configure CORS with explicit `origin` in production.
- Consider `helmet` for security headers on the Node server build.
- Validate environment with Zod at server startup.
- Use `React.lazy` + `Suspense` to code-split non-critical routes.
- Add an app-level error boundary around routes.

### Recommended Enhancements (with examples)

#### 1) Route-based code splitting
Use `React.lazy` for non-critical routes to reduce initial bundle size.
```tsx
// client/App.tsx (snippet)
import React, { Suspense } from "react";
const PDP = React.lazy(() => import("./pages/PDP"));
const Cart = React.lazy(() => import("./pages/Cart"));
// ...repeat for other heavier pages

<Suspense fallback={null}>
  <Routes>
    <Route path="/pdp" element={<PDP />} />
    <Route path="/cart" element={<Cart />} />
    {/* keep critical routes eager if needed */}
  </Routes>
  {/* Consider a nicer fallback skeleton instead of null */}
</Suspense>
```

#### 2) App-level error boundary
Catch unexpected runtime errors and render a friendly fallback.
```tsx
// client/components/AppErrorBoundary.tsx
import { Component, ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  componentDidCatch(error: unknown) {
    // Optionally log to an error service
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-6">Something went wrong. Please refresh.</div>;
    }
    return this.props.children;
  }
}

// Wrap routes in App.tsx
// <AppErrorBoundary>
//   <Suspense fallback={...}>
//     <Routes>...</Routes>
//   </Suspense>
// </AppErrorBoundary>
```

#### 3) React Query sensible defaults + global error handler
```ts
// client/App.tsx (snippet)
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
// import { toast } from "sonner"; // if you want to show a toast on errors

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error(error);
      // toast.error("Something went wrong");
    },
  }),
});
```

#### 4) Environment validation with Zod (server)
```ts
// server/env.ts
import { z } from "zod";

const EnvSchema = z.object({
  STRIPE_SECRET_KEY: z.string().min(1),
  PING_MESSAGE: z.string().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  ALLOWED_ORIGIN: z.string().url().optional(),
});

export const env = EnvSchema.parse(process.env);
```

```ts
// server/index.ts (snippet)
import { env } from "./env";
// use env.STRIPE_SECRET_KEY, env.PING_MESSAGE, etc.
```

#### 5) Production CORS + security headers
```ts
// server/index.ts (snippet)
import helmet from "helmet";
import cors from "cors";
import { env } from "./env";

app.use(helmet());
app.use(cors({
  origin: env.ALLOWED_ORIGIN ?? false, // set to exact origin in prod
  credentials: true,
}));
```

#### 6) Tailwind content globs
Ensure all template files are included to avoid purging needed classes.
```ts
// tailwind.config.ts (snippet)
content: [
  "./client/**/*.{ts,tsx}",
  // add here if you later add mdx/jsx or server-rendered templates
],
```

#### 7) Deployment choice guidance
Choose a single deployment strategy to avoid duplication:
- If hosting a Node server, remove/ignore `netlify/functions/` and ensure `pnpm build && pnpm start` works on the host.
- If going serverless (Netlify), remove Node server build artifacts or gate them, and configure SPA fallback plus API routes under `/api/*` to functions.

### Contributing
1. Create a feature branch.
2. Keep edits focused and small.
3. Ensure `pnpm typecheck` and `pnpm test` pass.
4. Open a PR with a concise summary of changes.

### License
This starter is provided as-is. Add your project’s license if required.

##Options for adding content into builder

### Option 1: Import the repo into Builder Project
1. New Project → Import from GitHub → pick your repo/branch → finish. Open Preview to verify.
2. If needed, set dev command to “pnpm dev” in Settings. Add env vars in Settings (don’t commit secrets).

### Option 2: Make site content visually editable (Builder CMS)
1. Connect to Builder.io button in MCP. 
2. Create a “page” model (and optional “section” models) in Builder.
3. Install the React SDK and wire a catch‑all page route that renders Builder content; expose your API key via env var.
4. Register components you want editable (Header, Footer, SectionBanner, etc.) so they’re draggable in Design mode.
5. In Builder, create pages/sections, map fields to your props, publish. Use Design mode to edit visually.

Gradually componentize for editing
Break large pages into smaller components (client/components/*) and register them for granular editing.
Keep logic/auth in code; expose safe “content slots” (strings, images, rich text, lists) to Builder.
Deploy from Builder (optional)
Connect Netlify button or Connect Vercel button via MCP for 1‑click deploys and CI on push. Or share the non‑prod Open Preview button.