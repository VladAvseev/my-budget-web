import { supabase } from '@/shared/supabase';
import type { Database } from '@/shared/supabase';
import { parseISO, toISODate } from '@/shared/utils';
import { mapOperation } from './mapper';
import type { CreateOperationParams, Operation, UpdateOperationParams } from './type';

export async function createOperation(params: CreateOperationParams): Promise<Operation> {
  if (params.type === 'daily_expense') {
    return createDailyExpenseOperation(
      params.reportId,
      params.amount,
      params.description,
    );
  }

  const { data, error } = await supabase
    .from('operations')
    .insert({
      report_id: params.reportId,
      type: params.type,
      amount: params.amount,
      category_id: params.categoryId ?? null,
      description: params.description ?? null,
      operation_date: params.operationDate ?? toISODate(new Date()),
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapOperation(data);
}

export async function updateOperation(
  id: number,
  update: UpdateOperationParams,
): Promise<Operation> {
  const patch: Database['public']['Tables']['operations']['Update'] = {};
  if (update.amount !== undefined) {
    patch.amount = update.amount;
  }
  if (update.categoryId !== undefined) {
    patch.category_id = update.categoryId;
  }
  if (update.description !== undefined) {
    patch.description = update.description;
  }

  const { data, error } = await supabase
    .from('operations')
    .update(patch)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapOperation(data);
}

export async function deleteOperation(id: number): Promise<void> {
  const { error } = await supabase.from('operations').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

async function createDailyExpenseOperation(
  reportId: number,
  amount: number,
  description?: string | null,
): Promise<Operation> {
  const { data: report, error: reportError } = await supabase
    .from('reports')
    .select('period_start, period_end')
    .eq('id', reportId)
    .single();
  if (reportError) {
    throw reportError;
  }

  const { data: existing, error: existingError } = await supabase
    .from('operations')
    .select('operation_date')
    .eq('report_id', reportId)
    .eq('type', 'daily_expense')
    .order('sort_order', { ascending: true });
  if (existingError) {
    throw existingError;
  }

  const occupiedDates = new Set((existing ?? []).map((op) => op.operation_date));
  const periodStart = parseISO(report.period_start);
  const periodEnd = parseISO(report.period_end);

  if (!periodStart || !periodEnd) {
    throw new Error('У отчёта некорректные даты отчётного периода');
  }

  const cursor = new Date(periodStart);
  let candidateDate: string | null = null;
  let candidateOrder = 0;

  while (cursor <= periodEnd) {
    const dateStr = toISODate(cursor);
    if (!occupiedDates.has(dateStr)) {
      candidateDate = dateStr;
      candidateOrder = (cursor.getTime() - periodStart.getTime()) / 86400000;
      break;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  if (!candidateDate) {
    throw new Error('Все дни отчётного периода уже заполнены операциями');
  }

  const { data, error } = await supabase
    .from('operations')
    .insert({
      report_id: reportId,
      type: 'daily_expense',
      amount,
      category_id: null,
      description: description ?? null,
      operation_date: candidateDate,
      sort_order: candidateOrder,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }
  return mapOperation(data);
}