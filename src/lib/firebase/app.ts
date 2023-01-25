import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFirebaseConfig } from './config';

initializeApp(getFirebaseConfig());

export const db = getFirestore();
