import type { Database } from '@/shared/supabase';
import type { Report } from './type';

type ReportRow = Database['public']['Tables']['reports']['Row'];

export function mapReport(row: ReportRow): Report {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    dailyBudget: Number(row.daily_budget),
    periodStart: row.period_start,
    periodEnd: row.period_end,
    hasDailyExpenses: row.has_daily_expenses,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}