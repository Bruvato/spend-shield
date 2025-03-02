import { NextRequest, NextResponse } from 'next/server';
import { handleApiRequest } from '@/lib/data/api/data-handler';
import { transactions } from '@/lib/data/mock-transactions';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = handleApiRequest(() => {
    const transaction = transactions.find(t => t.id === params.id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    return transaction;
  });
  
  if (!response.success) {
    return NextResponse.json(response, { status: 404 });
  }
  
  return NextResponse.json(response);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const transactionIndex = transactions.findIndex(t => t.id === params.id);
    
    if (transactionIndex === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'Transaction not found' 
      }, { status: 404 });
    }
    
    // In a real app, you would update the database
    // Here we just return the updated transaction as if it was updated
    const updatedTransaction = {
      ...transactions[transactionIndex],
      ...body
    };
    
    return NextResponse.json({ 
      success: true, 
      data: updatedTransaction 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update transaction' 
    }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = handleApiRequest(() => {
    const transactionIndex = transactions.findIndex(t => t.id === params.id);
    if (transactionIndex === -1) {
      throw new Error('Transaction not found');
    }
    
    // In a real app, you would delete from the database
    // Here we just return success
    return { message: 'Transaction deleted successfully' };
  });
  
  if (!response.success) {
    return NextResponse.json(response, { status: 404 });
  }
  
  return NextResponse.json(response);
}
