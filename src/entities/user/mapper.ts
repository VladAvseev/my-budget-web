import type { Database } from '@/shared/supabase';
import type { User } from './type';

type UserRow = Database['public']['Tables']['users']['Row'];

export function mapUser(row: UserRow): User {
  return {
    id: row.id,
    authUid: row.auth_uid,
    login: row.login,
    initialBalance: Number(row.initial_balance),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}