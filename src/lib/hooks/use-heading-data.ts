import { useEffect, useState } from 'react';

type UseHeadingData = {
  id: string;
  title: string;
  items: Omit<UseHeadingData, 'items'>[];
};

/**
 * Returns an array of heading data.
 */
export function useHeadingData(): UseHeadingData[] {
  const [headingData, setHeadingData] = useState<UseHeadingData[]>([]);

  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll('#mdx-article :is(h2, h3)')
    );

    const newHeadingData: UseHeadingData[] = [];

    for (const heading of headingElements) {
      const { id, nodeName, textContent: title } = heading;

      if (nodeName === 'H2') {
        newHeadingData.push({ id, title: title, items: [] });
      } else if (nodeName === 'H3' && newHeadingData.length) {
        const lastH2 = newHeadingData[newHeadingData.length - 1];
        lastH2.items.push({ id, title: title });
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadingData(newHeadingData);
  }, []);

  return headingData;
}
