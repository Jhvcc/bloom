
declare global {
  interface CloudflareEnv {
    API_PREFIX: string;
    STATIC_BASE_URL: string;
    GEMINI_API_KEY: string;
    YOUDAO_APP_KEY: string;
    YOUDAO_APP_SECRET: string;
    STORY_PROMPT: string;
    VOICE_BASE_URL: string;
    YOUDAO_SUGGEST_URL: string;
    YOUDAO_BASE_URL: string;
    PHONETIC_BASE_URL: string;
  }
}