---
title: API Integration
description: Integrate prompts into your apps
sidebar:
  order: 5
---

Prompt Manager exposes a simple REST API to execute your prompts from your applications.

## Authentication

To use the API, you must generate an API Key.
1. Go to **Settings**.
2. **API Keys** section.
3. Click on **Generate New Key**.

> [!WARNING]
> Keep your secret key safe. It will only be shown once.

## Execute a Prompt

### Endpoint

`POST /api/v1/run`

### Request Example

```bash
curl -X POST https://prompt-manager.com/api/v1/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "promptId": "clt...",
    "version": "published",
    "inputs": {
      "username": "Steph",
      "service_name": "Prompt Manager"
    }
  }'
```

### Parameters

- `promptId` (required): The unique ID of the prompt (visible in the URL).
- `version` (optional): `published` (default) or a specific version ID.
- `inputs` (required if variables): A JSON object containing variable values.

## SDK (Coming Soon)

Official SDKs for Node.js and Python will be available shortly to facilitate integration.
