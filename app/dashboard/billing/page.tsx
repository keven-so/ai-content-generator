"use client"
import { Button } from '@/components/ui/button'
import React, { useContext, useState, useEffect } from 'react'
import { useUser } from '@/lib/hooks/useUser';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function billing() {
  const {user}=useUser();
  const {userSubscription}=useContext(UserSubscriptionContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');

  // Check for payment success/cancel
  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const sessionId = searchParams.get('session_id');

    if (success && sessionId) {
      verifyPayment(sessionId);
    } else if (canceled) {
      setMessage('Payment was canceled. You can try again anytime.');
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        setMessage('✅ Payment successful! Your subscription is now active.');
        // Reload page after 2 seconds to update subscription status
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setMessage('⚠️ Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setMessage('⚠️ Error verifying payment. Please contact support.');
    }
  };

  const handleSubscribe = async () => {
    if (!user?.email) {
      setMessage('⚠️ Please sign in to subscribe.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.user_metadata?.full_name || user.email.split('@')[0],
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        setMessage('⚠️ Error creating checkout session. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setMessage('⚠️ Error connecting to payment service. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h2 className='text-center font-bold text-3xl my-3'>Upgrade With Monthly Plan</h2>

      {message && (
        <div className={`rounded-lg p-4 mb-8 text-center ${
          message.includes('✅')
            ? 'bg-green-50 border border-green-200 text-green-800'
            : message.includes('⚠️')
            ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
            : 'bg-blue-50 border border-blue-200 text-blue-800'
        }`}>
          <p>{message}</p>
        </div>
      )}

      {userSubscription && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-8">
          <p className="text-center">
            <strong>✅ You have an active subscription!</strong>
            <br />
            Enjoying unlimited AI content generation.
          </p>
        </div>
      )}

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">

    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">
          Free
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 0$ </strong>

          <span className="text-sm font-medium text-gray-700">/month</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        <li className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-indigo-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700"> 10,000 Words/Month </span>
        </li>

        <li className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-indigo-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700"> 50+ Content Templates </span>
        </li>

        <li className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-indigo-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700"> Unlimited Download & Copy </span>
        </li>

        <li className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-indigo-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700"> 1 Month of History </span>
        </li>
      </ul>

      <div className="mt-8 block rounded-full
        border border-gray-300
        px-12 py-3 text-center text-sm font-medium bg-gray-100 text-gray-600">
        Current Plan
      </div>
    </div>

    <div className="rounded-2xl bg-white border border-indigo-600 p-6 shadow-sm sm:px-8 lg:p-12">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900">
          Monthly
          <span className="sr-only">Plan</span>
        </h2>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 9.99$ </strong>

          <span className="text-sm font-medium text-gray-700">/month</span>
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        <li className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-indigo-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700"> 100,000 Words/Month  </span>
        </li>

        <li className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-indigo-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700"> 50+ Template Access </span>
        </li>

        <li className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-indigo-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700"> Unlimited Download & Copy  </span>
        </li>

        <li className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 text-indigo-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>

          <span className="text-gray-700"> 1 Year of History </span>
        </li>
      </ul>

      <Button
        onClick={handleSubscribe}
        disabled={loading || userSubscription}
        className='w-full rounded-full mt-5 p-6'
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : userSubscription ? (
          'Already Subscribed'
        ) : (
          'Subscribe Now'
        )}
      </Button>

      <p className="text-center text-xs text-gray-500 mt-2">
        {userSubscription
          ? 'Manage your subscription in Stripe dashboard'
          : 'Secure payment powered by Stripe'
        }
      </p>
    </div>
  </div>
</div>
    </div>
  )
}

export default billing
