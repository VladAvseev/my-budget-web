import type { Session, User } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const sessionAtom = atom<Session | null>(null);

export const authUserAtom = atom<User | null>(null);

export const isAuthLoadingAtom = atom(true);
