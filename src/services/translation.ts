import { type TranslationData } from "@/types/dictionary";
// import { post } from "./base";

export const fetchTranslation = async (query: string, signal: AbortSignal): Promise<TranslationData> => {
  const res = await fetch('/api/translation', { method: "POST", body: JSON.stringify({ query }), signal })
  if (res.status !== 200) {
    throw new Error("It's seems word not exists");
  }
  const data = await res.json()
  return data.data
}