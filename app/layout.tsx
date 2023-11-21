import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Portfolios",
  description: "Award-winning FIRST Tech Challenge Portfolios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          GeistSans.className
        )}
      >
        <Toaster richColors />
        {children}
      </body>
    </html>
  );
}
