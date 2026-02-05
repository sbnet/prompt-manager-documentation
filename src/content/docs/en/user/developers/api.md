---
title: API Integration
description: Integrate your prompts into your applications
sidebar:
  order: 8
---

import { Icon } from '@astrojs/starlight/components';

Prompt Manager exposes a simple REST API to execute your prompts from your applications.

:::note[Availability]
The public API is reserved for **PRO** users. FREE users must first subscribe to the PRO plan.
:::

## Authentication

### Generating an API Key

To use the API, you must generate an API key:

1. Go to **Settings > API Keys**
2. Click **Generate New Key**
3. Give your key a name (e.g., "Production App", "Dev Environment")
4. Copy the displayed key

:::caution[Important]
The key will only be displayed once. If you lose it, you will need to generate a new one and revoke the old one.
:::

### Managing Your API Keys

You can:
- **View all your keys**: Name, creation date, last used date
- **Revoke a key**: Permanently delete a key (irreversible action)
- **Create multiple keys**: To separate your environments (dev, staging, prod)

Keys are partially displayed for security (e.g., `sk_***abc123`)

## Executing a Prompt

### Endpoint

```
POST https://your-domain.com/api/v1/run
```

### Required Headers

| Header | Value |
|--------|---------|
| `Content-Type` | `application/json` |
| `x-api-key` | Your generated API key |

### Request Body

```json
{
  "promptName": "your-prompt-name",
  "variables": {
    "variable1": "value1",
    "variable2": "value2"
  },
  "stream": false
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `promptName` | string | Yes | The name (title) of your prompt |
| `variables` | object | Conditional | Variable values if your prompt contains any |
| `stream` | boolean | No | Enable streaming response (default: false) |

### Request Example

```bash
curl -X POST https://your-domain.com/api/v1/run \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_your_api_key_here" \
  -d '{
    "promptName": "Welcome Email",
    "variables": {
      "username": "Steph",
      "service_name": "Prompt Manager"
    }
  }'
```

### Success Response (200 OK)

```json
{
  "success": true,
  "output": "Hello Steph,\n\nWelcome to Prompt Manager!...",
  "promptVersion": 3,
  "durationMs": 1245,
  "model": "gpt-4"
}
```

### Error Codes

| Code | Meaning |
|------|---------|
| 400 | Invalid request (missing variables, incorrect format) |
| 401 | Missing or invalid API key |
| 403 | Access denied (expired subscription, unauthorized model) |
| 404 | Prompt not found or no PRODUCTION version |
| 500 | Server error or model execution failure |

### Error Example

```json
{
  "success": false,
  "error": "Prompt 'Welcome Email' not found or has no PRODUCTION version"
}
```

## Integration Examples

### Node.js

```javascript
async function executePrompt(promptName, variables) {
  const response = await fetch('https://your-domain.com/api/v1/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.PROMPT_MANAGER_API_KEY
    },
    body: JSON.stringify({ promptName, variables })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}

// Usage
const result = await executePrompt('Welcome Email', {
  username: 'Steph',
  service_name: 'Prompt Manager'
});

console.log(result.output);
```

### Python

```python
import requests
import os

def execute_prompt(prompt_name, variables):
    response = requests.post(
        'https://your-domain.com/api/v1/run',
        headers={
            'Content-Type': 'application/json',
            'x-api-key': os.environ['PROMPT_MANAGER_API_KEY']
        },
        json={
            'promptName': prompt_name,
            'variables': variables
        }
    )

    response.raise_for_status()
    return response.json()

# Usage
result = execute_prompt('Welcome Email', {
    'username': 'Steph',
    'service_name': 'Prompt Manager'
})

print(result['output'])
```

## Best Practices

### Error Handling

Always handle errors appropriately:
- **401/403**: Check subscription and key validity
- **404**: Ensure prompt exists and has a PRODUCTION version
- **500**: Implement retry system with exponential backoff

### Security

- **Never in plain text**: Never hardcode API keys in source code
- **Environment variables**: Use environment variables or a secrets manager
- **Rotation**: Regularly change your API keys
- **Monitoring**: Monitor usage via dashboard to detect abnormal usage

### Performance

- **Cache**: If possible, cache results for identical requests
- **Timeout**: Configure appropriate timeouts (recommended: 30 seconds)
- **Rate Limiting**: Respect rate limits on the client side

:::tip[Consumption Tracking]
All executions via the API are tracked in your Analytics dashboard. Regularly check your metrics to optimize costs.
:::

## Official SDKs (Coming Soon)

Official SDKs for Node.js, Python, and other languages will soon be available to facilitate integration.
