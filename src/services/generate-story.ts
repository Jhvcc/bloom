import { type Story } from "@/components/StoryList";
// import { post } from "./base";

export const generateStory = async (words: string[]): Promise<Story> => {
  const res = await fetch('/api/generate_story', { method: "POST", body: JSON.stringify({ words }) })
  const data = await res.json()
  return data
}

export const generateStories = async (words: string[]): Promise<Story[]> => {
  const promises = words.map(word => generateStory([word]))

  try {
    const results = await Promise.all(promises)
    return results as Story[]
  } catch (error) {
    console.error(error)
    return []
  }
}