import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProjectMediaProps {
  poster: string;
  video: string | null;
  alt: string;
  /** Controlled playback, e.g. on hover. */
  playing?: boolean;
  /** Always-on ambient loop (hero backgrounds). */
  ambient?: boolean;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
}

export function ProjectMedia({
  poster,
  video,
  alt,
  playing = false,
  ambient = false,
  priority = false,
  className,
  objectPosition,
}: ProjectMediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const active = ambient || playing;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (active) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

  const style = objectPosition ? { objectPosition } : undefined;

  return (
    <div className={cn("relative overflow-hidden bg-card", className)}>
      <img
        src={poster}
        alt={alt}
        width={1920}
        height={1088}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={style}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-[2400ms] ease-cinema",
          !video && ambient && "animate-kenburns",
          !video && playing && "scale-110",
          video && playing && "scale-105",
        )}
      />
      {video ? (
        <video
          ref={ref}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={ambient}
          preload={ambient ? "auto" : "metadata"}
          aria-hidden="true"
          style={style}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ease-cinema",
            active ? "opacity-100" : "opacity-0",
            playing && !ambient && "scale-[1.03]",
          )}
        />
      ) : null}
    </div>
  );
}
