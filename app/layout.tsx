import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Private Valentine Site",
  description: "A private MySpace-to-Zillow Valentine site"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="site-brand">
              myspace
            </Link>
            <nav className="site-nav">
              <Link href="/">Home</Link>
              <Link href="/listing">Listing</Link>
              <a href="/logout">Logout</a>
            </nav>
          </div>
        </header>
        <main className="site-main">{children}</main>
      </body>
    </html>
  );
}
