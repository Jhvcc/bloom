'use client';

import React from 'react';
import MagicWord from './MagicWord';
import { Card, CardContent } from './ui/card';
export interface Story {
  id: string;
  words: string[];
  story: string;
}

export interface Stories {
  stories: Story[];
}

const StoryCard = (props: Story) => {
  const { story: text } = props;
  return (
    <div className="space-y-4 isolate">
      <Card className='overflow-hidden border-0 shadow-lg rounded-2xl bg-white/80'>
        <CardContent className='p-8 leading-relaxed text-lg text-gray-700'>
          {text.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              <MagicWord word={word} />
              {" "}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default StoryCard;