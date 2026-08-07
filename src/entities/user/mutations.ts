import { supabase } from '@/shared/supabase';
import type { User, UserCredentials } from './type';
import { mapUser } from './mapper';

export async function registration(credentials: UserCredentials): Promise<User> {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: credentials.login,
    password: credentials.password,
  });

  if (authError) {
    throw authError;
  }

  const authUser = authData.user;
  if (!authUser) {
    throw new Error('Не удалось создать пользователя');
  }

  const { data, error } = await supabase
    .from('users')
    .insert({
      login: credentials.login,
      password_hash: '',
      auth_uid: authUser.id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapUser(data);
}

export async function login(credentials: UserCredentials): Promise<User> {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: credentials.login,
    password: credentials.password,
  });

  if (authError) {
    if (
      authError.status === 400 ||
      authError.code === 'invalid_credentials' ||
      authError.message.includes('Invalid login credentials')
    ) {
      throw new Error('Неверный логин или пароль');
    }
    throw authError;
  }

  const authUser = authData.user;
  if (!authUser) {
    throw new Error('Не удалось получить данные пользователя');
  }

  const profile = await getProfileByAuthUid(authUser.id);
  if (!profile) {
    throw new Error('Профиль пользователя не найден');
  }

  return profile;
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}

export async function getProfileByAuthUid(authUid: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_uid', authUid)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapUser(data) : null;
}

export async function updateLogin(userId: number, loginValue: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ login: loginValue })
    .eq('id', userId)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapUser(data);
}

export async function updatePassword(userId: number, password: string): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ password_hash: password })
    .eq('id', userId)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapUser(data);
}

export async function updateInitialBalance(userId: number, value: number): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ initial_balance: value })
    .eq('id', userId)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapUser(data);
}