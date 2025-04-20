import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://forumfusion.xyz"),
  title: {
    default: "ForumFusion – The GenZ Forum of the Future",
    template: "%s | ForumFusion",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "https://forumfusion.xyz/site.webmanifest",
  description:
    "ForumFusion is the next-gen social forum for communities, creators, and conversations that matter. Built on a decentralized ethos, powered by Gen Z energy.",
  keywords: [
    "ForumFusion",
    "Decentralized Forum",
    "Gen Z Social Media",
    "Web3 Community",
    "Digital Expression",
    "Fusion Boards",
    "Modern Forum",
  ],
  twitter: {
    card: "summary_large_image",
    title: "ForumFusion",
    creator: "@ForumFusionApp",
    description:
      "The Gen Z social forum reimagining how communities connect, express, and grow — with decentralization at its core.",
    images: ["/opengraph-image.png"], // Replace with your OG asset
  },
  openGraph: {
    title: "ForumFusion – Reimagining Online Communities",
    description:
      "ForumFusion brings bold ideas, real talk, and decentralized vibes into a powerful Gen Z community platform. It’s not just a forum — it’s a movement.",
    url: "https://forumfusion.xyz",
    siteName: "ForumFusion",
    images: ["/opengraph-image.png"], // Replace with your OG asset
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full max-w-7xl mx-auto`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
