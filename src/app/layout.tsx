import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "StreetOps",
  description: "Street Ask",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/icon.png",
  },
  openGraph: {
    title: "StreetAsk by StreetOps",
    description: `Survey on Romance & Relationships at Work`,
    url: "https://ask.streetops.ng/",
    images: [
      {
        url: "https://res.cloudinary.com/deylyllwd/image/upload/v1776681801/Instagram_post_-_122_2_uhdvcj.png?f_auto,q_auto,w_1200,h_630,c_fill",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0a363c",
              color: "#fff",
              fontWeight: "semibold",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
