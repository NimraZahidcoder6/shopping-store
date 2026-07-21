import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { QuickViewProvider } from "@/lib/quickview-context";
import { ToastProvider } from "@/lib/toast-context";
import QuickViewModal from "@/components/QuickViewModal";
import Toast from "@/components/Toast";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ShopSphere — Considered Clothing",
  description:
    "ShopSphere is a small-batch clothing catalog: outerwear, knitwear and denim, numbered and made to last.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(fraunces.variable, inter.variable, plexMono.variable, "font-sans", geist.variable)}>
      <body className="flex min-h-screen flex-col antialiased">
        <ToastProvider>
          <CartProvider>
            <FavoritesProvider>
              <QuickViewProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <QuickViewModal />
                <Toast />
              </QuickViewProvider>
            </FavoritesProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}