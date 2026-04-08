import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db';
import Deal from '@/models/Deal';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await connectToDatabase();
    const id = (await params).id;

    const updated = await Deal.findOneAndUpdate(
      { _id: id, userId },
      body,
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return NextResponse.json({ error: 'Deal not found' }, { status: 404 });

    const { _id, userId: _uid, ...rest } = updated;
    const serialized = {
      ...rest,
      id: _id.toString(),
      contactId: rest.contactId?.toString()
    };
    return NextResponse.json(serialized);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update deal' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const id = (await params).id;

    const deleted = await Deal.findOneAndDelete({ _id: id, userId });
    if (!deleted) return NextResponse.json({ error: 'Deal not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Deal deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 });
  }
}
