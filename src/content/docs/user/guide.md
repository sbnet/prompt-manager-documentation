---
title: Guide Utilisateur Prompt Manager
---

Bienvenue sur la documentation utilisateur de **Prompt Manager**, votre plateforme complète pour la gestion, le versioning et l'exécution de prompts LLM.

## Présentation du Service

**Prompt Manager** est un outil conçu pour les développeurs, les prompt engineers et les équipes produit qui souhaitent industrialiser leur usage des modèles de langage (LLM).

Les principales fonctionnalités incluent :
- **Versioning Immuable** : Gérez le cycle de vie de vos prompts (Brouillon → Production → Archivé) sans risque de régression.
- **Exécution & Streaming** : Testez vos prompts directement dans l'interface avec support du streaming et des variables dynamiques.
- **Benchmarking** : Comparez les résultats et définissez des "Golden Samples" pour garantir la qualité de vos sorties.
- **Support Multi-Modèles** : Accédez à une variété de modèles via OpenRouter.

## Offre FREE (Gratuite)

Le plan **FREE** est conçu pour découvrir la plateforme et tester ses fonctionnalités de base.

**Ce qui est inclus :**
*   Accès aux fonctionnalités de gestion de prompts (création, édition, versioning).
*   Accès aux modèles disponibles gratuitement (configurés par l'admin).

**Limites :**
*   **Limite Quotidienne** : Vous êtes limité à **3 exécutions de prompts par jour**. Cette limite est réinitialisée quotidiennement (à minuit UTC).
*   Pas d'accès à la fonctionnalité BYOK.

## Offre PRO

Le plan **PRO** est destiné aux utilisateurs intensifs et aux professionnels qui ont besoin de plus de flexibilité.
**Prix : 7,00 $ / mois**

**Avantages :**
*   **Illimité** : Plus aucune limite quotidienne d'exécution sur la plateforme.
*   **Accès aux Modèles Premium** : Débloquez l'accès aux modèles les plus performants.
*   **BYOK (Bring Your Own Key)** : Possibilité d'utiliser votre propre clé API OpenRouter.

## Fonctionnement du BYOK (Bring Your Own Key)

La fonctionnalité **BYOK** permet aux utilisateurs PRO de connecter leur propre compte OpenRouter à Prompt Manager.

### Pourquoi utiliser le BYOK ?
1.  **Confidentialité** : Vous avez un contrôle total sur vos données et leur transit.
2.  **Facturation Directe** : Vous payez directement OpenRouter pour votre consommation de tokens, sans intermédiaire.
3.  **Transparence** : Suivez votre consommation exacte via votre dashboard OpenRouter.
4.  **Pas de Crédits Applicatifs** : L'utilisation via BYOK ne consomme pas de crédits ou de quotas imposés par la plateforme Prompt Manager.

### Comment configurer le BYOK ?
1.  Allez dans vos **Paramètres** (Settings).
2.  Sélectionnez l'onglet **BYOK**.
3.  Entrez votre clé API OpenRouter personnelle (commençant par `sk-or-`).
4.  Cliquez sur **Tester et Sauvegarder**.
5.  Une fois validée, la plateforme utilisera automatiquement votre clé pour toutes les exécutions futures.

> **Note :** Le BYOK est une fonctionnalité exclusive aux membres PRO.
