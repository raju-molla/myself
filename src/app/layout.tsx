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
  title: "Raju Molla — AI for Cybersecurity Researcher & Software Engineer",
  description:
    "Raju Molla is an MSc Cybersecurity & Digital Forensics researcher and full-stack software engineer, working on adaptive intrusion detection, explainable AI, and federated learning for edge-cloud-IoT systems.",
  keywords: [
    "Raju Molla",
    "Cybersecurity Researcher",
    "Intrusion Detection System",
    "Explainable AI",
    "Federated Learning",
    "Software Engineer",
    "Full-Stack Developer",
  ],
  openGraph: {
    title: "Raju Molla — AI for Cybersecurity Researcher & Software Engineer",
    description:
      "MSc Cybersecurity & Digital Forensics researcher and full-stack engineer specialising in adaptive intrusion detection and explainable AI.",
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