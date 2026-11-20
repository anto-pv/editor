import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { reelClips } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ShowreelContextValue {
  open: (slug?: string) => void;
}

const ShowreelContext = createContext<ShowreelContextValue>({ open: () => {} });

export function useShowreel() {
  return useContext(ShowreelContext);
}

export function ShowreelProvider({ children }: { children: ReactNode }) {
  const [startIndex, setStartIndex] = useState<number | null>(null);

  const open = useCallback((slug?: string) => {
    const i = slug ? reelClips.findIndex((c) => c.slug === slug) : 0;
    setStartIndex(i < 0 ? 0 : i);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <ShowreelContext.Provider value={value}>
      {children}
      {startIndex !== null ? (
        <ShowreelPlayer startIndex={startIndex} onClose={() => setStartIndex(null)} />
      ) : null}
    </ShowreelContext.Provider>
  );
}

function ShowreelPlayer({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const clip = reelClips[index] ?? reelClips[0]!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % reelClips.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + reelClips.length) % reelClips.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    setProgress(0);
    v.currentTime = 0;
    v.muted = muted;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
      className="fixed inset-0 z-[70] flex flex-col bg-scrim animate-in fade-in duration-700"
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-10">
        <div className="flex items-center gap-3 label-mono text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-signal animate-rec" />
          Showreel 2026
          <span className="hidden sm:inline">
            — {String(index + 1).padStart(2, "0")} / {String(reelClips.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute" : "Mute"}
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close showreel"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-0 md:px-10">
        <div className="relative aspect-video w-full max-h-full max-w-[min(100%,calc((100svh-15rem)*16/9))] overflow-hidden shadow-frame">
          <video
            key={clip.slug}
            ref={videoRef}
            src={clip.video}
            playsInline
            onEnded={() => setIndex((i) => (i + 1) % reelClips.length)}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress(v.currentTime / v.duration);
            }}
            className="h-full w-full object-cover animate-in fade-in duration-1000"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-8 scrim-soft">
            <p className="label-mono text-muted-foreground">
              {clip.category} · {clip.client}
            </p>
            <p className="mt-2 text-display text-3xl md:text-5xl">{clip.title}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-px px-5 pb-6 pt-5 md:px-10" style={{ gridTemplateColumns: `repeat(${reelClips.length}, minmax(0, 1fr))` }}>
        {reelClips.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setIndex(i)}
            className="group text-left"
            aria-label={`Play ${c.title}`}
          >
            <div className="h-px w-full bg-border">
              <div
                className="h-px bg-foreground transition-[width] duration-200 ease-linear"
                style={{ width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%" }}
              />
            </div>
            <p
              className={cn(
                "mt-3 label-mono transition-colors",
                i === index ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              {String(i + 1).padStart(2, "0")} {c.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
