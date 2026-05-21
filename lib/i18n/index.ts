import { en } from "@/lib/i18n/en";
import { ro } from "@/lib/i18n/ro";

export const translations = {
  en,
  ro,
} as const;

export type Language = keyof typeof translations;
export type Translation = (typeof translations)[Language];

export const defaultLanguage: Language = "en";

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "en" || value === "ro";
}
