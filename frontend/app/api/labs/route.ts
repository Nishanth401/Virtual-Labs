import { NextResponse } from "next/server";
import { LABS_DATA } from "@/data/labs";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      total: LABS_DATA.length,
      data: LABS_DATA,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
