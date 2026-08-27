"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowLeft, BookOpen, Layers, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Virtual Labs Academic Portal</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-black font-heading text-primary">404</h1>
            <h2 className="text-xl font-bold font-heading text-foreground">Page Not Found</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The laboratory module, experiment, or page you requested does not exist or has been moved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs gap-1.5">
              <Link href="/">
                <Home className="h-3.5 w-3.5" /> Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="text-xs gap-1.5">
              <Link href="/labs">
                <BookOpen className="h-3.5 w-3.5" /> Explore Labs
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="text-xs gap-1.5">
              <Link href="/dashboard">
                <Layers className="h-3.5 w-3.5" /> Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
