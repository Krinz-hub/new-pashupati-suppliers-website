# Repository Audit & Cleanup Report — New Pashupati Suppliers

**Date:** September 4, 2026  
**Repository:** `https://github.com/Krinz-hub/new-pashupati-suppliers-website`

---

## 1. Existing Architecture
- **Frontend Stack:** React 18, TypeScript 5.5, Vite 5.4, Tailwind CSS 3.4, React Router 6.26, Lucide React icons.
- **Backend Architecture:** Express.js REST API (`src/server/server.ts` & `src/server/expressApp.ts`) running on Node.js via `tsx`.
- **Data Source:** Normalized CSV product dataset (`data/products.csv` & `src/data/products.ts`) containing 97 verified product items & variants across 7 categories (Kitchen, Household, Plastic, Electrical, Cleaning, Storage, General).

---

## 2. Application Entry Points
- **Client Entry:** `src/main.tsx` -> `src/app/App.tsx` -> `src/app/routes.tsx`
- **Server Entry:** `src/server/server.ts` -> `src/server/expressApp.ts`
- **CSV Importer Script:** `scripts/importProducts.ts` (`npm run import:products`)
- **Product Visual Pipeline Script:** `scripts/generateProductImages.ts` (`npm run generate:product-images`)

---

## 3. Active Routes
- `/` — Homepage (Hero, Value Strip, Category Grid, Why Choose Us, Wholesale CTA, Final CTA, Footer)
- `/products` — Full Product Catalog (Search, Category & Subcategory Filter Tabs, 2-col to 4-col responsive grid, Pagination)
- `/products/:slug` — Product Details View (Breadcrumbs, Gallery Viewer, Spec List, Pre-filled Inquiry CTA, Related Products)
- `/categories` — Visual Category Directory
- `/categories/:slug` — Category Landing Page & Category Product Grid
- `/wholesale` — Bulk Procurement Page (4-Step Timeline, Target Client Types, Quote CTA)
- `/contact` — Direct Inquiry Form, Phone & WhatsApp CTAs, Google Maps Hetauda Store Embed
- `*` — 404 Page

---

## 4. Deletion Candidates (Ghost Code & Legacy Hono Files)

| Path | Type | Reason for Deletion | Safe to Delete |
| :--- | :--- | :--- | :--- |
| `src/server/index.ts` | File | Legacy Cloudflare Workers / Hono server entry point. Express (`server.ts`) is our active backend. | YES |
| `src/server/auth.ts` | File | Legacy Hono auth middleware. | YES |
| `src/server/routes/*` | Directory | Legacy Hono routes (`authRoutes`, `blogRoutes`, `categoryRoutes`, `mediaRoutes`, `productRoutes`, `seedRoutes`). Express routes in `expressApp.ts` are active. | YES |
| `src/server/services/cloudinary.ts` | File | Cloudinary service from old upload pipeline. Assets are stored locally in `public/assets/`. | YES |
| `src/server/localDb.ts` | File | Abandoned in-memory JSON db from early prototype. | YES |
| `wrangler.jsonc` | File | Cloudflare Wrangler config file. Application runs on Node.js/Express. | YES |
| `migrations/` | Directory | Cloudflare D1 SQL migrations directory. | YES |
| `src/components/home/PortfolioPreview.tsx` | File | Obsolete portfolio homepage preview component after removal of portfolio tab. | YES |
| `src/pages/Portfolio.tsx` | File | Obsolete portfolio page after user requested portfolio tab removal. | YES |
| `src/pages/About.tsx` | File | Obsolete about page after user requested about tab removal. | YES |
| `src/components/home/AboutPreview.tsx` | File | Obsolete about homepage section after user requested about tab removal. | YES |

---

## 5. Dependency Audit (Unused npm Packages)

| Package | Type | Status | Action |
| :--- | :--- | :--- | :--- |
| `cloudinary` | dependency | Unused | Remove from `package.json` |
| `hono` | dependency | Unused | Remove from `package.json` |
| `jose` | dependency | Unused | Remove from `package.json` |
| `wrangler` | devDependency | Unused | Remove from `package.json` |

---

## 6. Service & Data Consolidation
- **API Services:** Consolidate redundant service wrappers (`productService.ts`, `categoryService.ts`, `apiClient.ts`) into canonical `src/services/api.ts`.
- **Product Data:** Standardize on `src/data/products.ts` generated from `data/products.csv`.

---

## 7. Navigation Redesign (Transparent Floating Blurred Navbar)
- **Visual Design:** Floating navbar with subtle offset, rounded corners, `bg-white/70`, `backdrop-blur-md`, subtle border `border-white/20`, and drop shadow.
- **Scroll Behavior:**
  - **Top of Page:** Fully translucent floating bar over the hero background.
  - **Scrolled:** Transition to slightly more solid white background (`bg-white/95`) with compact padding and crisp border.
- **Active Navigation Items:** Home, Products, Categories, Wholesale, Contact. (Portfolio & About tabs removed as requested).
