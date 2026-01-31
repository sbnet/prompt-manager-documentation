---
title: Gestion des Prompts
description: Création et versioning de vos prompts
sidebar:
  order: 3
---

La gestion des prompts est le cœur de Prompt Manager.

## Créer un Prompt

Un prompt est composé de :
- **Titre** : Pour l'identifier facilement.
- **Description** : Optionnel, mais utile pour expliquer son but.
- **Tags** : Pour organiser et filtrer vos prompts (ex: `support`, `marketing`, `draft`).

## L'Éditeur de Prompt (IDE)

L'éditeur vous permet de concevoir votre prompt avec précision.

### Variables Dynamiques

Vous pouvez insérer des variables dynamiques dans vos prompts en utilisant la syntaxe double accolades `{{variable}}`.

**Exemple :**
```text
Écris un email de bienvenue pour {{nom_utilisateur}} qui vient de s'inscrire à {{nom_service}}.
```

Lors de l'exécution (ou via l'API), vous devrez fournir les valeurs pour `nom_utilisateur` et `nom_service`.

## Versioning & Cycle de Vie

Chaque modification d'un prompt crée potentiellement une nouvelle version.
Le système garantit l'immutabilité : une fois une version créée, elle ne change plus.

### Statuts des Versions

1.  **DRAFT (Brouillon)** : La version sur laquelle vous travaillez. Elle n'est pas accessible via l'API de production par défaut. Seules les versions DRAFT peuvent être modifiées ou supprimées.
2.  **PRODUCTION** : Une version stable, prête à être utilisée en production. L'API utilise automatiquement la version PRODUCTION de vos prompts.
3.  **ARCHIVED (Archivé)** : Une ancienne version qui n'est plus utilisée mais conservée pour l'historique.

### Promouvoir une Version

Pour passer une version DRAFT en PRODUCTION :
1. Ouvrez le prompt dans l'IDE
2. Sélectionnez la version DRAFT
3. Cliquez sur **Promote to Production**
4. La version précédente en PRODUCTION est automatiquement archivée

:::tip[Bonne Pratique]
Utilisez toujours la version PRODUCTION pour vos applications en production pour garantir la stabilité. Testez vos modifications en DRAFT avant de les promouvoir.
:::
