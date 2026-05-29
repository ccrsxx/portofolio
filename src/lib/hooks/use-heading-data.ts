import { useState } from 'react';

type UseHeadingData = {
  id: string;
  title: string;
  items: Omit<UseHeadingData, 'items'>[];
};

function computeHeadings(): UseHeadingData[] {
  const headingNodes = document.querySelectorAll<HTMLHeadingElement>(
    '#mdx-article :is(h2, h3)'
  );

  const parsedHeadings = Array.from(headingNodes);

  const headings: UseHeadingData[] = [];

  for (const heading of parsedHeadings) {
    const { id, nodeName, textContent: title } = heading;

    if (nodeName === 'H2') {
      headings.push({ id, title: title, items: [] });
    } else if (nodeName === 'H3' && headings.length) {
      const lastHeading = headings[headings.length - 1];
      lastHeading.items.push({ id, title: title });
    }
  }

  return headings;
}

/**
 * Returns an array of heading data.
 */
export function useHeadingData(): UseHeadingData[] {
  const [state] = useState(computeHeadings);

  return state;
}
