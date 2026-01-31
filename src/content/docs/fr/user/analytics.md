---
title: Analytiques & Suivi
description: Surveillez l'utilisation et les coûts de vos prompts
sidebar:
  order: 7
---

import { Icon } from '@astrojs/starlight/components';

Prompt Manager vous offre des outils d'analyse pour suivre l'utilisation, les performances et les coûts de vos prompts.

## Tableau de Bord

Le **Dashboard** affiche une vue d'ensemble de votre activité :

### Statistiques Globales

- **Total de Prompts** : Nombre de prompts créés
- **Total d'Exécutions** : Nombre total d'exécutions réalisées
- **Latence Moyenne** : Temps moyen de réponse (en millisecondes)
- **Modèle le Plus Utilisé** : Le modèle LLM que vous utilisez le plus

### Suivi des Coûts

- **Coût Total (Tous les temps)** : Montant total dépensé depuis la création du compte
- **Coût du Mois en Cours** : Dépenses du mois actuel
- **Tokens Consommés (Total)** : Nombre total de tokens utilisés
- **Tokens Consommés (Mois)** : Consommation du mois en cours

### Graphique d'Utilisation

Un graphique affiche votre activité sur les **7 derniers jours** :
- Nombre d'exécutions par jour
- Tendance d'utilisation

### Activité Récente

La table d'activité récente affiche vos **10 dernières exécutions** avec :
- Nom du prompt
- Statut (succès/échec)
- Durée d'exécution
- Coût de l'exécution

## Suivi par Exécution

Chaque exécution enregistre :
- **Durée (ms)** : Temps de réponse du modèle
- **Tokens Prompt** : Nombre de tokens dans votre prompt
- **Tokens Completion** : Nombre de tokens générés en sortie
- **Tokens Total** : Somme des deux
- **Coût (USD)** : Coût calculé selon le tarif du modèle

## Calcul des Coûts

Le coût est calculé automatiquement selon :
- Le modèle utilisé (chaque modèle a son propre tarif)
- Le nombre de tokens consommés
- Le type de facturation :
  - **SYSTEM** : Facturation via Prompt Manager (PRO)
  - **BYOK** : Facturation via votre clé OpenRouter personnelle

:::note[Mode de Facturation]
- **Utilisateurs FREE** : Pas de coût (limite de 3 exécutions/jour)
- **Utilisateurs PRO sans BYOK** : Coûts tracés et facturés via Prompt Manager
- **Utilisateurs PRO avec BYOK** : Coûts tracés mais facturés directement par OpenRouter
:::

## Optimisation des Coûts

### Conseils pour Réduire les Coûts

1. **Choisissez le bon modèle** : Les modèles plus petits (Llama 3, Mistral) sont moins chers que GPT-4 ou Claude Opus.
2. **Optimisez vos prompts** : Des prompts plus courts consomment moins de tokens.
3. **Configurez Max Tokens** : Limitez la longueur de sortie pour éviter les surprises.
4. **Utilisez BYOK** : Payez directement OpenRouter au tarif coûtant (sans marge).

### Comparaison de Modèles

Avant de choisir un modèle, consultez son tarif dans la configuration de l'exécution. Les tarifs sont affichés par million de tokens.

:::tip[Surveillance Proactive]
Consultez régulièrement votre dashboard pour identifier les prompts qui consomment le plus et optimiser votre utilisation.
:::
