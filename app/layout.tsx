import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Valentine Space",
  description: "Private MySpace-inspired Valentine profile"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-border bg-white/85 backdrop-blur">
          <div className="container flex items-center justify-between gap-4 py-3">
            <Link href="/" className="retro-title text-xl font-bold text-primary">
              My Valentine Space
            </Link>
            <nav className="flex items-center gap-4 text-sm font-semibold">
              <Link href="/">Profile</Link>
              <Link href="/posts">Posts</Link>
              <Link href="/admin">Admin</Link>
              <Link href="/logout" className="text-primary">
                Logout
              </Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
