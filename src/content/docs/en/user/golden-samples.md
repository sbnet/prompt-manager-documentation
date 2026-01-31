---
title: Golden Samples
description: Create regression tests for your prompts
sidebar:
  order: 5
---

import { Icon } from '@astrojs/starlight/components';

**Golden Samples** allow you to create regression tests to ensure the quality of your prompts across versions.

## What is a Golden Sample?

A Golden Sample is a prompt execution whose output quality you have validated. It serves as a reference to detect regressions during future prompt modifications.

## Creating a Golden Sample

1. Execute your prompt in the Playground.
2. If the output is satisfactory, click **Mark as Golden Sample**.
3. Give your sample a descriptive name (e.g., "Welcome email - premium user").
4. (Optional) Add a description explaining what this test verifies.

## Using Golden Samples

### Individual Test

You can re-execute a specific Golden Sample:
1. Select the sample from the list.
2. Click **Re-run**.
3. The system automatically compares the new output with the original.

### Output Comparison

When you re-execute a Golden Sample, the interface displays:
- ✅ **Identical**: Output hasn't changed (test passed)
- ⚠️ **Modified**: Output has changed (potential regression)
- ❌ **Error**: Execution failed

A visual diff highlights:
- <span style="color: green;">Additions</span>
- <span style="color: red;">Deletions</span>
- Unchanged content

### Batch Testing

Execute all Golden Samples for a version:
1. In the IDE, click **Test All Golden Samples**.
2. The system executes all samples and displays a report:
   - Total number of tests
   - Passed tests (identical output)
   - Modified tests (different output)
   - Failed tests (execution errors)

## Recommended Workflow

1. **Before modifying a prompt**: Create Golden Samples for critical use cases.
2. **After modification**: Re-execute all Golden Samples to detect regressions.
3. **If a test fails**: Decide if it's a regression (to fix) or an intentional improvement (to validate).

:::tip[Use Cases]
Create Golden Samples for:
- Critical production use cases
- Edge cases
- Different user types or scenarios
:::

:::note[Availability]
Golden Samples are available to all users (FREE and PRO).
:::
