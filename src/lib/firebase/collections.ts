import { collection } from 'firebase/firestore';
import { contentMetaConverter } from '@lib/types/meta';
import { guestbookConverter } from '@lib/types/guestbook';
import { db } from './app';

export const contentsCollection = collection(db, 'contents').withConverter(
  contentMetaConverter
);

export const guestbookCollection = collection(db, 'guestbook').withConverter(
  guestbookConverter
);
