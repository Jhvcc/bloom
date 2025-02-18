import { DAILY_WORDS_COUNT } from "@/app/constant";
import { randomWords } from "@/utils/random-words";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export const GET = handle;

async function handle(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const random_count = Number(searchParams.get("count") || DAILY_WORDS_COUNT);
  const random_words = randomWords(random_count);
  
  return NextResponse.json({ random_words });
}