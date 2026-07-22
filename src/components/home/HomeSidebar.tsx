import { useState } from "react";
import primaryNavCollapsed from "@/assets/nav/Primary_Navigation_v2.svg.asset.json";
import primaryNavExpanded from "@/assets/nav/Primary_Navigation_Expanded.svg.asset.json";
import toggleIcon from "@/assets/nav/Expand_Collapse_icon.svg.asset.json";

const COLLAPSED_W = 115;
const EXPANDED_W = 224;
const SELECTED_BG = "#3355F6";

// Approximate vertical centers (px) of each nav item within the 900px SVG.
type NavId = "pathway" | "bluebook" | "network" | "profile" | "schedule" | "settings";
const NAV_ITEMS: { id: NavId; label: string; y: number; bottom?: boolean }[] = [
  { id: "pathway", label: "Pathway", y: 290 },
  { id: "bluebook", label: "Blue Book", y: 360 },
  { id: "network", label: "Network", y: 430 },
  { id: "profile", label: "My Profile", y: 500 },
  { id: "schedule", label: "Schedule", y: 570 },
  { id: "settings", label: "Settings", y: 800, bottom: true },
];

const ITEM_H = 52;
const ITEM_W_COLLAPSED = 65;
const ITEM_W_EXPANDED = 172;
const ITEM_LEFT_COLLAPSED = (COLLAPSED_W - ITEM_W_COLLAPSED) / 2;
const ITEM_LEFT_EXPANDED = 20;

export function HomeSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const [selected, setSelected] = useState<NavId>("pathway");
  const width = collapsed ? COLLAPSED_W : EXPANDED_W;
  const navSrc = collapsed ? primaryNavCollapsed.url : primaryNavExpanded.url;
  const itemW = collapsed ? ITEM_W_COLLAPSED : ITEM_W_EXPANDED;
  const itemLeft = collapsed ? ITEM_LEFT_COLLAPSED : ITEM_LEFT_EXPANDED;

  return (
    <aside
      className="absolute top-0 left-0 z-20 bg-black overflow-y-auto overflow-x-hidden"
      style={{ width, height: "100%", transition: "width 200ms ease" }}
    >
      <div style={{ position: "relative", width, height: 900 }}>
        <img
          src={navSrc}
          alt="Primary navigation"
          style={{
            display: "block",
            width,
            height: 900,
            objectFit: "cover",
            objectPosition: "top left",
            pointerEvents: "none",
          }}
        />

        {/* Mask the SVG's baked-in Pathway highlight when another item is selected */}
        {selected !== "pathway" && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: itemLeft,
              top: 290 - ITEM_H / 2,
              width: itemW,
              height: ITEM_H,
              background: "#000",
              borderRadius: 8,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Clickable hotspots + selection highlight */}
        {NAV_ITEMS.map((item) => {
          const isSelected = selected === item.id;
          const isSettings = item.id === "settings";
          // Settings already has its own blue tile baked into the SVG when selected by default.
          const showHighlight = isSelected && !(isSettings && collapsed === false ? false : false);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              aria-label={item.label}
              aria-current={isSelected ? "page" : undefined}
              style={{
                position: "absolute",
                left: itemLeft,
                top: item.y - ITEM_H / 2,
                width: itemW,
                height: ITEM_H,
                borderRadius: 8,
                background: showHighlight && item.id !== "pathway" ? SELECTED_BG : "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          );
        })}

        {/* Restore Pathway blue tile via overlay when selected (keeps the SVG's icon+label visible above) */}
        {selected === "pathway" && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: itemLeft,
              top: 290 - ITEM_H / 2,
              width: itemW,
              height: ITEM_H,
              background: SELECTED_BG,
              borderRadius: 8,
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        className="fixed z-30 flex items-center justify-center"
        style={{ left: width - 8, top: 80, width: 16, height: 10, transition: "left 200ms ease" }}
      >
        <img
          src={toggleIcon.url}
          alt=""
          style={{
            width: 16,
            height: 10,
            transform: collapsed ? "none" : "scaleX(-1)",
          }}
        />
      </button>
    </aside>
  );
}

export { COLLAPSED_W, EXPANDED_W };
