import { readJson } from "@/services/read-json";


export const randomWords = async (count: number) => {
  const dictionary: string[] = await readJson("BEC_2")
  return dictionary.sort(() => Math.random() - 0.5).slice(0, count);
}