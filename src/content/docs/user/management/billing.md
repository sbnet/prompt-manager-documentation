---
title: Plans & Facturation
description: Détails des offres Free et Pro
sidebar:
  order: 6
---

Prompt Manager propose deux plans adaptés à vos besoins.

## Offre FREE (Gratuite)

Idéal pour découvrir la plateforme et pour les projets personnels.

**Inclus :**
- Gestion illimitée de prompts (création, édition)
- Versioning complet (DRAFT/PRODUCTION/ARCHIVED)
- Organisation par catégories
- [Analytics et suivi des coûts](/user/management/analytics/)
- Accès aux modèles gratuits via OpenRouter

**Limites :**
- **3 Exécutions / jour** (via UI uniquement, compteur quotidien)
- Pas d'accès à l'API publique
- Pas de génération de clés API
- Pas de fonctionnalité BYOK
- Accès limité aux modèles gratuits uniquement

## Offre PRO ($7 / mois)

Pour les professionnels et les équipes qui ont besoin de puissance et de flexibilité.

**Avantages :**
- **Exécutions Illimitées** : Plus de quota journalier (UI et API)
- **API Publique** : Intégrez vos prompts dans vos applications
- **Génération de Clés API** : Créez et gérez plusieurs clés API
- **Modèles Premium** : Accès à tous les modèles OpenRouter (GPT-4, Claude Opus, etc.)
- **BYOK (Bring Your Own Key)** : Utilisez votre propre clé OpenRouter
- **Support Prioritaire** : Assistance client avec temps de réponse garanti

**Facturation :**
- Paiement mensuel ou annuel (économisez 2 mois en payant à l'année)
- Gestion via Stripe (cartes bancaires acceptées)
- Annulation à tout moment
- Remboursement au prorata si annulé en cours de mois

### Le BYOK (Bring Your Own Key)

Le BYOK permet aux utilisateurs PRO d'utiliser leur propre clé API OpenRouter pour un contrôle total sur la facturation et la confidentialité.

**Pourquoi utiliser BYOK ?**
- **Confidentialité Maximale** : Vos requêtes passent directement par votre compte OpenRouter
- **Coûts Transparents** : Vous payez directement OpenRouter au tarif coûtant, sans marge
- **Pas de Limites** : Vous n'êtes limité que par votre budget OpenRouter
- **Contrôle Total** : Accès à tous les modèles disponibles sur votre compte OpenRouter

**Configuration :**
1. Créez un compte sur [OpenRouter](https://openrouter.ai) et obtenez une clé API
2. Dans Prompt Manager, allez dans **Settings > BYOK**
3. Cliquez sur **Configurer une Clé API**
4. Entrez votre clé OpenRouter (format `sk-or-v1-...`)
5. Testez la clé pour vérifier sa validité
6. Sauvegardez

:::tip[Sécurité]
Votre clé API est chiffrée avec AES-256-GCM avant d'être stockée. Seuls les 4 derniers caractères sont visibles dans l'interface pour identification.
:::

**Utilisation :**
Une fois configurée, vos exécutions utiliseront automatiquement votre clé BYOK. Le type de facturation "BYOK" sera affiché dans l'historique d'exécution.

**Gestion :**
- Vous pouvez mettre à jour votre clé à tout moment
- Vous pouvez supprimer votre clé pour revenir au mode SYSTEM
- La date de dernière mise à jour est affichée pour traçabilité
