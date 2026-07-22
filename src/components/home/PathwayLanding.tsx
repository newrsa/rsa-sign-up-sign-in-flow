import helloIcon from "@/assets/pathway/icon_hello.svg.asset.json";
import createBtn from "@/assets/pathway/create_new_aspiration.svg.asset.json";
import pathwayBg from "@/assets/pathway/pathway_bg.png.asset.json";

export function PathwayLanding() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "#0e0f13" }}>
      {/* Background image on the right */}
      <img
        src={pathwayBg.url}
        alt=""
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "right center", opacity: 0.9 }}
      />
      {/* Left gradient to darken left half for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #0e0f13 0%, rgba(14,15,19,0.92) 45%, rgba(14,15,19,0.35) 75%, rgba(14,15,19,0.05) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative"
        style={{
          paddingLeft: 96,
          paddingTop: 140,
          maxWidth: 900,
        }}
      >
        {/* Hi Mohit */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={helloIcon.url} alt="" style={{ width: 24, height: 24, display: "block" }} />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: 20,
              color: "#9090B0",
            }}
          >
            Hi Mohit,
          </span>
        </div>

        {/* Every meaningful */}
        <p
          style={{
            marginTop: 16,
            marginBottom: 0,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: 22,
            color: "#FFFFFF",
            lineHeight: 1.35,
          }}
        >
          Every meaningful achievement starts with a clear aspiration.
        </p>

        {/* Gradient headline */}
        <h1
          style={{
            marginTop: 12,
            marginBottom: 0,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: 30,
            lineHeight: 1.25,
            backgroundImage: "linear-gradient(90deg, #002AF4 0%, #02D9DD 55%, #5BB947 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            maxWidth: 720,
          }}
        >
          Start with your aspiration. We'll help you build the path to get there.
        </h1>

        {/* Create New Aspiration button */}
        <button
          type="button"
          style={{
            marginTop: 40,
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "block",
          }}
          aria-label="Create New Aspiration"
        >
          <img src={createBtn.url} alt="Create New Aspiration" style={{ display: "block" }} />
        </button>

        {/* Watch and Get Inspired */}
        <button
          type="button"
          style={{
            marginTop: 20,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#6177FF",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="6" width="14" height="12" rx="2" stroke="#6177FF" strokeWidth="2" />
            <path d="M16 10l6-3v10l-6-3v-4z" stroke="#6177FF" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          Watch and Get Inspired
        </button>
      </div>
    </div>
  );
}
