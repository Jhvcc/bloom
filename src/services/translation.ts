import { post } from "./base";

export const fetchTranslation = (query: string) => {
  return post('/api/translation', { body: { query } })
}