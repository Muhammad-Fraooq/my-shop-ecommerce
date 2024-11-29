import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navber";
import { ProductsProvider } from "./context/ProductsContext";
import Footer from '@/components/Footer'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MyStore - Your Ultimate Online Shop",
  description: "Explore a wide range of products at unbeatable prices. Shop now at MyStore!",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        <ProductsProvider>
          {children}
          </ProductsProvider>
        <Footer/>
      </body>
    </html>
  );
}
