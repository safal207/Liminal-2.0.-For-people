# Liminal 2.0 - Technical Roadmap & Implementation Plan

## 🎯 Проект Overview

**Liminal 2.0** - персональное приложение для ежедневных инсайтов и саморефлексии.

**Current Status:** MVP готов, требуется deployment и монетизация

---

## 📋 Текущее состояние проекта

### ✅ Completed:
- Next.js 15 + React 19 setup
- TypeScript configuration
- Tailwind CSS integration
- Prisma schema (User, Entry, Insight, Rule)
- Basic pages structure (/morning, /evening, /history)
- Playwright test setup
- GitHub Actions workflow

### 🚧 In Progress:
- Dependencies installation
- Database setup
- Environment configuration

### ❌ Not Started:
- Payment integration (Stripe)
- AI integration (GPT-5/Claude)
- Authentication
- PWA features
- Analytics

---

## 🛠️ Technical Setup Steps

### Step 1: Environment Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env

# Required variables:
# DATABASE_URL="postgresql://..."
# NEXTAUTH_SECRET="..."
# NEXTAUTH_URL="http://localhost:3000"
# STRIPE_SECRET_KEY="sk_test_..."
# STRIPE_PUBLISHABLE_KEY="pk_test_..."
# OPENAI_API_KEY="sk-..."
```

### Step 2: Database Setup

```bash
# 1. Start PostgreSQL (local or cloud)
# Option A: Local Docker
docker run --name liminal-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# Option B: Cloud (Supabase, Neon, Railway)
# Get connection string from provider

# 2. Update DATABASE_URL in .env

# 3. Run Prisma migrations
npx prisma migrate dev --name init
npx prisma generate
```

### Step 3: Development

```bash
# Start dev server
npm run dev

# Run tests
npm run test

# Build production
npm run build
```

---

## 💰 Monetization Implementation

### Phase 1: Stripe Integration (Week 1)

```typescript
// packages to install
npm install stripe @stripe/stripe-js @stripe/react-stripe-js

// 1. Create Stripe products
- Liminal Premium Monthly: $4.99/month
- Liminal Premium Annual: $49.99/year
- AI Coach Add-on: $9.99/month

// 2. Implement components:
src/
  components/
    stripe/
      PricingTable.tsx
      CheckoutButton.tsx
      SubscriptionManager.tsx
      BillingPortal.tsx

  app/
    api/
      stripe/
        checkout/route.ts
        webhook/route.ts
        portal/route.ts
```

**Code Example:**

```typescript
// src/app/api/stripe/checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { priceId, userId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    client_reference_id: userId,
  });

  return Response.json({ sessionId: session.id });
}
```

### Phase 2: AI Integration (Week 2)

```typescript
// Install AI SDKs
npm install openai anthropic-ai

// Features to implement:
1. Daily Insights Generation
2. Personalization Engine
3. Mood Analysis
4. Pattern Detection

// src/lib/ai/insights.ts
import OpenAI from 'openai';

export async function generateInsights(userContext: any) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a personal growth coach generating daily insights."
      },
      {
        role: "user",
        content: `Generate 3 insights (micro-habit, reframing, world-trend) for: ${JSON.stringify(userContext)}`
      }
    ]
  });

  return parseInsights(completion.choices[0].message.content);
}
```

### Phase 3: Analytics (Week 2-3)

```typescript
// Install analytics
npm install posthog-js @vercel/analytics

// Track key events:
- Page views
- Insight generation
- Subscription conversion
- Feature usage
- Churn signals

// src/lib/analytics.ts
import posthog from 'posthog-js';

export function trackEvent(event: string, properties?: any) {
  posthog.capture(event, properties);
}

// Usage:
trackEvent('insight_generated', {
  type: 'morning',
  userId: user.id
});
```

---

## 🚀 Deployment Strategy

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Auto-deploy on git push
# Connect GitHub repo in Vercel dashboard
```

**Pros:**
- ✅ Free tier generous
- ✅ Auto-scaling
- ✅ Next.js optimized
- ✅ Easy setup

**Cons:**
- ❌ Database separate
- ❌ Limited backend processing

### Option 2: Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

**Pros:**
- ✅ PostgreSQL included
- ✅ Simple pricing
- ✅ Generous free tier

**Cons:**
- ❌ Less Next.js optimization

### Option 3: AWS/DigitalOcean

**Pros:**
- ✅ Full control
- ✅ Scalable

**Cons:**
- ❌ More complex setup
- ❌ Higher maintenance

---

## 📊 Launch Checklist

### Week -2: Pre-launch

- [ ] Finish Stripe integration
- [ ] Setup analytics (PostHog)
- [ ] Configure database (Supabase/Neon)
- [ ] Deploy to production (Vercel)
- [ ] Setup custom domain
- [ ] Create landing page
- [ ] Write onboarding flow
- [ ] Test payment flow
- [ ] Recruit 50 beta testers
- [ ] Prepare Product Hunt page

### Week -1: Testing

- [ ] Beta testing (50 users)
- [ ] Fix critical bugs
- [ ] Performance optimization (TTFI < 60s)
- [ ] Mobile responsive check
- [ ] Browser compatibility
- [ ] Payment flow testing
- [ ] Email templates ready
- [ ] Social media assets
- [ ] Launch blog post
- [ ] Customer support setup

### Launch Day:

- [ ] Product Hunt submission (12:01 AM PST)
- [ ] Reddit posts
- [ ] Twitter/X thread
- [ ] LinkedIn announcement
- [ ] Hacker News Show HN
- [ ] Email beta list
- [ ] Monitor analytics
- [ ] Respond to feedback
- [ ] Fix any launch bugs

### Week +1: Post-launch

- [ ] Analyze metrics
- [ ] User interviews (10+)
- [ ] Feature prioritization
- [ ] Bug fixes
- [ ] Performance improvements
- [ ] Thank you emails
- [ ] Launch retrospective
- [ ] Plan iteration

---

## 🎯 MVP Features Priority

### Must-Have (Week 1):

1. ✅ Morning insights page
2. ✅ Evening reflection page
3. ✅ History view
4. ✅ User authentication (NextAuth)
5. ✅ Basic database (Prisma)
6. ✅ Deployment (Vercel)

### Should-Have (Week 2):

7. ⚠️ Stripe payment
8. ⚠️ Premium features gating
9. ⚠️ Email notifications (Resend)
10. ⚠️ Analytics (PostHog)
11. ⚠️ Landing page
12. ⚠️ PWA manifest

### Nice-to-Have (Week 3-4):

13. 🔮 AI personalization
14. 🔮 Export to PDF
15. 🔮 Calendar integration
16. 🔮 Themes
17. 🔮 Mobile app
18. 🔮 Social sharing

---

## 💡 Quick Wins for Monetization

### 1. Add Pricing Page (2 hours)

```typescript
// src/app/pricing/page.tsx
export default function PricingPage() {
  return (
    <div>
      <h1>Choose Your Plan</h1>
      <PricingTable />
    </div>
  );
}
```

### 2. Paywall Free Features (4 hours)

```typescript
// src/lib/permissions.ts
export function canAccessFeature(user, feature) {
  if (!user.isPremium && PREMIUM_FEATURES.includes(feature)) {
    return false;
  }
  return true;
}

// Usage:
{canAccessFeature(user, 'export') ? (
  <ExportButton />
) : (
  <UpgradeButton />
)}
```

### 3. Usage Limits (3 hours)

```typescript
// Free users: 7 days history
// Premium: unlimited

const HISTORY_LIMIT_FREE = 7; // days

export function getHistoryLimit(user) {
  return user.isPremium ? Infinity : HISTORY_LIMIT_FREE;
}
```

### 4. Email Nurture Campaign (6 hours)

```typescript
// Day 1: Welcome
// Day 3: First value email
// Day 5: Feature spotlight
// Day 7: Upgrade offer (20% discount)
// Day 14: Case study
// Day 30: Win-back if churning

// Using Resend:
npm install resend

// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(user) {
  await resend.emails.send({
    from: 'Liminal <hello@liminal.app>',
    to: user.email,
    subject: 'Welcome to Liminal 🌅',
    html: '<p>Your journey starts here...</p>'
  });
}
```

---

## 📈 Growth Hacks

### 1. Referral Program

```typescript
// Give 1 month free for each referral
// Referrer gets 1 month
// Referred gets 1 month

const REFERRAL_BONUS = 30; // days
```

### 2. Product Hunt Launch Kit

- Screenshots (5-8 high quality)
- Demo video (60-90 seconds)
- Maker intro
- First comment ready
- Upvote campaign

### 3. Content Marketing

- Blog: "Daily Insights Guide"
- Newsletter: "Weekly Wisdom"
- YouTube: "How I use Liminal"
- Podcast: "Mindful founders"

### 4. Community Building

- Discord server
- Weekly challenges
- User spotlights
- Feature voting

---

## 🔧 Technical Optimizations

### Performance:

```typescript
// 1. Image optimization
import Image from 'next/image';

// 2. Font optimization
import { Inter } from 'next/font/google';

// 3. Bundle size
// Use dynamic imports
const AnalyticsDashboard = dynamic(() => import('./Dashboard'));

// 4. Caching
export const revalidate = 3600; // 1 hour
```

### SEO:

```typescript
// src/app/layout.tsx
export const metadata = {
  title: 'Liminal - Daily Insights for Personal Growth',
  description: 'Get personalized insights every morning...',
  keywords: ['personal growth', 'daily insights', 'journaling'],
  openGraph: {
    images: ['/og-image.png']
  }
};
```

### Security:

```typescript
// 1. Rate limiting
import { rateLimit } from '@/lib/rate-limit';

// 2. CSRF protection (built-in Next.js)

// 3. SQL injection (Prisma handles)

// 4. Environment variables
// Never commit .env
// Use Vercel environment vars
```

---

## 💰 Estimated Costs (Monthly)

| Service | Free Tier | Paid (1k users) | Paid (10k users) |
|---------|-----------|-----------------|------------------|
| Vercel | ✅ Free | $20 | $20 |
| Database (Supabase) | 500MB | $25 | $25 |
| Stripe | 2.9% + 30¢ | ~$150 | ~$1,500 |
| OpenAI | - | $50 | $500 |
| Email (Resend) | 3k/mo | $20 | $80 |
| Analytics (PostHog) | 1M events | Free | $50 |
| **Total** | **$0** | **~$265** | **~$2,175** |

**Net Profit (assuming 10% conversion @ $4.99/mo):**
- 1,000 users: $499 revenue - $265 costs = **$234/mo**
- 10,000 users: $4,990 revenue - $2,175 costs = **$2,815/mo**

---

## 🎯 Next Steps

### Immediate (Today):

1. ✅ Complete `npm install`
2. ✅ Setup .env file
3. ✅ Configure database
4. ✅ Run dev server
5. ✅ Test all pages

### This Week:

1. 🔨 Implement authentication
2. 💳 Add Stripe checkout
3. 📧 Setup email service
4. 📊 Add PostHog analytics
5. 🚀 Deploy to Vercel

### Next 2 Weeks:

1. 🤖 GPT integration
2. 🎨 Polish UI/UX
3. 📱 Mobile optimization
4. 🧪 User testing
5. 🚀 Product Hunt launch

---

**Conclusion:** Проект технически готов на 60%. Осталось добавить монетизацию (Stripe), AI (GPT-5), и задеплоить. Реалистичная цель - **launch через 2-3 недели**.

---

*Roadmap created: 2025-10-05*
*Version: 1.0*
