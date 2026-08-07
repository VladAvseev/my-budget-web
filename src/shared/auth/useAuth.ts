import { login, logout, registration } from '@/entities/user';
import type { User, UserCredentials } from '@/entities/user';
import { supabase } from '@/shared/supabase';
import {
  authUserAtom,
  isAuthLoadingAtom,
  sessionAtom,
} from './atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export function useAuth() {
  const [authUser, setAuthUser] = useAtom(authUserAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [isLoading, setIsLoading] = useAtom(isAuthLoadingAtom);

useEffect(() => {
    const { data: authState } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setAuthUser(currentSession?.user ?? null);
    });

    const subscription = authState.subscription;

    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthUser(data.session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setAuthUser, setSession, setIsLoading]);

  const signIn = async (credentials: UserCredentials): Promise<User> => {
    return login(credentials);
  };

  const signUp = async (credentials: UserCredentials): Promise<User> => {
    return registration(credentials);
  };

  const signOut = async (): Promise<void> => {
    await logout();
  };

  return {
    authUser,
    session,
    isAuthenticated: Boolean(authUser),
    isLoading,
    signIn,
    signUp,
    signOut,
  };
}