import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import jsYaml from 'js-yaml';

export interface ExtractedYaml {
  content: string;
  data: any;
}

export function extractYamlFromMarkdown(markdown: string): ExtractedYaml | null {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm);

  const tree = processor.parse(markdown);
  let result: ExtractedYaml | null = null;

  visit(tree, 'code', (node: any) => {
    if (node.lang === 'yaml' || node.lang === 'yml') {
      try {
        const yamlData = jsYaml.load(node.value);
        result = {
          content: node.value,
          data: yamlData
        };
      } catch (error) {
        console.error('Error parsing YAML:', error);
      }
    }
  });

  return result;
} 