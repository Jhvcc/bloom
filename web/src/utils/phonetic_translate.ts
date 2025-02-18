import { PHONETIC_BASE_URL } from "@/app/constant";
import combineParams from "./params";
import { DictionaryEntry } from "@/types/dictionary";


const translate = async (query: string) => {
  const params: Record<string, string> = {
    word: query,
  }
  const fullUrl = combineParams(PHONETIC_BASE_URL, params)
  const res = await fetch(fullUrl)
  const data = await res.json();
  return data;
}

type Pos = "v" | "n" | "adj" | "adv" | "other";

interface TranslationData {
  pos: Pos;
  tran_cn: string;
}

const cleanTranslation = (word: string, data: Array<TranslationData>): DictionaryEntry => {
  const entry: DictionaryEntry = {
    entry: word,
    explain: {}
  };
  for (const item of data) {
    if (item.pos === "v") {
      entry.explain.v = item.tran_cn;
    } else if (item.pos === "n") {
      entry.explain.n = item.tran_cn;
    } else if (item.pos === "adj") {
      entry.explain.adj = item.tran_cn;
    } else if (item.pos === "adv") {
      entry.explain.adv = item.tran_cn;
    } else {
      entry.explain.other = item.tran_cn;
    }
  }
  return entry;
}

interface RelatedData {
  Hwds: Array<{
    hwd: string;
    tran: string;
  }>,
  Pos: Pos;
}

const putHwd = (entries: DictionaryEntry[], item: RelatedData, pos: Pos) => {
  for (const hwd of item.Hwds) {
    entries.push({
      entry: hwd.hwd,
      explain: {
        [pos]: hwd.tran.trim(),
      }
    })
  }
  return entries;
}

const cleanRelated = (data: Array<RelatedData>) => {
  let entries: DictionaryEntry[] = [];
  for (const item of data) {
    if (item.Pos === "v") {
      entries = putHwd(entries, item, "v");
    } else if (item.Pos === "n") {
      entries = putHwd(entries, item, "n");
    } else if (item.Pos === "adj") {
      entries = putHwd(entries, item, "adj");
    } else if (item.Pos === "adv") {
      entries = putHwd(entries, item, "adv");
    } else {
      entries = putHwd(entries, item, "other");
    }
  }
  return entries;
}

const xxapiTr = {
  translate,
  cleanTranslation,
  cleanRelated,
}

export default xxapiTr;