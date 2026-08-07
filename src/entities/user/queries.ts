import { supabase } from '@/shared/supabase';
import type { Balance, User } from './type';
import { mapUser } from './mapper';

export async function getProfile(userId: number): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }

  return mapUser(data);
}

export async function getBalance(userId: number): Promise<Balance> {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('initial_balance')
    .eq('id', userId)
    .single();
  if (userError) {
    throw userError;
  }

  const { data: reports, error: reportsError } = await supabase
    .from('reports')
    .select('id')
    .eq('user_id', userId);
  if (reportsError) {
    throw reportsError;
  }

  const reportIds = (reports ?? []).map((report) => report.id);
  const totals = { income: 0, expense: 0, deferred: 0 };

  if (reportIds.length > 0) {
    const { data: operations, error: operationsError } = await supabase
      .from('operations')
      .select('type, amount')
      .in('report_id', reportIds);
    if (operationsError) {
      throw operationsError;
    }

    for (const operation of operations ?? []) {
      if (operation.type === 'income') {
        totals.income += Number(operation.amount);
      } else if (operation.type === 'expense') {
        totals.expense += Number(operation.amount);
      } else if (operation.type === 'deferred') {
        totals.deferred += Number(operation.amount);
      }
    }
  }

  const initialBalance = Number(user.initial_balance);

  return {
    initialBalance,
    income: totals.income,
    expense: totals.expense,
    deferred: totals.deferred,
    value: initialBalance + totals.income - totals.expense - totals.deferred,
  };
}
