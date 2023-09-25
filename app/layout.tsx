import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/header";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hayu Explore",
  description:
    "chatbot yang dapat membantu kamu dalam merencanakan perjalanan wisata kamu saat ke Bandung.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-zinc-200 antialiased dark:bg-[#171717]",
          font.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="flex min-h-screen flex-col backdrop-blur">
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
