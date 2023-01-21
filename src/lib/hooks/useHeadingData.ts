import { useState, useEffect } from 'react';

type HeadingData = {
  id: string;
  title: string;
  items: Omit<HeadingData, 'items'>[];
};

/**
 * Returns an array of heading data.
 */
export function useHeadingData(): HeadingData[] {
  const [headingData, setHeadingData] = useState<HeadingData[]>([]);

  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll('#mdx-article :is(h2, h3)')
    );

    const newHeadingData = headingElements.reduce((acc, heading) => {
      const { id, nodeName, textContent } = heading;
      const title = textContent as string;

      if (nodeName === 'H2') acc.push({ id, title, items: [] });
      else if (nodeName === 'H3' && acc.length) {
        const lastNestedHeading = acc[acc.length - 1];
        lastNestedHeading.items.push({ id, title });
      }

      return acc;
    }, [] as HeadingData[]);

    setHeadingData(newHeadingData);
  }, []);

  return headingData;
}
