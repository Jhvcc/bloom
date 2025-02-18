'use client';

import { PartOfSpeech, TranslationData } from "@/types/dictionary";
import PlayIcon from "./PlayIcon";

const PartOfSpeechBadge = (props: { pos: string }) => {
  return (
    <div className=" bg-gray-400 px-2 py-0.5 rounded-lg text-white font-bold flex justify-center items-center w-14">
      <text className=" after:content-['.']">{props.pos}</text>
    </div>
  )
}

const PartOfSpeechArea = (props: PartOfSpeech) => {
  return (
    <div className="flex flex-col gap-2.5">
      {Object.entries(props).map(([key, value]) => (
        <PartOfSpeechLine key={key} explain={value} pos={key} />
      ))}
    </div>
  )
}

const PartOfSpeechLine = (props: { explain: string, pos: string }) => {
  return (
    <div className="flex flex-row items-center gap-3 text-sm">
      <PartOfSpeechBadge pos={props.pos} />
      <div>{props.explain}</div>
    </div>
  )
}

const TranslationCard = (props: TranslationData) => {
  
  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.src = audioUrl;
    audio.play();
  }

  return (
    <div className="bg-slate-900 absolute w-80 h-40 py-2 px-4 rounded-lg text-white font-medium">
      <div>
        <div className="flex flex-col gap-1">
          <div className="drag-handle"></div>
          <div className="text-2xl">{props.word}</div>
          <div className="flex flex-row items-center gap-2 font-light text-gray-300 pb-1">
            <span className="before:content-['/'] after:content-['/']">{props.uk.phonetic}</span>
            <button 
              onClick={() => playAudio(props.uk.audio)}
              className="border-0 bg-transparent p-0 cursor-pointer"
            >
              <PlayIcon />
            </button>
          </div>
          <PartOfSpeechArea {...props.suggest.explain} />
        </div>
      </div>
    </div>
  )
};

export default TranslationCard;
