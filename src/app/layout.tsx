import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import Link from "next/link";
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
  title: "FinQuest",
  description: "FinQuest - Your financial decision adventure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white`}
      >
        <AuthProvider>
          <header className="w-full px-6 py-4 bg-black/20 backdrop-blur-md shadow-md">
            <nav className="flex justify-center gap-6 text-sm">
              <Link href="/home" className="hover:text-yellow-300 transition">
                Home
              </Link>
              <Link href="/profile" className="hover:text-yellow-300 transition">
                Profile
              </Link>
            </nav>
          </header>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}