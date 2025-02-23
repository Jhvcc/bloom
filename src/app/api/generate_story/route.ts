import { GEMINI_API_KEY, GEMINI_BASE_URL, MAX_GENERATE_WORDS_COUNT } from "@/app/constant";
import { NextResponse, type NextRequest } from "next/server";
import { generateStoryPrompt } from "@/app/constant";

type Body = {
  words: string[];
}

async function handle(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return NextResponse.json({ body: "OK" }, { status: 200 });
  }

  const apiKey = GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 401 });
  }

  try {
    const response = await request(req, apiKey);
    return response;
  } catch (e) {
    console.error("[Google] ", e);
    return NextResponse.json({ error: "Failed to generate story" }, { status: 500 });
  }
}

export const POST = handle;

async function request(req: NextRequest, apiKey: string) {
  const body: Body = await req.json();
  const words = body.words;

  if (words.length === 0) {
    return NextResponse.json({ error: "Words are required" }, { status: 400 });
  }

  const controller = new AbortController();
  const baseUrl = GEMINI_BASE_URL;
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10 * 60 * 1000)

  const words_count = MAX_GENERATE_WORDS_COUNT;
  const system_prompt = generateStoryPrompt(words_count, words);
  const prompt = [
    {"role": "user", "parts": [{"text": system_prompt}]}
  ]

  const fetchUrl = `${baseUrl}/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

  const fetchOptions: RequestInit = {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify({
      contents: prompt,
      generationConfig: {
        temperature: 1,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain"
      },
    }),
    // to fix #2485: https://stackoverflow.com/questions/55920957/cloudflare-worker-typeerror-one-time-use-body
    redirect: "manual",
    // @ts-expect-error duplex property not in RequestInit type
    duplex: "half",
    signal: controller.signal,
  }

  try {
    const res = await fetch(fetchUrl, fetchOptions);
    // to prevent browser prompt for credentials
    const newHeaders = new Headers(res.headers);
    newHeaders.delete("www-authenticate");
    // to disable nginx buffering
    newHeaders.set("X-Accel-Buffering", "no");

    const data = await res.json();
    const story = data.candidates[0].content.parts[0];
    const storyData = {
      id: crypto.randomUUID(),
      word: words[0],
      story: story.text,
    }
    return new Response(JSON.stringify(storyData), {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  } catch (e) {
    console.error("[Google] ", e);
    throw e;
  } finally {
    clearTimeout(timeoutId);
  }
}
