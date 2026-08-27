import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "Virtual Labs Academic Platform API",
      institution: "VSB Engineering College",
      department: "Artificial Intelligence & Data Science",
      timestamp: new Date().toISOString(),
      cache: "EDGE_HIT"
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
