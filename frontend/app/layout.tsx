import type { Metadata } from "next";
import "../sass/style.scss";
import { Poppins, Roboto } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-poppins" });
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
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
