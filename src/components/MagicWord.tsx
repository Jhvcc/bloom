'use client';

import { useState } from "react";
import TranslationCard from "./TranslationCard";
import { TranslationData } from "@/types/dictionary";
import { removeNonAlpha } from "@/utils/alpha";
import { fetchTranslation } from "@/services/translation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

const MagicWord = ({word}: {word: string}) => {
  const [translationData, setTranslationData] = useState<TranslationData | null>(null);

  const handleTranslate = async () => {
    console.log('handleTranslate');
    const cleanWord = removeNonAlpha(word);
    const { data } = await fetchTranslation(cleanWord);
    setTranslationData(data);
  }

  return (
    <>
      <span className="relative inline-block transition-all duration-300 group">
        <HoverCard>
          <HoverCardTrigger asChild onPointerEnter={handleTranslate}>
            <div>
              <span className="relative inline-block cursor-pointer transition-all duration-300 group-hover:text-purple-600 group-hover:font-medium group-hover:scale-110 group-hover:translate-y-[-2px]">
                <button className="bg-transparent border-none p-0 m-0">
                  {word}
                </button>
              </span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-purple-300 blur-lg rounded-full transition-all duration-300 scale-150"></span>
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            { translationData && <TranslationCard {...translationData} /> }
          </HoverCardContent>
        </HoverCard>
      </span>
    </>
  )
}

export default MagicWord;