import { type FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { backendEnv } from '@lib/env-server';

function initializeFirebaseApp(): FirebaseApp {
  try {
    return getApp();
  } catch {
    return initializeApp({
      appId: backendEnv.APP_ID,
      apiKey: backendEnv.API_KEY,
      projectId: backendEnv.PROJECT_ID,
      authDomain: backendEnv.AUTH_DOMAIN,
      storageBucket: backendEnv.STORAGE_BUCKET,
      messagingSenderId: backendEnv.MESSAGING_SENDER_ID
    });
  }
}

initializeFirebaseApp();

export const db = getFirestore();
