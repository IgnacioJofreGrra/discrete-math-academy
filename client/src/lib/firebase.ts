import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const getRequiredEnv = (key: string): string => {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  if (!value) {
    throw new Error(`Missing required Firebase env var: ${key}`);
  }
  return value;
};

const firebaseConfig = {
  apiKey: getRequiredEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getRequiredEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getRequiredEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getRequiredEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getRequiredEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getRequiredEnv('VITE_FIREBASE_APP_ID'),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
