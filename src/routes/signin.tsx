import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Info, Check } from "lucide-react";
import { FigmaShell } from "@/components/figma/Shell";
import { AspirationalCopy, FormInput } from "@/components/figma/SignupCard";
import rsaLogo from "@/assets/rsa-logo.png.asset.json";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign In · RightStepAhead" },
      { name: "description", content: "Sign in to your RightStepAhead account." },
    ],
  }),
  component: SigninScreen,
});

const CARD_LEFT = 198;
const CARD_TOP = 130;

function SigninScreen() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const canSubmit = identifier.trim().length > 0 && password.length > 0;

  return (
    <FigmaShell>
      <AspirationalCopy
        messages={[
          {
            title: "Your future isn't decided today!",
            subtitle: "It's shaped by what you choose to learn and do every day.",
          },
          {
            title: "Big dreams begin with small actions.",
            subtitle: "What you do today shapes who you'll become tomorrow.",
          },
        ]}
      />

      <div className="absolute z-10" style={{ left: CARD_LEFT, top: CARD_TOP, width: 434 }}>
        {/* Logo */}
        <div style={{ width: 238, height: 36 }}>
          <img src={rsaLogo.url} alt="RightStepAhead" className="h-9 w-auto object-contain" />
        </div>

        {/* Bordered card */}
        <div
          className="relative mt-[29px] rounded-lg border"
          style={{ borderColor: "#272735", padding: "36px" }}
        >
          <h1
            className="font-semibold tracking-[-0.192px]"
            style={{ fontSize: 22, color: "#f8f8fc", fontFamily: "Outfit, sans-serif" }}
          >
            Decoding Aspirations
          </h1>

          {/* Identifier */}
          <label
            className="block mt-8"
            style={{
              fontSize: 14,
              color: "#f8f8fc",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            Enter Your Email or Mobile Number
          </label>
          <FormInput
            placeholder="Enter your email or mobile number"
            value={identifier}
            onChange={setIdentifier}
          />

          {/* Password */}
          <div className="flex items-center gap-1.5 mt-5" style={{ marginBottom: 8 }}>
            <span
              style={{
                fontSize: 14,
                color: "#f8f8fc",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 500,
              }}
            >
              Password
            </span>
            <Info className="h-3.5 w-3.5" style={{ color: "#9c9ca3" }} />
          </div>
          <div
            className="flex items-center rounded border pl-3 pr-3"
            style={{ background: "#08081a", borderColor: "#393948" }}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent outline-none py-3"
              style={{
                fontSize: 14,
                lineHeight: "18px",
                color: "#e8e8f2",
                fontFamily: "DM Sans, sans-serif",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="flex items-center justify-center"
              style={{ color: "#9c9ca3", background: "transparent", border: 0, cursor: "pointer" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>

          {/* Keep me logged in */}
          <button
            type="button"
            onClick={() => setKeepLoggedIn((v) => !v)}
            className="flex items-center gap-2 mt-4"
            style={{ background: "transparent", border: 0, padding: 0, cursor: "pointer" }}
          >
            <span
              className="flex items-center justify-center rounded-[3px]"
              style={{
                width: 16,
                height: 16,
                background: keepLoggedIn ? "#3355f6" : "transparent",
                border: keepLoggedIn ? "0" : "1.5px solid #6b6b76",
              }}
            >
              {keepLoggedIn && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
            </span>
            <span
              style={{
                fontSize: 14,
                color: "#f8f8fc",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Keep me logged in
            </span>
          </button>

          {/* Sign In button */}
          <button
            type="button"
            onClick={() => canSubmit && navigate({ to: "/home" })}
            disabled={!canSubmit}
            className="w-full flex items-center justify-center rounded px-4 py-[10px] font-bold text-white mt-8"
            style={{
              background: "#3355f6",
              fontSize: 16,
              lineHeight: "24px",
              fontFamily: "Outfit, sans-serif",
              opacity: canSubmit ? 1 : 0.5,
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            Sign In
          </button>

          {/* Footer links */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center" style={{ gap: 6 }}>
              <span style={{ fontSize: 12, color: "#6b6b76", fontFamily: "DM Sans, sans-serif" }}>
                Don't have an account?
              </span>
              <Link
                to="/signup"
                className="font-semibold"
                style={{ fontSize: 12, color: "#6177ff", fontFamily: "Outfit, sans-serif" }}
              >
                Register
              </Link>
            </div>
            <a
              href="#"
              className="font-semibold"
              style={{ fontSize: 12, color: "#6177ff", fontFamily: "Outfit, sans-serif" }}
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      {/* Spacer to preserve overall page height parity with signup */}
      <div style={{ position: "absolute", top: CARD_TOP + 620, left: 0, width: 1, height: 1 }} />
      {/* Hidden reference to PrimaryButton to keep import tree consistent if needed */}
      {false && <PrimaryButton label="" top={0} />}
    </FigmaShell>
  );
}
