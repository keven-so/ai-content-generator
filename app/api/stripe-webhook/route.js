import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event;

    // Verify webhook signature (only in production with webhook secret)
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json(
          { error: 'Webhook signature verification failed' },
          { status: 400 }
        );
      }
    } else {
      // In development/testing without webhook secret
      event = JSON.parse(body);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userEmail = session.customer_email || session.metadata.userEmail;
        const userName = session.metadata.userName || 'User';
        const subscriptionId = session.subscription;

        // Create or update subscription
        const existingSubscription = await db
          .select()
          .from(UserSubscription)
          .where(eq(UserSubscription.email, userEmail));

        if (existingSubscription.length > 0) {
          await db
            .update(UserSubscription)
            .set({
              active: true,
              paymentId: subscriptionId,
            })
            .where(eq(UserSubscription.email, userEmail));
        } else {
          await db.insert(UserSubscription).values({
            email: userEmail,
            userName: userName,
            active: true,
            paymentId: subscriptionId,
            joinDate: new Date().toISOString(),
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Get customer email
        const customer = await stripe.customers.retrieve(customerId);
        const userEmail = customer.email;

        // Update subscription status
        await db
          .update(UserSubscription)
          .set({
            active: subscription.status === 'active',
          })
          .where(eq(UserSubscription.email, userEmail));
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Get customer email
        const customer = await stripe.customers.retrieve(customerId);
        const userEmail = customer.email;

        // Deactivate subscription
        await db
          .update(UserSubscription)
          .set({
            active: false,
          })
          .where(eq(UserSubscription.email, userEmail));
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
