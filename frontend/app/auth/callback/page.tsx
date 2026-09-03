"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleAuth = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        const next = searchParams.get("next") || "/dashboard";

        // 1. If code param is present (PKCE flow), exchange it
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.warn("Code exchange warning:", exchangeError);
          }
        }

        // 2. Check session (handles both PKCE and hash fragment #access_token auto-parsed by supabase)
        const { data: { session } } = await supabase.auth.getSession();
        if (session && isMounted) {
          router.replace(next);
          return;
        }

        // 3. Fallback listener for auth state change
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
          if (newSession && isMounted) {
            subscription.unsubscribe();
            router.replace(next);
          }
        });

        // Safety fallback timer
        setTimeout(() => {
          if (isMounted) {
            router.replace("/dashboard");
          }
        }, 1500);

      } catch (err: any) {
        console.warn("Callback error:", err);
        if (isMounted) {
          router.replace("/dashboard");
        }
      }
    };

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-border/50 bg-card/80 backdrop-blur shadow-xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-foreground">Completing Google Authentication...</p>
      </div>
    </div>
  );
}
