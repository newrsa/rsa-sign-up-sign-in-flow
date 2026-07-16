import { createFileRoute } from "@tanstack/react-router";
import { FigmaShell } from "@/components/figma/Shell";
import {
  AspirationalCopy,
  FormInput,
  PrimaryButton,
  SignupCard,
} from "@/components/figma/SignupCard";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up · RightStepAhead" }] }),
  component: SignupScreen,
});

function SignupScreen() {
  return (
    <FigmaShell>
      <AspirationalCopy
        title="Your future isn't decided today!"
        subtitle="It's shaped by what you choose to learn and do every day."
      />
      <SignupCard
        fieldSlot={<FormInput placeholder="Enter your registered mobile number" type="tel" inputMode="tel" maxLength={15} />}
        actionButton={<PrimaryButton label="Send OTP" top={440} />}
      />
    </FigmaShell>
  );
}
