import type { FirestoreDataConverter } from 'firebase/firestore';
import type { ContentType } from './contents';

export type ContentMeta = {
  slug: string;
  type: ContentType;
  views: number;
  likes: number;
};

export const contentMetaConverter: FirestoreDataConverter<ContentMeta> = {
  toFirestore(contentMeta) {
    return contentMeta;
  },
  fromFirestore(snapshot, options) {
    const { id: slug } = snapshot;
    const data = snapshot.data(options);

    return { slug, ...data } as ContentMeta;
  }
};
