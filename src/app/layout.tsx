import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Raju Molla — PhD Researcher in Computer Science",
  description:
    "Raju Molla is a PhD researcher in Computer Science at Keele University, working across AI for cybersecurity, adaptive intrusion detection, and trustworthy machine learning.",
  keywords: [
    "Raju Molla",
    "PhD Researcher",
    "Keele University",
    "Cybersecurity Researcher",
    "Intrusion Detection System",
    "Explainable AI",
    "Federated Learning",
    "Software Engineer",
    "Full-Stack Developer",
  ],
  openGraph: {
    title: "Raju Molla — PhD Researcher in Computer Science",
    description:
      "PhD researcher at Keele University working across AI for cybersecurity, adaptive intrusion detection, and trustworthy machine learning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      >
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G14F4TRTEP"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-G14F4TRTEP');
          `}
        </Script>
      </body>
    </html>
  );
}