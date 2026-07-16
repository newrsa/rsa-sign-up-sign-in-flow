import type { ReactNode } from "react";
import { Bell, BookOpen, Calendar, ChevronLeft, Moon, Sun, User, Users } from "lucide-react";

/**
 * Shared shell used by all 5 Figma screens.
 * Fixed canvas of 1440x1024 to match the Figma frames.
 */
export function FigmaShell({
  children,
  showAfterLoginBell = false,
  showCollapseChevron = false,
}: {
  children?: ReactNode;
  showAfterLoginBell?: boolean;
  showCollapseChevron?: boolean;
}) {
  return (
    <div className="min-h-screen w-full bg-black flex items-start justify-center overflow-x-auto">
      <div className="relative bg-black" style={{ width: 1440, height: 1024 }}>
        {/* Right pane background */}
        <div
          className="absolute top-0 overflow-hidden"
          style={{
            left: 115,
            width: 1325,
            height: 1024,
            background: "#1a1b20",
            borderLeft: "1px solid #404249",
          }}
        >
          {/* Aspiration inner card */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: "calc(50% + 33.5px)",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1324,
              height: 957,
              background: "#0e0f13",
            }}
          />
        </div>

        {/* Decorative background image band (right half) — subtle gradient stand-in */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: -159,
            left: "calc(50% - 3px)",
            width: 739,
            height: 1115,
            opacity: 0.24,
            background:
              "radial-gradient(ellipse at 50% 40%, #2b4a8b 0%, transparent 55%), linear-gradient(180deg, #0c1735 0%, #06070d 100%)",
          }}
        />

        {/* Sidebar (empty / collapsed nav) */}
        <Sidebar />

        {/* Title bar */}
        <TitleBar showBell={showAfterLoginBell} />

        {/* Collapse chevron between sidebar & content */}
        {showCollapseChevron && (
          <div
            className="absolute z-20 flex items-center justify-center rounded-sm border border-white bg-black"
            style={{ left: 107, top: 80, width: 16, height: 10 }}
          >
            <ChevronLeft className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
          </div>
        )}

        {/* "Canvas" gold label */}
        <div
          className="absolute font-bold text-[18px]"
          style={{ color: "#e9c86e", top: 40, left: 140, fontFamily: "Montserrat, sans-serif" }}
        >
          Canvas
        </div>

        {children}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside
      className="absolute top-0 left-0 overflow-hidden bg-black"
      style={{ width: 115, height: 1024 }}
    >
      {/* Decorative diagonal pill 1 */}
      <div
        className="absolute"
        style={{
          left: -376,
          top: 661,
          width: 500,
          height: 504,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: "rotate(44.61deg)",
            width: 146,
            height: 564,
            borderRadius: 84,
            background: "rgba(144,144,176,0.11)",
          }}
        />
      </div>
      {/* Decorative diagonal pill 2 */}
      <div
        className="absolute"
        style={{
          left: -372,
          top: 709,
          width: 500,
          height: 504,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: "rotate(44.61deg)",
            width: 146,
            height: 564,
            borderRadius: 84,
            background: "rgba(144,144,176,0.12)",
          }}
        />
      </div>

      {/* Collapsed nav icons */}
      <nav
        className="absolute flex flex-col gap-3 items-center"
        style={{ left: 24, top: 326, width: 65 }}
      >
        <NavIcon icon={<ChevronLeft className="h-5 w-5 rotate-180" />} />
        <NavIcon icon={<BookOpen className="h-5 w-5" />} />
        <NavIcon icon={<Users className="h-5 w-5" />} />
        <NavIcon icon={<User className="h-5 w-5" />} />
        <NavIcon icon={<Calendar className="h-5 w-5" />} />
      </nav>
    </aside>
  );
}

function NavIcon({ icon }: { icon: ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded px-6 py-4 text-white/85 hover:text-white">
      {icon}
    </div>
  );
}

function TitleBar({ showBell }: { showBell: boolean }) {
  return (
    <div
      className="absolute flex items-center justify-end gap-4 border-b"
      style={{
        top: 0,
        left: 116,
        width: 1324,
        height: 67,
        background: "#1a1b20",
        borderColor: "#404249",
        paddingRight: 34,
      }}
    >
      <ThemeSwitcher />
      {showBell && (
        <button
          className="flex items-center justify-center rounded-lg p-[10px]"
          style={{ background: "#2c2e35" }}
        >
          <Bell className="h-4 w-4 text-white" />
        </button>
      )}
    </div>
  );
}

function ThemeSwitcher() {
  // Light theme variant (as in Figma)
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
