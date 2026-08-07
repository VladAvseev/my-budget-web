import { supabase } from '@/shared/supabase';
import { mapCategory } from './mapper';
import type { Category } from './type';

export async function getCategories(userId: number): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapCategory);
}
