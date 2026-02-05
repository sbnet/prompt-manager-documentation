---
title: Exécution & Tests
description: Tester et exécuter vos prompts
sidebar:
  order: 4
---

Avant d'intégrer un prompt, il est crucial de le tester.

## Le Playground (Prompt IDE)

Chaque prompt dispose d'un éditeur avancé appelé **Prompt IDE** qui combine l'édition, la configuration et l'exécution dans une seule interface.

### Interface à Trois Panneaux

L'IDE est organisé en trois sections :

**Panneau A - Éditeur** :
- **System Context** : Instructions système pour le modèle (contexte, rôle, contraintes)
- **User Template** : Votre template de prompt avec support des variables `{{variable}}`
- Détection automatique des variables dans votre template

**Panneau B - Configuration** :
- **Modèle** : Sélection parmi les modèles disponibles (filtrés selon votre tier)
- **Température** : Contrôle de la créativité (0 = déterministe, 2 = très créatif)
- **Max Tokens** : Longueur maximale de la réponse
- **Top-P** : Échantillonnage nucleus (alternative à la température)
- **Frequency Penalty** : Pénalise la répétition de mots
- **Presence Penalty** : Encourage l'introduction de nouveaux concepts

**Panneau C - Playground** :
- Formulaire de saisie des variables
- Bouton d'exécution avec streaming en temps réel
- Affichage des métriques :
  - Durée d'exécution (ms)
  - Tokens consommés (prompt + completion + total)
  - Coût estimé (USD)

### Exécution

1. **Remplissez les variables** : Le formulaire est auto-généré à partir des variables détectées dans votre template.
2. **Cliquez sur Run** : L'exécution démarre et la réponse apparaît en streaming.
3. **Analysez les résultats** : Consultez la sortie et les métriques d'exécution.

### États d'Exécution

L'interface affiche l'état en temps réel :
- **Idle** : En attente
- **Connecting** : Connexion au modèle
- **Streaming** : Réception de la réponse
- **Completed** : Exécution terminée avec succès
- **Error** : Échec de l'exécution (message d'erreur affiché)
- **Aborted** : Exécution annulée par l'utilisateur

Vous pouvez annuler une exécution en cours en cliquant sur **Abort**.

## Historique d'Exécution

Toutes les exécutions sont enregistrées dans le système. Vous pouvez consulter l'historique pour :
- Voir les résultats précédents
- Comparer les sorties de différents modèles
- Analyser le coût (tokens) de chaque exécution

L'historique est accessible depuis :
- Le tableau de bord (activité récente)
- L'onglet Analytics pour une vue détaillée

:::note[Limites d'Exécution]
- **Utilisateurs FREE** : 3 exécutions par jour (compteur remis à zéro à minuit UTC)
- **Utilisateurs PRO** : Exécutions illimitées
:::

## Modes de Facturation

Lors de l'exécution, le type de facturation est enregistré :

- **SYSTEM** : Utilise la clé API du système Prompt Manager (utilisateurs PRO sans BYOK)
- **BYOK** : Utilise votre clé OpenRouter personnelle (utilisateurs PRO avec BYOK configuré)

Le badge de type de facturation est affiché sur chaque exécution dans l'historique.

:::tip[Astuce Quotas]
Si vous atteignez la limite journalière en mode FREE, un modal vous proposera de passer à l'offre PRO pour débloquer les exécutions illimitées.
:::
