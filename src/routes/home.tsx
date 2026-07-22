import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { HomeSidebar, COLLAPSED_W, EXPANDED_W, type NavId } from "@/components/home/HomeSidebar";
import { PathwayLanding } from "@/components/home/PathwayLanding";
import { UntitledPath } from "@/components/home/UntitledPath";
import titleBarAsset from "@/assets/title-bar.svg.asset.json";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home · RightStepAhead" },
      { name: "description", content: "Your RightStepAhead workspace." },
    ],
  }),
  component: Home,
});

function Home() {
  const [collapsed, setCollapsed] = useState(true);
  const [dark, setDark] = useState(true);
  const [selected, setSelected] = useState<NavId | null>(null);
  const [showUntitledPath, setShowUntitledPath] = useState(false);
  const navWidth = collapsed ? COLLAPSED_W : EXPANDED_W;

  return (
    <div
      className="w-screen overflow-x-hidden overflow-y-auto"
      style={{ background: "#0e0f13", minHeight: "100vh" }}
    >
      <div className="relative bg-black w-full" style={{ minHeight: "100vh" }}>
        <HomeSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          selected={selected}
          onSelect={setSelected}
        />

        {/* Vertical divider */}
        <div
          className="absolute z-30"
          style={{
            left: navWidth,
            top: 0,
            width: 1,
            height: "100%",
            background: "#272735",
            transition: "left 200ms ease",
          }}
        />

        {/* Title bar */}
        <div
          className="absolute flex items-center justify-end z-10"
          style={{ top: 0, left: navWidth, right: 0, height: 67, transition: "left 200ms ease" }}
        >
          <img
            src={titleBarAsset.url}
            alt=""
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: "fill" }}
          />
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="relative z-10 flex items-center gap-2 rounded-full mr-[34px]"
            style={{ background: "#2c2e35", padding: 4 }}
          >
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: 28,
                height: 28,
                background: dark ? "#3355f6" : "transparent",
              }}
            >
              <Moon className="h-4 w-4 text-white" fill={dark ? "white" : "none"} />
            </span>
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: 28,
                height: 28,
                background: !dark ? "#3355f6" : "transparent",
              }}
            >
              <Sun className="h-4 w-4 text-white" />
            </span>
          </button>
        </div>

        {/* Content area */}
        <main
          className="absolute"
          style={{
            left: navWidth,
            top: 67,
            right: 0,
            bottom: 0,
            background: "#0e0f13",
            transition: "left 200ms ease",
          }}
        >
          {selected === "pathway" && <PathwayLanding />}
        </main>
      </div>
    </div>
  );
}
