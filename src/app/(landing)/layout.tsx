import { LandingShell } from "@/components/landing/LandingShell";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LandingShell>{children}</LandingShell>;
}
