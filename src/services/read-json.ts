import { get } from "./base";

export const readJson = async (name: "BEC_2" | "BEC_3"): Promise<string[]> => {
  const res = await get(`/api/read_dictionary?name=${name}`);
  console.log({res});
  return res as string[];
}