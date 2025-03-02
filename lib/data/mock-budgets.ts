import { BudgetCategory, RecurringExpense, SpendingLimit } from './models/budget';

// Mock budget variance data
export const budgetVariances: BudgetCategory[] = [
  {
    id: "cat1",
    name: "Housing",
    budgeted: 1200,
    actual: 1200,
    variance: 0,
    variancePercent: 0,
    status: "on-track"
  },
  {
    id: "cat2",
    name: "Groceries",
    budgeted: 500,
    actual: 201.05,
    variance: 298.95,
    variancePercent: 59.79,
    status: "under"
  },
  {
    id: "cat3",
    name: "Dining Out",
    budgeted: 300,
    actual: 121.49,
    variance: 178.51,
    variancePercent: 59.5,
    status: "under"
  },
  {
    id: "cat4",
    name: "Transportation",
    budgeted: 200,
    actual: 65.50,
    variance: 134.50,
    variancePercent: 67.25,
    status: "under"
  },
  {
    id: "cat5",
    name: "Entertainment",
    budgeted: 150,
    actual: 71.98,
    variance: 78.02,
    variancePercent: 52.01,
    status: "under"
  },
  {
    id: "cat6",
    name: "Shopping",
    budgeted: 200,
    actual: 55.25,
    variance: 144.75,
    variancePercent: 72.38,
    status: "under"
  },
  {
    id: "cat7",
    name: "Health & Fitness",
    budgeted: 100,
    actual: 45.00,
    variance: 55.00,
    variancePercent: 55.00,
    status: "under"
  },
  {
    id: "cat8",
    name: "Bills & Utilities",
    budgeted: 350,
    actual: 120.75,
    variance: 229.25,
    variancePercent: 65.50,
    status: "under"
  },
  {
    id: "cat11",
    name: "Electronics",
    budgeted: 200,
    actual: 150.25,
    variance: 49.75,
    variancePercent: 24.88,
    status: "under"
  }
];

// Mock spending limits
export const spendingLimits: SpendingLimit[] = [
  {
    id: "limit1",
    category: "Dining Out",
    limit: 300,
    spent: 220.45,
    remaining: 79.55,
    period: "Monthly",
    resetDate: "2025-04-01T00:00:00Z",
    notifications: true,
    status: "active"
  },
  {
    id: "limit2",
    category: "Shopping",
    limit: 200,
    spent: 55.25,
    remaining: 144.75,
    period: "Monthly",
    resetDate: "2025-04-01T00:00:00Z",
    notifications: true,
    status: "active"
  },
  {
    id: "limit3",
    category: "Entertainment",
    limit: 150,
    spent: 125.75,
    remaining: 24.25,
    period: "Monthly",
    resetDate: "2025-04-01T00:00:00Z",
    notifications: true,
    status: "warning"
  },
  {
    id: "limit4",
    category: "Transportation",
    limit: 50,
    spent: 65.50,
    remaining: -15.50,
    period: "Weekly",
    resetDate: "2025-03-09T00:00:00Z",
    notifications: true,
    status: "exceeded"
  },
  {
    id: "limit5",
    category: "Groceries",
    limit: 250,
    spent: 201.05,
    remaining: 48.95,
    period: "Monthly",
    resetDate: "2025-04-01T00:00:00Z",
    notifications: true,
    status: "warning"
  }
];

// Mock recurring expenses
export const recurringExpenses: RecurringExpense[] = [
  {
    id: "rec1",
    name: "Rent",
    amount: 1200,
    frequency: "Monthly",
    category: "Housing",
    nextDate: "2025-04-01T00:00:00Z",
    status: "active"
  },
  {
    id: "rec2",
    name: "Netflix Subscription",
    amount: 10.99,
    frequency: "Monthly",
    category: "Entertainment",
    nextDate: "2025-03-27T00:00:00Z",
    status: "active"
  },
  {
    id: "rec3",
    name: "Gym Membership",
    amount: 45.00,
    frequency: "Monthly",
    category: "Health & Fitness",
    nextDate: "2025-03-25T00:00:00Z",
    status: "active"
  },
  {
    id: "rec4",
    name: "Internet Bill",
    amount: 65.99,
    frequency: "Monthly",
    category: "Bills & Utilities",
    nextDate: "2025-03-15T00:00:00Z",
    status: "active"
  },
  {
    id: "rec5",
    name: "Mobile Phone Bill",
    amount: 45.00,
    frequency: "Monthly",
    category: "Bills & Utilities",
    nextDate: "2025-03-18T00:00:00Z",
    status: "active"
  },
  {
    id: "rec6",
    name: "Electricity Bill",
    amount: 85.00,
    frequency: "Monthly",
    category: "Bills & Utilities",
    nextDate: "2025-03-20T00:00:00Z",
    status: "active"
  },
  {
    id: "rec7",
    name: "Water Bill",
    amount: 35.00,
    frequency: "Monthly",
    category: "Bills & Utilities",
    nextDate: "2025-03-22T00:00:00Z",
    status: "active"
  },
  {
    id: "rec8",
    name: "Car Insurance",
    amount: 95.50,
    frequency: "Monthly",
    category: "Transportation",
    nextDate: "2025-03-10T00:00:00Z",
    status: "active"
  }
];
