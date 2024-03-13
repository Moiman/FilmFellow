import type { Metadata } from "next";
import "../sass/style.scss";

export const metadata: Metadata = {
  title: "FilmFellow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
