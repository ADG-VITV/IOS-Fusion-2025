import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "iOSFusion 7.0 | ADG",
  description: "iOS Fusion 7.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={archivo.className}>
        {children}
        </body>
    </html>
  );
}