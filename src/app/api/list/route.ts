import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, GET",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const OPTIONS = async () => {
  return new Response(null, {
    headers,
  });
};

export const GET = async (_: NextRequest) => {
  const data = await prisma.translation.findMany({
    select: { language: true },
  });

  return NextResponse.json(
    data.map((lang) => lang.language),
    {
      headers,
    }
  );
};
