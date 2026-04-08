import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/models/Contact';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const contacts = await Contact.find({ userId }).sort({ createdAt: -1 }).lean();

    const serialized = contacts.map((c: any) => {
      const { _id, userId: _uid, ...rest } = c;
      return { ...rest, id: _id.toString() };
    });

    return NextResponse.json(serialized);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    await connectToDatabase();

    const newContact = await Contact.create({ ...body, userId });
    const { _id, userId: _uid, ...rest } = newContact.toObject();
    const serialized = { ...rest, id: _id.toString() };

    return NextResponse.json(serialized, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create contact' }, { status: 400 });
  }
}
