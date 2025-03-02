import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { impulseWaitingItems, impulseControlGoals } from '@/lib/data/mock-goals';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  
  const response = handleApiRequest(() => {
    if (type === 'goals') {
      return impulseControlGoals;
    }
    return impulseWaitingItems;
  });
  
  return NextResponse.json(response);
}
