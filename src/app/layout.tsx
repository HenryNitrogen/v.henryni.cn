import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from './ui/page.module.css';
import ClientSessionProvider from "./component/ClientSessionProvider";
import AppProvider from "./component/AppProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistersmash",
  description: "sistersmash is a community-driven platform for sharing and discovering content related with smashing your sisters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${styles.body} ${geistSans.variable} ${geistMono.variable}`}
      >
        <ClientSessionProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}

