import primaryNavCollapsed from "@/assets/nav/Primary_Navigation_v2.svg.asset.json";
import primaryNavExpanded from "@/assets/nav/Primary_Navigation_Expanded.svg.asset.json";
import toggleIcon from "@/assets/nav/Expand_Collapse_icon.svg.asset.json";

const COLLAPSED_W = 115;
const EXPANDED_W = 224;

export function HomeSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const width = collapsed ? COLLAPSED_W : EXPANDED_W;
  const navSrc = collapsed ? primaryNavCollapsed.url : primaryNavExpanded.url;

  return (
    <aside
      className="absolute top-0 left-0 z-20 bg-black overflow-y-auto overflow-x-hidden"
      style={{ width, height: "100%", transition: "width 200ms ease" }}
    >
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
