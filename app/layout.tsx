import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hassan-mezher.dev"),
  title: "Hassan Mezher | Full-Stack Web Developer",
  description:
    "Premium portfolio for Hassan Mezher, a full-stack web developer and Computer Science graduate building fast, scalable, user-focused web applications.",
  keywords: [
    "Hassan Mezher",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Lebanon Developer",
  ],
  authors: [{ name: "Hassan Mezher" }],
  openGraph: {
    title: "Hassan Mezher | Full-Stack Web Developer",
    description:
      "Full-stack portfolio showcasing modern web applications, backend APIs, clean UI engineering, and remote team experience.",
    url: "https://hassan-mezher.dev",
    siteName: "Hassan Mezher Portfolio",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8fafc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
