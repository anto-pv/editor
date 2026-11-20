# Portfolio enhancement design

Date: 2026-11-20. Status: awaiting approval.

## Intent
Anto P V is a film and content editor (short film, content creation). The site has two real projects and a bare hero, so it has no pull. Goal: make it feel like a film title sequence and give a visitor enough to judge taste and range, so they contact him for short-film or creator-content editing.

## Goals
- Strong hero: full-bleed moving image, sharp tagline, clear "Watch showreel" and "Get in touch" actions.
- 6-8 additional entries, each honestly labelled as an edit/grade study or concept piece.
- Real work (YouTube short film, Instagram Reel) stays labelled as real work, shown first.
- New sections: about, services, process, contact CTA.
- Work page split into Short Film and Content (creator/social); case-study page per piece with a short note on cut, grade and sound approach.
- Reuse the existing "Cutting Room" design system (ProjectMedia, Showreel, Timecode, Reveal, tokens in `styles.css`).

## Non-goals
- No database, CMS, or backend changes (Lovable manages those).
- No redesign of palette, fonts or header/footer language.
- No new dependencies unless unavoidable.

## Anti-goals
- Presenting stock or generated footage as client work or as footage he shot.
- Heavy pages: large videos must lazy-load; stills first, video on hover or in the showreel.

## Constraints
- TanStack Start + React 19 + Tailwind v4; routes in `src/routes`, data in `src/lib/projects.ts`.
- `routeTree.gen.ts` is generated; do not hand edit.
- Do not touch `supabase/migrations`. No secrets in the repo.
- I cannot generate AI imagery. New visuals come from free-licence stock (Pexels/Unsplash, licence recorded per asset in a credits list), and he can swap in AI-generated or own footage later through the same data file.
- Existing assets: 6 stills and 3 video clips in `src/assets/`, currently unused.

## Approaches considered
- A. Polish only: smallest, but work section stays thin.
- B. Cinematic rebuild with study pieces (chosen by user, 2026-11-20): richer work, honest labelling, uses the existing design system.
- C. Structure with placeholders until more real work exists: most honest, emptiest today.

## Design
- Data: extend `Project` with `kind` ("real" | "study"), `poster`, optional `video`, `year`, `note` (cut/grade/sound), `credit`. Categories become Short Film / Content. Entries get slugs for case-study pages.
- Home: hero (ambient ProjectMedia + tagline + CTAs) -> showreel strip -> selected work (real first, then studies) -> services -> process -> about -> contact CTA.
- Work: filter by category, "Real work" / "Study" badge on every card; real projects keep the embed, studies use ProjectMedia with hover-play.
- `/work/$slug`: case-study route (large media, note, role, credit, next piece).
- Showreel: fed by projects that have video.
- Copy: written by me in his voice (short, confident), drafts marked for his edit. Contact uses the existing email and Instagram.

## Left to the builder
Exact stock selection, tagline wording, section order polish, accessibility and mobile checks, tests for the new routes in `src/test`.

## Calls I made (change any)
- Labelling studies as "Study" rather than hiding the distinction.
- Tagline and about copy are my drafts.
- Stills before video to keep pages light.
