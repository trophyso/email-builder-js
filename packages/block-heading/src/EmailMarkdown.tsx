import insane, { AllowedTags } from 'insane';
import { marked, Renderer } from 'marked';
import React from 'react';

const ALLOWED_TAGS: AllowedTags[] = ['a', 'b', 'p', 'code', 'em', 'i', 'span', 'strong'];
const GENERIC_ALLOWED_ATTRIBUTES = ['style', 'title'];

function sanitizer(html: string): string {
  return insane(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      ...ALLOWED_TAGS.reduce<Record<string, string[]>>((res, tag) => {
        res[tag] = [...GENERIC_ALLOWED_ATTRIBUTES];
        return res;
      }, {}),
      a: ['href', 'target', ...GENERIC_ALLOWED_ATTRIBUTES],
    },
  });
}

class CustomRenderer extends Renderer {
  paragraph(text: string) {
    return `<span style="margin: 0">${text}</span>`;
  }

  link(href: string, title: string | null, text: string) {
    if (!title) {
      return `<a href="${href}" target="_blank">${text}</a>`;
    }
    return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
  }
}

function renderMarkdownString(str: string): string {
  const html = marked.parse(str, {
    async: false,
    breaks: true,
    gfm: true,
    pedantic: false,
    silent: false,
    renderer: new CustomRenderer(),
  });
  if (typeof html !== 'string') {
    throw new Error('marked.parse did not return a string');
  }
  return sanitizer(html);
}

type Props = {
  markdown: string;
};
export default function EmailMarkdown({ markdown }: Props) {
  const data = renderMarkdownString(markdown);
  return <span dangerouslySetInnerHTML={{ __html: data }} />;
}
