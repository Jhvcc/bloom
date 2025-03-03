'use client';

import StoryCard, { Story } from "@/components/StoryCard"
import { Button } from "@/components/ui/button"
import { generateStory } from "@/services/generate-story"
import { useQuery } from "@tanstack/react-query"
import { ChevronLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";


const StoryMain = () => {
  const params = useSearchParams();
  const difficulty = params.get('level') || "beginner";
  const difficultyStoryNum = difficulty === "beginner" ? 50 : difficulty === "intermediate" ? 100 : 150;
  const [words, setWords] = useState<string[]>([])
  const storyQuery = useQuery<Story>({
    queryKey: ["story", difficulty],
    queryFn: async () => generateStory(words, difficultyStoryNum),
    enabled: words.length > 0,
  })

  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem("words") || "[]");
    setWords(storedWords)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-6">
        {storyQuery.isSuccess ?
          <StoryCard {...storyQuery.data!} />
          : <div className="flex justify-start items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            Loading...
          </div>
        }

        <div className="flex justify-between pt-4">
          <Link href={`/words/?level=${difficulty}`}>
            <Button variant="outline" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to words</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default StoryMain