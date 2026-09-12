import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "AxomPrep Pro | Assam Study Platform",
  description: "Notes, mock tests, Assam GK, current affairs and performance tracking.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="footer">
          <div className="container footer-grid">
            <div><strong>AxomPrep Pro</strong><p>Built for focused preparation in Assam.</p></div>
            <div><span>Notes</span><span>Mock Tests</span><span>Assam GK</span><span>Current Affairs</span></div>
          </div>
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
