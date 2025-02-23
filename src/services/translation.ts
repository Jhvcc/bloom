import { type TranslationData } from "@/types/dictionary";
// import { post } from "./base";

export const fetchTranslation = async (query: string): Promise<TranslationData> => {
  const res = await fetch('/api/translation', { method: "POST", body: JSON.stringify({ query }) })
  const data = await res.json()
  return data.data
}