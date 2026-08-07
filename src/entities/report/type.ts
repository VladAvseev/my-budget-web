export interface Report {
  id: number;
  userId: number;
  name: string;
  dailyBudget: number;
  periodStart: string;
  periodEnd: string;
  hasDailyExpenses: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReportInput {
  name: string;
  dailyBudget: number;
  periodStart: string;
  periodEnd: string;
  hasDailyExpenses?: boolean;
}

export interface ReportUpdate {
  name?: string;
  dailyBudget?: number;
  periodStart?: string;
  periodEnd?: string;
}