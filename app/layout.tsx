import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Abubakar — Analytics Dashboard",
  description: "Modern SaaS analytics dashboard for Abubakar. Track revenue, users, churn, MRR, and more with beautiful interactive charts.",
  keywords: ["analytics", "dashboard", "SaaS", "metrics", "KPI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 dark:bg-[#0F0E1A] text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}