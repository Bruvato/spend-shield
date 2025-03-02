import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { transactions } from '@/lib/data/mock-transactions';

export async function GET(request: NextRequest) {
  const response = handleApiRequest(() => {
    return transactions;
  });
  
  return NextResponse.json(response);
}

// Endpoint for a specific transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // In a real app, validate and persist the transaction
    const newTransaction = {
      id: `t${transactions.length + 1}`,
      ...body,
      date: body.date || new Date().toISOString(),
    };
    
    // In a real app, you would add to the database
    // For now, we just return the new transaction as if it was created
    return NextResponse.json({ 
      success: true, 
      data: newTransaction 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create transaction' 
    }, { status: 400 });
  }
}
