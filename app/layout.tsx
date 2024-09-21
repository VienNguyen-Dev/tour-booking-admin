import type { Metadata } from "next";
import { Inter, Kaushan_Script } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import "@/public/fonts/font-face.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const kaushan_script = Kaushan_Script({
  subsets: ["latin"],
  variable: "--font-kaushan-script",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Tour Booking App",
  description: "Travel everywhere with Tour Booking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`max-h-screen ${kaushan_script.variable} font-sans`, inter.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
