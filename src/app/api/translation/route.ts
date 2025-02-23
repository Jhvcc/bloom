import { type NextRequest, NextResponse } from "next/server";
import youdaoTr from "@/utils/youdao_translate";
import xxapiTr from "@/utils/phonetic_translate";
import { DictionaryEntry, TranslationData } from "@/types/dictionary";
import { generateVoice } from "@/app/constant";

export const runtime = "edge";

const handleYoudao = async (word: string): Promise<TranslationData> => {
  const [translateData, suggestData] = await Promise.all([
    youdaoTr.translate(word),
    youdaoTr.translateSuggestion(word),
  ])
  
  const cleanSuggestion = suggestData.data.entries.map((item: {explain: string, entry: string}) => {
    return {
      entry: item.entry,
      explain: youdaoTr.splitExplain(item.explain),
    }
  })
  const target = cleanSuggestion.find((item: DictionaryEntry) => item.entry === word);
  const data = {
    word,
    translation: translateData.translation.join(', '),
    suggest: target,
    extra: cleanSuggestion.filter((item: DictionaryEntry) => item.entry !== word),
    uk: {
      audio: generateVoice(word, 1),
    },
    us: {
      audio: generateVoice(word, 2),
    },
  }
  return data
}

const handleXxapi = async (word: string) => {
  const xxapiRes = await xxapiTr.translate(word);
  if (xxapiRes.code !== 200) {
    throw new Error(`Failed to use xxapi to translate: ${JSON.stringify(xxapiRes)}`);}
  const { data } = xxapiRes;
  const suggest = xxapiTr.cleanTranslation(word, data.translations);
  const resData = {
    word: word,
    uk: {
      phonetic: data.ukphone,
      audio: data.ukspeech,
    },
    us: {
      phonetic: data.usphone,
      audio: data.usspeech,
    },
    translation: suggest.explain?.n || suggest.explain?.v || suggest.explain?.adj || suggest.explain?.adv || suggest.explain?.other,
    suggest,
    extra: xxapiTr.cleanRelated(data.relWords),
  }
  return resData;
}

const handle = async (req: NextRequest) => {
  const { query, type = 'xxapi' } = await req.json();
  if (type === 'xxapi') {
    try {
      const data = await handleXxapi(query)
      return NextResponse.json({ data });
    } catch (error) {
      console.error(error);
      const data = await handleYoudao(query);
      return NextResponse.json({ data });
    }
  } else {
    const data = await handleYoudao(query);
    return NextResponse.json({ data });
  }
}

export const POST = handle;
