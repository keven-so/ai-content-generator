# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: VERIFICATION POLICY

**NEVER MAKE ASSUMPTIONS - VERIFY EVERYTHING**

### Core Principles:
- **NEVER** assume code is working without testing it
- **NEVER** claim tasks are "fixed" or "completed" without verification
- **NEVER** assume dependencies are installed without verifying
- **NEVER** assume configurations are correct without validation

### Before claiming success:
1. Test the actual functionality
2. Verify all requirements are met
3. Check current system status

### Verification Commands:
```bash
# Verify dev server is running
lsof -i :3000
curl http://localhost:3000

# Verify dependencies
npm list [package-name]

# Test build
npm run build
```

**ALWAYS VERIFY - NEVER ASSUME**

## Global Agent Integration

This project integrates with the global Claude Code agent ecosystem for enhanced development capabilities.

### Serena Head Orchestrator (PRIMARY)
- **Head Orchestrator**: Serena MCP tools serve as the primary orchestrator for all Claude Code tasks
- **Intelligent Routing**: Automatically analyzes tasks and routes between Serena MCP tools and 125+ Claude agents
- **Server Port**: 8888 (Auto-starts with MCP project services)
- **Configuration**: `/Users/kevenso/Documents/MCP-CRAWL4AI-RAG+CUSTOMAIZE_AI/serena_integration_config.json`
- **Routing Strategies**:
  - **serena_first**: Analysis with Serena → Implementation with Claude agents
  - **claude_first**: Creation with Claude agents → Integration with Serena
  - **hybrid_parallel**: Serena + Claude agents execute simultaneously
- **MCP Tool Integration**: find_symbol, search_for_pattern, read_file, memory management
- **Context Preservation**: Serena's memory system maintains project knowledge across tasks

### 125+ Specialized Claude Agents
Available agents from `/Users/kevenso/.claude/agents/`:
- **Language Specialists**: python-pro, javascript-pro, typescript-pro, rust-engineer, golang-pro, java-architect, php-pro, csharp-developer, swift-expert, kotlin-specialist
- **Frontend**: react-specialist, nextjs-developer, vue-expert, angular-architect, frontend-developer
- **Backend**: backend-developer, api-designer, nodejs-specialist, spring-boot-engineer, django-developer, rails-expert
- **Full Stack**: fullstack-developer, dotnet-core-expert, laravel-specialist
- **Quality & Security**: code-reviewer, security-auditor, security-reviewer, penetration-tester, qa-expert, test-automator
- **DevOps & Infrastructure**: devops-engineer, sre-engineer, kubernetes-specialist, terraform-engineer, docker-specialist, cloud-architect
- **Database**: database-administrator, database-optimizer, sql-pro, postgres-pro
- **AI/ML**: ai-engineer, ml-engineer, mlops-engineer, data-scientist, nlp-engineer
- **Architecture**: architect-reviewer, microservices-architect, api-architect, system-designer
- **Specialized**: performance-engineer, debugger, error-detective, refactoring-specialist, legacy-modernizer

### Mandatory Agent Engagement Policy

**EVERY TASK MUST USE SERENA + CLAUDE AGENTS - NO EXCEPTIONS**

#### Immediate Action Required:
- **ALWAYS** engage Serena MCP tools for code analysis, symbol finding, and project understanding
- **ALWAYS** engage appropriate Claude agents for implementation, review, and quality assurance
- **NEVER** work alone - multi-agent collaboration is MANDATORY for all non-trivial tasks
- **AUTO-INVOKE**: If user doesn't request agents, invoke them automatically

#### Task Detection Triggers for This Project:
- **Next.js/React Development**: Engage nextjs-developer + react-specialist + frontend-developer
- **API Routes**: Engage backend-developer + api-designer + security-auditor
- **Database Schema Changes**: Engage database-administrator + database-optimizer
- **Clerk Auth Integration**: Engage security-auditor + fullstack-developer
- **Razorpay Integration**: Engage payment-integration + security-reviewer
- **UI Components**: Engage react-specialist + design-reviewer + accessibility-tester
- **Performance Issues**: Engage performance-engineer + nextjs-developer
- **Code Review**: Engage pragmatic-code-reviewer + security-reviewer (parallel)
- **Debugging**: Engage debugger + error-detective + nextjs-developer
- **Testing**: Engage test-automator + qa-expert
- **TypeScript Issues**: Engage typescript-pro + frontend-developer
- **Deployment**: Engage deployment-engineer + devops-engineer

#### Enforcement Rules:
1. **Before ANY coding task**: Use Serena find_symbol, search_for_pattern, get_symbols_overview
2. **For ANY code changes**: Engage pragmatic-code-reviewer + security-reviewer agents
3. **For ANY UI changes**: Engage design-reviewer + frontend-developer agents
4. **For ANY debugging**: Engage debugger + error-detective agents
5. **For ANY architecture decisions**: Engage architect-reviewer + nextjs-developer agents
6. **For ANY security concerns**: Engage security-auditor + penetration-tester agents

**VIOLATION OF THIS POLICY IS UNACCEPTABLE - AGENTS MUST BE ENGAGED PROACTIVELY**

### MCP Server Connection (Optional)
If working with the enhanced MCP ecosystem:
- **MCP Server**: Port 8051 (requires MCP-CRAWL4AI-RAG+CUSTOMAIZE_AI project)
- **RAG Server**: Port 8500 (knowledge enhancement)
- **Integrated RAG v2.0**: Port 8600 (specialist knowledge)
- **Enhanced Coordinator**: Port 9000 (master orchestrator)
- **Category Coordinators**: Ports 8901-8910 (domain specialists)

To activate full ecosystem (optional):
```bash
cd /Users/kevenso/Documents/MCP-CRAWL4AI-RAG+CUSTOMAIZE_AI/
python3 start_all_services.py
python3 launch_complete_subagent_ecosystem.py enhanced
```

## Project Overview

AI Content Generator built with Next.js 14, featuring 15+ AI-powered content creation templates using Google Gemini AI. Includes authentication via Clerk, subscription management with Razorpay, and PostgreSQL database via Neon/Drizzle ORM.

## Essential Commands

### Development
```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

### Database Operations
```bash
# Push schema changes to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **AI Provider**: Google Gemini (gemini-1.5-flash)
- **Database**: Neon PostgreSQL + Drizzle ORM
- **Payments**: Razorpay subscriptions
- **UI**: TailwindCSS + shadcn/ui + Radix UI
- **Editor**: Toast UI React Editor

### Core Structure

```
app/
├── (auth)/              # Authentication pages (sign-in, sign-up)
├── (context)/           # React context providers (usage tracking, subscriptions)
├── (data)/              # Template definitions (Templates.tsx)
├── dashboard/           # Main app dashboard
│   ├── content/[template-slug]/  # Dynamic content generation page
│   ├── history/         # Generated content history
│   ├── billing/         # Subscription management
│   └── settings/        # User settings
└── api/                 # API routes
    └── create-subscription/  # Razorpay subscription creation

utils/
├── schema.tsx           # Drizzle database schema (AIOutput, UserSubscription)
├── db.tsx               # Database connection
└── AiModal.tsx          # Google Gemini AI configuration

components/              # Reusable UI components (shadcn/ui)
```

### Key Components

**Template System** ([Templates.tsx](app/(data)/Templates.tsx)):
- 15+ content generation templates (blog, YouTube, Instagram, coding, etc.)
- Each template defines: name, description, category, icon, AI prompt, and form fields
- Templates are accessed via slug-based routing (`/dashboard/content/[template-slug]`)

**Database Schema** ([schema.tsx](utils/schema.tsx)):
- `AIOutput`: Stores generated content (formData, aiResponse, templateSlug, createdBy, createdAt)
- `UserSubscription`: Tracks subscriptions (email, userName, active, paymentId, joinDate)

**AI Integration** ([AiModal.tsx](utils/AiModal.tsx)):
- Configured for Gemini 1.5 Flash model
- Max tokens: 8192
- Uses chat session for context-aware generation

**Authentication** ([middleware.ts](middleware.ts)):
- Clerk middleware protects all `/dashboard/*` routes
- Public routes: auth pages and landing page

### Content Generation Flow

1. User selects template from dashboard
2. Fills form based on template's field definitions
3. Form data + template's `aiPrompt` sent to Gemini API
4. Generated content displayed in OutputSection (Toast UI editor)
5. Content saved to `AIOutput` table with usage tracking
6. Free tier: 10,000 credits limit; subscription required for unlimited

## Environment Variables Required

Create `.env.local` with:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Google Gemini AI
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=

# Neon Database
NEXT_PUBLIC_DRIZZLE_DB_URL=

# Razorpay Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_SECRET_KEY=
SUBSCRIPTION_PLAN_ID=
```

## Adding New Templates

1. Add template object to [Templates.tsx](app/(data)/Templates.tsx):
```tsx
{
  name: 'Template Name',
  desc: 'Description',
  category: 'Category',
  icon: 'https://cdn-icons-png.flaticon.com/...',
  slug: 'unique-slug',
  aiPrompt: 'AI instruction with placeholders',
  form: [
    {
      label: 'Field Label',
      field: 'input' | 'textarea',
      name: 'fieldName',
      required: true | false
    }
  ]
}
```

2. Template automatically becomes accessible at `/dashboard/content/unique-slug`
3. Form field names in `aiPrompt` should match form field `name` values

## Database Schema Management

Schema defined in [utils/schema.tsx](utils/schema.tsx) using Drizzle ORM:
- Modify schema, then run `npm run db:push` to sync to Neon database
- Use `npm run db:studio` to visually inspect/edit data
- Connection configured in [drizzle.config.js](drizzle.config.js)

## Key Development Patterns

### Context Providers
Three main contexts in `app/(context)/`:
- **TotalUsageContext**: Tracks total AI credits used
- **UserSubscriptionContext**: Manages subscription state
- **UpdateCreditUsageContext**: Triggers credit updates

### Protected Routes
All dashboard routes require authentication via Clerk middleware. Add new protected routes to `isProtectedRoute` matcher in [middleware.ts](middleware.ts).

### API Routes
Follow Next.js 14 App Router conventions:
- Create `route.js` or `route.ts` in `app/api/[endpoint]/`
- Export named functions: `GET`, `POST`, etc.
- Use `NextResponse` for responses

### AI Content Generation
[GenerateAIContent function](app/dashboard/content/[template-slug]/page.tsx:43):
1. Checks usage limits (10,000 for free tier)
2. Sends prompt to Gemini via `chatSession`
3. Saves output to database
4. Updates usage tracking

## Subscription System

Razorpay integration in [app/api/create-subscription/route.js](app/api/create-subscription/route.js):
- Creates subscription on Razorpay
- Plan ID configured via environment variable
- Payment handling in [app/dashboard/billing/page.tsx](app/dashboard/billing/page.tsx)
- Subscription status stored in `UserSubscription` table

## Security Notes

### Sensitive Data in Codebase
⚠️ **WARNING**: [drizzle.config.js](drizzle.config.js) contains hardcoded database credentials. This should be moved to environment variables:

```javascript
// Current (INSECURE):
dbCredentials: {
  url: 'postgresql://accounts:ypvN2ke3PGFE@ep-weathered-heart-a58wmzem.us-east-2.aws.neon.tech/AI-Content-Genrator?sslmode=require',
}

// Should be:
dbCredentials: {
  url: process.env.DATABASE_URL,
}
```

Add to `.env.local`:
```bash
DATABASE_URL=postgresql://accounts:ypvN2ke3PGFE@ep-weathered-heart-a58wmzem.us-east-2.aws.neon.tech/AI-Content-Genrator?sslmode=require
```

### Environment Variable Best Practices
- Never commit `.env.local` to git (already in `.gitignore`)
- Use `NEXT_PUBLIC_` prefix only for client-side variables
- Server-side secrets (API keys, database URLs) should NOT use `NEXT_PUBLIC_` prefix
- Rotate exposed credentials immediately if accidentally committed
