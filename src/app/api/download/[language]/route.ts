import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params: { language } }: { params: { language: string } }
) => {
  const data = await prisma.translation.findUnique({
    where: { language },
  });

  if (!data) {
    return NextResponse.json({ error: "Language not found" }, { status: 404 });
  }

  return NextResponse.json(data.data, {
    headers: {
      "Cache-Control": "public, max-age=604800, s-maxage=604800",
    },
  });
};
