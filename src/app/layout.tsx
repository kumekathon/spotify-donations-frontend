import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Suspense} from "react";
import {PhantomProvider} from "@/components/PhantomProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamStake",
  description: "Payback the artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <PhantomProvider>
            {children}
          </PhantomProvider>
        </Suspense>
      </body>
    </html>
  );
}
