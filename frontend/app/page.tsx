import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Virtual Labs Gateway | One Virtual Lab Platform. Customized for Every College.",
  description: "Empower your institution with an accredited simulation environment for engineering students. Access your college's dedicated virtual lab portal.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground font-heading">
            One Virtual Lab Platform. <br />
            <span className="text-rose-600">Customized for Every College.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Empower your institution with an accredited, autonomous-ready simulation environment for engineering students. Access your college&apos;s dedicated virtual lab portal.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl shadow-md gap-2 cursor-pointer"
            >
              <Link href="/colleges">
                <span>Select Your College</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-6 border-border/80 text-foreground hover:bg-muted text-sm font-bold rounded-xl gap-2 cursor-pointer"
            >
              <Link href="/admin">
                <span>Admin &amp; Faculty Access</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
