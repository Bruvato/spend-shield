import { NextResponse } from 'next/server';
import { ImpulseAnalytics } from '@/lib/data/models/analytics';

export async function GET() {
  try {
    // Generate mock data for impulse analytics
    const impulseAnalytics: ImpulseAnalytics = {
      totalImpulse: 754.37,
      totalNormal: 3483.29,
      percentage: 17.8,
      trend: 'decreasing',
      byCategory: [
        { category: 'Shopping', amount: 312.45, percentage: 41.4 },
        { category: 'Food & Drink', amount: 187.92, percentage: 24.9 },
        { category: 'Entertainment', amount: 125.33, percentage: 16.6 },
        { category: 'Travel', amount: 76.22, percentage: 10.1 },
        { category: 'Other', amount: 52.45, percentage: 7.0 }
      ],
      byDay: [
        { date: '2025-02-01', amount: 36.75 },
        { date: '2025-02-05', amount: 52.33 },
        { date: '2025-02-09', amount: 87.19 },
        { date: '2025-02-14', amount: 123.52 },
        { date: '2025-02-16', amount: 27.86 },
        { date: '2025-02-19', amount: 65.92 },
        { date: '2025-02-22', amount: 92.41 },
        { date: '2025-02-24', amount: 43.17 },
        { date: '2025-02-27', amount: 125.75 },
        { date: '2025-03-01', amount: 99.47 }
      ]
    };

    return NextResponse.json({
      success: true,
      data: impulseAnalytics
    });
  } catch (error) {
    console.error('Error generating impulse analytics data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate impulse analytics data' },
      { status: 500 }
    );
  }
}
