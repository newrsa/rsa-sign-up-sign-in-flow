import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RightStepAhead — Screens Index" },
      { name: "description", content: "Preview index for the RSA Figma screens." },
    ],
  }),
  component: Index,
});

const screens = [
  { to: "/signup", label: "1.1 · Signup (empty)" },
  { to: "/signup-mobile", label: "1.2 · Signup (mobile entered)" },
  { to: "/verify-otp", label: "1.3 · Verify OTP (empty)" },
  { to: "/verify-otp-entered", label: "1.4 · Verify OTP (entered)" },
  { to: "/home", label: "1.5 · Homepage (empty)" },
];

function Index() {
  return (
    <div className="min-h-screen bg-[#0e0f13] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold mb-2">RightStepAhead</h1>
        <p className="text-white/60 mb-8">Figma screen previews.</p>
        <ul className="space-y-3">
          {screens.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to}
                className="block rounded-md border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
