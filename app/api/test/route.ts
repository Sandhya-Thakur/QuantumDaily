// app/api/test/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { usersTable } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const { name, age, email } = await request.json();
    
    const result = await db.insert(usersTable).values({
      name,
      age,
      email,
    }).returning();
    
    return NextResponse.json({ success: true, user: result[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await db.select().from(usersTable);
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}