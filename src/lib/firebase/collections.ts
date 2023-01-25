import { collection } from 'firebase/firestore';
import { contentMetaConverter } from '@lib/types/meta';
import { db } from './app';

export const contentsCollection = collection(db, 'contents').withConverter(
  contentMetaConverter
);
