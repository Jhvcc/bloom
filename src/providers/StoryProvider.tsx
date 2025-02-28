'use client'

import StoryMain from "@/components/StoryMain"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Suspense } from "react"

const StoryProvider = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <StoryMain />
      </Suspense>
    </QueryClientProvider>
  )
}

export default StoryProvider;