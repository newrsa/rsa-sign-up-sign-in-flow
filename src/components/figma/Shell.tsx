import type { ReactNode } from "react";
import { Bell, ChevronLeft, Moon, Sun } from "lucide-react";
import heroImage from "@/assets/signup-hero.png.asset.json";

/**
 * Shared shell used by all Figma screens.
 * Canvas: 1440x900. Primary nav: 115px. Left signup section: 600px.
 * Right section (725px) holds aspirational text above the hero image.
 */
export function FigmaShell({
  children,
  showAfterLoginBell = false,
  showCollapseChevron = false,
  rightContent,
}: {
  children?: ReactNode;
  showAfterLoginBell?: boolean;
  showCollapseChevron?: boolean;
  rightContent?: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-black flex items-start justify-center overflow-x-auto">
      <div className="relative bg-black" style={{ width: 1440, height: 900 }}>
        {/* Left signup section background (starts after 115px nav, 600px wide) */}
        <div
          className="absolute top-0 overflow-hidden"
          style={{
            left: 115,
            width: 600,
            height: 900,
            background: "#0e0f13",
            borderLeft: "1px solid #404249",
          }}
        />

        {/* Right section with hero image + text above */}
        <div
          className="absolute top-0 overflow-hidden"
          style={{
            left: 715,
            width: 725,
            height: 900,
            background: "#0e0f13",
            borderLeft: "1px solid #272735",
          }}
        >
          {/* Hero image fills lower portion */}
          <img
            src={heroImage.url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.55 }}
          />
          {/* Dark gradient overlay for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,15,19,0.85) 0%, rgba(14,15,19,0.35) 45%, rgba(14,15,19,0.15) 100%)",
            }}
          />
          {rightContent}
        </div>

        {/* Sidebar */}
        <Sidebar />

        {/* Title bar (spans right of nav) */}
        <TitleBar showBell={showAfterLoginBell} />

        {showCollapseChevron && (
          <div
            className="absolute z-20 flex items-center justify-center rounded-sm border border-white bg-black"
            style={{ left: 107, top: 80, width: 16, height: 10 }}
          >
            <ChevronLeft className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
          </div>
        )}


        {children}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside
      className="absolute top-0 left-0 overflow-hidden bg-black"
      style={{ width: 115, height: 900 }}
    >
      <div
        className="absolute"
        style={{ left: -376, top: 600, width: 500, height: 504, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ transform: "rotate(44.61deg)", width: 146, height: 564, borderRadius: 84, background: "rgba(144,144,176,0.11)" }} />
      </div>
      <div
        className="absolute"
        style={{ left: -372, top: 648, width: 500, height: 504, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ transform: "rotate(44.61deg)", width: 146, height: 564, borderRadius: 84, background: "rgba(144,144,176,0.12)" }} />
      </div>

    </aside>
  );
}


function TitleBar({ showBell }: { showBell: boolean }) {
  return (
    <div
      className="absolute flex items-center justify-end gap-4 z-10"
      style={{
        top: 0,
        left: 116,
        width: 1324,
        height: 67,
        background: "transparent",
        paddingRight: 34,
      }}
    >
      <ThemeSwitcher />
      {showBell && (
        <button className="flex items-center justify-center rounded-lg p-[10px]" style={{ background: "#2c2e35" }}>
          <Bell className="h-4 w-4 text-white" />
        </button>
      )}
    </div>
  );
}

function ThemeSwitcher() {
  return (
    <div
      className="relative flex items-center rounded-full border"
      style={{ width: 68, height: 29, background: "#1a1b20", borderColor: "#404249" }}
    >
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{ left: 3, top: 2, width: 25, height: 25, background: "#fff" }}
      >
        <Sun className="h-[15px] w-[15px] text-[#1a1b20]" />
      </div>
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{ left: 39, top: 2, width: 25, height: 25 }}
      >
        <Moon className="h-[15px] w-[15px] text-white/60" />
      </div>
    </div>
  );
}
