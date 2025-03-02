import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { recurringExpenses } from '@/lib/data/mock-budgets';

export async function GET(request: NextRequest) {
  const response = handleApiRequest(() => {
    return recurringExpenses;
  });
  
  return NextResponse.json(response);
}
