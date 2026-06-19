import { Navbar } from "@/components/layout/Navbar";

/** Main marketing site shell — landing pages use `(landing)` instead. */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
