// import { get } from "./base";

export const readJson = async (name: "BEC_2" | "BEC_3"): Promise<string[]> => {
  const res = await fetch(`/api/read_dictionary?name=${name}`);
  return res.json() as Promise<string[]>;
}