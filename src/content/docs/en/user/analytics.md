---
title: Analytics & Tracking
description: Monitor usage and costs of your prompts
sidebar:
  order: 7
---

import { Icon } from '@astrojs/starlight/components';

Prompt Manager provides analytics tools to track usage, performance, and costs of your prompts.

## Dashboard

The **Dashboard** displays an overview of your activity:

### Global Statistics

- **Total Prompts**: Number of prompts created
- **Total Executions**: Total number of executions performed
- **Average Latency**: Average response time (in milliseconds)
- **Most Used Model**: The LLM model you use most

### Cost Tracking

- **Total Cost (All Time)**: Total amount spent since account creation
- **Current Month Cost**: Current month expenses
- **Tokens Consumed (Total)**: Total number of tokens used
- **Tokens Consumed (Month)**: Current month consumption

### Usage Chart

A chart displays your activity over the **last 7 days**:
- Number of executions per day
- Usage trend

### Recent Activity

The recent activity table shows your **last 10 executions** with:
- Prompt name
- Status (success/failure)
- Execution duration
- Execution cost

## Per-Execution Tracking

Each execution records:
- **Duration (ms)**: Model response time
- **Prompt Tokens**: Number of tokens in your prompt
- **Completion Tokens**: Number of tokens generated in output
- **Total Tokens**: Sum of both
- **Cost (USD)**: Cost calculated according to model pricing

## Cost Calculation

Cost is automatically calculated based on:
- The model used (each model has its own pricing)
- The number of tokens consumed
- The billing type:
  - **SYSTEM**: Billing via Prompt Manager (PRO)
  - **BYOK**: Billing via your personal OpenRouter key

:::note[Billing Mode]
- **FREE users**: No cost (3 executions/day limit)
- **PRO users without BYOK**: Costs tracked and billed via Prompt Manager
- **PRO users with BYOK**: Costs tracked but billed directly by OpenRouter
:::

## Cost Optimization

### Tips to Reduce Costs

1. **Choose the right model**: Smaller models (Llama 3, Mistral) are cheaper than GPT-4 or Claude Opus.
2. **Optimize your prompts**: Shorter prompts consume fewer tokens.
3. **Configure Max Tokens**: Limit output length to avoid surprises.
4. **Use BYOK**: Pay OpenRouter directly at cost price (no markup).

### Model Comparison

Before choosing a model, check its pricing in the execution configuration. Prices are displayed per million tokens.

:::tip[Proactive Monitoring]
Regularly check your dashboard to identify prompts that consume the most and optimize your usage.
:::
