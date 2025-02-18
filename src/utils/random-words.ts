import { TOTAL_WORDS } from "@/app/constant";


export const randomWords = (count: number) => {
  return TOTAL_WORDS.sort(() => Math.random() - 0.5).slice(0, count);
}