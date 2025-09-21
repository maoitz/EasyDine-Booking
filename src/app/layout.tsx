import type { Metadata } from "next";
import "../styles/tokens.css"; // our design tokens
import "../styles/globals.css"; // we’ll add later

export const metadata: Metadata = {
  title: "EasyDine",
  description: "Book a table at EasyDine trattoria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
