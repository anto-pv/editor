import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, Play } from "lucide-react";
import { About, Process, Services } from "@/components/site/HomeSections";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectMedia } from "@/components/site/ProjectMedia";
import { Reveal } from "@/components/site/Reveal";
import { useShowreel } from "@/components/site/Showreel";
import { Timecode } from "@/components/site/Timecode";
import { getProject, profile, projects, reelClips } from "@/lib/projects";

const DESCRIPTION =
  "Film and content editor in " + profile.city + ". Short films, reels and colour, with real work and labelled edit studies.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: profile.name + " - Film & Content Editor" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: profile.name + " - Film & Content Editor" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const { open } = useShowreel();
  const hero = getProject("salt-static");
  const featured = projects.slice(0, 6);

  return (
    <>
      <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden px-5 pb-12 pt-32 md:px-10 md:pb-16">
        {hero?.poster ? (
          <>
            <ProjectMedia
              poster={hero.poster}
              video={hero.video}
              alt=""
              ambient
              priority
              className="absolute inset-0"
              objectPosition="50% 40%"
            />
            <div className="absolute inset-0 scrim" aria-hidden="true" />
          </>
        ) : null}

        <div className="relative">
          <div className="flex items-center justify-between gap-4 label-mono text-muted-foreground">
            <span className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-signal animate-rec" />
              {profile.role} | {profile.city}
            </span>
            <Timecode className="hidden sm:inline" />
          </div>
          <h1 className="mt-6 max-w-6xl text-display text-[18vw] leading-[0.88] md:text-[12vw]">
            {profile.name}<span className="text-editorial text-signal">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-editorial text-3xl md:text-5xl">
            I cut stories that hold the frame.
          </p>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              {reelClips.length > 0 ? (
                <button
                  type="button"
                  onClick={() => open()}
                  className="inline-flex items-center gap-3 rounded-full bg-signal px-6 py-3.5 label-mono text-signal-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Play className="h-4 w-4" /> Watch showreel
                </button>
              ) : null}
              <a
                href={"mailto:" + profile.email}
                className="inline-flex items-center rounded-full border border-foreground/40 px-6 py-3.5 label-mono transition-colors hover:border-foreground"
              >
                Get in touch
              </a>
            </div>
            <Link to="/work" className="inline-flex items-center gap-2 label-mono link-underline">
              View the work <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border px-5 py-8 md:px-10" aria-label="Focus">
        <p className="label-mono text-muted-foreground">
          Short film <span className="text-signal">/</span> Content for creators <span className="text-signal">/</span> Colour &amp; look{" "}
          <span className="text-signal">/</span> Sound &amp; rhythm
        </p>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-40" aria-labelledby="selected-heading">
        <div className="flex items-end justify-between gap-6 border-b border-border pb-5">
          <div>
            <p className="label-mono text-muted-foreground">Selected work</p>
            <h2 id="selected-heading" className="mt-3 text-display text-5xl md:text-7xl">Recent edits</h2>
          </div>
          <span className="label-mono text-muted-foreground">{String(projects.length).padStart(2, "0")} pieces</span>
        </div>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 100}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
        <Link to="/work" className="mt-16 inline-flex items-center gap-2 label-mono link-underline">
          See all {projects.length} pieces <ArrowDownRight className="h-4 w-4" />
        </Link>
      </section>

      <Services />
      <Process />
      <About />
    </>
  );
}
