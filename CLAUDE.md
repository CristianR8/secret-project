# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CVAIL (Computer Vision and Artificial Intelligence Lab) website — a design-forward, motion-heavy portfolio site built with Next.js 15 App Router, React 19, Tailwind CSS v4, and Motion (Framer Motion successor). Four pages: Home (`/`), News (`/news`), People (`/people`), Overfit with X (`/overfit-with-series`). Viewport-scaled responsive system with fluid proportional sizing. No CMS — all data is hardcoded in page files.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint (next/core-web-vitals + next/typescript)
- Prettier is configured with `prettier-plugin-tailwindcss` — format with `npx prettier --write <file>`

No test framework is configured.

## Folder Structure

```
├── app/
│   ├── layout.tsx          # Root layout: font setup, ReactLenis, WindowSizeProvider
│   ├── page.tsx            # Homepage: composes Hero, Introduction, ResearchInfo, Lines, News, Form, Footer
│   ├── globals.css         # --multiplier system, @theme tokens, Lenis styles
│   ├── providers.tsx       # WindowSizeProvider context + useIsMobile() hook
│   ├── fonts/              # Basis Grotesque Pro .woff2 files (Light, Regular, Medium)
│   ├── news/page.tsx       # News page: masonry grid, slide-in article panel, 9 hardcoded NewsCard items
│   ├── people/page.tsx     # People page: team directory, 3 Group arrays (Director, MSc, Undergraduate)
│   └── overfit-with-series/
│       ├── page.tsx            # Overfit with X page: biweekly research talk series
│       ├── OverfitBackground.tsx  # CSS-only animated background with SVG overfitting curves
│       └── EpochCounter.tsx    # Client component: scroll-driven epoch counter HUD
├── components/
│   ├── Client/             # "use client" interactive components (23 files)
│   ├── Server/             # Server components for static presentational elements (12 files)
│   ├── SVGComponents/      # SVG icons, logos, socials/ subfolder
│   └── VideoPlayer/        # Video player with Desktop variant
├── sections/               # Page-level sections (index.tsx → Server.tsx → Client/)
│   ├── Hero/               # Hero with LightEffect (Three.js), Client/Desktop + Client/Mobile
│   ├── Introduction/       # "Who are we?" with image grid
│   ├── ResearchInfo/       # Research description with parallax image
│   ├── Lines/              # Research areas with interactive image reveals
│   ├── Form/               # Contact form with parallax image
│   └── Footer/             # Navigation links, logo, social links
├── hooks/                  # useCursor, useImageReveal, useMaskImage
├── utils/
│   ├── cn.ts               # clsx + tailwind-merge helper
│   └── lenis.ts            # "use client" re-export of lenis/react
├── types/
│   └── threejs-components.d.ts  # Module declaration for CDN-loaded Three.js tubes
├── public/
│   ├── Lines/              # 6 research area images (dense, nlos, nlp, remote, rendering, thermal)
│   ├── News/               # 3 news images (colcaci, iccv, soccernet)
│   ├── People/             # 34 team member headshot PNGs
│   ├── group/              # people.jpeg (hero background)
│   └── *.jpeg              # photo1-3, research, Team
├── dump/                   # Archived/deprecated hooks (useParallax, useBackgroundImage)
└── ISSUES.md               # Tracked bugs and tasks
```

## Architecture

### Routing

Next.js App Router with four routes:
- `/` — homepage composing: Hero, Introduction, ResearchInfo, Lines, News, Form, Footer
- `/news` — masonry news grid with slide-in article panel (client component)
- `/people` — team directory grouped by role (Director, MSc, Undergraduate)
- `/overfit-with-series` — "Overfit with X" biweekly research talk series page

### Component Organization

Components are split by rendering strategy:
- `components/Client/` — client components (`"use client"`) for interactive UI: NavBar, Cursor, Marquee, ParallaxContainer, PixelImageEffect, ResponsiveImage, News, Lines, SideBar, ClipImageCard, etc.
- `components/Server/` — server components for static presentational elements: MaskText, SectionTitle, BorderedButton, StyledLink, ContactUs, Input, Label, Select, etc.
- `components/SVGComponents/` — SVG icon components (AnimatedBurger, LogoFull, NavigateSVG, PlaySVG) and `socials/` subfolder with platform logos
- `components/VideoPlayer/` — video player with `VideoPlayerDesktop.tsx` variant

### Sections Pattern

`sections/` contains page-level sections, each following:
- `index.tsx` — wrapper/barrel that composes Server + Client parts
- `Server.tsx` — server-rendered markup
- `Client/` subfolder (when needed) — client interactivity with Desktop/Mobile variants

**Hero** (`sections/Hero/`): Sticky full-screen hero with MaskText marquee of tech keywords ("Thermal Imaging • Deep Learning • NLP • Rendering • Recognition"), lab title, scroll prompt. `LightEffect.tsx` renders Three.js tubes background. `Client/` has Desktop.tsx and Mobile.tsx variants with VideoPlayer.

**Introduction** (`sections/Introduction/`): "Who are we?" section with 3-column image grid (photo1, photo2, Team.jpeg) and CVAIL mission statement.

**ResearchInfo** (`sections/ResearchInfo/`): 2-column grid with ResponsiveImage parallax (research.jpeg, parallaxAmount={20}) on left, bordered research description with MaskText and "Discover our RESEARCH" link on right.

**Lines** (`sections/Lines/`): Research areas section with ResponsiveMarquee scrolling "Research Areas" text, ResponsiveMaskTextVariant for breakpoint-specific copy, and LinesClient for interactive directional image reveals across 6 research topics.

**Form** (`sections/Form/`): Contact form with ParallaxContainer image + form fields (Full Name, Email, Phone with dial code, Country, research line checkboxes, terms checkbox). No server action wired yet.

**Footer** (`sections/Footer/`): Navigation links (Home, Research, News, People), CVAIL logo, contact info, StayConnected social links, policies footer.

## Responsive Design System

### The `--multiplier` System

Viewport-proportional scaling via CSS custom property in `globals.css`:
```css
:root { --multiplier: calc(100vw / 375); }          /* Mobile: 375px base */
@media (min-width: 768px) {
  :root { --multiplier: calc(100vw / 1440); }       /* Desktop: 1440px base */
}
```
Also defines `--basesvh: 812` for small viewport height calculations.

### Text Tokens (`@theme` block)

All multiplied by `--multiplier`:
- `--text-2xs`: 12px base | `--text-xs`: 13px | `--text-sm`: 14px | `--text-md`: 15px
- `--text-base`: 16px | `--text-lg`: 18px | `--text-xl`: 20px
- `--text-24`: 24px | `--text-26`: 26px | `--text-28`: 28px | `--text-30`: 30px | `--text-40`: 40px | `--text-144`: 144px
- SVH-based: `--text-1600svh`, `--text-1800svh`, `--text-3000svh` (scaled by `--basesvh`)

### Spacing Tokens

Extensive scale from `--spacing-0` through `--spacing-172` (4px to 688px base), all multiplied by `--multiplier`. SVH-based spacing tokens also available (e.g., `--spacing-7200svh`, `--spacing-12000svh`).

### Breakpoint

`768px` is the single mobile/desktop boundary used everywhere: CSS `@media`, `useIsMobile()` hook, responsive component variants.

### WindowSizeProvider

`app/providers.tsx` — React context providing `useIsMobile()` hook (returns `boolean | null`). Initial `null` state for hydration safety. Threshold: `window.innerWidth < 768`. Wraps the entire app in root layout.

## Styling & Design Tokens

### Color Palette

- **Dark backgrounds**: `#2b3530` (primary dark), `#1f2824` (card bg), `#12201a` (news card bg), `#061411` (people card bg)
- **Light text/accents**: `#D1CCBF` (primary light text), `#CED1BF` (sidebar bg)
- **Mint accent**: `#8DFFD6` (hover states), `#7BFFD0` (people card hover), `#9AF1CF` (text accent)
- **Selection**: background `#ced1bf`, text `#2b3530`
- **Form**: borders `#919d86`, backgrounds `#c4c7b3`

### Card Patterns

- Rounded: `rounded-2xl`, `rounded-[2rem]`, `rounded-[1.75rem]`, `rounded-[1.35rem]`
- Borders: `border-white/15`, `border-white/20`, `border-[#D1CCBF]/20`
- Glass: `backdrop-blur-xl`, `backdrop-blur-2xl` + semi-transparent backgrounds
- Shadows: `shadow-[0_24px_70px_rgba(0,0,0,0.35)]`, `shadow-[0_28px_90px_rgba(0,0,0,0.28)]`
- Rings: `ring-1 ring-white/20`, `ring-[#D1CCBF]/20`

### Common Patterns

- Hover lift: `hover:-translate-y-1`, `hover:scale-[1.03]`
- Hover accent: `hover:border-[#8DFFD6]/25`, `hover:shadow-[0_26px_70px_rgba(74,209,156,0.16)]`
- Typography: `font-light`, `tracking-[0.16em]`, `uppercase`, `[line-height:0.92]`
- Transitions: `transition-all duration-500 ease-out`

### Font

Basis Grotesque Pro loaded via `next/font/local`:
- Light (300), Regular (400), Medium (500)
- CSS variable: `--font-grotesque`
- Applied via `className` on `<body>`

## Animation Patterns

### MaskText (Server — `components/Server/MaskText.tsx`)

Scroll-triggered text reveal. Each line animates from y: "100%" → y: "0%" with clip-path `inset(0% 0% 100% 0%)` → `inset(0% 0% 0% 0%)`. Easing: `[0.24, 0.43, 0.15, 0.97]`. Duration: 0.8s. Stagger: 0.1s between lines. Triggers once via `whileInView`.

### MaskTextClient (Client — `components/Client/MaskTextClient.tsx`)

State-driven animated text transitions with directional awareness. Uses `AnimatePresence mode="wait"` — direction detection changes stagger order and y direction (100% forward, -100% backward). Duration: 0.35s, stagger: 0.05s.

### Marquee (`components/Client/Marquee.tsx`)

Velocity-reactive infinite scroll. Uses `useVelocity(scrollY)` to capture scroll speed, springs it (mass: 1, damping: 50, stiffness: 600), maps to [0, 4] velocity multiplier. Direction reverses with scroll direction. Children rendered twice for seamless loop. Configured with `max` (wrap bound) and `speed`.

### ParallaxContainer (`components/Client/ParallaxContainer.tsx`)

Scroll-position depth parallax. Uses `useScroll()` with target ref and offset `["start end", "end start"]`. Calculates translateY based on scroll progress × parallaxAmount, with scale(1 + 0.01 × parallaxAmount). Origin: bottom. Parent has overflow-hidden.

### LightEffect (`sections/Hero/LightEffect.tsx`)

Three.js tubes animation loaded from CDN (`threejs-components@0.0.19`). Hardware detection skips on: `prefers-reduced-motion`, touch devices (`pointer: coarse`), ≤4 CPU cores, ≤4GB RAM. Config: 36 tubes, density 1.0, thickness 0.9. Color palette rotates every 9s (5 palettes). Overlays: radial gradients + SVG noise filter with `noise-shift` animation.

### Cursor (`components/Client/Cursor.tsx` + `hooks/useCursor.ts`)

Spring-tracked custom cursor. `useSpring` (damping: 110, stiffness: 550) for position. Velocity calculated via `useVelocity()` → euclidean displacement → `useTransform` maps to scale [0.8, 1, 0.8]. AnimatePresence scale in/out. Styled: backdrop-blur, white/30 bg, z-[20], pointer-events-none.

### PixelImageEffect (`components/Client/PixelImageEffect.tsx`)

WebGL shader-based pixelation reveal. Fragment shader creates grid of squares, uses `easeOutCubic(scrollProgress)` with distance-based alpha and per-cell random noise for stochastic reveal. Configurable grid size (default 60) and color. Falls back to plain `<img>` if WebGL unavailable. Proper cleanup of textures/programs/buffers.

### useImageReveal (`hooks/useImageReveal.ts`)

Directional clip-path image animation. Up reveal: `inset(100% 0% 0% 0%)` → `inset(0%)`. Down reveal: `inset(0% 0% 100% 0%)` → `inset(0%)`. Scale: 1.15 → 1. Easing: `[0.24, 0.43, 0.15, 0.97]`. Manages z-index stacking. Targets elements via `[data-index]` attribute.

### useMaskImage (`hooks/useMaskImage.ts`)

Multi-division gradient mask for scroll reveals. Desktop: complex multi-stop linear-gradient with 28 divisions mapped to viewport sections. Mobile: simple two-stop gradient. Transforms `scrollYProgress` into dynamic CSS gradient string.

### Common Easing

Consistent cubic-bezier across the site: `[0.24, 0.43, 0.15, 0.97]`

### Page Transitions

- AnimatePresence `mode="wait"` for state-driven text transitions
- Clip-path reveals for modals (VideoPlayer): `inset(100% 0% 0% 0%)` → `inset(0%)`, 0.8s
- Scale in/out for Cursor with optional mobile delay

## Data Layer

### News (`app/news/page.tsx`)

```typescript
type NewsCard = {
  title: string;
  category: string;
  image: StaticImageData;
  heightClass: string;
  titleClass?: string;
  excerpt: string;
  body: string[];
};
```
9 hardcoded items. Categories: Conference, Event, Award, Internal, Research, Publication, Community, Demo, Dataset. Images from `/public/News/`.

### People (`app/people/page.tsx`)

```typescript
type Person = { name: string; image?: StaticImageData | string; };
type Group = { title: string; label: string; members: Person[]; };
```
3 groups: Director (1 member), MSc Students (8), Undergraduate Students (25). Images as string paths from `/public/People/`.

### Homepage News

The homepage `News` client component (`components/Client/News.tsx`) renders a scroll-driven news carousel with sticky positioning, custom cursor, and ClipImageCard reveals — separate from the full `/news` page.

## Custom Hooks

- **`useCursor`** — Spring cursor tracking (damping: 110, stiffness: 550), velocity-based scale via euclidean displacement, returns handlers + motion style props
- **`useMaskImage`** — Scroll-driven multi-division gradient mask generator, 28 divisions on desktop, simple gradient on mobile
- **`useImageReveal`** — Directional clip-path image animation with z-index management, uses `useAnimate` for imperative control

## Key Utilities

- **`cn()`** (`utils/cn.ts`) — `twMerge(clsx(...args))` class merging helper
- **`utils/lenis.ts`** — `"use client"` re-export of `lenis/react`, consumed as `ReactLenis` in root layout

## Dependencies

| Package | Purpose |
|---------|---------|
| `next` 15.2.2 | Framework |
| `react` / `react-dom` ^19 | UI library |
| `motion` ^12.5.0 | Animation (Framer Motion successor) |
| `lenis` ^1.2.3 | Smooth scroll |
| `clsx` ^2.1.1 | Conditional class names |
| `tailwind-merge` ^3.0.2 | Tailwind class deduplication |
| `tailwindcss` ^4 | CSS framework (v4 with `@tailwindcss/postcss`) |
| `prettier-plugin-tailwindcss` | Tailwind class sorting |

### Path Aliases

`@/*` maps to project root (configured in `tsconfig.json`).

## Known Issues

See `ISSUES.md` for tracked bugs including:
- ParallaxContainer algorithm issues at certain viewport sizes
- Cursor entry/exit behavior on mobile
- NavBar opacity fade in innovation section
- Form server action not yet wired (planned: Notion as database)
