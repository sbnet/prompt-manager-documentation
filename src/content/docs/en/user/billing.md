---
title: Plans & Billing
description: Free vs Pro plans details
sidebar:
  order: 6
---

import { Icon } from '@astrojs/starlight/components';

Prompt Manager offers two plans tailored to your needs.

## FREE Plan

Ideal for discovering the platform and for personal projects.

**Included:**
- Unlimited prompt management (creation, editing)
- Full versioning (DRAFT/PRODUCTION/ARCHIVED)
- Category organization
- Golden Samples for regression testing
- Analytics and cost tracking
- Access to free models via OpenRouter

**Limits:**
- **3 Executions / day** (via UI only, daily counter)
- No public API access
- No API key generation
- No BYOK functionality
- Limited to free models only

## PRO Plan ($7 / month)

For professionals and teams who need power and flexibility.

**Benefits:**
- **Unlimited Executions**: No more daily quotas (UI and API)
- **Public API**: Integrate your prompts into your applications
- **API Key Generation**: Create and manage multiple API keys
- **Premium Models**: Access to all OpenRouter models (GPT-4, Claude Opus, etc.)
- **BYOK (Bring Your Own Key)**: Use your own OpenRouter key
- **Priority Support**: Customer assistance with guaranteed response time

**Billing:**
- Monthly or annual payment (save 2 months by paying annually)
- Management via Stripe (credit cards accepted)
- Cancel anytime
- Prorated refund if cancelled mid-month

### BYOK (Bring Your Own Key)

BYOK allows PRO users to use their own OpenRouter API key for full control over billing and privacy.

**Why use BYOK?**
- **Maximum Privacy**: Your requests go directly through your OpenRouter account
- **Transparent Costs**: Pay OpenRouter directly at cost price, with no markup
- **No Limits**: You are only limited by your OpenRouter budget
- **Full Control**: Access to all models available on your OpenRouter account

**Configuration:**
1. Create an account on [OpenRouter](https://openrouter.ai) and get an API key
2. In Prompt Manager, go to **Settings > BYOK**
3. Click **Configure API Key**
4. Enter your OpenRouter key (format `sk-or-v1-...`)
5. Test the key to verify its validity
6. Save

:::tip[Security]
Your API key is encrypted with AES-256-GCM before being stored. Only the last 4 characters are visible in the interface for identification.
:::

**Usage:**
Once configured, your executions will automatically use your BYOK key. The "BYOK" billing type will be displayed in execution history.

**Management:**
- You can update your key at any time
- You can delete your key to return to SYSTEM mode
- Last update date is displayed for traceability
