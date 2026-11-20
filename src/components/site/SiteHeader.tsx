import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { profile } from "@/lib/projects";
import { cn } from "@/lib/utils";

const nav = [{ to: "/work", label: "Work" }] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-700",
          scrolled && !menuOpen ? "bg-background/70 backdrop-blur-xl" : "header-fade",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <Link to="/" className="group flex items-baseline gap-2" aria-label={profile.name + " - home"}>
            <span className="text-display text-lg tracking-tight md:text-xl">{profile.name}</span>
            <span className="hidden text-editorial text-base text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
              editor
            </span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="label-mono text-muted-foreground transition-colors hover:text-foreground link-underline pb-1"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <a href={"mailto:" + profile.email} className="rounded-full border border-border px-4 py-2 label-mono text-foreground transition-colors hover:border-foreground">
              Contact
            </a>
          </nav>

          <button
            type="button"
            className="relative z-[60] flex h-11 items-center gap-3 label-mono md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "Close" : "Menu"}
            <span className="relative block h-3 w-6">
              <span className={cn("absolute left-0 top-0 h-px w-6 bg-foreground transition-transform duration-500", menuOpen && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute bottom-0 left-0 h-px w-6 bg-foreground transition-transform duration-500", menuOpen && "-translate-y-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-end bg-background px-5 pb-10 transition-[opacity,visibility] duration-500 md:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {[{ to: "/", label: "Home" } as const, ...nav].map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-display text-6xl transition-[transform,opacity] duration-700 ease-cinema",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: menuOpen ? String(120 + index * 70) + "ms" : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={"mailto:" + profile.email} className="mt-10 label-mono text-foreground">
          {profile.email}
        </a>
      </div>
    </>
  );
}
