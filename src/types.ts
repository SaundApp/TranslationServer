import { Translation } from "@prisma/client";

export interface TranslationData {
  [key: string]: string | TranslationData;
}

export type TypedTranslation = {
  data: TranslationData;
} & Translation;
