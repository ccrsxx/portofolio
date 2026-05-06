import { UnstyledLink } from '@components/link/unstyled-link';
import { ImagePreview } from '@components/modal/image-preview';
import { Accent } from '@components/ui/accent';
import { ContentTag } from '@components/ui/content-tag';
import { formatDate } from '@lib/format';
import { preventBubbling } from '@lib/helper';
import type { Bookmark } from '@lib/types/bookmarks';
import { HiArrowTopRightOnSquare } from 'react-icons/hi2';

type BookmarkCardProps = Bookmark & {
  selectedTags: string[];
};

export function BookmarkCard({
  tags,
  title,
  width,
  height,
  imageUrl,
  pixivUrl,
  createdAt,
  artistName,
  aiGenerated,
  selectedTags
}: BookmarkCardProps): React.JSX.Element {
  const isSelected = (tag: string): boolean => selectedTags.includes(tag);

  const displayTags = [
    ...tags.filter(isSelected),
    ...tags.filter((tag) => !isSelected(tag))
  ].slice(0, 3);

  return (
    <div className='break-inside-avoid relative overflow-hidden mb-4 rounded-md shadow-sm hover:shadow-md group'>
      <figure className='relative w-full group'>
        <ImagePreview
          src={imageUrl}
          alt={`Artwork by ${artistName}`}
          width={width}
          height={height}
          tabIndex={-1}
          customLink={pixivUrl}
          wrapperClassName='w-full'
          className='transition-transform duration-500 group-hover:scale-110 object-cover w-full h-auto'
        />
        <UnstyledLink
          href={pixivUrl}
          className='smooth-tab bg-background/50 hover:bg-background/80 text-foreground absolute 
                     top-4 right-4 z-10 rounded-md p-2 opacity-0 transition-opacity duration-300 
                     group-hover:opacity-100 focus-visible:opacity-100'
          onClick={preventBubbling()}
          tabIndex={-1}
        >
          <HiArrowTopRightOnSquare className='text-lg' />
        </UnstyledLink>
        <figcaption
          className='pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t 
                     from-background/80 via-background/20 to-transparent p-4 opacity-0 
                     transition-opacity duration-300 group-hover:opacity-100'
        >
          <h2 className='text-foreground text-lg font-bold line-clamp-1'>
            {title}
          </h2>
          <p className='text-secondary text-sm'>
            by <cite className='font-medium not-italic'>{artistName}</cite>
          </p>
          <p className='mt-1 text-secondary text-xs'>{formatDate(createdAt)}</p>
          <ul className='mt-2 flex flex-wrap gap-2 items-center'>
            {aiGenerated && (
              <ContentTag
                tag='li'
                className='text-xs gradient-background text-white'
              >
                AI Generated
              </ContentTag>
            )}
            {displayTags.map((tag) => (
              <ContentTag
                tag='li'
                className='text-xs line-clamp-1 opacity-80'
                key={tag}
              >
                {isSelected(tag) ? <Accent>{tag}</Accent> : tag}
              </ContentTag>
            ))}
          </ul>
        </figcaption>
      </figure>
    </div>
  );
}
