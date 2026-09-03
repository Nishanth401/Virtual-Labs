import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/global/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { ScrollSideController } from "@/components/navigation/scroll-side-controller";

const inter = Inter({
  subsets: ['latin'],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Department Virtual Labs | AI & DS — VSB Engineering College",
  description: "Official interactive virtual laboratory platform for the Department of Artificial Intelligence & Data Science, VSB Engineering College. Master DSA, MLDL, DBMS, and CEN with simulation-based experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://supabase.co" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen bg-background text-foreground overflow-x-hidden antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col relative">
              <div className="flex-1">
                {children}
              </div>
              {/* Creative Floating Animated Sidebar Scroll Controller */}
              <ScrollSideController />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
