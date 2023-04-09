/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from '@vercel/og';
import { PUBLIC_URL } from '@lib/env';
import type { CSSProperties } from 'react';
import type { PageConfig } from 'next';
import type { NextRequest } from 'next/server';

export default async function handler(
  req: NextRequest
): Promise<ImageResponse> {
  const [regularFontData, mediumFontData, semiBoldFontData, boldFontData] =
    await Promise.all([regularFont, mediumFont, semiboldFont, boldFont]);

  const { searchParams } = req.nextUrl;

  const title = searchParams.get('title');
  const image = searchParams.get('image');
  const article = searchParams.get('article');
  const description = searchParams.get('description');

  const isHomepage = title === 'Risal Amin';

  return new ImageResponse(
    (
      <div tw='flex h-full w-full bg-[#222222] p-8 text-white '>
        {article ? (
          <div tw='flex justify-between w-full'>
            <div tw='flex max-w-xl flex-col justify-between'>
              <div tw='flex flex-col'>
                <p tw='-my-2 text-xl font-medium text-gray-400'>ccrsxx.me</p>
                <h2 style={gradientTitleStyles} tw='text-4xl'>
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
                  <p tw='-mb-4 text-2xl font-semibold'>Risal Amin</p>
                  <p tw='text-lg text-gray-400 font-medium'>@ccrsxx</p>
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
          <div tw='w-full flex justify-center items-center flex-col'>
            <img
              tw='w-24 h-24'
              src={`${PUBLIC_URL}/logo512.png`}
              alt="ccrsxx.me's logo"
            />
            <h2 style={gradientTitleStyles} tw='text-6xl pb-1'>
              {isHomepage ? 'Risal Amin' : title}
            </h2>
            {!isHomepage && (
              <p tw='text-2xl text-gray-200 font-semibold'>ccrsxx.me</p>
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
        },
        {
          name: 'Inter',
          data: semiBoldFontData,
          weight: 600
        },
        {
          name: 'Inter',
          data: boldFontData,
          weight: 700
        }
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

const semiboldFont = fetch(
  new URL('/public/assets/inter-semibold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const boldFont = fetch(
  new URL('/public/assets/inter-bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

type GradientTitle = Pick<
  CSSProperties,
  'color' | 'backgroundClip' | 'backgroundImage'
>;

const gradientTitleStyles: GradientTitle = {
  color: 'transparent',
  backgroundClip: 'text',
  backgroundImage: 'linear-gradient(to right, #60A5FA, #34D399)'
};
