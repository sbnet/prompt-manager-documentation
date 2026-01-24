---
title: Exécution & Tests
description: Tester et exécuter vos prompts
sidebar:
  order: 4
---

Avant d'intégrer un prompt, il est crucial de le tester.

## Le Playground

Chaque prompt dispose d'un onglet **Run** (ou Playground) qui vous permet de l'exécuter directement dans le navigateur.

### Configuration du Modèle

Dans le panneau de droite, vous pouvez configurer :
- **Modèle** : Choisissez parmi les modèles disponibles (GPT-4, Claude 3, Mistral, etc.).
- **Température** : Contrôlez la créativité (0 = déterministe, 1 = créatif).
- **Max Tokens** : La longueur maximale de la réponse.

### Exécution

1. Remplissez les **Mises (Inputs)** correspondant à vos variables (ex: `{{nom}}`).
2. Cliquez sur **Run**.
3. La réponse s'affiche en temps réel (Streaming).

## Historique d'Exécution

Toutes les exécutions sont enregistrées. Vous pouvez consulter l'historique pour :
- Voir les résultats précédents.
- Comparer les sorties de différents modèles.
- Analyser le coût (tokens) de chaque exécution.

> [!NOTE]
> Les utilisateurs FREE sont limités à 3 exécutions par jour.
