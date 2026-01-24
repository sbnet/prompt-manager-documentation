---
title: Prompt Management
description: Create and version your prompts
sidebar:
  order: 3
---

Prompt management is the core of Prompt Manager.

## Creating a Prompt

A prompt consists of:
- **Title**: To identify it easily.
- **Description**: Optional, but useful to explain its purpose.
- **Tags**: To organize and filter your prompts (e.g., `support`, `marketing`, `draft`).

## The Prompt Editor (IDE)

The editor allows you to design your prompt with precision.

### Dynamic Variables

You can insert dynamic variables into your prompts using the double curly braces syntax `{{variable}}`.

**Example:**
```text
Write a welcome email for {{username}} who just signed up for {{service_name}}.
```

At execution time (or via the API), you will need to provide values for `username` and `service_name`.

## Versioning & Lifecycle

Every modification to a prompt potentially creates a new version.
The system guarantees immutability: once a version is created, it never changes.

### Version Statuses

1.  **DRAFT**: The version you are working on. It is not accessible via the production API by default.
2.  **PUBLISHED**: A stable version, ready to be used in production.
3.  **ARCHIVED**: An old version that is no longer used but kept for history.

> [!TIP]
> Always use the published version for your production applications to ensure stability.
