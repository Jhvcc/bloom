'use client'

import { removeNonAlpha } from "@/utils/alpha";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { VolumeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { TranslationData } from "@/types/dictionary";
import { useMutation } from "@tanstack/react-query";
import { fetchTranslation } from "@/services/translation";

interface WordCardProps {
  word: string;
  wordTranslation: Record<string, TranslationData>;
  setTranslation: (translation: TranslationData) => void;
}

const WordCard = (props: WordCardProps) => {
  const word = removeNonAlpha(props.word)
  const mutation = useMutation<TranslationData, Error, string>({
    mutationFn: fetchTranslation,
  })

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.src = audioUrl;
    audio.play();
  }

  const tr = props.wordTranslation[word]

  const handleTranslation = () => {
    if (tr) return
    mutation.mutate(word)
  }

  useEffect(() => {
    if (mutation.isSuccess && props.wordTranslation[mutation.data.word] === undefined) {
      props.setTranslation(mutation.data)
    }
  }, [mutation, props])

  return (
    <Card>
      <CardContent className={`p-4 ${!tr && "cursor-pointer"}`} onClick={handleTranslation}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{word}</h3>
            {tr && tr.uk?.phonetic &&
              <p className="text-sm text-muted-foreground before:content-['/'] after:content-['/']">{tr.uk.phonetic}</p>
            }
            {tr &&
              <div className="flex flex-col gap-2.5">
                {Object.entries(tr.suggest?.explain).map(([key, value]) => (
                  <div key={key} className="flex flex-row items-start gap-3 text-sm">
                    <div className="bg-gray-400 px-2 py-0.5 rounded-lg text-white font-bold flex justify-center items-center w-14 flex-shrink-0">
                      <span className="after:content-['.']">{key}</span>
                    </div>
                    <div className="flex-1 break-all pt-1">{value}</div>
                  </div>
                ))}
              </div>
            }
          </div>
          {tr && 
            <Button variant="ghost" size="icon" onClick={() => playAudio(tr.uk.audio)}>
              <VolumeIcon className="h-5 w-5" />
            </Button>
          }
        </div>
      </CardContent>
    </Card>
  )
}

const WordsList = (props: {words: string[]}) => {
  const { words } = props
  const [wordTranslation, setWordTranslation] = useState<Record<string, TranslationData>>({})

  const setTranslation = (translation: TranslationData): void => {
    setWordTranslation((prev) => ({
      ...prev,
      [translation.word]: translation,
    }))
  }
  
  return (
    <>
      {words.map((word) => <WordCard key={word} word={word} setTranslation={setTranslation} wordTranslation={wordTranslation} /> )}
    </>
  )
}

export default WordsList