import { createFileRoute } from "@tanstack/react-router";
import { FigmaShell } from "@/components/figma/Shell";
import {
  AspirationalCopy,
  FormInput,
  PrimaryButton,
  SignupCard,
} from "@/components/figma/SignupCard";

export const Route = createFileRoute("/signup-mobile")({
  head: () => ({ meta: [{ title: "Sign Up · Mobile · RightStepAhead" }] }),
  component: SignupMobile,
});

function SignupMobile() {
  return (
    <FigmaShell>
      <AspirationalCopy
        title="Believe in your ability to grow,"
        subtitle="Because every expert was once a beginner."
      />
      <SignupCard
        fieldSlot={<FormInput placeholder="" value="91-9876543210" filled />}
        actionButton={<PrimaryButton label="Send OTP" top={498} />}
      />
    </FigmaShell>
  );
}
