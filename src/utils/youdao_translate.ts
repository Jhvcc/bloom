import { YOUDAO_APP_KEY, YOUDAO_APP_SECRET, YOUDAO_BASE_URL, YOUDAO_SUGGEST_URL } from "@/app/constant";
import sha256Hash from "./sha256";
import { PartOfSpeech } from "@/types/dictionary";
import combineParams from "./params";

const translate = async (query: string, from: string = "en", to: string = "zh-CNS") => {
  const appKey = YOUDAO_APP_KEY;
  const appSecret = YOUDAO_APP_SECRET;
  const salt = new Date().getTime();
  const curtime = Math.round(new Date().getTime() / 1000);
  const str1 = appKey + truncate(query) + salt + curtime + appSecret;
  
  const sign = await sha256Hash(str1);

  const params: Record<string, string> = {
    q: query,
    appKey: appKey || '',
    salt: salt.toString(),
    from,
    to,
    sign,
    signType: 'v3',
    curtime: curtime.toString(),
  }
  const fullUrl = combineParams(YOUDAO_BASE_URL || '', params)
  const res = await fetch(fullUrl)
  const data = await res.json();
  return data;
}

const truncate = (q: string) => {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10);
}

const translateSuggestion = async (query: string) => {
  const params: Record<string, string> = {
    num: '5',
    ver: '3.0',
    doctype: 'json',
    cache: 'false',
    le: 'en',
    q: query,
  }
  const fullUrl = combineParams(YOUDAO_SUGGEST_URL || '', params)
  const res = await fetch(fullUrl)
  const data = await res.json();
  return data;
}

function splitExplain (explain: string): PartOfSpeech {
  const entry: PartOfSpeech = {};
  const parts = explain.split(';');
  const otherParts: string[] = [];  // Array to collect unparsed parts

  for (const part of parts) {
    const trimmedPart = part.trim();

    if (trimmedPart.startsWith('n.')) {
      entry.n = trimmedPart.substring(3) // Remove 'n. '
    } else if (trimmedPart.startsWith('v.')) {
      entry.v = trimmedPart.substring(3) // Remove 'v. '
    } else if (trimmedPart.startsWith('adj.')) {
      entry.adj = trimmedPart.substring(5) // Remove 'adj. '
    } else if (trimmedPart.startsWith('adv.')) {
      entry.adv = trimmedPart.substring(5) // Remove 'adv. '
    } else {
      otherParts.push(trimmedPart); // Collect the unparsed part
    }
  }
  if (otherParts.length > 0) {
    entry.other = otherParts.join('; '); // Join the unparsed parts with semicolon
  }
  return entry;
}
const youdaoTr = {
  translate,
  translateSuggestion,
  splitExplain,
};

export default youdaoTr;