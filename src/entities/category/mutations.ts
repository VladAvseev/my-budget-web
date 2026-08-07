import { supabase } from '@/shared/supabase';
import { mapCategory } from './mapper';
import type { Category } from './type';

export async function createCategory(userId: number, name: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .insert({ user_id: userId, name })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapCategory(data);
}

export async function updateCategory(id: number, name: string): Promise<Category> {
  const { data, error } = await supabase
    .from('categories')
    .update({ name })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapCategory(data);
}

export async function deleteCategory(id: number): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) {
    throw error;
  }
}