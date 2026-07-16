import type { ReactNode } from "react";
import { Bell, ChevronLeft } from "lucide-react";
import heroImage from "@/assets/signup-hero.png.asset.json";
import titleBarAsset from "@/assets/title-bar.svg.asset.json";
import primaryNavAsset from "@/assets/primary-nav.svg.asset.json";

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
    <div className="h-screen w-screen overflow-hidden flex items-center justify-center" style={{ background: "#0e0f13" }}>
      <div
        className="relative bg-black origin-center flex-shrink-0"
        style={{
          width: 1440,
          height: 900,
          transform: "scale(min(calc(100vw / 1440px), calc(100vh / 900px)))",
        }}
      >
        {/* Left signup section background (full-left, below 67px title bar) */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 0,
            top: 67,
            width: 715,
            height: 833,
            background: "#0e0f13",
          }}
        >
          {/* Decorative blob bottom-left */}
          <div
            className="absolute pointer-events-none"
            style={{ left: -376, top: 600, width: 500, height: 504, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ transform: "rotate(44.61deg)", width: 146, height: 564, borderRadius: 84, background: "rgba(144,144,176,0.11)" }} />
          </div>
          <div
            className="absolute pointer-events-none"
            style={{ left: -372, top: 648, width: 500, height: 504, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ transform: "rotate(44.61deg)", width: 146, height: 564, borderRadius: 84, background: "rgba(144,144,176,0.12)" }} />
          </div>
        </div>

        {/* Right section with hero image + text above */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: 715,
            top: 67,
            width: 725,
            height: 833,
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

        {/* Title bar (full width) */}
        <TitleBar showBell={showAfterLoginBell} />

        {showCollapseChevron && (
          <div
            className="absolute z-20 flex items-center justify-center rounded-sm border border-white bg-black"
            style={{ left: 8, top: 80, width: 16, height: 10 }}
          >
            <ChevronLeft className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
          </div>
        )}


        {children}
      </div>
    </div>
  );
}


function TitleBar({ showBell }: { showBell: boolean }) {
  return (
    <div
      className="absolute flex items-center justify-end z-10"
      style={{
        top: 0,
        left: 0,
        width: 1440,
        height: 67,
      }}
    >
      <img
        src={titleBarAsset.url}
        alt=""
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: "fill" }}
      />
      {showBell && (
        <button
          className="relative z-10 flex items-center justify-center rounded-lg p-[10px] mr-[34px]"
          style={{ background: "#2c2e35" }}
        >
          <Bell className="h-4 w-4 text-white" />
        </button>
      )}
    </div>
  );
}

