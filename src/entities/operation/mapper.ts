import type { Database } from '@/shared/supabase';
import type { Operation, OperationType } from './type';

type OperationRow = Database['public']['Tables']['operations']['Row'];

export function mapOperation(row: OperationRow): Operation {
  return {
    id: row.id,
    reportId: row.report_id,
    categoryId: row.category_id,
    type: row.type as OperationType,
    amount: Number(row.amount),
    description: row.description,
    operationDate: row.operation_date,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}