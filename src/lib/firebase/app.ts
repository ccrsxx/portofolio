import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { backendEnv } from '@lib/env-server';

initializeApp({
  appId: backendEnv.APP_ID,
  apiKey: backendEnv.API_KEY,
  projectId: backendEnv.PROJECT_ID,
  authDomain: backendEnv.AUTH_DOMAIN,
  storageBucket: backendEnv.STORAGE_BUCKET,
  messagingSenderId: backendEnv.MESSAGING_SENDER_ID
});

export const db = getFirestore();
