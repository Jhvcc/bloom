import { UKAccent, USAccent } from "@/types/dictionary";
import { getCloudflareContext } from "@opennextjs/cloudflare"

declare global {
  interface CloudflareEnv {
    API_PREFIX: string;
    STATIC_BASE_URL: string;
    GEMINI_BASE_URL: string;
    YOUDAO_APP_KEY: string;
    YOUDAO_APP_SECRET: string;
    STORY_PROMPT: string;
    VOICE_BASE_URL: string;
    YOUDAO_SUGGEST_URL: string;
    YOUDAO_BASE_URL: string;
    PHONETIC_BASE_URL: string;
  }
}

export const API_PREFIX = process.env.API_PREFIX || "";

export const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/";
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Google API safety settings, see https://ai.google.dev/gemini-api/docs/safety-settings
// BLOCK_NONE will not block any content, and BLOCK_ONLY_HIGH will block only high-risk content.
export enum GoogleSafetySettingsThreshold {
  BLOCK_NONE = "BLOCK_NONE",
  BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH",
  BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE",
  BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE",
}

export const generateVoice = async (word: string, accent: UKAccent | USAccent) => {
  const { env }: {env: CloudflareEnv} = await getCloudflareContext()
  return env.VOICE_BASE_URL?.replace("%word%", word).replace("%accent%", accent.toString()) || ""
}

export const YOUDAO_SUGGEST_URL = process.env.YOUDAO_SUGGEST_URL;
export const YOUDAO_BASE_URL = process.env.YOUDAO_BASE_URL;
export const YOUDAO_APP_KEY = process.env.YOUDAO_APP_KEY;
export const YOUDAO_APP_SECRET = process.env.YOUDAO_APP_SECRET;

export const PHONETIC_BASE_URL = process.env.PHONETIC_BASE_URL || "";

export const STATIC_BASE_URL = process.env.STATIC_BASE_URL || "";

export const MAX_GENERATE_WORDS_COUNT = 50;
export const IS_RANDOM = true;
export const DAILY_WORDS_COUNT = 10;

export const generateStoryPrompt = async (words_count: number, words: string[]) => {
  const { env }: {env: CloudflareEnv} = await getCloudflareContext()
  return env.STORY_PROMPT?.replace("%words_count%", words_count.toString()).replace("%words%", words.join(", ")) || ""
}

export const TOTAL_WORDS = [
  "ubiquitous", "zephyr", "quixotic", "labyrinth", "effervescent", "serendipity", "mellifluous", "ephemeral", "halcyon", "penumbra", "vermilion", "cerulean", "azure", "taupe", "fuschia", "ochre", "scarlet", "indigo", "amethyst", "chartreuse", "gregarious", "taciturn", "loquacious", "benevolent", "malevolent", "stoic", "epicurean", "ascetic", "hedonistic", "pragmatic", "obfuscate", "exacerbate", "ameliorate", "attenuate", "vindicate", "capitulate", "proliferate", "stymie", "elucidate", "enervate", "recalcitrant", "ebullient", "fastidious", "laconic", "verbose", "pithy", "succinct", "terse", "voluble", "reticent", "tenuous", "corpulent", "desiccated", "winsome", "lackadaisical", "pernicious", "salubrious", "pernicious", "insidious", "benign", "vicissitude", "juxtaposition", "cacophony", "euphony", "anomaly", "paradigm", "conundrum", "dichotomy", "epiphany", "platitude", "quarantine", "resilient", "sycophant", "ubiquitous", "vex", "wanderlust", "xenophobia", "yearn", "zealous", "absurd", "bliss", "candid", "demeanor", "elusive", "facetious", "garrulous", "haughty", "ineffable", "jovial", "keen", "luminous", "mellowness", "nurture", "oblivion", "paradox", "quaint", "rapture", "solitude", "tranquil", "utopia", "vivid", "whimsical", "xenial", "yielding", "zenith"
]
