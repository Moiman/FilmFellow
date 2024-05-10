import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import "@/sass/style.scss";
import { Poppins, Roboto } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import SessionProvider from "@/components/sessionProvider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <SessionProvider session={session}>
          <Header />
          <ToastContainer
            autoClose={4000}
            newestOnTop
            draggable
            toastClassName="custom-toastify"
          />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
