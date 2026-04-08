import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db';
import Deal from '@/models/Deal';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const deals = await Deal.find({ userId }).lean();

    const serialized = deals.map((d: any) => {
      const { _id, userId: _uid, ...rest } = d;
      return {
        ...rest,
        id: _id.toString(),
        contactId: d.contactId.toString()
      };
    });

    return NextResponse.json(serialized);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await connectToDatabase();

    const newDeal = await Deal.create({ ...body, userId });
    const { _id, userId: _uid, ...rest } = newDeal.toObject();
    const serialized = {
      ...rest,
      id: _id.toString(),
      contactId: rest.contactId.toString()
    };

    return NextResponse.json(serialized, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create deal' }, { status: 400 });
  }
}
