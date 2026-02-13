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
        <header className="myspace-header">
          <div className="container flex flex-wrap items-center justify-between gap-4 py-3">
            <Link href="/" className="text-4xl font-black tracking-tight text-white">
              myspace
            </Link>
            <div className="flex items-center gap-2">
              <input className="myspace-search" type="text" placeholder="Search profiles and posts" />
              <button className="myspace-search-button" type="button">
                Search
              </button>
            </div>
          </div>
          <div className="myspace-tabs">
            <div className="container flex flex-wrap items-center justify-between gap-3">
              <nav className="flex flex-wrap items-center">
                <Link href="/" className="myspace-tab-link">
                  Home
                </Link>
                <Link href="/posts" className="myspace-tab-link">
                  Bulletins
                </Link>
                <Link href="/" className="myspace-tab-link">
                  Profile
                </Link>
                <Link href="/admin" className="myspace-tab-link">
                  Admin
                </Link>
              </nav>
              <form action="/logout" method="post">
                <button
                  type="submit"
                  className="myspace-tab-link border-0 bg-transparent p-0"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="container py-6">
          <div className="myspace-canvas">{children}</div>
        </main>
      </body>
    </html>
  );
}
