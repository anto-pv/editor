import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectCard } from "@/components/site/ProjectCard";
import { categories, filterProjects, isCategory, projects, type Category } from "@/lib/projects";

interface WorkSearch {
  category?: Category;
}

export const Route = createFileRoute("/work/")({
  validateSearch: (search: Record<string, unknown>): WorkSearch =>
    isCategory(search["category"]) ? { category: search["category"] } : {},
  head: () => ({
    meta: [
      { title: "Work - Anto P V" },
      { name: "description", content: "Selected editing work by Anto P V." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { category: rawCategory } = Route.useSearch();
  // Old links (e.g. ?category=Social Video) fall back to All instead of an empty list.
  const category = isCategory(rawCategory) ? rawCategory : undefined;
  const list = filterProjects(category);

  return (
    <div className="px-5 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
      <p className="label-mono text-muted-foreground">Short film and content</p>
      <h1 className="mt-4 text-display text-[20vw] md:text-[13vw]">
        Work<sup className="ml-2 align-top text-editorial text-[0.25em] text-signal">({list.length})</sup>
      </h1>
      <p className="mt-5 max-w-xl text-lg text-muted-foreground">
        Real published edits first, then edit and grade studies. Every piece is labelled, so you always know what you are looking at.
      </p>

      <nav className="mt-12 border-y border-border" aria-label="Filter work by category">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 py-4">
          <li>
            <Link to="/work" search={{}} className={!category ? "label-mono text-foreground" : "label-mono text-muted-foreground"}>
              All ({projects.length})
            </Link>
          </li>
          {categories.map((item) => (
            <li key={item}>
              <Link
                to="/work"
                search={{ category: item }}
                className={category === item ? "label-mono text-foreground" : "label-mono text-muted-foreground"}
              >
                {item} ({projects.filter((project) => project.category === item).length})
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        {list.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
