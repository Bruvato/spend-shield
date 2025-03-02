export interface SpendingAnalytics {
  totalSpent: number;
  byCategory: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  byDay: {
    date: string;
    amount: number;
  }[];
  byWeek: {
    weekStart: string;
    amount: number;
  }[];
  byMonth: {
    month: string;
    amount: number;
  }[];
}

export interface ImpulseAnalytics {
  totalImpulse: number;
  totalNormal: number;
  percentage: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  byCategory: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  byDay: {
    date: string;
    amount: number;
  }[];
}

export interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: string;
  lastGenerated?: string;
  status: 'available' | 'generating' | 'scheduled';
}

export interface SavingsProjection {
  currentSavingsRate: number;
  investmentReturn: number;
  compoundInterest: number;
  totalAfterYears: {
    years: number;
    amount: number;
  }[];
}

export interface DailySpending {
  date: string;
  regularAmount: number;
  impulseAmount: number;
  total: number;
}
