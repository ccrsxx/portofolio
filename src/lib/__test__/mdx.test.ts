import { getTags } from '@lib/helper';
import type { Blog } from '@lib/types/contents';
import type { StaticImageData } from 'next/image';

describe('Test getTags', () => {
  function createContent(tags: string): Blog {
    return {
      tags,
      slug: 'slug',
      title: 'title',
      description: 'description',
      readTime: 'readTime',
      banner: '/public/logo192.webp' as unknown as StaticImageData,
      publishedAt: 'publishedAt'
    };
  }

  it('should return an array of unique tags', () => {
    const contents: Blog[] = [
      createContent('tag1, tag2, tag3'),
      createContent('tag2, tag3'),
      createContent('tag3')
    ];

    const tags = getTags(contents);

    expect(tags).toEqual(['tag1', 'tag2', 'tag3']);
  });

  it('should return an array of unique tags with no space comma separated tags', () => {
    const contents: Blog[] = [
      createContent('tag1,tag2,tag3'),
      createContent('tag1,tag2,tag4')
    ];

    const tags = getTags(contents);

    expect(tags).toEqual(['tag1', 'tag2', 'tag3', 'tag4']);
  });

  it('should return an array of unique tags with random space comma separated tags', () => {
    const contents: Blog[] = [
      createContent('tag1,tag2,tag3'),
      createContent('tag1, tag2 ,tag4'),
      createContent('tag1,tag2, tag4'),
      createContent('tag1, tag2,tag5'),
      createContent('tag1,tag2, tag5')
    ];

    const tags = getTags(contents);

    expect(tags).toEqual(['tag1', 'tag2', 'tag3', 'tag4', 'tag5']);
  });
});
