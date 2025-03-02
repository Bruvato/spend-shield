import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { savingsGoals } from '@/lib/data/mock-goals';

export async function GET(request: NextRequest) {
  const response = handleApiRequest(() => {
    return savingsGoals;
  });
  
  return NextResponse.json(response);
}
