# Copilot Instructions for Project Wyze

## Architecture Overview
**Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**

- **App Router (App Directory)**: All pages/components in `/app` using server/client components
- **Styling**: Tailwind CSS v4 with PostCSS; custom theme in `globals.css` using CSS variables
- **Path Aliases**: `@/*` resolves to project root (configured in `tsconfig.json`)
- **Structure**: Server-rendered layouts with client components for interactivity (e.g., `Navbar.tsx` uses `'use client'`)

## Key Development Patterns

### Client vs Server Components
- Default to server components; use `'use client'` only for interactive features (state, hooks, event listeners)
- Example: [Navbar.tsx](Navbar.tsx) is a client component because it manages `hoveredLink` state with React hooks

### Tailwind CSS Conventions
- Use `bg-gradient-to-b`, `text-transparent`, `bg-clip-text` for gradient text effects (seen in logo)
- Dark mode focus: Slate palette (`slate-900`, `slate-800`, `slate-300`) with accent colors (blue, cyan)
- Responsive utilities: `hidden md:flex` for mobile-first design

### Component Organization
- UI components in `/app/components` (e.g., `Navbar.tsx`)
- Page routes in `/app` using Next.js naming conventions (`page.tsx`, `layout.tsx`)
- Keep layout separate: `RootLayout` in `layout.tsx` handles fonts and metadata

## Developer Workflow
```bash
npm run dev      # Start dev server (localhost:3000, auto-reload)
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Run ESLint (ensure no errors before commits)
```

## Code Style & Conventions
- **TypeScript**: Strict mode enabled; use proper typing for React props and state
- **Naming**: PascalCase for components, camelCase for utilities/hooks
- **CSS Classes**: Compose Tailwind utility strings with template literals for conditional styles
- **Imports**: Use `'next/link'` and `'next/font/google'` for optimized Next.js features
- **Metadata**: Define page metadata in `layout.tsx` or per-route using Next.js Metadata API

## ESLint Configuration
- Uses `eslint-config-next` (Next.js recommended rules)
- Run `npm run lint` before pushing code
- No custom rules yet; maintain Next.js defaults

## Important Notes
- Keep components focused: Navbar handles only navigation logic
- Use absolute paths with `@/` alias to avoid deep `../../../` imports
- Font optimization via `next/font` prevents layout shift (configured in RootLayout)
