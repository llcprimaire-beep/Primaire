import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import CategoryNav from "@/components/CategoryNav";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Daily AI News Roundup`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "A daily-curated roundup of AI news from OpenAI, Google, Hugging Face, TechCrunch, and more — headlines, short excerpts, and why each story matters, always linked back to the original source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col gap-3">
            <Link href="/" className="text-xl font-bold">
              {SITE_NAME}
            </Link>
            <CategoryNav />
          </div>
        </header>
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
