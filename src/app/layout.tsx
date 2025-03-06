import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bloom",
  description: "Learn words, blossom your world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: "Inter" }}
      >
        {children}
      </body>
    </html>
  );
}
