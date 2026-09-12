import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AxomPrep | Learn. Practice. Prepare.",
  description:
    "AxomPrep is an Assam-focused learning platform for students and competitive-exam aspirants, offering study materials, MCQs, mock tests, Assam GK and current affairs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
