# Prompt Manager Documentation

Documentation utilisateur bilingue (FR/EN) pour Prompt Manager, construite avec [Astro](https://astro.build) et [Starlight](https://starlight.astro.build/).

## 🌐 Site en Ligne

**Production:** [https://docs.bytheprompt.com](https://docs.bytheprompt.com)

## 📚 Structure du Projet

```
documentation/
├── src/
│   ├── content/
│   │   └── docs/
│   │       ├── fr/              # Documentation française
│   │       │   └── user/        # Guide utilisateur
│   │       └── en/              # Documentation anglaise
│   │           └── user/        # User guide
│   ├── assets/                  # Images et assets statiques
│   └── styles/                  # Styles personnalisés
├── public/                      # Assets publics (favicon, etc.)
├── astro.config.mjs             # Configuration Astro/Starlight
└── package.json
```

## 🚀 Développement Local

### Prérequis

- Node.js 20+
- npm

### Installation

```bash
cd documentation
npm install
```

### Commandes de Développement

| Commande | Action |
|----------|--------|
| `npm run dev` | Démarre le serveur de développement sur `localhost:4321` |
| `npm run build` | Build le site de production dans `./dist/` |
| `npm run preview` | Prévisualise le build en local avant déploiement |

### Développement

```bash
# Lancer le serveur de dev avec hot reload
npm run dev

# Le site est accessible sur http://localhost:4321
# Les changements sont automatiquement rechargés
```

## 📝 Ajouter du Contenu

### Créer une Nouvelle Page

1. Créer un fichier `.md` ou `.mdx` dans le dossier approprié :
   - Français : `src/content/docs/fr/user/`
   - Anglais : `src/content/docs/en/user/`

2. Ajouter le frontmatter YAML :
   ```markdown
   ---
   title: Titre de la Page
   description: Description courte
   sidebar:
     order: 5
   ---

   Contenu de la page...
   ```

3. La page apparaît automatiquement dans la sidebar

### Utiliser les Composants Starlight

```markdown
import { Icon } from '@astrojs/starlight/components';

<Icon name="seti:settings" />

:::tip[Astuce]
Contenu de l'astuce
:::

:::note[Note]
Information importante
:::

:::caution[Attention]
Avertissement
:::
```

## 🚢 Déploiement

Le déploiement se fait via GitHub Actions vers `docs.bytheprompt.com`.

### Déploiement Manuel

1. Aller dans **Actions** sur GitHub
2. Sélectionner le workflow **Deploy Documentation**
3. Cliquer sur **Run workflow**

Le workflow :
1. ✅ Build la documentation (`npm run build`)
2. ✅ Upload vers `/var/www/docs.bytheprompt.com/`
3. ✅ Configure les permissions
4. ✅ Disponible sur https://docs.bytheprompt.com

### Déploiement Local de Test

```bash
# Build
npm run build

# Prévisualiser
npm run preview

# Le site est accessible sur http://localhost:4321
```

## 🔧 Configuration

### Langues

Les langues sont configurées dans `astro.config.mjs` :

```javascript
locales: {
  fr: { label: 'Français', lang: 'fr' },
  en: { label: 'English', lang: 'en' },
}
defaultLocale: 'fr'
```

### Sidebar

La sidebar est générée automatiquement à partir de la structure des dossiers :

```javascript
sidebar: [
  {
    label: 'Guide Utilisateur',
    autogenerate: { directory: 'fr/user' },
  },
  {
    label: 'User Guide',
    autogenerate: { directory: 'en/user' },
  },
]
```

L'ordre des pages est défini par `sidebar.order` dans le frontmatter.

## 📖 Documentation Disponible

### Français (FR)
- ✅ Introduction
- ✅ Premiers Pas
- ✅ Catégories
- ✅ Gestion des Prompts
- ✅ Exécution & Tests
- ✅ Échantillons de Référence (Golden Samples)
- ✅ Plans & Facturation
- ✅ Analytiques & Suivi
- ✅ Intégration API

### Anglais (EN)
- ✅ Introduction
- ✅ Getting Started
- ✅ Categories
- ✅ Prompt Management
- ✅ Execution & Testing
- ✅ Golden Samples
- ✅ Plans & Billing
- ✅ Analytics & Tracking
- ✅ API Integration

## 🎨 Personnalisation

### Thème et Couleurs

Modifier `astro.config.mjs` pour personnaliser les couleurs :

```javascript
starlight({
  customCss: ['./src/styles/custom.css'],
  // ...
})
```

### Logo

Placer le logo dans `src/assets/` et référencer dans la config.

## 🔍 Recherche

Starlight inclut une recherche full-text automatique (Pagefind) dans le build de production.

## 📊 Analytics

Pour ajouter des analytics (Google Analytics, Plausible, etc.), ajouter le script dans `astro.config.mjs`.

## 🆘 Dépannage

### Le serveur de dev ne démarre pas

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Le build échoue

```bash
# Vérifier la syntaxe des fichiers .md
npm run build -- --verbose
```

### Les changements ne sont pas visibles

1. Vérifier que le serveur de dev est lancé
2. Hard refresh du navigateur (Ctrl+Shift+R)
3. Redémarrer le serveur de dev

## 📚 Ressources

- [Documentation Starlight](https://starlight.astro.build/)
- [Documentation Astro](https://docs.astro.build)
- [Guide de Déploiement](../.github/workflows/DEPLOYMENT_GUIDE.md)
- [Configuration Caddy](./Caddyfile.example)

## 🤝 Contribution

1. Créer une branche depuis `main`
2. Faire les modifications dans `documentation/src/content/docs/`
3. Tester localement avec `npm run dev`
4. Commit et push
5. Créer une Pull Request
6. Une fois mergée, déployer manuellement via GitHub Actions
