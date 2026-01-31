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

1.  **DRAFT**: The version you are working on. It is not accessible via the production API by default. Only DRAFT versions can be modified or deleted.
2.  **PRODUCTION**: A stable version, ready to be used in production. The API automatically uses the PRODUCTION version of your prompts.
3.  **ARCHIVED**: An old version that is no longer used but kept for history.

### Promoting a Version

To promote a DRAFT version to PRODUCTION:
1. Open the prompt in the IDE
2. Select the DRAFT version
3. Click **Promote to Production**
4. The previous PRODUCTION version is automatically archived

:::tip[Best Practice]
Always use the PRODUCTION version for your production applications to ensure stability. Test your changes in DRAFT before promoting them.
:::
