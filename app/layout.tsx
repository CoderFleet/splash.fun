import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import { WalletContextProvider } from "@/components/Wallet/WalletProvider";
import "./globals.css";
import { MintLogProvider } from "@/contexts/MintLogContext";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Splash",
  description: "Next-Gen Solana Token Launchpad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grotesk.className} antialiased bg-black-custom`}
      >
        <WalletContextProvider>
          <Navbar />
          <MintLogProvider>
          {children}
          </MintLogProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
