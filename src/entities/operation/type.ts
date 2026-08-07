export type OperationType = 'income' | 'expense' | 'deferred' | 'daily_expense';

export interface Operation {
  id: number;
  reportId: number;
  categoryId: number | null;
  type: OperationType;
  amount: number;
  description: string | null;
  operationDate: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOperationParams {
  reportId: number;
  type: OperationType;
  amount: number;
  categoryId?: number | null;
  description?: string | null;
  operationDate?: string;
}

export interface UpdateOperationParams {
  amount?: number;
  categoryId?: number | null;
  description?: string | null;
}

export interface ReportSummary {
  income: number;
  expense: number;
  deferred: number;
  remaining: number;
}