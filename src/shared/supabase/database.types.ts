export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          auth_uid: string | null;
          login: string;
          password_hash: string;
          initial_balance: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          auth_uid?: string | null;
          login: string;
          password_hash: string;
          initial_balance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          auth_uid?: string | null;
          login?: string;
          password_hash?: string;
          initial_balance?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: number;
          user_id: number;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: number;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: number;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      reports: {
        Row: {
          id: number;
          user_id: number;
          name: string;
          daily_budget: number;
          period_start: string;
          period_end: string;
          has_daily_expenses: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: number;
          name?: string;
          daily_budget?: number;
          period_start: string;
          period_end: string;
          has_daily_expenses?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: number;
          name?: string;
          daily_budget?: number;
          period_start?: string;
          period_end?: string;
          has_daily_expenses?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reports_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      operations: {
        Row: {
          id: number;
          report_id: number;
          category_id: number | null;
          type: string;
          amount: number;
          description: string | null;
          operation_date: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          report_id: number;
          category_id?: number | null;
          type: string;
          amount: number;
          description?: string | null;
          operation_date: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          report_id?: number;
          category_id?: number | null;
          type?: string;
          amount?: number;
          description?: string | null;
          operation_date?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'operations_report_id_fkey';
            columns: ['report_id'];
            isOneToOne: false;
            referencedRelation: 'reports';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'operations_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
