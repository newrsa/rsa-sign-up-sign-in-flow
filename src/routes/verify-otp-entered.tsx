import { createFileRoute } from "@tanstack/react-router";
import { FigmaShell } from "@/components/figma/Shell";
import {
  AspirationalCopy,
  FormInput,
  PrimaryButton,
  SignupCard,
} from "@/components/figma/SignupCard";

export const Route = createFileRoute("/verify-otp-entered")({
  head: () => ({ meta: [{ title: "Verify OTP · Entered · RightStepAhead" }] }),
  component: VerifyOtpEntered,
});

function VerifyOtpEntered() {
  return (
    <FigmaShell>
      <AspirationalCopy
        title="Believe in your ability to grow,"
        subtitle="Because every expert was once a beginner."
      />
      <SignupCard
        fieldSlot={<FormInput placeholder="" value="5 6 4 6 8 9" filled />}
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
        actionButton={<PrimaryButton label="Verify Code" top={538} />}
      />
    </FigmaShell>
  );
}
