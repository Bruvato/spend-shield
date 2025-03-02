export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  contributions: string;
  percentComplete: number;
  status: 'on-track' | 'at-risk' | 'completed';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  completed: boolean;
  date?: string;
  category: 'impulse' | 'budget' | 'savings' | 'debt' | 'challenge';
}

export interface ImpulseWaitingItem {
  id: string;
  name: string;
  price: number;
  category: string;
  addedDate: string;
  waitingPeriod: number; // in days
  expiryDate: string;
  status: 'waiting' | 'purchased' | 'expired' | 'cancelled';
  notes?: string;
  link?: string;
}

export interface ImpulseControlGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  deadline?: string;
  startDate: string;
  percentComplete: number;
  streak?: number;
  status: 'active' | 'completed' | 'suggested';
}
