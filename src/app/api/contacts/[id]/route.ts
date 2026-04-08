import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/models/Contact';
import Deal from '@/models/Deal';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const id = (await params).id;
    const contact = await Contact.findOne({ _id: id, userId }).lean();
    if (!contact) return NextResponse.json({ error: 'Contact not found' }, { status: 404 });

    const { _id, userId: _uid, ...rest } = contact;
    const serialized = { ...rest, id: _id.toString() };
    return NextResponse.json(serialized);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await connectToDatabase();
    const id = (await params).id;

    const updated = await Contact.findOneAndUpdate(
      { _id: id, userId },
      body,
      { new: true, runValidators: true }
    ).lean();
    if (!updated) return NextResponse.json({ error: 'Contact not found' }, { status: 404 });

    const { _id, userId: _uid, ...rest } = updated;
    const serialized = { ...rest, id: _id.toString() };
    return NextResponse.json(serialized);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update contact' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const id = (await params).id;

    const deleted = await Contact.findOneAndDelete({ _id: id, userId });
    if (!deleted) return NextResponse.json({ error: 'Contact not found' }, { status: 404 });

    // Cascade delete associated deals owned by same user
    await Deal.deleteMany({ contactId: id, userId });

    return NextResponse.json({ success: true, message: 'Contact and associated deals deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
