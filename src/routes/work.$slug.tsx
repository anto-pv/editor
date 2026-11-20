import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { KindBadge } from "@/components/site/ProjectCard";
import { ProjectMedia } from "@/components/site/ProjectMedia";
import { Reveal } from "@/components/site/Reveal";
import { getProject, nextProject, profile } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} - ${profile.name}` : `Work - ${profile.name}`;
    return {
      meta: [
        { title },
        { name: "description", content: p?.note ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.note ?? "" },
        ...(p?.poster ? [{ property: "og:image", content: p.poster }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="px-5 pb-24 pt-44 md:px-10">
      <p className="label-mono text-muted-foreground">404</p>
      <h1 className="mt-4 text-display text-6xl md:text-8xl">Cut not found</h1>
      <Link to="/work" className="mt-8 inline-flex items-center gap-2 label-mono link-underline">
        <ArrowLeft className="h-4 w-4" /> Back to work
      </Link>
    </div>
  ),
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const next = nextProject(project.slug);
  const portrait = project.aspect === "portrait";

  return (
    <article className="px-5 pb-24 pt-32 md:px-10 md:pb-40 md:pt-40">
      <Link to="/work" className="inline-flex items-center gap-2 label-mono text-muted-foreground link-underline">
        <ArrowLeft className="h-4 w-4" /> All work
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <p className="label-mono text-muted-foreground">{project.category}</p>
        <KindBadge kind={project.kind} />
      </div>
      <h1 className="mt-5 text-display text-[14vw] md:text-[9vw]">{project.title}</h1>

      <div className="mt-12">
        {project.embedUrl ? (
          <div
            className={
              "relative overflow-hidden bg-card shadow-frame " +
              (portrait ? "mx-auto aspect-[9/16] max-h-[760px] max-w-[428px]" : "aspect-video")
            }
          >
            <iframe
              src={project.embedUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        ) : (
          <ProjectMedia
            poster={project.poster ?? ""}
            video={project.video}
            alt={project.title}
            ambient={Boolean(project.video)}
            {...(project.objectPosition ? { objectPosition: project.objectPosition } : {})}
            className="aspect-video shadow-frame"
          />
        )}
      </div>

      <Reveal className="mt-14 grid gap-10 border-t border-border pt-8 md:grid-cols-[1fr_2fr]">
        <dl className="grid gap-6 label-mono">
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="mt-2 text-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Year</dt>
            <dd className="mt-2 text-foreground">{project.year}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Type</dt>
            <dd className="mt-2 text-foreground">{project.kind === "real" ? "Published work" : "Edit & grade study"}</dd>
          </div>
        </dl>
        <div>
          <p className="label-mono text-muted-foreground">The approach</p>
          <p className="mt-4 max-w-2xl text-2xl leading-snug md:text-3xl">{project.note}</p>
          {project.credit ? (
            <p className="mt-8 label-mono text-muted-foreground">Source: {project.credit}</p>
          ) : null}
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 label-mono link-underline"
            >
              Open on {project.platform} <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </Reveal>

      {next ? (
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group mt-24 flex items-end justify-between gap-6 border-t border-border pt-8"
        >
          <div>
            <p className="label-mono text-muted-foreground">Next</p>
            <p className="mt-3 text-display text-5xl md:text-7xl">{next.title}</p>
          </div>
          <ArrowRight className="mb-2 h-8 w-8 text-signal transition-transform duration-500 group-hover:translate-x-2 md:h-12 md:w-12" />
        </Link>
      ) : null}
    </article>
  );
}
