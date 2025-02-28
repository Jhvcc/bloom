'use client'

import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


const Main = () => {
  const [difficulty, setDifficulty] = useState<string>('beginner')
  // const mutation = useMutation<Story, Error>({
  //   mutationFn: async (): Promise<Story> => generateStory(selectedWords)
  // })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Story-Based English Learning</h1>
          <p className="text-muted-foreground">Learn words through stories and improve language skills</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="difficulty" className="text-sm font-medium">Select level</label>
          <Select defaultValue="beginner" name="level" onValueChange={setDifficulty}>
            <SelectTrigger id="difficulty" className="w-full">
              <SelectValue placeholder="select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4">
          <Link href={`/words/?level=${difficulty}`}>
            <Button className="w-full text-lg" size="lg">
              Start
            </Button>
          </Link>
        </div>
      </div>
    </main>
    // <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-100 dark:from-gray-900 dark:to-gray-800">
    //   <main className="container mx-auto px-4 py-8">
    //     <header className="mb-8 text-center">
    //       <h1 className="text-3xl font-bold tracking-tight text-violet-900 dark:text-violet-100 md:text-4xl">
    //         Story-Based English Learning
    //       </h1>
    //       <p className="mt-2 text-muted-foreground">
    //         Add more or generate random ones to create unique learning stories.
    //       </p>
    //     </header>

    //     <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
    //       <div className="mb-4 space-y-4">
    //         <div className="flex items-center justify-between">
    //           <h2 className="text-xl font-semibold text-violet-900 dark:text-violet-100">
    //             1. Add Words to Learn
    //           </h2>
    //           <Button
    //             onClick={() => mutation.mutate()}
    //             className="gap-2"
    //             disabled={mutation.isPending || selectedWords.length === 0}
    //           >
    //             {mutation.isPending ? (
    //               <>
    //                 <Wand2 className="h-4 w-4 animate-spin" />
    //                 Generating...
    //               </>
    //             ) : (
    //               <>
    //                 <Wand2 className="h-4 w-4" />
    //                 Generate Stories ({selectedWords.length})
    //               </>
    //             )}
    //           </Button>
    //         </div>

    //         <Alert>
    //           <InfoIcon className="h-4 w-4" />
    //           <AlertDescription>
    //           Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context.
    //           </AlertDescription>
    //         </Alert>
    //       </div>

    //       <WordInput selectedWords={selectedWords} onWordsChange={setSelectedWords} />
    //     </div>

    //     {mutation.isSuccess && <StoryCard {...mutation.data} />}
    //     <StoryCard id="123" words={["word", "love", "history"]} story="Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context.Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context.Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context.Add up to the words manually or generate random words. Each word will get its own story to help you learn it in context." />
    //   </main>
    // </div>
  )
}

export default Main;