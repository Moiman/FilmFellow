import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "../sass/style.scss";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-poppins" });
const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
  variable: "--font-roboto",
});

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
      <body className={`${poppins.variable} ${roboto.variable}`}>{children}</body>
    </html>
  );
}
