import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  browserLocalPersistence,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
  type Auth,
  type User,
} from 'firebase/auth';
import { auth, firebaseEnvError } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authAvailable: boolean;
  authSetupError: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
githubProvider.addScope('read:user');
githubProvider.addScope('user:email');

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const authClient = auth as Auth | null;

  useEffect(() => {
    if (!authClient) {
      setLoading(false);
      return;
    }

    setPersistence(authClient, browserLocalPersistence).catch((error) => {
      console.error('Error setting auth persistence:', error);
    });

    const unsubscribe = onAuthStateChanged(authClient, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [authClient]);

  const assertAuthClient = (): Auth => {
    if (!authClient) {
      throw new Error(firebaseEnvError ?? 'Firebase Authentication is not configured.');
    }
    return authClient;
  };

  const signInWithGoogle = async () => {
    try {
      const client = assertAuthClient();
      await signInWithPopup(client, googleProvider);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const client = assertAuthClient();
      await signInWithPopup(client, githubProvider);
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const client = assertAuthClient();
      await signOut(client);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authAvailable: Boolean(authClient),
        authSetupError: firebaseEnvError,
        signInWithGoogle,
        signInWithGithub,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
