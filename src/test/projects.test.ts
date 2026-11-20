import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { filterProjects, getProject, isCategory, nextProject, projects, reelClips } from "@/lib/projects";

describe("projects data", () => {
  it("returns undefined for an unknown slug", () => {
    expect(getProject("nope")).toBeUndefined();
  });

  it("rejects the retired 'Social Video' category", () => {
    expect(isCategory("Social Video")).toBe(false);
    expect(isCategory("Content")).toBe(true);
  });

  it("lists real work first and never mislabels a study", () => {
    const firstStudy = projects.findIndex((p) => p.kind === "study");
    expect(projects.slice(0, firstStudy).every((p) => p.kind === "real")).toBe(true);
    expect(projects.slice(firstStudy).every((p) => p.kind === "study")).toBe(true);
  });

  it("gives every study a poster and credit, and every real piece an embed", () => {
    for (const p of projects) {
      if (p.kind === "study") {
        expect(p.poster, p.slug).toBeTruthy();
        expect(p.credit, p.slug).toBeTruthy();
      } else {
        expect(p.embedUrl, p.slug).toBeTruthy();
      }
    }
  });

  it("has unique slugs and enough work", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(projects.length).toBeGreaterThanOrEqual(8);
  });

  it("filters by category and wraps nextProject around", () => {
    expect(filterProjects("Short Film").every((p) => p.category === "Short Film")).toBe(true);
    expect(filterProjects(undefined)).toHaveLength(projects.length);
    expect(nextProject(projects.at(-1)!.slug)?.slug).toBe(projects[0]!.slug);
  });

  it("only puts playable clips in the showreel", () => {
    expect(reelClips.every((c) => typeof c.video === "string")).toBe(true);
  });

  it("gives every study a playable local video file", () => {
    for (const p of projects.filter((x) => x.kind === "study")) {
      expect(p.video, p.slug).toMatch(/^\/videos\/[a-z-]+\.mp4$/);
      expect(existsSync(join(process.cwd(), "public", p.video!)), p.slug).toBe(true);
    }
  });
});
