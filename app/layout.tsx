import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "600x600" },
      { url: "/logo.png", type: "image/png", sizes: "800x600" },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
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
  themeColor: "#050810",
};

// Prevent FOUC — reads localStorage and applies theme class before React hydrates
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('hm-theme');
    if (t === 'light') {
      document.documentElement.classList.add('light');
    }
    // default is dark (no class needed — CSS vars defined on :root are dark by default)
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
