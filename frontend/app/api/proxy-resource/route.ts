import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    const parsedUrl = new URL(targetUrl);

    // Fetch target webpage with realistic headers
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 VirtualLabs/1.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": parsedUrl.origin,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return new NextResponse(
        `Failed to fetch content from ${targetUrl} (Status: ${response.status})`,
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "";

    // If it's HTML, inject <base> tag to resolve relative assets, fonts, and stylesheets
    if (contentType.includes("text/html")) {
      let html = await response.text();

      const baseTag = `<base href="${parsedUrl.origin}${parsedUrl.pathname}" target="_blank">`;

      // Inject base tag and custom styling to remove unwanted popups/scrolllocks & prevent frame-busting
      const customInjection = `
        ${baseTag}
        <style>
          /* Virtual Labs In-App Reader Polish */
          body { -webkit-font-smoothing: antialiased; }
          .side-nav-social, .footer-newsletter, .ad-unit, #banner, .adsbygoogle, .gfg-ad { display: none !important; }
        </style>
        <script>
          // Prevent frame-busting scripts from escaping iframe
          try {
            Object.defineProperty(window, 'top', { get: function() { return window.self; } });
            Object.defineProperty(window, 'parent', { get: function() { return window.self; } });
          } catch (e) {}
        </script>
      `;

      if (html.includes("<head>")) {
        html = html.replace("<head>", `<head>${customInjection}`);
      } else if (html.includes("<html>")) {
        html = html.replace("<html>", `<html><head>${customInjection}</head>`);
      } else {
        html = `<head>${customInjection}</head>${html}`;
      }

      return new NextResponse(html, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        },
      });
    }

    // For non-HTML binary/assets
    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error: any) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
            .box { text-align: center; max-width: 500px; padding: 32px; background: #1e293b; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
            h2 { color: #38bdf8; margin-top: 0; font-size: 20px; }
            p { font-size: 14px; line-height: 1.6; color: #cbd5e1; }
            .btn { display: inline-block; margin-top: 16px; padding: 10px 20px; background: #0284c7; color: white; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; }
            .btn:hover { background: #0369a1; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>Academic Curriculum Portal</h2>
            <p>Official Reference: <strong>${targetUrl}</strong></p>
            <p style="color: #94a3b8; font-size: 12px;">Browsing live portal inside Virtual Labs.</p>
            <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="btn">Open Official Portal in New Tab →</a>
          </div>
        </body>
      </html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }
}
