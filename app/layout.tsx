import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navber"; // Fixed typo
import { ProductsProvider } from "./context/ProductsContext";
import Footer from "@/components/Footer";

// Import local fonts
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

// Import Google Font (Poppins)
const poppins = Inter({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});

// Metadata
export const metadata: Metadata = {
  title: "MyStore - Your Ultimate Online Shop",
  description: "Explore a wide range of products at unbeatable prices. Shop now at MyStore!",
  keywords: "online shop, e-commerce, buy products, MyStore, best prices, shop online",
  authors: [{ name: "Muhammad Farooq" }],
  robots: "index, follow",
};

// Viewport
export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#317EFB" />
        <meta name="application-name" content="MyStore" />
        <meta property="og:title" content="MyStore - Your Ultimate Online Shop" />
        <meta
          property="og:description"
          content="Explore a wide range of products at unbeatable prices. Shop now at MyStore!"
        />
        <meta
          property="og:image"
          content="https://my-shop-ecommerce-2024.vercel.app/path-to-your-image.jpg"
        />
        <meta property="og:url" content="https://my-shop-ecommerce-2024.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MyStore - Your Ultimate Online Shop" />
        <meta
          name="twitter:description"
          content="Explore a wide range of products at unbeatable prices. Shop now at MyStore!"
        />
        <meta
          name="twitter:image"
          content="https://my-shop-ecommerce-2024.vercel.app/path-to-your-image.jpg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Navbar />
        <ProductsProvider>{children}</ProductsProvider>
        <Footer />
      </body>
    </html>
  );
}
