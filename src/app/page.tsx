'use client';

import Main from "@/components/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const runtime = "edge";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}
