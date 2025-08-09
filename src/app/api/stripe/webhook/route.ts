import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { clerkClient } from '@clerk/nextjs/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function setUserPremiumStatusByUserId(userId: string, isPremium: boolean, extras?: Record<string, unknown>) {
  try {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: { isPremium },
      privateMetadata: { ...extras },
    });
  } catch (e) {
    console.error('Failed to update Clerk user metadata', e);
  }
}

async function setUserPremiumStatusByEmail(email: string, isPremium: boolean, extras?: Record<string, unknown>) {
  const client = await clerkClient();
  const users = await client.users.getUserList({ emailAddress: [email] });
  const user = users.data[0];
  if (user) {
    await setUserPremiumStatusByUserId(user.id, isPremium, extras);
  }
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, { status: 500 });
  }

  const body = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const email: string | undefined = session.customer_details?.email || session.customer_email || undefined;
        const clerkUserId: string | undefined = session.metadata?.clerkUserId || session.subscription?.metadata?.clerkUserId;
        if (clerkUserId) {
          await setUserPremiumStatusByUserId(clerkUserId, true, {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
          });
        } else if (email) {
          await setUserPremiumStatusByEmail(email, true, {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
          });
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as any;
        const status: string = subscription.status;
        const isActive = status === 'active' || status === 'trialing';
        const clerkUserId: string | undefined = subscription.metadata?.clerkUserId;
        // Retrieve customer for email fallback
        if (clerkUserId) {
          await setUserPremiumStatusByUserId(clerkUserId, isActive, {
            stripeCustomerId: subscription.customer,
            stripeSubscriptionId: subscription.id,
          });
        } else {
          try {
            const customer = await stripe.customers.retrieve(subscription.customer as string);
            if (!('deleted' in customer) && customer.email) {
              await setUserPremiumStatusByEmail(customer.email, isActive, {
                stripeCustomerId: subscription.customer,
                stripeSubscriptionId: subscription.id,
              });
            }
          } catch {}
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        const clerkUserId: string | undefined = subscription.metadata?.clerkUserId;
        if (clerkUserId) {
          await setUserPremiumStatusByUserId(clerkUserId, false, {
            stripeCustomerId: subscription.customer,
            stripeSubscriptionId: subscription.id,
          });
        } else {
          try {
            const customer = await stripe.customers.retrieve(subscription.customer as string);
            if (!('deleted' in customer) && customer.email) {
              await setUserPremiumStatusByEmail(customer.email, false, {
                stripeCustomerId: subscription.customer,
                stripeSubscriptionId: subscription.id,
              });
            }
          } catch {}
        }
        break;
      }
      default:
        // ignore unhandled events
        break;
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handler failed', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}


