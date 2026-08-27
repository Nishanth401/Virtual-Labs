import { NextResponse } from "next/server";
import { RESOURCES_DATA } from "@/data/resources";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      total: RESOURCES_DATA.length,
      data: RESOURCES_DATA,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
