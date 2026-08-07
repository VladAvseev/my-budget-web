import type { Database } from '@/shared/supabase';
import type { Category } from './type';

type CategoryRow = Database['public']['Tables']['categories']['Row'];

export function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}