import { useState } from "react";
import fullLogo from "@/assets/rsa-logo.png.asset.json";
import shortLogo from "@/assets/nav/Short_Logo.png.asset.json";
import toggleIcon from "@/assets/nav/Expand_Collapse_icon.svg.asset.json";
import iconPathway from "@/assets/nav/inline/icon_pathway.svg.asset.json";
import iconBluebook from "@/assets/nav/inline/icon_bluebook.svg.asset.json";
import iconNetwork from "@/assets/nav/inline/icon_network.svg.asset.json";
import iconProfile from "@/assets/nav/inline/icon_user_profile.svg.asset.json";
import iconSchedule from "@/assets/nav/inline/icon_schedule.svg.asset.json";
import iconSettings from "@/assets/nav/icon_Settings.svg.asset.json";
import userAvatar from "@/assets/nav/User_Profile.svg.asset.json";

const COLLAPSED_W = 115;
const EXPANDED_W = 224;
const SELECTED_BG = "#3355F6";

type NavId = "pathway" | "bluebook" | "network" | "profile" | "schedule";
const NAV_ITEMS: {
  id: NavId;
  label: string;
  icon: string;
}[] = [
  { id: "pathway", label: "Pathway", icon: iconPathway.url },
  { id: "bluebook", label: "Blue Book", icon: iconBluebook.url },
  { id: "network", label: "Network", icon: iconNetwork.url },
  { id: "profile", label: "My Profile", icon: iconProfile.url },
  { id: "schedule", label: "Schedule", icon: iconSchedule.url },
];

const ITEM_H = 52;
const ITEM_W_COLLAPSED = 65;
const ITEM_W_EXPANDED = 184;

type Selection = NavId | null;

export function HomeSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const [selected, setSelected] = useState<Selection>(null);
  const [hovered, setHovered] = useState<NavId | null>(null);
  const width = collapsed ? COLLAPSED_W : EXPANDED_W;
  const itemW = collapsed ? ITEM_W_COLLAPSED : ITEM_W_EXPANDED;

  const renderItem = (
    id: NavId,
    label: string,
    icon: string,
  ) => {
    const isSelected = selected === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => setSelected(id)}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
        aria-label={label}
        aria-current={isSelected ? "page" : undefined}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 12,
          width: itemW,
          height: ITEM_H,
          borderRadius: 8,
          background: isSelected ? SELECTED_BG : "transparent",
          border: "none",
          cursor: "pointer",
          padding: collapsed ? 0 : "0 14px",
          justifyContent: collapsed ? "center" : "flex-start",
          color: "#FFFFFF",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          fontSize: 14,
          transition: "background 150ms ease",
        }}
      >
        <img
          src={icon}
          alt=""
          style={{ width: 20, height: 20, display: "block" }}
        />
        {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
        {collapsed && hovered === id && (
          <span
            style={{
              position: "absolute",
              left: "calc(100% + 12px)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#3D3D45",
              color: "#FFFFFF",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              borderRadius: 4,
              padding: "6px 10px",
              whiteSpace: "nowrap",
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            {label}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className="absolute top-0 left-0 z-20 bg-black"
      style={{ width, height: "100%", transition: "width 200ms ease", overflowY: "auto", overflowX: "visible" }}
    >
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          padding: collapsed ? "24px 0 24px" : "28px 20px 24px",
          alignItems: collapsed ? "center" : "stretch",
          gap: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: 60,
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-start",
            width: "100%",
          }}
        >
          <img
            src={collapsed ? shortLogo.url : fullLogo.url}
            alt="RightStepAhead"
            style={{
              height: collapsed ? 32 : 28,
              width: "auto",
              display: "block",
            }}
          />
        </div>

        {/* Main nav — vertically centered */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              alignItems: collapsed ? "center" : "stretch",
            }}
          >
            {NAV_ITEMS.map((it) => renderItem(it.id, it.label, it.icon))}
          </nav>
        </div>

        {/* Bottom: avatar + settings */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: collapsed ? "center" : "flex-start",
            width: "100%",
          }}
        >
          <img
            src={userAvatar.url}
            alt="Your profile"
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              display: "block",
              marginLeft: collapsed ? 0 : 4,
            }}
          />
          <button
            type="button"
            aria-label="Settings"
            style={{
              width: 40,
              height: 40,
              padding: 0,
              marginLeft: collapsed ? 0 : 4,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={iconSettings.url}
              alt=""
              style={{ width: 40, height: 40, display: "block" }}
            />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
        className="fixed z-40 flex items-center justify-center bg-black"
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
