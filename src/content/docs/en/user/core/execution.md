---
title: Execution & Testing
description: Test and execute your prompts
sidebar:
  order: 4
---

import { Icon } from '@astrojs/starlight/components';

Before integrating a prompt, it is crucial to test it.

## The Playground (Prompt IDE)

Each prompt has an advanced editor called **Prompt IDE** that combines editing, configuration, and execution in a single interface.

### Three-Panel Interface

The IDE is organized into three sections:

**Panel A - Editor**:
- **System Context**: System instructions for the model (context, role, constraints)
- **User Template**: Your prompt template with `{{variable}}` support
- Automatic variable detection from your template

**Panel B - Configuration**:
- **Model**: Selection from available models (filtered by your tier)
- **Temperature**: Creativity control (0 = deterministic, 2 = very creative)
- **Max Tokens**: Maximum response length
- **Top-P**: Nucleus sampling (alternative to temperature)
- **Frequency Penalty**: Penalizes word repetition
- **Presence Penalty**: Encourages introducing new concepts

**Panel C - Playground**:
- Variable input form (auto-generated from detected variables)
- Execute button with real-time streaming
- Execution metrics display:
  - Execution duration (ms)
  - Tokens consumed (prompt + completion + total)
  - Estimated cost (USD)

### Execution

1. **Fill in variables**: The form is auto-generated from variables detected in your template.
2. **Click Run**: Execution starts and the response appears in streaming.
3. **Analyze results**: Review the output and execution metrics.

### Execution States

The interface displays real-time status:
- **Idle**: Waiting
- **Connecting**: Connecting to model
- **Streaming**: Receiving response
- **Completed**: Execution successful
- **Error**: Execution failed (error message displayed)
- **Aborted**: Execution cancelled by user

You can cancel an ongoing execution by clicking **Abort**.

## Execution History

All executions are recorded in the system. You can consult the history to:
- See previous results
- Compare outputs from different models
- Analyze the cost (tokens) of each execution

The history is accessible from:
- The dashboard (recent activity)
- The Analytics tab for a detailed view

:::note[Execution Limits]
- **FREE users**: 3 executions per day (counter resets at midnight UTC)
- **PRO users**: Unlimited executions
:::

## Billing Modes

During execution, the billing type is recorded:

- **SYSTEM**: Uses Prompt Manager's system API key (PRO users without BYOK)
- **BYOK**: Uses your personal OpenRouter key (PRO users with BYOK configured)

The billing type badge is displayed on each execution in the history.

:::tip[Quota Tip]
If you reach the daily limit in FREE mode, a modal will offer you to upgrade to PRO to unlock unlimited executions.
:::
