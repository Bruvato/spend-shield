import { CategoryBudget } from './models/budget';
import { Category } from './models/types';

// Mock categories
export const categories: Category[] = [
  { id: "cat1", name: "Housing", icon: "home", color: "#FF5722" },
  { id: "cat2", name: "Groceries", icon: "shopping-cart", color: "#4CAF50" },
  { id: "cat3", name: "Dining Out", icon: "utensils", color: "#FFC107" },
  { id: "cat4", name: "Transportation", icon: "car", color: "#2196F3" },
  { id: "cat5", name: "Entertainment", icon: "film", color: "#9C27B0" },
  { id: "cat6", name: "Shopping", icon: "shopping-bag", color: "#E91E63" },
  { id: "cat7", name: "Health & Fitness", icon: "heartbeat", color: "#00BCD4" },
  { id: "cat8", name: "Bills & Utilities", icon: "file-invoice-dollar", color: "#607D8B" },
  { id: "cat9", name: "Income", icon: "dollar-sign", color: "#4CAF50" },
  { id: "cat10", name: "Transfers", icon: "exchange-alt", color: "#9E9E9E" },
  { id: "cat11", name: "Electronics", icon: "laptop", color: "#3F51B5" },
  { id: "cat12", name: "Education", icon: "graduation-cap", color: "#FF9800" }
];

// Mock category budgets
export const categoryBudgets: CategoryBudget[] = [
  {
    id: "cat1",
    name: "Housing",
    budget: 1200,
    spent: 1200,
    remaining: 0,
    percentUsed: 100,
    transactions: 1
  },
  {
    id: "cat2",
    name: "Groceries",
    budget: 500,
    spent: 201.05,
    remaining: 298.95,
    percentUsed: 40.21,
    transactions: 2
  },
  {
    id: "cat3",
    name: "Dining Out",
    budget: 300,
    spent: 121.49,
    remaining: 178.51,
    percentUsed: 40.5,
    transactions: 2
  },
  {
    id: "cat4",
    name: "Transportation",
    budget: 200,
    spent: 65.50,
    remaining: 134.50,
    percentUsed: 32.75,
    transactions: 1
  },
  {
    id: "cat5",
    name: "Entertainment",
    budget: 150,
    spent: 71.98,
    remaining: 78.02,
    percentUsed: 47.99,
    transactions: 3
  },
  {
    id: "cat6",
    name: "Shopping",
    budget: 200,
    spent: 55.25,
    remaining: 144.75,
    percentUsed: 27.63,
    transactions: 1
  },
  {
    id: "cat7",
    name: "Health & Fitness",
    budget: 100,
    spent: 45.00,
    remaining: 55.00,
    percentUsed: 45.00,
    transactions: 1
  },
  {
    id: "cat8",
    name: "Bills & Utilities",
    budget: 350,
    spent: 120.75,
    remaining: 229.25,
    percentUsed: 34.50,
    transactions: 1
  },
  {
    id: "cat11",
    name: "Electronics",
    budget: 200,
    spent: 150.25,
    remaining: 49.75,
    percentUsed: 75.13,
    transactions: 1
  }
];
