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

    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return NextResponse.json({ error: 'Missing STRIPE_PRICE_ID' }, { status: 500 });
    }

    const origin = req.headers.get('origin') || new URL(req.url).origin;
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const primaryEmailId = user.primaryEmailAddressId;
    const email = user.emailAddresses.find((e) => e.id === primaryEmailId)?.emailAddress || user.emailAddresses[0]?.emailAddress;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        { price: priceId, quantity: 1 },
      ],
      allow_promotion_codes: true,
      success_url: `${origin}/premium?success=1`,
      cancel_url: `${origin}/premium?canceled=1`,
      customer_email: email,
      client_reference_id: userId,
      subscription_data: {
        metadata: { clerkUserId: userId },
      },
      metadata: { clerkUserId: userId },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating checkout session', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}


