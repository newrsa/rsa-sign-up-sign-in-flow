import { useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import shortLogo from "@/assets/nav/Short_Logo.png.asset.json";
import rsaLogo from "@/assets/rsa-logo.png.asset.json";
import iconSettings from "@/assets/nav/icon_Settings.svg.asset.json";
import userProfilePic from "@/assets/nav/User_Profile.svg.asset.json";
import primaryNavSvg from "@/assets/nav/Primary_Navigation_v2.svg.asset.json";

import pathwayOn from "@/assets/nav/selected_icon_Pathway.svg.asset.json";
import pathwayOff from "@/assets/nav/No_selection_icon_Pathway.svg.asset.json";
import bluebookOn from "@/assets/nav/selected_icon_Bluebook.svg.asset.json";
import bluebookOff from "@/assets/nav/No_selection_icon_Bluebook.svg.asset.json";
import networkOn from "@/assets/nav/selected_icon_Network.svg.asset.json";
import networkOff from "@/assets/nav/No_selection_icon_Network.svg.asset.json";
import profileOn from "@/assets/nav/selected_icon_User_Profile.svg.asset.json";
import profileOff from "@/assets/nav/No_selection_icon_User_Profile.svg.asset.json";
import scheduleOn from "@/assets/nav/selected_icon_Schedule.svg.asset.json";
import scheduleOff from "@/assets/nav/No_selection_icon_Schedule.svg.asset.json";

const COLLAPSED_W = 115;
const EXPANDED_W = 240;

type NavItem = { label: string; to: string; on: string; off: string };

const items: NavItem[] = [
  { label: "Pathway", to: "/home", on: pathwayOn.url, off: pathwayOff.url },
  { label: "Bluebook", to: "/bluebook", on: bluebookOn.url, off: bluebookOff.url },
  { label: "Network", to: "/network", on: networkOn.url, off: networkOff.url },
  { label: "Profile", to: "/profile", on: profileOn.url, off: profileOff.url },
  { label: "Schedule", to: "/schedule", on: scheduleOn.url, off: scheduleOff.url },
];

export function HomeSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const width = collapsed ? COLLAPSED_W : EXPANDED_W;
  const [activePath, setActivePath] = useState<string>("/home");
  const [settingsActive, setSettingsActive] = useState(true);

  return (
    <aside
      className="absolute top-0 left-0 z-20 flex flex-col bg-black"
      style={{ width, height: "100%", transition: "width 200ms ease" }}
    >
      {collapsed && (
        <img
          src={primaryNavSvg.url}
          alt="Primary navigation"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 115,
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            pointerEvents: "none",
          }}
        />
      )}
      {!collapsed && (
      <>

      {/* Logo area */}
      <div
        className="flex items-center"
        style={{ height: 67, paddingLeft: collapsed ? 28 : 24 }}
      >
        {collapsed ? (
          <img src={shortLogo.url} alt="RSA" style={{ height: 40, width: "auto" }} />
        ) : (
          <img src={rsaLogo.url} alt="RightStepAhead" style={{ height: 32, width: "auto" }} />
        )}
      </div>

      {/* Collapse / expand toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        className="absolute z-30 flex items-center justify-center rounded-sm border border-white bg-black"
        style={{ left: width - 8, top: 80, width: 16, height: 16 }}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3 text-white" strokeWidth={2.5} />
        ) : (
          <ChevronLeft className="h-3 w-3 text-white" strokeWidth={2.5} />
        )}
      </button>

      {/* Nav items */}
      <nav className="flex flex-col gap-2 mt-24" style={{ paddingInline: collapsed ? 0 : 16 }}>
        {items.map((item) => {
          const active = activePath === item.to;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActivePath(item.to)}
              className="flex items-center gap-3 transition-colors"
              style={{
                paddingInline: collapsed ? 0 : 12,
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <span
                className="flex items-center justify-center"
                style={{
                  width: 65,
                  height: 52,
                  borderRadius: 8,
                  background: active ? "#3355F6" : "transparent",
                  flexShrink: 0,
                }}
              >
                <img src={active ? item.on : item.off} alt="" style={{ width: 24, height: 24 }} />
              </span>
              {!collapsed && (
                <span
                  style={{
                    color: active ? "#fff" : "#b8b8c4",
                    fontFamily: "Outfit, sans-serif",
                    fontSize: 15,
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: profile + settings */}
      <div
        className="mt-auto flex flex-col items-center gap-3"
        style={{ paddingBottom: 24, paddingInline: collapsed ? 0 : 16 }}
      >
        {/* Decorative blob (from previous nav) */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            left: -60,
            bottom: 120,
            width: 160,
            height: 160,
            background: "#1a1a24",
            opacity: 0.9,
            zIndex: -1,
          }}
        />
        <button
          type="button"
          className="flex items-center gap-3 w-full"
          style={{ justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <img
            src={userProfilePic.url}
            alt="You"
            style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover" }}
          />
          {!collapsed && (
            <span style={{ color: "#fff", fontFamily: "Outfit, sans-serif", fontSize: 14 }}>
              Your Profile
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setSettingsActive((s) => !s)}
          className="flex items-center gap-3 w-full"
          style={{
            justifyContent: collapsed ? "center" : "flex-start",
            paddingInline: collapsed ? 0 : 12,
          }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: 65,
              height: 52,
              borderRadius: 8,
              background: settingsActive ? "#3355F6" : "transparent",
              flexShrink: 0,
            }}
          >
            <img src={iconSettings.url} alt="" style={{ width: 24, height: 24 }} />
          </span>
          {!collapsed && (
            <span
              style={{
                color: "#fff",
                fontFamily: "Outfit, sans-serif",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Settings
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

export { COLLAPSED_W, EXPANDED_W };
