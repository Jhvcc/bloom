'use client';

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WordsList from "@/components/WordsList";
import { useQuery } from "@tanstack/react-query";
import { readJson } from "@/services/read-json";

const WordsMain = () => {
  const params = useSearchParams();
  const difficulty = params.get('level') || "beginner";
  const difficultyNum = difficulty === "beginner" ? 10 : difficulty === "intermediate" ? 20 : 30;
  
  const randomQuery = useQuery({
    queryKey: ["random", difficulty],
    queryFn: async () => {
      const dictionary: string[] = await readJson("BEC_2")
      const randomWords = dictionary.sort(() => Math.random() - 0.5).slice(0, difficultyNum)
      return randomWords;
    }
  })

  const handleNavigate = () => {
    const randomWords = randomQuery.data;
    localStorage.setItem("words", JSON.stringify(randomWords));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl">Today&apos;s learning words {difficulty}</h1>
          <p className="text-muted-foreground">Please familiarize yourself with the following words first</p>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {randomQuery.isPending ?
            <div>Loading...</div>
            : <WordsList words={randomQuery.data!} />
          }
        </div>

        <div className="flex justify-between pt-6">
          <Link href={"/"}>
            <Button variant={"outline"}>Back</Button>
          </Link>
          <Link href={`/story/?level=${difficulty}`} onClick={handleNavigate}>
            <Button>Generate Story</Button>
          </Link>
        </div>
      </div>
    </main>
  )

}

export default WordsMain;