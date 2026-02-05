---
title: Échantillons de Référence (Golden Samples)
description: Créez des tests de régression pour vos prompts
sidebar:
  order: 5
---

import { Icon } from '@astrojs/starlight/components';

Les **Golden Samples** (échantillons de référence) vous permettent de créer des tests de régression pour garantir la qualité de vos prompts au fil des versions.

## Qu'est-ce qu'un Golden Sample ?

Un Golden Sample est une exécution de prompt dont vous avez validé la qualité de sortie. Il sert de référence pour détecter les régressions lors de modifications futures de votre prompt.

## Créer un Golden Sample

1. Exécutez votre prompt dans le Playground.
2. Si la sortie est satisfaisante, cliquez sur **Marquer comme Golden Sample**.
3. Donnez un nom descriptif à votre sample (ex: "Email de bienvenue - utilisateur premium").
4. (Optionnel) Ajoutez une description pour expliquer ce que ce test vérifie.

## Utilisation des Golden Samples

### Test Individuel

Vous pouvez ré-exécuter un Golden Sample spécifique :
1. Sélectionnez le sample dans la liste.
2. Cliquez sur **Ré-exécuter**.
3. Le système compare automatiquement la nouvelle sortie avec l'originale.

### Comparaison de Sortie

Lorsque vous ré-exécutez un Golden Sample, l'interface affiche :
- ✅ **Identique** : La sortie n'a pas changé (test passé)
- ⚠️ **Modifié** : La sortie a changé (régression potentielle)
- ❌ **Erreur** : L'exécution a échoué

Un diff visuel met en évidence :
- <span style="color: green;">Les ajouts</span>
- <span style="color: red;">Les suppressions</span>
- Le contenu inchangé

### Test en Batch

Exécutez tous les Golden Samples d'une version :
1. Dans l'IDE, cliquez sur **Tester tous les Golden Samples**.
2. Le système exécute tous les samples et affiche un rapport :
   - Nombre total de tests
   - Tests réussis (sortie identique)
   - Tests modifiés (sortie différente)
   - Tests échoués (erreurs d'exécution)

## Workflow Recommandé

1. **Avant de modifier un prompt** : Créez des Golden Samples pour les cas d'usage critiques.
2. **Après modification** : Ré-exécutez tous les Golden Samples pour détecter les régressions.
3. **Si un test échoue** : Décidez si c'est une régression (à corriger) ou une amélioration intentionnelle (à valider).

:::tip[Cas d'Usage]
Créez des Golden Samples pour :
- Les cas d'usage critiques de production
- Les cas limites (edge cases)
- Les différents types d'utilisateurs ou de scénarios
:::

:::note[Disponibilité]
Les Golden Samples sont disponibles pour tous les utilisateurs (FREE et PRO).
:::
