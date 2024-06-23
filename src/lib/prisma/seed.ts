/* eslint-disable no-console */

import { prisma } from '@lib/db';

export async function main(): Promise<void> {
  const risal = await prisma.user.upsert({
    where: {
      email: 'me@risalamin.com'
    },
    create: {
      role: 'AUTHOR',
      name: 'Risal Amin',
      image:
        'https://raw.githubusercontent.com/ccrsxx/portofolio/main/public/assets/emilia.png',
      email: 'me@risalamin.com',
      githubId: '55032197',
      githubUsername: 'ccrsxx'
    },
    update: {}
  });

  console.log({ risal });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
