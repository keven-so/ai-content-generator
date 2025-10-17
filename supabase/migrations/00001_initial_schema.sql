-- Create aiOutput table for storing AI generated content
CREATE TABLE IF NOT EXISTS "aiOutput" (
  "id" SERIAL PRIMARY KEY,
  "formData" VARCHAR,
  "aiResponse" TEXT,
  "templateSlug" VARCHAR,
  "createdBy" VARCHAR,
  "createdAt" VARCHAR
);

-- Create userSubscription table for managing subscriptions
CREATE TABLE IF NOT EXISTS "userSubscription" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR,
  "userName" VARCHAR,
  "active" BOOLEAN,
  "paymentId" VARCHAR,
  "joinDate" VARCHAR
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_output_created_by ON "aiOutput"("createdBy");
CREATE INDEX IF NOT EXISTS idx_user_subscription_email ON "userSubscription"("email");
