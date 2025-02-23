import { type Story } from "@/components/StoryList";
import { post } from "./base";

export const generateStory = (words: string[]) => {
  return post('/api/generate_story', { body: { words } })
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