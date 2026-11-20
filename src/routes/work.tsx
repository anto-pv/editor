import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout for /work and /work/$slug. The list lives in work.index.tsx.
export const Route = createFileRoute("/work")({
  component: Outlet,
});
