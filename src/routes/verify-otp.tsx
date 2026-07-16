import { createFileRoute } from "@tanstack/react-router";
import { FigmaShell } from "@/components/figma/Shell";
import {
  AspirationalCopy,
  FormInput,
  PrimaryButton,
  SignupCard,
} from "@/components/figma/SignupCard";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({ meta: [{ title: "Verify OTP · RightStepAhead" }] }),
  component: VerifyOtp,
});

function VerifyOtp() {
  return (
    <FigmaShell>
      <AspirationalCopy
        title="Believe in your ability to grow,"
        subtitle="Because every expert was once a beginner."
      />
      <SignupCard
        fieldSlot={<FormInput placeholder="Enter OTP" />}
        extraBelowInput={
          <>
            <p
              className="absolute"
              style={{
                left: 36 + 288,
                top: 169 + 502,
                fontSize: 12,
                color: "#6177ff",
                fontFamily: "Outfit, sans-serif",
                fontWeight: 600,
              }}
            >
              00:59
            </p>
            <p
              className="absolute"
              style={{
                left: 36 + 288,
                top: 169 + 502,
              }}
            />
            <p
              className="absolute"
              style={{
                left: 36,
                top: 169 + 502,
                fontSize: 12,
                color: "#6b6b76",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Didn't receive it?
            </p>
            <a
              href="#"
              className="absolute font-semibold"
              style={{
                left: 36 + 92,
                top: 169 + 502,
                fontSize: 12,
                color: "#6177ff",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Resend OTP
            </a>
          </>
        }
        actionButton={<PrimaryButton label="Send OTP" top={538} />}
      />
    </FigmaShell>
  );
}
