import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/projects";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 pb-8 pt-16 md:px-10 md:pt-24">
      <p className="label-mono text-muted-foreground">Have a project in mind?</p>
      <a href={"mailto:" + profile.email} className="group mt-5 flex items-end gap-4">
        <span className="text-display text-[12vw] leading-[0.9] md:text-[8vw]">
          Let’s work together<span className="text-editorial text-signal">.</span>
        </span>
        <ArrowUpRight className="mb-2 h-8 w-8 shrink-0 text-signal transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" />
      </a>

      <div className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
        <div>
          <p className="label-mono text-muted-foreground">Email</p>
          <a href={"mailto:" + profile.email} className="mt-2 inline-block link-underline">{profile.email}</a>
        </div>
        <div>
          <p className="label-mono text-muted-foreground">Based in</p>
          <p className="mt-2">{profile.city}</p>
        </div>
        <div>
          <p className="label-mono text-muted-foreground">Instagram</p>
          <a href={profile.socials[0]?.href} target="_blank" rel="noreferrer" className="mt-2 inline-block link-underline">
            {profile.socials[0]?.label}
          </a>
        </div>
      </div>
      <p className="mt-12 label-mono text-muted-foreground">Copyright {new Date().getFullYear()} {profile.name}</p>
    </footer>
  );
}

