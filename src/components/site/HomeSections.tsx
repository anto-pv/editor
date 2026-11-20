import { Reveal } from "@/components/site/Reveal";
import { profile } from "@/lib/projects";

const services = [
  { n: "01", title: "Short film editing", body: "Story-first assembly, pacing and finishing for shorts, from rough cut to locked picture." },
  { n: "02", title: "Content & reels", body: "Hook-first vertical and horizontal edits for creators and brands, built to hold attention." },
  { n: "03", title: "Colour & look", body: "Grades that give a film its own world: contrast, palette and texture kept consistent shot to shot." },
  { n: "04", title: "Sound & rhythm", body: "Cuts timed to music and room tone, with simple sound design that supports the picture." },
];

const steps = [
  { n: "01", title: "Brief", body: "We talk about the story, the audience and where the film will live." },
  { n: "02", title: "Assembly", body: "I go through every take and build a first structure around the strongest moments." },
  { n: "03", title: "Rough cut", body: "You review a full cut. We fix pace and story before touching polish." },
  { n: "04", title: "Grade & sound", body: "Colour, music and sound design go in once the picture is locked." },
  { n: "05", title: "Delivery", body: "Exports for every platform you need, with revisions included." },
];

function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div className="border-b border-border pb-5">
      <p className="label-mono text-muted-foreground">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-display text-5xl md:text-7xl">{title}</h2>
    </div>
  );
}

export function Services() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-40" aria-labelledby="services-heading">
      <SectionHead eyebrow="What I do" title="Services" id="services-heading" />
      <ul className="grid md:grid-cols-2">
        {services.map((s, i) => (
          <li key={s.n} className="border-b border-border py-8 md:pr-10">
            <Reveal delay={i * 80}>
              <p className="label-mono text-signal">{s.n}</p>
              <h3 className="mt-4 text-display text-3xl md:text-4xl">{s.title}</h3>
              <p className="mt-4 max-w-md text-muted-foreground">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Process() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-40" aria-labelledby="process-heading">
      <SectionHead eyebrow="How I work" title="Process" id="process-heading" />
      <ol className="mt-4 grid gap-px md:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.n} className="border-t border-border pt-6 md:pr-6">
            <Reveal delay={i * 80}>
              <p className="label-mono text-muted-foreground">{s.n}</p>
              <h3 className="mt-3 text-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function About() {
  return (
    <section className="px-5 pb-24 md:px-10 md:pb-40" aria-labelledby="about-heading">
      <SectionHead eyebrow="About" title="The editor" id="about-heading" />
      <Reveal className="mt-10 grid gap-8 md:grid-cols-[1fr_2fr]">
        <p className="label-mono text-muted-foreground">{profile.role} | {profile.city}</p>
        <div className="max-w-2xl space-y-6 text-xl leading-relaxed md:text-2xl">
          <p>
            I&rsquo;m {profile.name}, an editor in {profile.city}. I cut short films and content for creators, and I care about the
            part nobody sees: the pause before a line, the cut that lands a beat late on purpose.
          </p>
          <p className="text-muted-foreground">
            Alongside client edits, I keep a running set of grade and edit studies. They are labelled as studies, so you can see
            how I think about look, rhythm and sound.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
