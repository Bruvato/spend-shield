import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { categories, categoryBudgets } from '@/lib/data/mock-categories';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const withBudgets = searchParams.get('withBudgets') === 'true';
  
  const response = handleApiRequest(() => {
    if (withBudgets) {
      return categoryBudgets;
    }
    return categories;
  });
  
  return NextResponse.json(response);
}
