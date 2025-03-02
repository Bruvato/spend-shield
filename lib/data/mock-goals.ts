import { Achievement, ImpulseControlGoal, ImpulseWaitingItem, SavingsGoal } from './models/goals';

// Mock savings goals
export const savingsGoals: SavingsGoal[] = [
  {
    id: "goal1",
    name: "Emergency Fund",
    target: 10000,
    current: 5500,
    deadline: "2025-06-30T00:00:00Z",
    contributions: "Monthly",
    percentComplete: 55,
    status: "on-track"
  },
  {
    id: "goal2",
    name: "Vacation Fund",
    target: 3000,
    current: 1200,
    deadline: "2025-07-15T00:00:00Z",
    contributions: "Weekly",
    percentComplete: 40,
    status: "on-track"
  },
  {
    id: "goal3",
    name: "New Laptop",
    target: 1500,
    current: 450,
    deadline: "2025-05-01T00:00:00Z",
    contributions: "Monthly",
    percentComplete: 30,
    status: "at-risk"
  },
  {
    id: "goal4",
    name: "Down Payment for House",
    target: 50000,
    current: 12500,
    deadline: "2026-12-31T00:00:00Z",
    contributions: "Monthly",
    percentComplete: 25,
    status: "on-track"
  },
  {
    id: "goal5",
    name: "Wedding Fund",
    target: 15000,
    current: 15000,
    deadline: "2025-04-15T00:00:00Z",
    contributions: "Completed",
    percentComplete: 100,
    status: "completed"
  }
];

// Mock impulse waiting items
export const impulseWaitingItems: ImpulseWaitingItem[] = [
  {
    id: "imp1",
    name: "Designer Shoes",
    price: 249.99,
    category: "Shopping",
    addedDate: "2025-02-25T10:30:00Z",
    waitingPeriod: 30,
    expiryDate: "2025-03-27T10:30:00Z",
    status: "waiting",
    notes: "Saw these online and really want them",
    link: "https://example.com/shoes"
  },
  {
    id: "imp2",
    name: "Gaming Console",
    price: 499.99,
    category: "Entertainment",
    addedDate: "2025-02-20T15:45:00Z",
    waitingPeriod: 45,
    expiryDate: "2025-04-06T15:45:00Z",
    status: "waiting",
    notes: "The new XBox series looks amazing",
    link: "https://example.com/xbox"
  },
  {
    id: "imp3",
    name: "Smart Watch",
    price: 349.99,
    category: "Electronics",
    addedDate: "2025-02-15T09:20:00Z",
    waitingPeriod: 14,
    expiryDate: "2025-03-01T09:20:00Z",
    status: "expired",
    notes: "Still think about it sometimes",
    link: "https://example.com/watch"
  },
  {
    id: "imp4",
    name: "Bluetooth Speaker",
    price: 129.99,
    category: "Electronics",
    addedDate: "2025-02-10T11:15:00Z",
    waitingPeriod: 14,
    expiryDate: "2025-02-24T11:15:00Z",
    status: "purchased",
    notes: "Decided I needed this for my new apartment",
    link: "https://example.com/speaker"
  },
  {
    id: "imp5",
    name: "Premium Coffee Machine",
    price: 299.99,
    category: "Home",
    addedDate: "2025-03-01T08:30:00Z",
    waitingPeriod: 21,
    expiryDate: "2025-03-22T08:30:00Z",
    status: "waiting",
    notes: "Would save money on coffee shops in the long run",
    link: "https://example.com/coffee"
  }
];

// Mock achievements
export const achievements: Achievement[] = [
  {
    id: "ach1",
    title: "Budget Master",
    description: "Stay within budget for all categories for 3 consecutive months",
    icon: "trophy",
    progress: 67,
    completed: false,
    category: "budget"
  },
  {
    id: "ach2",
    title: "Savings Champion",
    description: "Reach your first savings goal",
    icon: "piggy-bank",
    progress: 100,
    completed: true,
    date: "2025-01-15T14:30:00Z",
    category: "savings"
  },
  {
    id: "ach3",
    title: "Impulse Control",
    description: "Let 5 items expire in your impulse waiting list",
    icon: "hourglass-end",
    progress: 60,
    completed: false,
    category: "impulse"
  },
  {
    id: "ach4",
    title: "Debt Destroyer",
    description: "Pay off a debt account completely",
    icon: "slash",
    progress: 100,
    completed: true,
    date: "2025-02-10T09:15:00Z",
    category: "debt"
  },
  {
    id: "ach5",
    title: "Financial Planner",
    description: "Create budgets for all spending categories",
    icon: "tasks",
    progress: 100,
    completed: true,
    date: "2025-01-05T11:30:00Z",
    category: "budget"
  },
  {
    id: "ach6",
    title: "No-Spend Challenge",
    description: "Complete a 7-day no discretionary spending challenge",
    icon: "calendar-check",
    progress: 85,
    completed: false,
    category: "challenge"
  },
  {
    id: "ach7",
    title: "Savings Streak",
    description: "Save money for 10 consecutive weeks",
    icon: "fire",
    progress: 90,
    completed: false,
    category: "savings"
  },
  {
    id: "ach8",
    title: "Budget Ninja",
    description: "Track all expenses for 30 consecutive days",
    icon: "user-ninja",
    progress: 100,
    completed: true,
    date: "2025-02-28T17:45:00Z",
    category: "budget"
  },
  {
    id: "ach9",
    title: "Impulse Master",
    description: "Reduce impulse spending by 50% in a month",
    icon: "brain",
    progress: 75,
    completed: false,
    category: "impulse"
  },
  {
    id: "ach10",
    title: "Financial Freedom",
    description: "Achieve positive cash flow for 6 consecutive months",
    icon: "dove",
    progress: 50,
    completed: false,
    category: "challenge"
  }
];

// Mock impulse control goals
export const impulseControlGoals: ImpulseControlGoal[] = [
  {
    id: "icg1",
    title: "Reduce Impulse Spending",
    description: "Reduce monthly impulse spending by 30%",
    target: 30,
    current: 15,
    startDate: "2025-02-01T00:00:00Z",
    deadline: "2025-04-30T00:00:00Z",
    percentComplete: 50,
    streak: 2,
    status: "active"
  },
  {
    id: "icg2",
    title: "Waiting Period Compliance",
    description: "Adhere to waiting period for all impulse purchases",
    target: 10,
    current: 7,
    startDate: "2025-02-15T00:00:00Z",
    percentComplete: 70,
    streak: 7,
    status: "active"
  },
  {
    id: "icg3",
    title: "No Impulse Day",
    description: "Have 15 days with no impulse purchases",
    target: 15,
    current: 6,
    startDate: "2025-03-01T00:00:00Z",
    percentComplete: 40,
    streak: 2,
    status: "active"
  },
  {
    id: "icg4",
    title: "Reflection Before Purchase",
    description: "Write reflection notes for all impulse items over $50",
    target: 100,
    current: 85,
    startDate: "2025-02-01T00:00:00Z",
    percentComplete: 85,
    status: "active"
  },
  {
    id: "icg5",
    title: "Monthly Impulse Budget",
    description: "Stay under impulse budget of $200/month",
    target: 3,
    current: 1,
    startDate: "2025-01-01T00:00:00Z",
    percentComplete: 33,
    status: "active"
  }
];
