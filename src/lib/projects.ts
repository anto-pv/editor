import ascentPoster from "@/assets/ascent.jpg";
import nocturnePoster from "@/assets/nocturne.jpg";
import quietFieldsPoster from "@/assets/quiet-fields.jpg";
import saltStaticPoster from "@/assets/salt-static.jpg";
import undertowPoster from "@/assets/undertow.jpg";
import velvetHourPoster from "@/assets/velvet-hour.jpg";
import busanNeon from "@/assets/stock-busan-neon.jpg";
import flintLights from "@/assets/stock-flint-lights.jpg";
import seattleNeon from "@/assets/stock-seattle-neon.jpg";
import streetlightFigure from "@/assets/stock-streetlight-figure.jpg";

export const categories = ["Short Film", "Content"] as const;

export type Category = (typeof categories)[number];

/** "real" = published work by Anto. "study" = edit/grade exercise on stock or AI-generated footage. */
export type ProjectKind = "real" | "study";

export interface Project {
  slug: string;
  title: string;
  category: Category;
  kind: ProjectKind;
  platform: string;
  client: string;
  role: string;
  year: string;
  /** One line on the cut, grade and sound approach. */
  note: string;
  /** Source/credit line. Required for studies. */
  credit?: string;
  url?: string;
  embedUrl?: string;
  aspect: "wide" | "portrait";
  poster?: string;
  video: string | null;
  objectPosition?: string;
}

const AI_CREDIT = "AI-generated still, used as practice material";
const unsplash = (who: string) => `Photo by ${who} on Unsplash (Unsplash License)`;

export const projects: Project[] = [
  {
    slug: "short-film",
    title: "Short Film",
    category: "Short Film",
    kind: "real",
    platform: "YouTube",
    client: "YouTube",
    role: "Editing",
    year: "2026",
    note: "Full edit of a short film: story pacing, scene assembly and final export.",
    url: "https://youtu.be/unobUhgQ8Kg",
    embedUrl: "https://www.youtube-nocookie.com/embed/unobUhgQ8Kg",
    aspect: "wide",
    video: null,
  },
  {
    slug: "instagram-reel",
    title: "Instagram Reel",
    category: "Content",
    kind: "real",
    platform: "Instagram",
    client: "Instagram",
    role: "Editing",
    year: "2026",
    note: "Vertical edit built for the first second: hard hook, tight cuts, made for sound-off viewing.",
    url: "https://www.instagram.com/reel/DWLy8jnjJXf/",
    embedUrl: "https://www.instagram.com/reel/DWLy8jnjJXf/embed/",
    aspect: "portrait",
    video: null,
  },
  {
    slug: "salt-static",
    title: "Salt Static",
    category: "Short Film",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Edit, colour grade",
    year: "2026",
    note: "Teal-and-amber grade on a desert-motel frame. Slow holds, long breaths between cuts, sound bed of wind and a buzzing neon sign.",
    credit: AI_CREDIT,
    poster: saltStaticPoster,
    video: `${import.meta.env.BASE_URL}videos/salt-static.mp4`,
    aspect: "wide",
  },
  {
    slug: "quiet-fields",
    title: "Quiet Fields",
    category: "Short Film",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Edit, colour grade",
    year: "2026",
    note: "Pulled the grade towards a faded, low-contrast film look. Cut on silence: the pause before the next shot carries the mood.",
    credit: AI_CREDIT,
    poster: quietFieldsPoster,
    video: `${import.meta.env.BASE_URL}videos/quiet-fields.mp4`,
    aspect: "wide",
  },
  {
    slug: "fog-watch",
    title: "Fog Watch",
    category: "Short Film",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Grade, sound concept",
    year: "2026",
    note: "Single streetlight, one figure. A grade exercise in keeping blacks rich while the green cast stays in the fog, with a low drone and distant power-line hum.",
    credit: unsplash("a contributor"),
    poster: streetlightFigure,
    video: `${import.meta.env.BASE_URL}videos/fog-watch.mp4`,
    aspect: "wide",
    objectPosition: "50% 75%",
  },
  {
    slug: "torch-alley",
    title: "Torch Alley",
    category: "Short Film",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Grade, opening-title concept",
    year: "2026",
    note: "Cold night alley, warm practical lights. Built as the opening shot of an imagined thriller, with the lights as the only guide for the eye.",
    credit: unsplash("Bruno Guerrero"),
    poster: flintLights,
    video: `${import.meta.env.BASE_URL}videos/torch-alley.mp4`,
    aspect: "wide",
    objectPosition: "50% 45%",
  },
  {
    slug: "nocturne",
    title: "Nocturne",
    category: "Content",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Edit, grade, rhythm",
    year: "2026",
    note: "Music-video style cut in a rain-soaked alley. Neon reds held against crushed blacks; cuts land on the downbeat.",
    credit: AI_CREDIT,
    poster: nocturnePoster,
    video: `${import.meta.env.BASE_URL}videos/nocturne.mp4`,
    aspect: "wide",
  },
  {
    slug: "ascent",
    title: "Ascent",
    category: "Content",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Edit, speed ramps",
    year: "2026",
    note: "Sports and travel creator format: golden-hour grade, speed ramps into the summit, riser into a bass drop.",
    credit: AI_CREDIT,
    poster: ascentPoster,
    video: `${import.meta.env.BASE_URL}videos/ascent.mp4`,
    aspect: "wide",
  },
  {
    slug: "undertow",
    title: "Undertow",
    category: "Content",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Edit, colour grade",
    year: "2026",
    note: "Underwater grade study: protect the light shafts, lift shadow detail without milking the noise, muffled sound design for pressure.",
    credit: AI_CREDIT,
    poster: undertowPoster,
    video: `${import.meta.env.BASE_URL}videos/undertow.mp4`,
    aspect: "wide",
  },
  {
    slug: "velvet-hour",
    title: "Velvet Hour",
    category: "Content",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Edit, grade",
    year: "2026",
    note: "Fashion-film look in raw concrete and window light. Warm skin tones against cool shadows; a slow, cloth-led rhythm.",
    credit: AI_CREDIT,
    poster: velvetHourPoster,
    video: `${import.meta.env.BASE_URL}videos/velvet-hour.mp4`,
    aspect: "wide",
  },
  {
    slug: "neon-hours",
    title: "Neon Hours",
    category: "Content",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Grade, travel-vlog edit concept",
    year: "2026",
    note: "Film-stock street look for a travel vlog. Teal shadows, hot signage and a lo-fi city-ambience sound bed.",
    credit: unsplash("Jay Lee"),
    poster: busanNeon,
    video: `${import.meta.env.BASE_URL}videos/neon-hours.mp4`,
    aspect: "wide",
  },
  {
    slug: "market-dusk",
    title: "Market Dusk",
    category: "Content",
    kind: "study",
    platform: "Study",
    client: "Personal study",
    role: "Grade, title concept",
    year: "2026",
    note: "Dusk market scene graded for a documentary opener. Neon held against a violet sky, with room tone and a distant crowd.",
    credit: unsplash("Noah Morgan"),
    poster: seattleNeon,
    video: `${import.meta.env.BASE_URL}videos/market-dusk.mp4`,
    aspect: "wide",
    objectPosition: "50% 35%",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The piece after `slug`, wrapping to the first. Undefined when the slug is unknown. */
export function nextProject(slug: string): Project | undefined {
  const i = projects.findIndex((project) => project.slug === slug);
  return i < 0 ? undefined : projects[(i + 1) % projects.length];
}

export function filterProjects(category: Category | undefined): Project[] {
  return category ? projects.filter((project) => project.category === category) : projects;
}

export function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (categories as readonly string[]).includes(value);
}

export const reelClips = projects.filter(
  (project): project is Project & { video: string } => project.video !== null,
);

export const profile = {
  name: "Anto P V",
  role: "Film & Content Editor",
  city: "Würzburg",
  email: "antopv833@gmail.com",
  socials: [{ label: "Instagram", href: "https://instagram.com/anto_p_v" }],
};
