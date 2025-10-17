import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { eq } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    });

    if (session.payment_status === 'paid') {
      const userEmail = session.customer_email || session.metadata.userEmail;
      const userName = session.metadata.userName || 'User';
      const subscriptionId = session.subscription?.id || session.subscription;

      // Check if user already has a subscription record
      const existingSubscription = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.email, userEmail));

      if (existingSubscription.length > 0) {
        // Update existing subscription
        await db
          .update(UserSubscription)
          .set({
            active: true,
            paymentId: subscriptionId,
          })
          .where(eq(UserSubscription.email, userEmail));
      } else {
        // Create new subscription record
        await db.insert(UserSubscription).values({
          email: userEmail,
          userName: userName,
          active: true,
          paymentId: subscriptionId,
          joinDate: new Date().toISOString(),
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Subscription activated successfully',
      });
    }

    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
