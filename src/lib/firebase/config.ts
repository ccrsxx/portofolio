const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

type Config = typeof config;

export function getFirebaseConfig(): Config {
  if (Object.values(config).some((value) => !value))
    throw new Error('Firebase config is not set or incomplete');
  return config;
}
