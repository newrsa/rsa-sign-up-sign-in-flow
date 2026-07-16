import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FigmaShell } from "@/components/figma/Shell";
import {
  AspirationalCopy,
  FormInput,
  PrimaryButton,
  SignupCard,
} from "@/components/figma/SignupCard";
import toastBg from "@/assets/toast-bg.svg.asset.json";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up · RightStepAhead" }] }),
  component: SignupScreen,
});

function SignupScreen() {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastOpacity, setToastOpacity] = useState(1);
  const [seconds, setSeconds] = useState(60);

  const isValid = /^\d{10}$/.test(mobile);

  useEffect(() => {
    if (!otpSent) return;
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpSent, seconds]);

  useEffect(() => {
    if (!showToast) return;
    setToastOpacity(1);
    const fadeTimer = setTimeout(() => setToastOpacity(0), 15000);
    const hideTimer = setTimeout(() => setShowToast(false), 15500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [showToast]);

  const handleSend = () => {
    if (!isValid) return;
    setOtpSent(true);
    setSeconds(60);
    setShowToast(true);
  };

  const handleResend = () => {
    setSeconds(60);
    setShowToast(true);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

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

      {/* Toast — sits directly under title bar, starts after primary nav */}
      {showToast && (
        <div
          className="absolute z-40 flex items-center justify-start pl-6 transition-opacity duration-500"
          style={{
            top: 67,
            left: 115,
            right: 0,
            height: 45,
            opacity: toastOpacity,
          }}
        >
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: `url(${toastBg.url})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              opacity: 0.7,
            }}
          />
          <p
            className="text-left"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "#FFFFFF",
            }}
          >
            A 6-digit code will be sent to this number. Enter it below to continue.
          </p>
        </div>
      )}

      <SignupCard
        fieldSlot={
          otpSent ? (
            <FormInput
              key="otp-input"
              placeholder="Enter OTP"
              inputMode="numeric"
              maxLength={6}
              value=""
              onChange={() => {}}
            />
          ) : (
            <FormInput
              key="mobile-input"
              placeholder="Enter your registered mobile number"
              type="tel"
              inputMode="tel"
              maxLength={10}
              value={mobile}
              onChange={setMobile}
            />
          )
        }
        extraBelowInput={
          otpSent ? (
            <>
              <p
                className="absolute"
                style={{
                  left: 36,
                  top: 433,
                  fontSize: 12,
                  color: "#6b6b76",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                Didn't receive it?
              </p>
              <button
                type="button"
                onClick={handleResend}
                className="absolute font-semibold"
                style={{
                  left: 36 + 92,
                  top: 433,
                  fontSize: 12,
                  color: "#6177ff",
                  fontFamily: "Outfit, sans-serif",
                  background: "transparent",
                  border: 0,
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                Resend OTP
              </button>
              <p
                className="absolute"
                style={{
                  left: 36 + 288,
                  top: 433,
                  fontSize: 12,
                  color: "#6177ff",
                  fontFamily: "Outfit, sans-serif",
                  fontWeight: 600,
                }}
              >
                {mm}:{ss}
              </p>
            </>
          ) : null
        }
        actionButton={
          <PrimaryButton
            label={otpSent ? "Verify Code" : "Send OTP"}
            top={otpSent ? 468 : 440}
            onClick={otpSent ? undefined : handleSend}
            disabled={!otpSent && !isValid}
          />
        }
      />
    </FigmaShell>
  );
}
