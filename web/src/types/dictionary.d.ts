export interface PartOfSpeech {
  n?: string;
  v?: string;
  adj?: string;
  adv?: string;
  other?: string;
}

export interface DictionaryEntry {
  entry: string;
  explain: PartOfSpeech;
}

interface Voice {
  phonetic?: string;
  audio: string;
}

export interface TranslationData {
  word: string;
  uk: Voice;
  us: Voice;
  translation: string;
  suggest: DictionaryEntry;
  extra: DictionaryEntry[];
}

export type UKAccent = 1
export type USAccent = 2