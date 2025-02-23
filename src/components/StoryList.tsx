'use client';

import React from 'react';
import MagicWord from './MagicWord';
export interface Story {
  id: string;
  word: string;
  story: string;
}

export interface Stories {
  stories: Story[];
}

const StoryList = (props: Stories) => {
  const { stories } = props;
  return (
    <div className="space-y-4 isolate">
      {stories.map((story) => (
        <StoryItem key={story.id} {...story} />
      ))}
    </div>
  )
}

const StoryItem = (props: Story) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-purple-600 capitalize">{props.word}</h3>
        {/* <div className="flex gap-2">
          <button
            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            title="Regenerate story"
          >
            <Wand2 className='h-5 w-5' />
          </button>
          <button
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            title="Remove story"
          >
            <Trash2 className='h-5 w-5' />
          </button>
        </div> */}
      </div>
      <StoryText text={props.story} />
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