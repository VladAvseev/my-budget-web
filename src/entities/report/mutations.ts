import { supabase } from '@/shared/supabase';
import type { Database } from '@/shared/supabase';
import { mapReport } from './mapper';
import type { Report, ReportInput, ReportUpdate } from './type';

export async function createReport(userId: number, input: ReportInput): Promise<Report> {
  const { data, error } = await supabase
    .from('reports')
    .insert({
      user_id: userId,
      name: input.name,
      daily_budget: input.dailyBudget,
      period_start: input.periodStart,
      period_end: input.periodEnd,
      has_daily_expenses: input.hasDailyExpenses ?? true,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapReport(data);
}

export async function updateReport(id: number, update: ReportUpdate): Promise<Report> {
  const patch: Database['public']['Tables']['reports']['Update'] = {};
  if (update.name !== undefined) {
    patch.name = update.name;
  }
  if (update.dailyBudget !== undefined) {
    patch.daily_budget = update.dailyBudget;
  }
  if (update.periodStart !== undefined) {
    patch.period_start = update.periodStart;
  }
  if (update.periodEnd !== undefined) {
    patch.period_end = update.periodEnd;
  }

  const { data, error } = await supabase
    .from('reports')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapReport(data);
}

export async function deleteReport(id: number): Promise<void> {
  const { error } = await supabase.from('reports').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

export async function enableDailyExpenses(
  id: number,
  dailyBudget: number,
): Promise<Report> {
  const { data, error } = await supabase
    .from('reports')
    .update({ has_daily_expenses: true, daily_budget: dailyBudget })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapReport(data);
}

export async function disableDailyExpenses(id: number): Promise<Report> {
  const { error: deleteError } = await supabase
    .from('operations')
    .delete()
    .eq('report_id', id)
    .eq('type', 'daily_expense');
  if (deleteError) {
    throw deleteError;
  }

  const { data, error } = await supabase
    .from('reports')
    .update({ has_daily_expenses: false })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapReport(data);
}