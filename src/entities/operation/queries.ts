import { supabase } from '@/shared/supabase';
import { mapOperation } from './mapper';
import type { Operation, OperationType, ReportSummary } from './type';

export async function getOperations(
  reportId: number,
  type: OperationType,
): Promise<Operation[]> {
  const { data, error } = await supabase
    .from('operations')
    .select('*')
    .eq('report_id', reportId)
    .eq('type', type)
    .order('operation_date', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map(mapOperation);
}

export async function getReportSummary(reportId: number): Promise<ReportSummary> {
  const { data, error } = await supabase
    .from('operations')
    .select('type, amount')
    .eq('report_id', reportId);

  if (error) {
    throw error;
  }

  let income = 0;
  let expense = 0;
  let deferred = 0;

  for (const operation of data ?? []) {
    const amount = Number(operation.amount);
    if (operation.type === 'income') {
      income += amount;
    } else if (operation.type === 'expense') {
      expense += amount;
    } else if (operation.type === 'deferred') {
      deferred += amount;
    }
  }

  const remaining = income - expense - deferred;

  return { income, expense, deferred, remaining };
}

export async function countDailyExpenses(reportId: number): Promise<number> {
  const { count, error } = await supabase
    .from('operations')
    .select('*', { count: 'exact', head: true })
    .eq('report_id', reportId)
    .eq('type', 'daily_expense');

  if (error) {
    throw error;
  }

  return count ?? 0;
}