import TranslationCard from "@/components/TranslationCard";
import { TranslationData } from "@/types/dictionary";
import { generateVoice } from "./constant";

export default function Home() {
  const data: TranslationData = {
      "word": "cancel",
      "uk": {
          "phonetic": "'kæns(ə)l",
          "audio": generateVoice("cancel", 1)
      },
      "us": {
          "phonetic": "'kænsl",
          "audio": generateVoice("cancel", 2)
      },
      "translation": "取消，撤销",
      "suggest": {
          "entry": "cancel",
          "explain": {
              "v": "取消；删去 djashdjshdj sahjdhasj hdjsah djash djdasdsadsadsadsadasdasashd jahdjashjahdja",
              "n": "取消，撤销"
          }
      },
      "extra": [
          {
              "entry": "cancellation",
              "explain": {
                  "n": "取消；删除"
              }
          }
      ]
    }
  return (
    <div>
      <TranslationCard {...data} />
    </div>
  );
}
