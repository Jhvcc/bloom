import { get } from "./base";

export const readJson = async (name: "BEC_2" | "BEC_3"): Promise<string[]> => {
  return get(`/api/read_dictionary?name=${name}`);
}