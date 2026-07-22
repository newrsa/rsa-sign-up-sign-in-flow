import { useState, useRef, useEffect } from "react";
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

const CAREER_CARDS = [
  { img: imgPhd.url, title: "PhD in Physics", subtitle: "Explore the mysteries of the universe." },
  { img: imgElec.url, title: "Electronics Engineer", subtitle: "Turn ideas into innovative technology." },
  { img: imgClin.url, title: "Clinical Researcher", subtitle: "Improve lives through scientific discovery." },
];

export function UntitledPath() {
  const [title, setTitle] = useState("Untitled Path");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  return (
    <div className="absolute inset-0 flex" style={{ background: "#0e0f13" }}>
      {/* LEFT: RSA CANVAS */}
      <div className="relative flex-1 flex flex-col" style={{ borderRight: "1px solid #272735" }}>
        {/* Header */}
        <div className="flex items-center gap-2" style={{ padding: "28px 40px 0 40px" }}>
          <img src={iconCanvas.url} alt="" style={{ width: 18, height: 17 }} />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
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
            borderRadius: 0,
            background: "#08080f",
            border: "none",
          }}
        >
          {editing ? (
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") setEditing(false);
              }}
              className="bg-transparent outline-none border-0 w-full font-semibold"
              style={{
                fontFamily: "'Outfit', sans-serif",
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
                fontFamily: "'Outfit', sans-serif",
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
                  width: "12%",
                  height: "100%",
                  borderRadius: 999,
                  backgroundImage: "linear-gradient(90deg, #002AF4 0%, #02D9DD 100%)",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 12,
                textAlign: "right",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "#9090B0",
              }}
            >
              0% Complete
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center" style={{ paddingBottom: 60 }}>
          <img src={iconGradCanvas.url} alt="" style={{ width: 80, height: 78 }} />
          <p
            style={{
              marginTop: 28,
              textAlign: "center",
              maxWidth: 380,
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.5,
              color: "#6b6b76",
            }}
          >
            Chat with RSA Engine to start building your roadmap.
          </p>
        </div>
      </div>

      {/* RIGHT: RSA ENGINE */}
      <div className="relative flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2" style={{ padding: "28px 40px 0 40px" }}>
          <img src={iconRsabotSmall.url} alt="" style={{ width: 16, height: 16 }} />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
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
        <div className="flex-1 overflow-y-auto" style={{ padding: "40px 40px 0 40px" }}>
          <div className="flex flex-col items-center" style={{ marginTop: 40 }}>
            <img src={iconRsabotLarge.url} alt="" style={{ width: 64, height: 65 }} />
            <p
              style={{
                marginTop: 20,
                fontFamily: "'Outfit', sans-serif",
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
                fontFamily: "'Outfit', sans-serif",
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
                        fontFamily: "'Outfit', sans-serif",
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
                        fontFamily: "'Outfit', sans-serif",
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
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "#9090B0",
            }}
          >
            Keep refining your career path until you feel confident.
          </p>
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask RSA anything about your path..."
              className="flex-1 bg-transparent outline-none"
              style={{
                fontFamily: "'Outfit', sans-serif",
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
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "none",
                background: "#00DCDF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Send className="h-4 w-4" style={{ color: "#000" }} />
            </button>
          </div>
          <p
            style={{
              marginTop: 10,
              textAlign: "center",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              color: "#6b6b76",
            }}
          >
            RSA Engine · Powered by Right Step Ahead intelligence
          </p>
        </div>
      </div>
    </div>
  );
}
