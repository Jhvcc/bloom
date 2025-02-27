'use client'

import { useMutation } from "@tanstack/react-query";
import StoryCard, { type Story } from "./StoryCard";
import WordInput from "./WordInput";
import { Alert, AlertDescription } from "./ui/alert";
import { InfoIcon, Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { generateStory } from "@/services/generate-story";
import { useState } from "react";


const Main = () => {
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const mutation = useMutation<Story, Error>({
    mutationFn: async (): Promise<Story> => generateStory(selectedWords)
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-violet-900 dark:text-violet-100 md:text-4xl">
            Story-Based English Learning
          </h1>
          <p className="mt-2 text-muted-foreground">
            Add more or generate random ones to create unique learning stories.
          </p>
        </header>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="mb-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-violet-900 dark:text-violet-100">
                1. Add Words to Learn
              </h2>
              <Button
                onClick={() => mutation.mutate()}
                className="gap-2"
                disabled={mutation.isPending || selectedWords.length === 0}
              >
                {mutation.isPending ? (
                  <>
                    <Wand2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate Stories ({selectedWords.length})
                  </>
                )}
              </Button>
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
              Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context.
              </AlertDescription>
            </Alert>
          </div>

          <WordInput selectedWords={selectedWords} onWordsChange={setSelectedWords} />
        </div>

        {mutation.isSuccess && <StoryCard {...mutation.data} />}
        <StoryCard id="123" words={["word", "love", "history"]} story="Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context.Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context.Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context.Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context." />
      </main>
    </div>
  )
}

export default Main;