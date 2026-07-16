import { createFileRoute } from "@tanstack/react-router";
import { FigmaShell } from "@/components/figma/Shell";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home · RightStepAhead" }] }),
  component: Home,
});

function Home() {
  return <FigmaShell showAfterLoginBell showCollapseChevron />;
}
