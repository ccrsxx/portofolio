import type { Timestamp } from 'firebase/firestore';

export type Guestbook = {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: Timestamp;
};
