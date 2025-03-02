import { ImpulseAnalytics, ReportType, SavingsProjection, SpendingAnalytics } from './models/analytics';

// Mock spending analytics
export const spendingAnalytics: SpendingAnalytics = {
  totalSpent: 2187.78,
  byCategory: [
    { category: "Housing", amount: 1200, percentage: 54.85 },
    { category: "Groceries", amount: 201.05, percentage: 9.19 },
    { category: "Dining Out", amount: 121.49, percentage: 5.55 },
    { category: "Transportation", amount: 65.50, percentage: 2.99 },
    { category: "Entertainment", amount: 71.98, percentage: 3.29 },
    { category: "Shopping", amount: 55.25, percentage: 2.52 },
    { category: "Health & Fitness", amount: 45.00, percentage: 2.06 },
    { category: "Bills & Utilities", amount: 120.75, percentage: 5.52 },
    { category: "Electronics", amount: 150.25, percentage: 6.87 }
  ],
  byDay: [
    { date: "2025-02-20", amount: 115.30 },
    { date: "2025-02-21", amount: 25.00 },
    { date: "2025-02-22", amount: 78.50 },
    { date: "2025-02-23", amount: 35.99 },
    { date: "2025-02-24", amount: 120.75 },
    { date: "2025-02-25", amount: 45.00 },
    { date: "2025-02-26", amount: 55.25 },
    { date: "2025-02-27", amount: 10.99 },
    { date: "2025-02-28", amount: 215.75 },
    { date: "2025-03-01", amount: 328.74 }
  ],
  byWeek: [
    { weekStart: "2025-02-03", amount: 450.25 },
    { weekStart: "2025-02-10", amount: 375.50 },
    { weekStart: "2025-02-17", amount: 635.29 },
    { weekStart: "2025-02-24", amount: 726.74 }
  ],
  byMonth: [
    { month: "2024-12", amount: 2450.75 },
    { month: "2025-01", amount: 2325.45 },
    { month: "2025-02", amount: 2187.78 }
  ]
};

// Mock impulse analytics
export const impulseAnalytics: ImpulseAnalytics = {
  totalImpulse: 374.23,
  totalNormal: 1813.55,
  percentage: 17.11,
  trend: "decreasing",
  byCategory: [
    { category: "Electronics", amount: 150.25, percentage: 40.15 },
    { category: "Dining Out", amount: 42.99, percentage: 11.49 },
    { category: "Entertainment", amount: 125.74, percentage: 33.6 },
    { category: "Shopping", amount: 55.25, percentage: 14.76 }
  ],
  byDay: [
    { date: "2025-02-20", amount: 0 },
    { date: "2025-02-21", amount: 25.00 },
    { date: "2025-02-22", amount: 0 },
    { date: "2025-02-23", amount: 0 },
    { date: "2025-02-24", amount: 0 },
    { date: "2025-02-25", amount: 0 },
    { date: "2025-02-26", amount: 55.25 },
    { date: "2025-02-27", amount: 0 },
    { date: "2025-02-28", amount: 150.25 },
    { date: "2025-03-01", amount: 42.99 }
  ]
};

// Mock report types
export const reportTypes: ReportType[] = [
  {
    id: "report1",
    title: "Monthly Financial Summary",
    description: "Complete overview of your monthly finances including income, expenses, savings and investments",
    icon: "file-invoice-dollar",
    lastGenerated: "2025-02-28T23:59:59Z",
    status: "available"
  },
  {
    id: "report2",
    title: "Spending Trends Analysis",
    description: "Deep dive into your spending patterns and trends over time",
    icon: "chart-line",
    lastGenerated: "2025-02-15T14:30:00Z",
    status: "available"
  },
  {
    id: "report3",
    title: "Savings Progress Report",
    description: "Analysis of your savings goals progress and projections",
    icon: "piggy-bank",
    status: "scheduled"
  },
  {
    id: "report4",
    title: "Impulse Spending Insights",
    description: "Detailed analysis of your impulse spending behavior and opportunities for improvement",
    icon: "brain",
    lastGenerated: "2025-02-01T09:15:00Z",
    status: "available"
  },
  {
    id: "report5",
    title: "Budget Performance Review",
    description: "Review of your budget categories performance with insights and recommendations",
    icon: "balance-scale",
    status: "generating"
  },
  {
    id: "report6",
    title: "Tax Preparation Summary",
    description: "Summary of financial data relevant for tax filing purposes",
    icon: "receipt",
    status: "scheduled"
  }
];

// Mock savings projection
export const savingsProjection: SavingsProjection = {
  currentSavingsRate: 850,
  investmentReturn: 7.5,
  compoundInterest: 42560.78,
  totalAfterYears: [
    { years: 1, amount: 10392.49 },
    { years: 5, amount: 58340.23 },
    { years: 10, amount: 136724.31 },
    { years: 15, amount: 242635.92 },
    { years: 20, amount: 387126.87 },
    { years: 25, amount: 590653.14 },
    { years: 30, amount: 880876.29 }
  ]
};
