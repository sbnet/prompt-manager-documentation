# ⚡ Quick Start - Déploiement Documentation

Guide rapide en 3 étapes pour déployer la documentation.

## 📋 Prérequis

- ✅ Serveur avec Caddy installé
- ✅ DNS `docs.bytheprompt.com` pointant vers le serveur
- ✅ Secrets GitHub déjà configurés (`VPS_SSH_KEY`, `VPS_HOST`, `VPS_USERNAME`)

---

## 🚀 Étape 1 : Configuration Serveur (5 min)

### 1.1 Se connecter au serveur

```bash
ssh $VPS_USERNAME@$VPS_HOST
```

### 1.2 Créer le répertoire

```bash
mkdir -p /srv/prompt-manager/doc
chmod 755 /srv/prompt-manager/doc
```

### 1.3 Configurer Caddy

```bash
# Éditer le Caddyfile
sudo nano /etc/caddy/Caddyfile
```

**Ajouter à la fin :**

```caddy
docs.bytheprompt.com {
    root * /srv/prompt-manager/doc
    file_server
    encode gzip

    @static {
        path *.css *.js *.jpg *.jpeg *.png *.gif *.svg *.ico *.woff *.woff2
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    try_files {path} {path}/ /index.html

    log {
        output file /var/log/caddy/docs.bytheprompt.com.log
    }
}
```

**Sauvegarder :** `Ctrl+X`, puis `Y`, puis `Enter`

### 1.4 Recharger Caddy

```bash
# Valider la config
sudo caddy validate --config /etc/caddy/Caddyfile

# Recharger
sudo systemctl reload caddy

# Vérifier
sudo systemctl status caddy
```

✅ **Caddy est prêt !**

---

## 📤 Étape 2 : Déployer la Documentation (2 min)

### Via GitHub Actions

1. Aller sur GitHub : https://github.com/VOTRE_ORG/VOTRE_REPO
2. Cliquer sur **Actions**
3. Sélectionner **Deploy Documentation**
4. Cliquer sur **Run workflow** (bouton vert)
5. Attendre 2-3 minutes

✅ **Documentation déployée !**

---

## ✅ Étape 3 : Vérifier (1 min)

### 3.1 Tester le site

Ouvrir dans le navigateur :
```
https://docs.bytheprompt.com
```

### 3.2 Vérifier les fichiers (optionnel)

```bash
ssh $VPS_USERNAME@$VPS_HOST
ls -la /srv/prompt-manager/doc/
```

### 3.3 Vérifier les logs (optionnel)

```bash
sudo journalctl -u caddy -n 20
```

---

## 🎉 C'est Fini !

Votre documentation est maintenant en ligne sur :
**https://docs.bytheprompt.com**

---

## 🔄 Déploiements Futurs

Pour les prochaines mises à jour :

1. Modifier la doc dans `src/content/docs/`
2. GitHub Actions → Deploy Documentation → Run workflow
3. ✅ En ligne en 2 minutes

---

## ❓ Problèmes Courants

### Le site ne charge pas

```bash
# Vérifier Caddy
sudo systemctl status caddy

# Redémarrer si nécessaire
sudo systemctl restart caddy
```

### 404 Not Found

```bash
# Vérifier que les fichiers existent
ls -la /srv/prompt-manager/doc/

# Re-déployer via GitHub Actions
```

### HTTPS ne fonctionne pas

```bash
# Vérifier les logs Caddy
sudo journalctl -u caddy -f

# Ouvrir les ports si firewall actif
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## 📚 Documentation Complète

Pour plus de détails, consulter :
- [CADDY_SETUP.md](./CADDY_SETUP.md) - Configuration Caddy détaillée
- [README.md](./README.md) - Documentation du projet
- [Caddyfile.example](./Caddyfile.example) - Configuration Caddy de référence
