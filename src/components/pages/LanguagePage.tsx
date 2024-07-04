import { prisma } from "@/lib/prisma";
import TranslationDataDisplay from "../display/TranslationDataDisplay";
import { notFound } from "next/navigation";

export default async function LanguagePage({ active }: { active: string }) {
  const translation = await prisma.translation.findUnique({
    where: {
      language: active,
    },
  });

  if (!translation) return notFound();

  return (
    <TranslationDataDisplay language={active} data={translation.data as any} />
  );
}
