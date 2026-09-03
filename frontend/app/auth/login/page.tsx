"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  ArrowRight,
  LogOut,
  Loader2,
  Database,
  Code2,
  BookOpen
} from "lucide-react";

export default function AuthLoginPage() {
  const router = useRouter();
  const {
    user,
    loginWithGoogle,
    logout,
    loading: authLoading
  } = useAuth();

  const [signingIn, setSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Automatically detect incoming session (from hash token or existing session) and forward to dashboard
  useEffect(() => {
    let isMounted = true;

    const checkExistingSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && isMounted) {
          router.replace("/dashboard");
        }
      } catch (err) {
        console.warn("Session check error:", err);
      }
    };

    checkExistingSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user && isMounted) {
        router.replace("/dashboard");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  const handleGoogleSignIn = async () => {
    setErrorMsg("");
    setSigningIn(true);
    try {
      await loginWithGoogle();
      // On web OAuth, the browser redirects automatically to Google
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setErrorMsg("Google Sign-In failed or was cancelled. Please try again.");
      setSigningIn(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md p-8 bg-white dark:bg-card border border-border shadow-xl rounded-2xl space-y-6">
          
          {/* Header Brand */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
              <img
                src="/vsb-logo.png"
                alt="VSB College"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <div className="flex justify-center">
              <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
                Supabase Cloud Authentication
              </Badge>
            </div>

            <h1 className="text-2xl font-bold font-heading text-foreground">
              Virtual Labs Portal
            </h1>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
              V.S.B. Engineering College • Dept. of AI &amp; DS
            </p>
          </div>

          {/* Error message display if any */}
          {errorMsg && (
            <div className="p-3 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg text-center font-medium">
              {errorMsg}
            </div>
          )}

          {/* Conditional View: Logged In vs Ready to Sign In */}
          {user ? (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-500 border-emerald-500/30 gap-1 font-mono">
                    <ShieldCheck className="h-3.5 w-3.5" /> Authenticated
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">Google</span>
                </div>
                <p className="text-sm font-bold text-foreground pt-1">
                  {user.displayName || user.email?.split("@")[0] || "Active Student"}
                </p>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  {user.email}
                </p>
              </div>

              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-2 py-5"
              >
                <Link href="/dashboard">
                  <span>Enter Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                onClick={async () => {
                  await logout();
                }}
                className="w-full text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 gap-2 border-border"
              >
                <LogOut className="h-3.5 w-3.5" /> Switch Account / Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              <p className="text-xs text-center text-muted-foreground">
                Sign in with your Google account to automatically synchronize your laboratory experiments, certificates, and DSA problem progress.
              </p>

              {/* Single Continue with Google Button */}
              <Button
                type="button"
                variant="outline"
                disabled={signingIn || authLoading}
                onClick={handleGoogleSignIn}
                className="w-full h-12 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-foreground border border-slate-300 dark:border-slate-700 font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                {signingIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </Button>

              {/* Data Persistence Features */}
              <div className="pt-2 border-t border-border/60 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block text-center">
                  Automatic Cloud Synchronization
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-muted/40 border border-border/40">
                    <BookOpen className="h-4 w-4 mx-auto mb-1 text-primary" />
                    <span className="text-[10px] font-medium text-foreground block">Lab Records</span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40 border border-border/40">
                    <Code2 className="h-4 w-4 mx-auto mb-1 text-emerald-500" />
                    <span className="text-[10px] font-medium text-foreground block">DSA Sheet</span>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/40 border border-border/40">
                    <Database className="h-4 w-4 mx-auto mb-1 text-indigo-500" />
                    <span className="text-[10px] font-medium text-foreground block">Supabase</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
