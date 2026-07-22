import { useState, useEffect, type ReactNode } from "react";
import { Apple } from "lucide-react";
import { Link } from "@tanstack/react-router";
import rsaLogo from "@/assets/rsa-logo.png.asset.json";

export function GoogleIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.28 1.48-1.12 2.73-2.39 3.57v2.97h3.86c2.26-2.09 3.58-5.17 3.58-8.78z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.31A7.2 7.2 0 014.9 12c0-.8.14-1.58.37-2.31V6.6H1.29A11.99 11.99 0 000 12c0 1.94.46 3.77 1.29 5.4l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.6l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

// Card sits within the 600px-wide signup section (left edge = 115, width = 600).
// Card is 434 wide, centered → left = 115 + (600-434)/2 = 198.
const CARD_LEFT = 198;
const CARD_TOP = 130;

export function SignupCard({
  fieldSlot,
  actionButton,
  extraBelowInput,
}: {
  fieldSlot: ReactNode;
  actionButton: ReactNode;
  extraBelowInput?: ReactNode;
}) {
  return (
    <div className="absolute z-10" style={{ left: CARD_LEFT, top: CARD_TOP, width: 434, height: 620 }}>
      {/* Logo */}
      <div style={{ width: 238, height: 36 }}>
        <img src={rsaLogo.url} alt="RightStepAhead" className="h-9 w-auto object-contain" />
      </div>

      {/* Bordered card */}
      <div className="absolute rounded-lg border" style={{ top: 65, left: 0, width: 434, height: 513, borderColor: "#272735" }} />

      <h1
        className="absolute font-semibold tracking-[-0.192px]"
        style={{ left: 36, top: 89, fontSize: 22, color: "#f8f8fc", fontFamily: "Outfit, sans-serif" }}
      >
        Decoding Aspirations
      </h1>

      <p
        className="absolute"
        style={{ left: 36, top: 137, width: 277, fontSize: 16, color: "#f8f8fc", letterSpacing: "-0.144px", fontFamily: "Outfit, sans-serif" }}
      >
        Sign up using your email address or mobile number.
      </p>

      <div className="absolute flex flex-col gap-3" style={{ left: 36, top: 205, width: 360 }}>
        <button className="flex items-center justify-center gap-3 rounded px-4 py-[10px]" style={{ background: "#fdfdfd" }}>
          <GoogleIcon />
          <span className="font-medium" style={{ color: "#515151", fontSize: 16, fontFamily: "Outfit, sans-serif", letterSpacing: "-0.144px" }}>
            Sign up with Google
          </span>
        </button>
        <button className="flex items-center justify-center gap-3 rounded px-4 py-[10px]" style={{ background: "#272727" }}>
          <Apple className="h-6 w-6 text-white" fill="white" />
          <span className="font-medium" style={{ color: "#fdfdfd", fontSize: 16, fontFamily: "Outfit, sans-serif", letterSpacing: "-0.144px" }}>
            Sign in with Apple
          </span>
        </button>
      </div>

      <div className="absolute" style={{ left: 36, top: 345, width: 158, height: 1, background: "#404249" }} />
      <div className="absolute" style={{ left: 238, top: 345, width: 158, height: 1, background: "#404249" }} />
      <p className="absolute italic font-medium" style={{ left: 205, top: 336, color: "#b3b3b3", fontSize: 16, fontFamily: "DM Sans, sans-serif" }}>
        Or
      </p>

      <div className="absolute" style={{ left: 36, top: 381, width: 360 }}>
        {fieldSlot}
      </div>

      {extraBelowInput}
      {actionButton}

      <div className="absolute flex items-center" style={{ left: 36, top: 540, gap: 6 }}>
        <p style={{ fontSize: 12, color: "#6b6b76", fontFamily: "DM Sans, sans-serif" }}>
          Already have an account?
        </p>
        <Link to="/signin" className="font-semibold" style={{ fontSize: 12, color: "#6177ff", fontFamily: "Outfit, sans-serif" }}>
          Sign In
        </Link>
      </div>
      <a href="#" className="absolute font-semibold text-right" style={{ right: 38, top: 540, fontSize: 12, color: "#6177ff", fontFamily: "Outfit, sans-serif" }}>
        Forgot Password?
      </a>
    </div>
  );
}

export function FormInput({
  placeholder,
  value,
  filled = false,
  type = "text",
  inputMode,
  maxLength,
  onChange,
}: {
  placeholder: string;
  value?: string;
  filled?: boolean;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric" | "search" | "url" | "none";
  maxLength?: number;
  onChange?: (value: string) => void;
}) {
  const controlled = onChange !== undefined;
  return (
    <div
      className="flex items-center rounded border pl-3 pr-2"
      style={{ background: "#08081a", borderColor: filled ? "#9c9ca3" : "#393948" }}
    >
      <input
        type={type}
        inputMode={inputMode}
        maxLength={maxLength}
        {...(controlled ? { value: value ?? "" } : { defaultValue: value })}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none py-3"
        style={{ fontSize: 14, lineHeight: "18px", color: "#e8e8f2", fontFamily: "DM Sans, sans-serif" }}
      />
    </div>
  );
}

export function PrimaryButton({
  label,
  top,
  onClick,
  disabled = false,
}: {
  label: string;
  top: number;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="absolute flex items-center justify-center rounded px-4 py-[10px] font-bold text-white"
      style={{
        left: 36,
        top,
        width: 360,
        background: "#3355f6",
        fontSize: 16,
        lineHeight: "24px",
        fontFamily: "Outfit, sans-serif",
        boxShadow: "0px 1px 0.25px rgba(29,41,61,0.02)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
}

/**
 * Aspirational copy sits in the right section (starts at x=715, width=725),
 * positioned above the hero image.
 */
export function AspirationalCopy({
  title,
  subtitle,
  messages,
}: {
  title?: string;
  subtitle?: string;
  messages?: { title: string; subtitle: string }[];
}) {
  const allMessages = messages?.length
    ? messages
    : title && subtitle
      ? [{ title, subtitle }]
      : [];

  const hasCarousel = allMessages.length > 1;
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (i: number) => {
    if (i === index || fading || !hasCarousel) return;
    setFading(true);
    setTimeout(() => {
      setIndex(i);
      setFading(false);
    }, 300);
  };

  useEffect(() => {
    if (!hasCarousel) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % allMessages.length);
        setFading(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, [hasCarousel, allMessages.length]);

  const active = allMessages[index] ?? allMessages[0];

  return (
    <div className="absolute z-10" style={{ left: 715 + 44, top: 467, width: 725 - 44 - 44 }}>
      <div
        className="transition-opacity duration-300 ease-out"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <p
          className="text-white"
          style={{
            fontSize: 40,
            lineHeight: 1.2,
            fontFamily: "Outfit, sans-serif",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          {active?.title}
        </p>
        <p
          className="text-white mt-3"
          style={{
            fontSize: 24,
            lineHeight: 1.35,
            fontFamily: "Outfit, sans-serif",
            fontWeight: 500,
          }}
        >
          {active?.subtitle}
        </p>
      </div>
      <div className="flex gap-1 mt-6">
        {hasCarousel ? (
          allMessages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className="block h-[3px] rounded border-0 p-0 transition-all duration-300"
              style={{
                width: i === index ? 12 : 8,
                background: i === index ? "#3355f6" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
              }}
              aria-label={`Show message ${i + 1}`}
            />
          ))
        ) : (
          <>
            <span className="block h-[3px] w-3 rounded bg-[#3355f6]" />
            <span className="block h-[3px] w-2 rounded bg-white/40" />
          </>
        )}
      </div>
    </div>
  );
}
