import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "mask";
}

export function Reveal({ children, className, delay = 0, variant = "fade" }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, rootMargin: "0px 0px -8% 0px" });
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  return (
    <div
      ref={ref}
      data-visible={inView}
      style={style}
      className={cn(variant === "mask" ? "reveal-mask" : "reveal", className)}
    >
      {children}
    </div>
  );
}
