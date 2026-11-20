import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** Running SMPTE-style timecode at 24 fps, started on mount. */
export function Timecode({ className }: { className?: string }) {
  const [frames, setFrames] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      setFrames(Math.floor(((performance.now() - start) / 1000) * 24));
    }, 1000 / 24);
    return () => window.clearInterval(id);
  }, []);

  const ff = frames % 24;
  const totalSeconds = Math.floor(frames / 24);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);

  return (
    <span className={className} aria-hidden="true">
      {pad(hh)}:{pad(mm)}:{pad(ss)}:{pad(ff)}
    </span>
  );
}
