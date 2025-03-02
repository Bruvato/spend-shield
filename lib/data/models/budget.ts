import { Category } from './types';

export interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  status: 'under' | 'over' | 'on-track';
}

export interface SpendingLimit {
  id: string;
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  period: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  resetDate: string;
  notifications: boolean;
  status: 'active' | 'warning' | 'exceeded';
}

export interface CategoryBudget {
  id: string;
  name: string;
  budget: number;
  spent: number;
  remaining: number;
  percentUsed: number;
  transactions: number;
}

export interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
  category: string;
  nextDate: string;
  status: 'active' | 'paused';
}
