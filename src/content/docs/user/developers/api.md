---
title: Intégration API
description: Intégrez vos prompts dans vos applications
sidebar:
  order: 8
---

import { Icon } from '@astrojs/starlight/components';

Prompt Manager expose une API REST simple pour exécuter vos prompts depuis vos applications.

:::note[Disponibilité]
L'API publique est réservée aux utilisateurs **PRO**. Les utilisateurs FREE doivent d'abord souscrire à l'offre PRO.
:::

## Authentification

### Générer une Clé API

Pour utiliser l'API, vous devez générer une clé d'API (API Key) :

1. Allez dans **Settings > API Keys**
2. Cliquez sur **Generate New Key**
3. Donnez un nom à votre clé (ex: "Production App", "Dev Environment")
4. Copiez la clé affichée

:::caution[Important]
La clé ne sera affichée qu'une seule fois. Si vous la perdez, vous devrez en générer une nouvelle et révoquer l'ancienne.
:::

### Gérer vos Clés API

Vous pouvez :
- **Voir toutes vos clés** : Nom, date de création, date de dernière utilisation
- **Révoquer une clé** : Supprimer définitivement une clé (action irréversible)
- **Créer plusieurs clés** : Pour séparer vos environnements (dev, staging, prod)

Les clés sont affichées partiellement pour sécurité (ex: `sk_***abc123`)

## Exécuter un Prompt

### Endpoint

```
POST https://votre-domaine.com/api/v1/run
```

### Headers Requis

| Header | Valeur |
|--------|---------|
| `Content-Type` | `application/json` |
| `x-api-key` | Votre clé API générée |

### Corps de la Requête

```json
{
  "promptName": "nom-de-votre-prompt",
  "variables": {
    "variable1": "valeur1",
    "variable2": "valeur2"
  },
  "stream": false
}
```

### Paramètres

| Paramètre | Type | Requis | Description |
|-----------|------|---------|-------------|
| `promptName` | string | Oui | Le nom (titre) de votre prompt |
| `variables` | object | Conditionnel | Les valeurs des variables si votre prompt en contient |
| `stream` | boolean | Non | Active le streaming de la réponse (défaut: false) |

### Exemple de Requête

```bash
curl -X POST https://votre-domaine.com/api/v1/run \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_votre_cle_api_ici" \
  -d '{
    "promptName": "Email de Bienvenue",
    "variables": {
      "nom_utilisateur": "Steph",
      "nom_service": "Prompt Manager"
    }
  }'
```

### Réponse Succès (200 OK)

```json
{
  "success": true,
  "output": "Bonjour Steph,\n\nBienvenue sur Prompt Manager!...",
  "promptVersion": 3,
  "durationMs": 1245,
  "model": "gpt-4"
}
```

### Codes d'Erreur

| Code | Signification |
|------|---------------|
| 400 | Requête invalide (variables manquantes, format incorrect) |
| 401 | Clé API manquante ou invalide |
| 403 | Accès refusé (abonnement expiré, modèle non autorisé) |
| 404 | Prompt non trouvé ou aucune version PRODUCTION |
| 500 | Erreur serveur ou échec d'exécution du modèle |

### Exemple d'Erreur

```json
{
  "success": false,
  "error": "Prompt 'Email de Bienvenue' not found or has no PRODUCTION version"
}
```

## Exemples d'Intégration

### Node.js

```javascript
async function executePrompt(promptName, variables) {
  const response = await fetch('https://votre-domaine.com/api/v1/run', {
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

// Utilisation
const result = await executePrompt('Email de Bienvenue', {
  nom_utilisateur: 'Steph',
  nom_service: 'Prompt Manager'
});

console.log(result.output);
```

### Python

```python
import requests
import os

def execute_prompt(prompt_name, variables):
    response = requests.post(
        'https://votre-domaine.com/api/v1/run',
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

# Utilisation
result = execute_prompt('Email de Bienvenue', {
    'nom_utilisateur': 'Steph',
    'nom_service': 'Prompt Manager'
})

print(result['output'])
```

## Bonnes Pratiques

### Gestion des Erreurs

Toujours gérer les erreurs de manière appropriée :
- **401/403** : Vérifier l'abonnement et la validité de la clé
- **404** : S'assurer que le prompt existe et a une version PRODUCTION
- **500** : Implémenter un système de retry avec backoff exponentiel

### Sécurité

- **Jamais en clair** : Ne hardcodez jamais vos clés API dans le code source
- **Variables d'environnement** : Utilisez des variables d'environnement ou un gestionnaire de secrets
- **Rotation** : Changez régulièrement vos clés API
- **Surveillance** : Surveillez l'utilisation via le dashboard pour détecter des usages anormaux

### Performance

- **Cache** : Si possible, cachez les résultats pour les requêtes identiques
- **Timeout** : Configurez des timeouts appropriés (recommandé: 30 secondes)
- **Rate Limiting** : Respectez les limites de taux côté client

:::tip[Suivi de Consommation]
Toutes les exécutions via l'API sont trackées dans votre dashboard Analytics. Consultez régulièrement vos métriques pour optimiser les coûts.
:::

## SDK Officiels (À Venir)

Des SDKs officiels pour Node.js, Python et autres langages seront bientôt disponibles pour faciliter l'intégration.
