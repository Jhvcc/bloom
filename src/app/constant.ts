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

export const generateVoice = async (word: string, accent: any) => {
  const { env }: { env: CloudflareEnv } = await getCloudflareContext()
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

export const SYSTEM_PROMPT = `你现在是一个在教育领域具有卓越见解的专家。你的核心特征是精通中文和英文。

你在国际教育、比较教育、跨文化教育、全球教育以及中英教育融合等领域拥有深厚的知识和丰富的经验。

你不仅是一位 ** 双语教育专家 ** 和 ** 教育领域的双语人才 **，更是 ** 连接中英教育界的桥梁人物 ** 和 ** 资深人士 **。你的视角是 ** 跨文化 ** 且 ** 全球化 ** 的。

请以这位专家的身份，用专业、富有洞见的语气与用户交流，并根据需要灵活运用中英文进行解答和讨论。等待用户的教育相关问题。

我将提供一些单词，针对每个单词需要提供相关词性及其中文释义、音标(英 / 美)、词根解析、例句(中 / 英)；另外所有的单词需要组合起来形成一篇小短文(中 / 英)。

## 输入
["word", "browser", "invitation", "podcast", "encompass", "default"]

## 响应输出yaml格式
\`\`\`yaml
story:
  en:
    - ''
    - ''
    - ''
  zh:
    - ''
    - ''
    - ''
words:
  - word: ''
    id: ''
    part_of_speech:
      adj: ''
      adv: ''
      n: ''
      other: ''
      v: ''
    phonetic:
      uk: ''
      us: ''
    root_analysis: ''
    sentence_example:
      en: ''
      zh: ''
\`\`\`

## 响应解析
1. words为数组，数组中每个对象都是关于给定的单词相关
2. story有中文和英文的短文，要求其中出现的英文关键词及其中文翻译用 ** 包括，另外将短文拆分成句子，要求英文句子和中文句子相互对应，不要在句子中额外加上括号
3. part_of_speech为单词各词性的中文释义: n代表名词词性释义、v代表动词词性释义、adj代表形容词词性释义、adv代表副词词性释义、other代表其他词性释义，如果没有该词性就去除字段
4. root_analysis将词根解析用中文表示`;

export const TOTAL_WORDS = [
  "ubiquitous", "zephyr", "quixotic", "labyrinth", "effervescent", "serendipity", "mellifluous", "ephemeral", "halcyon", "penumbra", "vermilion", "cerulean", "azure", "taupe", "fuschia", "ochre", "scarlet", "indigo", "amethyst", "chartreuse", "gregarious", "taciturn", "loquacious", "benevolent", "malevolent", "stoic", "epicurean", "ascetic", "hedonistic", "pragmatic", "obfuscate", "exacerbate", "ameliorate", "attenuate", "vindicate", "capitulate", "proliferate", "stymie", "elucidate", "enervate", "recalcitrant", "ebullient", "fastidious", "laconic", "verbose", "pithy", "succinct", "terse", "voluble", "reticent", "tenuous", "corpulent", "desiccated", "winsome", "lackadaisical", "pernicious", "salubrious", "pernicious", "insidious", "benign", "vicissitude", "juxtaposition", "cacophony", "euphony", "anomaly", "paradigm", "conundrum", "dichotomy", "epiphany", "platitude", "quarantine", "resilient", "sycophant", "ubiquitous", "vex", "wanderlust", "xenophobia", "yearn", "zealous", "absurd", "bliss", "candid", "demeanor", "elusive", "facetious", "garrulous", "haughty", "ineffable", "jovial", "keen", "luminous", "mellowness", "nurture", "oblivion", "paradox", "quaint", "rapture", "solitude", "tranquil", "utopia", "vivid", "whimsical", "xenial", "yielding", "zenith"
]
