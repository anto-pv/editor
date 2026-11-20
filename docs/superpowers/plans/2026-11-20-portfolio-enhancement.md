# Portfolio enhancement implementation plan

> **For agentic workers:** use superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** Turn the thin portfolio into a cinematic one with more (honestly labelled) work, a strong hero, and about/services/process/contact sections.

**Architecture:** Extend `Project` data in `src/lib/projects.ts`; add case-study route `/work/$slug`; compose new home sections from small components in `src/components/site/`; reuse existing "Cutting Room" tokens and `ProjectMedia`, `Reveal`, `Timecode`, `Showreel`.

**Tech Stack:** TanStack Start/Router, React 19, Tailwind v4, vitest.

**Spec:** `docs/superpowers/specs/2026-11-20-portfolio-enhancement-design.md`

## Global Constraints
- Real work labelled "Real work"; every stock-based piece labelled "Study" with a credit.
- Do not hand-edit `src/routeTree.gen.ts`; do not touch `supabase/`; no secrets.
- Categories: "Short Film" and "Content".
- No new dependencies.

## Review Focus
- Unknown `/work/$slug` shows not-found rather than crashing.
- Old `?category=Social Video` links fall back to All.
- Entries with no video render a still (no broken `<video>`).
- Real projects with iframe embeds still render.
- Empty showreel (no clips) hides the showreel button.

### Task 1: Data model and content
**Files:** Modify `src/lib/projects.ts`; add images to `src/assets/` (+ `src/lib/credits` data inside projects.ts); Test `src/test/projects.test.ts`
**Produces:** `Project { slug, title, category, kind: "real"|"study", platform, role, year, note, credit?, poster?, embedUrl?, url?, video?, aspect }`; `getProject(slug)`, `filterProjects`, `isCategory`, `reelClips`.
- [ ] Test: `getProject("nope")` is undefined; `isCategory("Social Video")` false; every study has `credit` and `poster`; real projects come first.
- [ ] Implement data with the 2 real + 8 study entries (6 existing stills + new stock).
- [ ] Run `npx vitest run src/test/projects.test.ts` → PASS.

### Task 2: Cards and case-study route
**Files:** Modify `ProjectCard.tsx`, `routes/work.tsx`; Create `routes/work.$slug.tsx`
- [ ] Card: kind badge, links to `/work/$slug`; real keeps iframe, study uses `ProjectMedia`.
- [ ] Case-study page with note, role, credit, next piece; `notFoundComponent` for bad slug.
- [ ] Work page uses new categories.

### Task 3: Home page sections
**Files:** Modify `routes/index.tsx`; Create `components/site/{Hero,Services,Process,About,ContactCta}.tsx`
- [ ] Hero with ambient `ProjectMedia`, tagline, "Watch showreel" (only if `reelClips.length`) and "Get in touch".
- [ ] Selected work, services, process, about, contact CTA.

### Task 4: Verify
- [ ] `npx vitest run`, `npm run build`, `npm run lint`; run dev server and check pages.
