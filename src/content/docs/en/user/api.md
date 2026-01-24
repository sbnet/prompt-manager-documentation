---
title: API Integration
description: Integrate prompts into your apps
sidebar:
  order: 5
---

Prompt Manager expose une API REST simple pour exécuter vos prompts depuis vos applications.

## Authentification

Pour utiliser l'API, vous devez générer une clé d'API (API Key).
1. Allez dans **Settings**.
2. Section **API Keys**.
3. Cliquez sur **Generate New Key**.

> [!WARNING]
> Conservez votre clé secrète. Elle ne sera affichée qu'une seule fois.

## Exécuter un Prompt

### Endpoint

\`POST /api/v1/run\`

### Exemple de Requête

```bash
curl -X POST https://prompt-manager.com/api/v1/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_CLE_API" \
  -d '{
    "promptId": "clt...",
    "version": "published",
    "inputs": {
      "nom_utilisateur": "Steph",
      "nom_service": "Prompt Manager"
    }
  }'
```

### Paramètres

- `promptId` (requis) : L'ID unique du prompt (visible dans l'URL).
- `version` (optionnel) : `published` (défaut) ou un ID de version spécifique.
- `inputs` (requis si variables) : Un objet JSON contenant les valeurs des variables.

## SDK (À venir)

Des SDKs officiels pour Node.js et Python seront bientôt disponibles pour faciliter l'intégration.
