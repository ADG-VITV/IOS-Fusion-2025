import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const archivo = Archivo({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "iOSFusion 8.0 | ADG",
  description: "iOS Fusion 8.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={archivo.className}>
        <AuthProvider> {/* 2. Wrap your app with the provider */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}