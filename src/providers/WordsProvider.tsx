'use client'

import WordsMain from "@/components/WordsMain"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense } from "react"


const WordsProvider = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <WordsMain />
      </Suspense>
    </QueryClientProvider>
  )
}

export default WordsProvider