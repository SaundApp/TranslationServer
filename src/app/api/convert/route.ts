import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const language = form.get("language") as string;
  const name = form.get("name") as string;

  const previous = await prisma.translation.findUnique({
    where: {
      language,
    },
    select: {
      data: true,
    },
  });

  const parent = name.split(".");
  let updatedData = previous!.data as any;

  for (const key of parent.slice(0, -1)) updatedData = updatedData[key];

  if (typeof updatedData[parent[parent.length - 1]] === "string")
    updatedData[parent[parent.length - 1]] = {};
  else updatedData[parent[parent.length - 1]] = "";

  await prisma.translation.update({
    where: {
      language,
    },
    data: {
      data: previous!.data as any,
    },
  });

  return redirect(`/?active=${language}`);
});
