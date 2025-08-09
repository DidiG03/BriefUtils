import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  // We still export a dummy client to avoid runtime import errors in SSR builds
  // Real calls will only happen in API routes where env is expected to be set
  console.warn('STRIPE_SECRET_KEY is not set. Stripe API routes will fail until configured.');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_dummy', {
  apiVersion: '2025-07-30.basil',
});


