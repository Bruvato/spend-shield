import { NextResponse } from 'next/server';
import { ApiResponse } from '@/lib/data/models/types';
import { SpendingAnalytics } from '@/lib/data/models/analytics';

interface DailySpending {
  date: string;
  regularAmount: number;
  impulseAmount: number;
  total: number;
}

interface WeeklySpending {
  weekStart: string;
  amount: number;
}

interface MonthlySpending {
  month: string;
  amount: number;
}

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
}

// Generate spending by category data
function generateCategoryData(): CategorySpending[] {
  const categories = [
    { category: 'Housing', amount: 1250.00, percentage: 35.7 },
    { category: 'Food', amount: 650.50, percentage: 18.6 },
    { category: 'Transportation', amount: 420.25, percentage: 12.0 },
    { category: 'Entertainment', amount: 380.75, percentage: 10.9 },
    { category: 'Shopping', amount: 325.30, percentage: 9.3 },
    { category: 'Utilities', amount: 180.55, percentage: 5.2 },
    { category: 'Healthcare', amount: 150.20, percentage: 4.3 },
    { category: 'Education', amount: 90.75, percentage: 2.6 },
    { category: 'Other', amount: 52.45, percentage: 1.5 }
  ];
  
  return categories;
}

// Generate daily spending data for the past 30 days
function generateDailySpendingData(): DailySpending[] {
  const data: DailySpending[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    
    // Generate random spending data
    const regularAmount = parseFloat((Math.random() * 80 + 20).toFixed(2));
    const impulseAmount = Math.random() > 0.7 
      ? parseFloat((Math.random() * 50 + 10).toFixed(2)) 
      : 0; // 30% chance of impulse spending
    
    data.push({
      date: formattedDate,
      regularAmount,
      impulseAmount,
      total: parseFloat((regularAmount + impulseAmount).toFixed(2))
    });
  }

  return data;
}

// Generate weekly spending data for the past 12 weeks
function generateWeeklySpendingData(): WeeklySpending[] {
  const data: WeeklySpending[] = [];
  const today = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (7 * i + weekStart.getDay()));
    const formattedDate = weekStart.toISOString().split('T')[0];
    
    data.push({
      weekStart: formattedDate,
      amount: parseFloat((Math.random() * 400 + 200).toFixed(2))
    });
  }
  
  return data;
}

// Generate monthly spending data for the past 6 months
function generateMonthlySpendingData(): MonthlySpending[] {
  const data: MonthlySpending[] = [];
  const today = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    data.push({
      month: monthName,
      amount: parseFloat((Math.random() * 1500 + 800).toFixed(2))
    });
  }
  
  return data;
}

export async function GET() {
  try {
    // Calculate total spent
    const byCategory = generateCategoryData();
    const totalSpent = byCategory.reduce((sum, item) => sum + item.amount, 0);

    // Generate daily spending data for chart
    const byDay = generateDailySpendingData().map(day => ({
      date: day.date,
      amount: day.total
    }));

    // Generate weekly and monthly data
    const byWeek = generateWeeklySpendingData();
    const byMonth = generateMonthlySpendingData();

    // Create complete spending analytics object
    const spendingAnalytics: SpendingAnalytics = {
      totalSpent,
      byCategory,
      byDay,
      byWeek,
      byMonth
    };
    
    // Generate mock data
    const response: ApiResponse<SpendingAnalytics> = {
      success: true,
      data: spendingAnalytics
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in spending analytics API:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch spending analytics data'
    }, { status: 500 });
  }
}
