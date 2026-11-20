import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { ProjectMedia } from "@/components/site/ProjectMedia";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export function KindBadge({ kind }: { kind: Project["kind"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 label-mono",
        kind === "real" ? "border-signal text-signal" : "border-border text-muted-foreground",
      )}
    >
      {kind === "real" ? <span className="h-1.5 w-1.5 rounded-full bg-signal" /> : null}
      {kind === "real" ? "Real work" : "Study"}
    </span>
  );
}

export function ProjectCard({ project, index, className = "" }: ProjectCardProps) {
  const [hover, setHover] = useState(false);
  const isEmbed = project.kind === "real" && project.embedUrl;
  const frameAspect =
    project.aspect === "portrait" ? "aspect-[9/16] max-h-[720px] max-w-[405px] mx-auto" : "aspect-video";

  return (
    <article className={className}>
      {isEmbed ? (
        <div className={"relative overflow-hidden bg-card " + frameAspect}>
          <iframe
            src={project.embedUrl}
            title={project.title + " video by " + project.platform}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : (
        <Link
          to="/work/$slug"
          params={{ slug: project.slug }}
          className="group relative block"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          aria-label={"Open " + project.title}
        >
          <ProjectMedia
            poster={project.poster ?? ""}
            video={project.video}
            alt={project.title + " — " + project.note}
            playing={hover}
            {...(project.objectPosition ? { objectPosition: project.objectPosition } : {})}
            className="aspect-video"
          />
          <div className="pointer-events-none absolute inset-0 scrim-soft opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full border border-foreground/40 bg-background/40 text-foreground backdrop-blur transition-colors group-hover:bg-signal group-hover:border-signal">
            <Play className="h-4 w-4" />
          </span>
        </Link>
      )}
      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="label-mono text-muted-foreground">
              {String(index + 1).padStart(2, "0")} | {project.category}
            </p>
            <KindBadge kind={project.kind} />
          </div>
          <h3 className="mt-3 text-display text-3xl md:text-4xl">
            <Link to="/work/$slug" params={{ slug: project.slug }} className="link-underline">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-muted-foreground">{project.role}</p>
        </div>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex shrink-0 items-center gap-2 label-mono link-underline"
          >
            Open on {project.platform}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
