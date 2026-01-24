---
title: Execution & Testing
description: Test and execute your prompts
sidebar:
  order: 4
---

Before integrating a prompt, it is crucial to test it.

## The Playground

Each prompt has a **Run** tab (or Playground) that allows you to execute it directly in the browser.

### Model Configuration

In the right panel, you can configure:
- **Model**: Choose from available models (GPT-4, Claude 3, Mistral, etc.).
- **Temperature**: Control creativity (0 = deterministic, 1 = creative).
- **Max Tokens**: The maximum length of the response.

### Execution

1. Fill in the **Inputs** corresponding to your variables (e.g., `{{name}}`).
2. Click on **Run**.
3. The response is displayed in real-time (Streaming).

## Execution History

All executions are recorded. You can consult the history to:
- See previous results.
- Compare outputs from different models.
- Analyze the cost (tokens) of each execution.

> [!NOTE]
> FREE users are limited to 3 executions per day.
