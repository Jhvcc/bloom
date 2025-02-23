import { post } from "./base";

interface TranslationResponse {
  data: {
    word: string;
    translation: string;
    // ... other fields
  }
}

export const translateWord = (word: string, type: string = 'xxapi') => {
  return post<TranslationResponse>('/api/translation', { 
    body: { query: word, type } 
  });
}

export const translateWords = async (words: string[], type: string = 'xxapi') => {
  // Create array of promises for parallel execution
  const promises = words.map(word => translateWord(word, type));
  
  try {
    // Execute all promises in parallel
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Translation failed:', error);
    throw error;
  }
}

// Batch translate with concurrency limit
export const batchTranslateWords = async (
  words: string[], 
  batchSize: number = 5,
  type: string = 'xxapi'
) => {
  const results = [];
  
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    const batchResults = await translateWords(batch, type);
    results.push(...batchResults);
  }
  
  return results;
} 