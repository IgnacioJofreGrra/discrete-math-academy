import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const requiredFirebaseEnvKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const;

const env = import.meta.env as Record<string, string | undefined>;
const missingFirebaseEnvKeys = requiredFirebaseEnvKeys.filter((key) => !env[key]);

export const firebaseEnvError =
  missingFirebaseEnvKeys.length > 0
    ? `Missing Firebase env vars: ${missingFirebaseEnvKeys.join(', ')}`
    : null;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let authInstance: Auth | null = null;

if (!firebaseEnvError) {
  const app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
} else {
  console.error(firebaseEnvError);
}

export const auth = authInstance;
