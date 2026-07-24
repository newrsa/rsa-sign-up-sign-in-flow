import { useState, useRef, useEffect, type ReactNode } from "react";
import { Send, Pencil } from "lucide-react";
import iconCanvas from "@/assets/untitled-path/icon_canvas.svg.asset.json";
import iconGradCanvas from "@/assets/untitled-path/icon_grad_canvas.svg.asset.json";
import iconRsabotLarge from "@/assets/untitled-path/icon_rsabot_large.svg.asset.json";
import iconRsabotSmall from "@/assets/untitled-path/icon_rsabot_small.svg.asset.json";
import iconAttachment from "@/assets/untitled-path/icon_attachment.svg.asset.json";
import iconVoice from "@/assets/untitled-path/icon_voice_input.svg.asset.json";
import imgPhd from "@/assets/untitled-path/image_phd_physics.png.asset.json";
import imgElec from "@/assets/untitled-path/image_electronics_engineer.png.asset.json";
import imgClin from "@/assets/untitled-path/image_clinical_researcher.png.asset.json";
import iconTimeline from "@/assets/untitled-path/tabs/icon_timeline.svg.asset.json";
import iconCards from "@/assets/untitled-path/tabs/icon_cards.svg.asset.json";
import iconMilestone from "@/assets/untitled-path/tabs/icon_milestone.svg.asset.json";
import iconAccOpen from "@/assets/untitled-path/tabs/accordion_open.svg.asset.json";
import iconAccClose from "@/assets/untitled-path/tabs/accordion_close.svg.asset.json";

const CAREER_CARDS = [
  { img: imgPhd.url, title: "PhD in Physics", subtitle: "Explore the mysteries of the universe." },
  { img: imgElec.url, title: "Electronics Engineer", subtitle: "Turn ideas into innovative technology." },
  { img: imgClin.url, title: "Clinical Researcher", subtitle: "Improve lives through scientific discovery." },
];

type ChatMessage = {
  role: "user" | "assistant";
  content: ReactNode;
};

const OUTFIT = "'Outfit', sans-serif";

const FOUNDATION_TASKS = [
  "Class 8–9th standard — Focus on important subjects like — Mathematics, Science",
  "Watch and subscribe youtube channels related to learning add on as beginner",
  "Join school's science club or the one near you",
  "Score 80%+ in Maths and Science in 9th std this is important for Class 10",
];

function titleCase(s: string) {
  return s
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function derivePathTitle(message: string): { title: string; career: string } {
  const m = message.match(/tell me (?:more )?about (?:a |an |the )?(.+?)[.?!]*$/i);
  const career = titleCase((m?.[1] ?? message).replace(/[.?!]+$/g, ""));
  const article = /^[aeiou]/i.test(career) ? "an" : "a";
  return { title: `Your path to become ${article} ${career}`, career };
}

function AssistantReply({ onAddToPath }: { onAddToPath: () => void }) {
  return (
    <div style={{ color: "#E6E6EE", fontFamily: OUTFIT, fontSize: 14, lineHeight: 1.6 }}>
      <p style={{ margin: 0, fontWeight: 400 }}>
        For Class 8–9 foundation, focus on three pillars:
      </p>
      <div style={{ marginTop: 14 }}>
        <p style={{ margin: 0, fontWeight: 700, color: "#FFFFFF" }}>Mathematics:</p>
        <p style={{ margin: "2px 0 0", fontWeight: 300 }}>
          Algebra, geometry, coordinate systems — all foundational for JEE later.
        </p>
      </div>
      <div style={{ marginTop: 12 }}>
        <p style={{ margin: 0, fontWeight: 700, color: "#FFFFFF" }}>Physics:</p>
        <p style={{ margin: "2px 0 0", fontWeight: 300 }}>
          Attend every practical. ICSE practical marks can swing your grade by 10–15%.
        </p>
      </div>
      <div style={{ marginTop: 12 }}>
        <p style={{ margin: 0, fontWeight: 700, color: "#FFFFFF" }}>Hobby Electronics:</p>
        <p style={{ margin: "2px 0 0", fontWeight: 300 }}>
          Start with Arduino kits. Hands-on curiosity now = stronger concepts in college.
        </p>
      </div>
      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["Share ICSE Practical Tips", "Foundational YouTube Courses"].map((t) => (
          <button
            key={t}
            type="button"
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              background: "transparent",
              border: "1px solid #2b2b3a",
              color: "#FFFFFF",
              fontFamily: OUTFIT,
              fontWeight: 400,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
        <button
          type="button"
          onClick={onAddToPath}
          style={{
            padding: "8px 14px",
            borderRadius: 999,
            background: "transparent",
            border: "1px solid #00494a",
            color: "#00DCDF",
            fontFamily: OUTFIT,
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          + Add this to my foundation phase
        </button>
      </div>
    </div>
  );
}

type TabKey = "timeline" | "cards" | "milestones";

function PathTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "timeline", label: "Timeline", icon: iconTimeline.url },
    { key: "cards", label: "Cards", icon: iconCards.url },
    { key: "milestones", label: "Milestones", icon: iconMilestone.url },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: "1px solid #1e1e2a",
        borderBottom: "1px solid #1e1e2a",
        background: "#0e0f13",
      }}
    >
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px 0",
              background: isActive ? "#1a1a24" : "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: OUTFIT,
              fontWeight: isActive ? 600 : 400,
              fontSize: 15,
              color: isActive ? "#FFFFFF" : "#9090B0",
            }}
          >
            <img
              src={t.icon}
              alt=""
              style={{
                width: 16,
                height: 16,
                filter: isActive ? "brightness(0) invert(1)" : "none",
              }}
            />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function TimelineView({
  checks,
  onToggle,
  expanded,
  onToggleExpanded,
}: {
  checks: boolean[];
  onToggle: (i: number) => void;
  expanded: boolean;
  onToggleExpanded: () => void;
}) {
  return (
    <div style={{ padding: "24px 40px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <button
          type="button"
          onClick={onToggleExpanded}
          style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", marginTop: 4 }}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          <img src={(expanded ? iconAccClose : iconAccOpen).url} alt="" style={{ width: 16, height: 16 }} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <h3
              style={{
                margin: 0,
                fontFamily: OUTFIT,
                fontWeight: 600,
                fontSize: 18,
                color: "#FFFFFF",
              }}
            >
              Class 8–9 (Now) — Build Foundations
            </h3>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                background: "rgba(91,185,71,0.12)",
                border: "1px solid #5BB947",
                color: "#5BB947",
                fontFamily: OUTFIT,
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.12em",
                whiteSpace: "nowrap",
              }}
            >
              ACTIVE
            </span>
          </div>
          <p
            style={{
              margin: "10px 0 0",
              fontFamily: OUTFIT,
              fontWeight: 300,
              fontSize: 14,
              lineHeight: 1.5,
              color: "#9090B0",
            }}
          >
            Build basics in Physics &amp; Maths. Start hobby electronics. Score 80%+.
          </p>

          {expanded && (
            <>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                {FOUNDATION_TASKS.map((task, i) => {
                  const checked = checks[i];
                  return (
                    <label
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 8,
                        background: "#0f0f18",
                        border: "1px solid #1e1e2a",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        onClick={(e) => {
                          e.preventDefault();
                          onToggle(i);
                        }}
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 4,
                          background: checked ? "#3355F6" : "transparent",
                          border: checked ? "1px solid #3355F6" : "1.5px solid #3a3a48",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1 5L4 8L9 2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span
                        style={{
                          fontFamily: OUTFIT,
                          fontWeight: 400,
                          fontSize: 14,
                          color: checked ? "#6b6b76" : "#E6E6EE",
                          textDecoration: checked ? "line-through" : "none",
                        }}
                      >
                        {task}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid #3355F6",
                    color: "#3355F6",
                    fontFamily: OUTFIT,
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  <Pencil style={{ width: 14, height: 14 }} /> Modify
                </button>
                <button
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 16px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid #3355F6",
                    color: "#3355F6",
                    fontFamily: OUTFIT,
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  <img src={iconRsabotSmall.url} alt="" style={{ width: 16, height: 16 }} />
                  Modify with Chat
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CardsView({ checks }: { checks: boolean[] }) {
  const done = checks.filter(Boolean).length;
  return (
    <div style={{ padding: "24px 40px" }}>
      <div
        style={{
          padding: 20,
          borderRadius: 12,
          background: "#0f0f18",
          border: "1px solid #1e1e2a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontFamily: OUTFIT, fontWeight: 600, fontSize: 16, color: "#FFFFFF" }}>
            Class 8–9 (Now) — Build Foundations
          </h3>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              background: "rgba(91,185,71,0.12)",
              border: "1px solid #5BB947",
              color: "#5BB947",
              fontFamily: OUTFIT,
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.12em",
            }}
          >
            ACTIVE
          </span>
        </div>
        <p style={{ margin: "10px 0 14px", fontFamily: OUTFIT, fontWeight: 300, fontSize: 14, color: "#9090B0" }}>
          Build basics in Physics &amp; Maths. Start hobby electronics. Score 80%+.
        </p>
        <div style={{ fontFamily: OUTFIT, fontSize: 13, color: "#9090B0" }}>
          {done} of {FOUNDATION_TASKS.length} tasks complete
        </div>
      </div>
    </div>
  );
}

function MilestonesView() {
  return (
    <div style={{ padding: "24px 40px" }}>
      <div style={{ display: "flex", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#3355F6",
              boxShadow: "0 0 0 4px rgba(51,85,246,0.2)",
            }}
          />
          <div style={{ width: 2, flex: 1, background: "#1e1e2a", marginTop: 4 }} />
        </div>
        <div style={{ flex: 1, paddingBottom: 20 }}>
          <p style={{ margin: 0, fontFamily: OUTFIT, fontWeight: 600, fontSize: 15, color: "#FFFFFF" }}>
            Class 8–9 — Build Foundations
          </p>
          <p style={{ margin: "4px 0 0", fontFamily: OUTFIT, fontWeight: 300, fontSize: 13, color: "#9090B0" }}>
            Score 80%+ in Maths &amp; Science. Start Arduino projects.
          </p>
        </div>
      </div>
    </div>
  );
}

export function UntitledPath() {
  const [title, setTitle] = useState("Untitled Path");
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [hasPath, setHasPath] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [pathBuilt, setPathBuilt] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("timeline");
  const [expanded, setExpanded] = useState(true);
  const [checks, setChecks] = useState<boolean[]>([true, false, false, false]);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing) {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }
  }, [editing]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  const progressPct = pathBuilt ? 10 : 0;

  const buildPath = () => {
    setPathBuilt(true);
    setActiveTab("timeline");
    setExpanded(true);
  };

  const sendText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    if (!hasPath) {
      const { title: newTitle } = derivePathTitle(trimmed);
      setTitle(newTitle);
      setSubtitle("ICSE → PCM → JEE → B.E. Electronics");
      setHasPath(true);
    }

    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setMessage("");

    const isAddToPath = /add\s+(this\s+)?to\s+my\s+(foundation|path)/i.test(trimmed);

    setIsThinking(true);
    setTimeout(() => {
      if (isAddToPath) {
        buildPath();
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: (
              <div style={{ color: "#E6E6EE", fontFamily: OUTFIT, fontSize: 14, lineHeight: 1.6 }}>
                Done — I&apos;ve added <strong style={{ color: "#FFFFFF" }}>Build Foundations</strong> to your path.
                Open the <strong style={{ color: "#FFFFFF" }}>Timeline</strong> on the left to track your tasks.
              </div>
            ),
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: <AssistantReply onAddToPath={() => sendText("Add this to my foundation phase")} /> },
        ]);
      }
      setIsThinking(false);
    }, 1200);
  };

  const send = () => sendText(message);

  const chatStarted = messages.length > 0 || isThinking;

  return (
    <div className="absolute inset-0 flex" style={{ background: "#0e0f13" }}>
      {/* LEFT: RSA CANVAS */}
      <div className="relative flex-1 flex flex-col" style={{ borderRight: "1px solid #272735" }}>
        {/* Header */}
        <div className="flex items-center gap-2" style={{ padding: "28px 40px 0 40px" }}>
          <img src={iconCanvas.url} alt="" style={{ width: 18, height: 17 }} />
          <span
            style={{
              fontFamily: OUTFIT,
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.12em",
              color: "#5BB947",
            }}
          >
            RSA CANVAS
          </span>
        </div>

        {/* Title + progress card */}
        <div
          style={{
            margin: "24px 0 0 0",
            padding: "20px 40px",
            background: "#08080f",
          }}
        >
          {editing ? (
            <input
              ref={titleInputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") setEditing(false);
              }}
              className="bg-transparent outline-none border-0 w-full font-semibold"
              style={{
                fontFamily: OUTFIT,
                fontWeight: 600,
                fontSize: 16,
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
                padding: 0,
              }}
            />
          ) : (
            <h1
              onClick={() => setEditing(true)}
              title="Click to rename"
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: OUTFIT,
                fontWeight: 600,
                fontSize: 16,
                color: "#FFFFFF",
                letterSpacing: "-0.5px",
                cursor: "pointer",
              }}
            >
              {title}
              <Pencil style={{ width: 14, height: 14, color: "#9090B0" }} />
            </h1>
          )}

          {subtitle && (
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: OUTFIT,
                fontWeight: 300,
                fontSize: 13,
                color: "#9090B0",
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Progress bar */}
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 6,
                borderRadius: 999,
                background: "#1e1e2a",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.max(progressPct, 12)}%`,
                  height: "100%",
                  borderRadius: 999,
                  backgroundImage: "linear-gradient(90deg, #002AF4 0%, #02D9DD 100%)",
                  transition: "width 400ms ease",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 12,
                textAlign: "right",
                fontFamily: OUTFIT,
                fontWeight: 500,
                fontSize: 14,
                color: "#9090B0",
              }}
            >
              {progressPct}% Complete
            </div>
          </div>
        </div>

        {pathBuilt ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <PathTabs active={activeTab} onChange={setActiveTab} />
            <div className="flex-1 overflow-y-auto">
              {activeTab === "timeline" && (
                <TimelineView
                  checks={checks}
                  onToggle={(i) =>
                    setChecks((c) => c.map((v, idx) => (idx === i ? !v : v)))
                  }
                  expanded={expanded}
                  onToggleExpanded={() => setExpanded((e) => !e)}
                />
              )}
              {activeTab === "cards" && <CardsView checks={checks} />}
              {activeTab === "milestones" && <MilestonesView />}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center" style={{ paddingBottom: 60 }}>
            <img src={iconGradCanvas.url} alt="" style={{ width: 80, height: 78 }} />
            <p
              style={{
                marginTop: 28,
                textAlign: "center",
                maxWidth: 380,
                fontFamily: OUTFIT,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.5,
                color: "#6b6b76",
              }}
            >
              Chat with RSA Engine to start building your roadmap.
            </p>
          </div>
        )}
      </div>

      {/* RIGHT: RSA ENGINE */}
      <div className="relative flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2" style={{ padding: "28px 40px 0 40px" }}>
          <img src={iconRsabotSmall.url} alt="" style={{ width: 16, height: 16 }} />
          <span
            style={{
              fontFamily: OUTFIT,
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.12em",
            }}
          >
            <span style={{ color: "#5BB947" }}>RSA ENGINE</span>
            <span style={{ color: "#FFFFFF", margin: "0 6px" }}>•</span>
            <span style={{ color: "#FFFFFF" }}>Active</span>
          </span>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ padding: "40px 40px 0 40px" }}>
          {!chatStarted ? (
            <>
              <div className="flex flex-col items-center" style={{ marginTop: 40 }}>
                <img src={iconRsabotLarge.url} alt="" style={{ width: 64, height: 65 }} />
                <p
                  style={{
                    marginTop: 20,
                    fontFamily: OUTFIT,
                    fontWeight: 600,
                    fontSize: 20,
                    color: "#FFFFFF",
                  }}
                >
                  RSA Engine is ready
                </p>
                <p
                  style={{
                    marginTop: 16,
                    maxWidth: 520,
                    textAlign: "center",
                    fontFamily: OUTFIT,
                    fontWeight: 300,
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "#9090B0",
                  }}
                >
                  Based on your interests, achievements, skills, and learning profile, here are a few
                  career paths that may suit your strengths.
                </p>
              </div>

              {/* Career cards */}
              <div
                style={{
                  marginTop: 40,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 16,
                }}
              >
                {CAREER_CARDS.map((c) => (
                  <button
                    key={c.title}
                    type="button"
                    className="text-left"
                    style={{
                      padding: 0,
                      border: "1px solid #1e1e2a",
                      borderRadius: 12,
                      background: "#08080f",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", overflow: "hidden" }}>
                      <img
                        src={c.img}
                        alt={c.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                        }}
                      />
                      <div style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: OUTFIT,
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#FFFFFF",
                          }}
                        >
                          {c.title}
                        </p>
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontFamily: OUTFIT,
                            fontWeight: 300,
                            fontSize: 13,
                            lineHeight: 1.35,
                            color: "#D8D8E0",
                          }}
                        >
                          {c.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <p
                style={{
                  marginTop: 32,
                  fontFamily: OUTFIT,
                  fontWeight: 400,
                  fontSize: 15,
                  color: "#9090B0",
                }}
              >
                Keep refining your career path until you feel confident.
              </p>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 20 }}>
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                    <div style={{ maxWidth: "78%", textAlign: "right" }}>
                      <div
                        style={{
                          display: "inline-block",
                          padding: "12px 16px",
                          borderRadius: 12,
                          background: "#1a1a24",
                          border: "1px solid #23232f",
                          color: "#FFFFFF",
                          fontFamily: OUTFIT,
                          fontWeight: 400,
                          fontSize: 14,
                          lineHeight: 1.5,
                          textAlign: "left",
                        }}
                      >
                        {m.content}
                      </div>
                      <div
                        style={{
                          marginTop: 6,
                          fontFamily: OUTFIT,
                          fontWeight: 400,
                          fontSize: 11,
                          color: "#6b6b76",
                          letterSpacing: "0.08em",
                        }}
                      >
                        JUST NOW
                      </div>
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "#3355f6",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: OUTFIT,
                        fontWeight: 600,
                        fontSize: 12,
                        flexShrink: 0,
                      }}
                    >
                      MM
                    </div>
                  </div>
                ) : (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <BotIconSmallBlink size={24} style={{ flexShrink: 0, marginTop: 0 }} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      {m.content}
                      <div
                        style={{
                          marginTop: 10,
                          fontFamily: OUTFIT,
                          fontWeight: 400,
                          fontSize: 11,
                          color: "#6b6b76",
                          letterSpacing: "0.08em",
                        }}
                      >
                        JUST NOW
                      </div>
                    </div>
                  </div>
                )
              )}

              {isThinking && (
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <img src={iconRsabotSmall.url} alt="" className="rsa-bot-blink" style={{ width: 24, height: 24 }} />
                  <div
                    style={{
                      fontFamily: OUTFIT,
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#9090B0",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    RSA Engine is thinking
                    <span className="thinking-dots" style={{ display: "inline-flex", gap: 3 }}>
                      <span style={dotStyle(0)} />
                      <span style={dotStyle(150)} />
                      <span style={dotStyle(300)} />
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Chat input */}
        <div style={{ padding: "16px 40px 20px 40px" }}>
          <div
            className="flex items-center gap-3"
            style={{
              padding: "10px 10px 10px 10px",
              borderRadius: 12,
              background: "#0f0f18",
              border: "1px solid #00494a",
            }}
          >
            <button
              type="button"
              aria-label="Attach"
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "block" }}
            >
              <img src={iconAttachment.url} alt="" style={{ width: 29, height: 29, display: "block" }} />
            </button>
            <input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask RSA anything about your path..."
              className="flex-1 bg-transparent outline-none"
              style={{
                fontFamily: OUTFIT,
                fontWeight: 400,
                fontSize: 15,
                color: "#FFFFFF",
              }}
            />
            <button
              type="button"
              aria-label="Voice"
              style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "block" }}
            >
              <img src={iconVoice.url} alt="" style={{ width: 28, height: 28, display: "block" }} />
            </button>
            <button
              type="button"
              aria-label="Send"
              onClick={send}
              disabled={isThinking || !message.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "none",
                background: "#00DCDF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isThinking || !message.trim() ? "not-allowed" : "pointer",
                opacity: isThinking || !message.trim() ? 0.5 : 1,
              }}
            >
              <Send className="h-4 w-4" style={{ color: "#000" }} />
            </button>
          </div>
          <p
            style={{
              marginTop: 10,
              textAlign: "center",
              fontFamily: OUTFIT,
              fontWeight: 400,
              fontSize: 12,
              color: "#6b6b76",
            }}
          >
            RSA Engine · Powered by Right Step Ahead intelligence
          </p>
        </div>
      </div>

      <style>{`
        @keyframes rsaBlink {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
        @keyframes rsaBotBlink {
          0%, 92%, 100% { transform: scaleY(1); }
          95%, 97% { transform: scaleY(0.1); }
        }
        .rsa-bot-blink {
          animation: rsaBotBlink 4s infinite ease-in-out;
          transform-origin: center 55%;
          will-change: transform;
        }
      `}</style>

    </div>
  );
}

function dotStyle(delayMs: number): React.CSSProperties {
  return {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#9090B0",
    display: "inline-block",
    animation: `rsaBlink 1.2s ${delayMs}ms infinite ease-in-out`,
  };
}
