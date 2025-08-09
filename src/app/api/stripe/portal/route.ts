import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth, clerkClient } from '@clerk/nextjs/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const primaryEmailId = user.primaryEmailAddressId;
    const email = user.emailAddresses.find((e) => e.id === primaryEmailId)?.emailAddress || user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: 'No email found for user' }, { status: 400 });
    }

    // Try to find an existing customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];
    if (!customer) {
      return NextResponse.json({ error: 'No Stripe customer found' }, { status: 404 });
    }

    const origin = req.headers.get('origin') || new URL(req.url).origin;
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${origin}/premium`,
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating portal session', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}


