import { NextRequest } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { usersTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  console.log('Sync user API called')
  
  try {
    const user = await currentUser()
    
    if (!user) {
      return new Response('Not authenticated', { status: 401 })
    }

    console.log('Current user from Clerk:', user.id, user.emailAddresses[0]?.emailAddress)

    // Check if user already exists in database
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.clerkId, user.id))
    
    if (existingUser.length === 0) {
      // User doesn't exist, create them
      const result = await db.insert(usersTable).values({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: user.firstName || null,
        lastName: user.lastName || null,
      }).returning()
      
      console.log('User created in database:', result[0])
      return Response.json({ message: 'User created', user: result[0] })
    } else {
      console.log('User already exists in database')
      return Response.json({ message: 'User already exists', user: existingUser[0] })
    }
    
  } catch (error) {
    console.error('Error syncing user:', error)
    return new Response('Error syncing user', { status: 500 })
  }
}