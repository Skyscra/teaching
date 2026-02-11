import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeMathjax from "rehype-mathjax";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

const BASE_PATH = "/teaching";

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

const calloutLabels: Record<string, string> = {
  DEFINITION: "Definition",
  THEOREM: "Theorem",
  LEMMA: "Lemma",
  PROOF: "Proof",
  NOTE: "Note",
  WARNING: "Warning",
};

function remarkCallouts() {
  return (tree: unknown) => {
    visit(tree, "blockquote", (node: any) => {
      if (!node.children || node.children.length === 0) {
        return;
      }

      const firstChild = node.children[0];
      if (firstChild.type !== "paragraph" || !firstChild.children?.length) {
        return;
      }

      const firstText = toString(firstChild).trim();
      const match = firstText.match(/^\[!([A-Z]+)\]/);
      if (!match) {
        return;
      }

      const type = match[1];
      const label = calloutLabels[type];
      if (!label) {
        return;
      }

      const typeClass = `callout-${type.toLowerCase()}`;
      node.data = {
        hName: "aside",
        hProperties: {
          className: ["callout", typeClass],
        },
      };

      const marker = `[!${type}]`;
      const firstTextNode = firstChild.children[0];
      if (firstTextNode?.type === "text") {
        firstTextNode.value = firstTextNode.value.replace(marker, "").trimStart();
        if (!firstTextNode.value) {
          firstChild.children.shift();
        }
      }

      if (firstChild.children.length === 0) {
        node.children.shift();
      }

      node.children.unshift({
        type: "paragraph",
        data: {
          hProperties: {
            className: ["callout-title"],
          },
        },
        children: [{ type: "text", value: label }],
      });
    });
  };
}

function rehypePrefixPaths() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName === "img" && node.properties?.src) {
        const src = node.properties.src;
        // Only prefix if it's an absolute path that doesn't already start with BASE_PATH
        if (src.startsWith("/") && !src.startsWith(BASE_PATH + "/")) {
          node.properties.src = `${BASE_PATH}${src}`;
        }
      }
      if (node.tagName === "a" && node.properties?.href) {
        const href = node.properties.href;
        // Only prefix internal absolute links
        if (href.startsWith("/") && !href.startsWith(BASE_PATH + "/") && !href.startsWith("#")) {
          node.properties.href = `${BASE_PATH}${href}`;
        }
      }
    });
  };
}

export async function renderMarkdown(markdown: string) {
  const toc: TocItem[] = [];
  const slugger = new GithubSlugger();

  const ast = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .parse(markdown);

  visit(ast, "heading", (node: any) => {
    if (![2, 3, 4].includes(node.depth)) {
      return;
    }
    const text = toString(node).trim();
    if (!text) {
      return;
    }
    toc.push({
      id: slugger.slug(text),
      text,
      depth: node.depth,
    });
  });

  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallouts)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrefixPaths)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        ariaHidden: "true",
      },
      content: { type: "text", value: "#" },
    })
    .use(rehypeMathjax)
    .use(rehypeStringify)
    .process(markdown);

  return { html: String(html), toc };
}
