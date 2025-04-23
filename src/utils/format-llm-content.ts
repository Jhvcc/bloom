import yaml from "js-yaml"
import { FullContent } from "@/lib/data"

/**
 * 格式化 LLM 返回的内容
 * @param content - LLM 返回的内容
 * @returns 格式化后的内容
 */
export function formatLLMContent(content: string): FullContent {
  const yamlContent = yaml.load(content)
  return yamlContent as FullContent
}

