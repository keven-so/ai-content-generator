# Stripe Setup Guide - AI Content Generator

Follow these steps to get your Stripe API keys and configure the payment system.

## Step 1: Create Stripe Account (5 minutes)

1. Go to: https://dashboard.stripe.com/register
2. Sign up with your email
3. Complete account setup
4. **Make sure you're in TEST MODE** (toggle in top-right)

## Step 2: Get API Keys (2 minutes)

1. Go to: https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)
3. Click "Reveal test key" for the Secret key
4. Copy both keys

## Step 3: Create Product and Price (5 minutes)

1. Go to: https://dashboard.stripe.com/test/products
2. Click **"+ Add product"**
3. Fill in:
   - **Name**: Premium AI Content Generator
   - **Description**: Unlimited AI content generation
   - **Pricing model**: Recurring
   - **Price**: $9.99 USD
   - **Billing period**: Monthly
4. Click **"Save product"**
5. Copy the **Price ID** (starts with `price_`)

## Step 4: Configure Webhook (Optional - for production)

For now, we'll skip webhook configuration as it's only needed for production. We'll handle subscription status in the checkout session completion.

## Step 5: Update .env.local

Open `.env.local` and replace the placeholder values:

```env
# Replace these with your actual Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_here
STRIPE_PRICE_ID=price_your_actual_price_id_here
STRIPE_WEBHOOK_SECRET=leave_empty_for_now
```

## Step 6: Restart Dev Server

After updating `.env.local`, restart your dev server:

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

## Test Cards for Stripe

Use these test card numbers to test payments:

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Card declined |
| 4000 0027 6000 3184 | 3D Secure required |

- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

## What Happens After Setup

Once you provide the Stripe keys, I'll:
1. ✅ Create checkout API route (`/api/checkout-session`)
2. ✅ Create webhook handler (`/api/stripe-webhook`)
3. ✅ Update billing page with Stripe button
4. ✅ Test the complete payment flow

## Need Help?

- Stripe Documentation: https://stripe.com/docs
- Test Mode Guide: https://stripe.com/docs/testing
- API Keys: https://dashboard.stripe.com/test/apikeys

---

**Ready to continue?** Once you have your Stripe keys, paste them in the chat and I'll complete the integration!
