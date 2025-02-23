import { type TranslationData } from "@/types/dictionary";
import { post } from "./base";

export const fetchTranslation = (query: string): Promise<TranslationData> => {
  return post('/api/translation', { body: { query } })
}