/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from '@vercel/og';
import { PUBLIC_URL } from '@lib/env';
import type { CSSProperties } from 'react';
import type { PageConfig } from 'next';
import type { NextRequest } from 'next/server';

export default async function handler(
  req: NextRequest
): Promise<ImageResponse> {
  const [regularFontData, mediumFontData] = await Promise.all([
    regularFont,
    mediumFont
  ]);

  const { searchParams } = req.nextUrl;

  const type = searchParams.get('type');
  const title = searchParams.get('title');
  const image = searchParams.get('image');
  const article = searchParams.get('article');
  const description = searchParams.get('description');

  const isHomepage = title === 'Risal Amin';

  return new ImageResponse(
    (
      <div tw='flex h-full w-full bg-black p-8 text-white '>
        {article ? (
          <div tw='flex w-full justify-between'>
            <div tw='flex flex-col justify-between'>
              <div tw='flex flex-col'>
                <p tw='-my-2 text-xl font-medium text-gray-400'>
                  risalamin.com/{type}
                </p>
                <h2 style={gradientTitleStyles} tw='max-w-xl text-4xl'>
                  {title}
                </h2>
              </div>
              <div tw='flex items-center'>
                <img
                  style={{ objectFit: 'cover' }}
                  tw='h-18 w-18 rounded-full'
                  src={`${PUBLIC_URL}/assets/emilia.png`}
                  alt='Emilia'
                />
                <div tw='ml-4 flex flex-col'>
                  {/* Originally semibold */}
                  <p tw='-mb-4 text-2xl font-medium'>Risal Amin</p>
                  <p tw='text-lg font-medium text-gray-400'>@ccrsxx</p>
                </div>
              </div>
            </div>
            <img
              style={{ objectFit: 'cover' }}
              tw='h-full w-[448px] rounded-md'
              src={image as string}
              alt={title as string}
            />
          </div>
        ) : (
          <div tw='flex w-full flex-col items-center justify-center'>
            <img
              tw='h-24 w-24'
              src={`${PUBLIC_URL}/logo512.png`}
              alt="risalamin.com's logo"
            />
            <h2 style={gradientTitleStyles} tw='pb-1 text-6xl'>
              {isHomepage ? 'Risal Amin' : title}
            </h2>
            {/* Originally semibold */}
            {!isHomepage && (
              <p tw='text-2xl font-medium text-gray-200'>risalamin.com</p>
            )}
            <p tw='max-w-4xl text-center text-2xl text-gray-300'>
              {description}
            </p>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Inter',
          data: regularFontData,
          weight: 400
        },
        {
          name: 'Inter',
          data: mediumFontData,
          weight: 500
        }
        // {
        //   name: 'Inter',
        //   data: semiBoldFontData,
        //   weight: 600
        // },
        // {
        //   name: 'Inter',
        //   data: boldFontData,
        //   weight: 700
        // }
      ]
    }
  );
}

export const config: PageConfig = {
  runtime: 'edge'
};

const regularFont = fetch(
  new URL('/public/assets/inter-regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const mediumFont = fetch(
  new URL('/public/assets/inter-medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

// const semiboldFont = fetch(
//   new URL('/public/assets/inter-semibold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer());

// const boldFont = fetch(
//   new URL('/public/assets/inter-bold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer());

type GradientTitle = Pick<
  CSSProperties,
  'color' | 'backgroundClip' | 'backgroundImage'
>;

const gradientTitleStyles: GradientTitle = {
  color: 'transparent',
  backgroundClip: 'text',
  backgroundImage: 'linear-gradient(to right, #a855f7, #f472b6)'
};
