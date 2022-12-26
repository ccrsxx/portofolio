import { useState, useEffect, useRef } from 'react';

type HeadingElementsRef = Record<string, IntersectionObserverEntry>;

/**
 * A hook that returns the id of the active heading.
 *
 * @returns The id of the active heading.
 */
export function useActiveHeading(): string | null {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  const headingElementsRef = useRef<HeadingElementsRef | null>(null);

  useEffect(() => {
    const getIndexFromHeadingId = (id: string): number =>
      headingElements.findIndex((heading) => heading.id === id);

    const callback = (entries: IntersectionObserverEntry[]): void => {
      headingElementsRef.current = entries.reduce(
        (acc, headingElement) => ({
          ...acc,
          [headingElement.target.id]: headingElement
        }),
        headingElementsRef.current
      );

      const visibleHeadings: IntersectionObserverEntry[] = [];

      for (const [, headingElement] of Object.entries(
        headingElementsRef.current as HeadingElementsRef
      ))
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);

      if (visibleHeadings.length === 1)
        setActiveHeading(visibleHeadings[0].target.id);
      else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          ({ target: { id: firstId } }, { target: { id: secondId } }) =>
            getIndexFromHeadingId(firstId) - getIndexFromHeadingId(secondId)
        );
        setActiveHeading(sortedVisibleHeadings[0].target.id);
      }
    };

    const headingObserver = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px'
    });

    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll('#mdx-article :is(h2, h3)')
    );

    headingElements.forEach((heading) => headingObserver.observe(heading));

    return () => headingObserver.disconnect();
  }, []);

  return activeHeading;
}
