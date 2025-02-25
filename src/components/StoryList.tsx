'use client';

import React from 'react';
import MagicWord from './MagicWord';
export interface Story {
  id: string;
  words: string[];
  story: string;
}

export interface Stories {
  stories: Story[];
}

const StoryList = (props: Story) => {
  return (
    <div className="space-y-4 isolate">
        <div className="bg-white rounded-lg shadow-md p-6">
          <StoryText text={props.story} />
        </div>
    </div>
  )
}

const StoryText = (props: {text: string}) => {
  const { text } = props;
  return (
    <div className="text-gray-700 leading-relaxed  font-medium [word-spacing:0.1em]">
      {text.split(" ").map((word, index) => (
        <React.Fragment key={index}>
          <MagicWord word={word} />
          {" "}
        </React.Fragment>
      ))}
    </div>
  )
}

export default StoryList;