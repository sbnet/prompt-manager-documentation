# 🚀 Premier Déploiement - Checklist

Ce guide vous accompagne pour le premier déploiement de la documentation sur `https://docs.bytheprompt.com`.

## ✅ Pré-requis

### 1. Secrets & Variables GitHub (Déjà configurés)

Vérifier que ces valeurs existent dans GitHub :
- Aller sur votre repo GitHub
- Settings → Secrets and variables → Actions

**Secrets existants à réutiliser :**
- ✅ `VPS_SSH_KEY` - Clé SSH privée pour accéder au VPS

**Variables existantes à réutiliser :**
- ✅ `VPS_HOST` - Hostname/IP de votre serveur
- ✅ `VPS_USERNAME` - Nom d'utilisateur SSH

**Aucun nouveau secret ou variable n'est nécessaire !**

---

## 🖥️ Configuration Serveur (One-Time Setup)

### Étape 1 : Connexion SSH au Serveur

```bash
ssh $VPS_USERNAME@$VPS_HOST
```

### Étape 2 : Créer le Répertoire de Documentation

```bash
# Créer le répertoire
sudo mkdir -p /var/www/docs.bytheprompt.com

# Donner les permissions à votre utilisateur de déploiement
sudo chown -R $USER:www-data /var/www/docs.bytheprompt.com
sudo chmod 755 /var/www/docs.bytheprompt.com

# Ou utiliser ACL pour des permissions plus granulaires
sudo setfacl -R -m u:$USER:rwx /var/www/docs.bytheprompt.com
sudo setfacl -R -d -m u:$USER:rwx /var/www/docs.bytheprompt.com
```

### Étape 3 : Configurer Caddy

**Option A : Ajouter au Caddyfile principal**

```bash
# Éditer le Caddyfile
sudo nano /etc/caddy/Caddyfile
```

**Option B : Créer un fichier séparé (Recommandé)**

```bash
# Créer un nouveau fichier pour la doc
sudo nano /etc/caddy/conf.d/docs.bytheprompt.com.conf
```

**Contenu à ajouter :**

```caddy
# Documentation Site
docs.bytheprompt.com {
    root * /var/www/docs.bytheprompt.com
    file_server

    # Enable gzip compression
    encode gzip

    # Cache static assets
    @static {
        path *.css *.js *.jpg *.jpeg *.png *.gif *.svg *.ico *.woff *.woff2
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "DENY"
        X-XSS-Protection "1; mode=block"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # SPA fallback for Astro
    try_files {path} {path}/ /index.html

    # Logging
    log {
        output file /var/log/caddy/docs.bytheprompt.com.log
    }
}
```

**Valider et Recharger Caddy :**

```bash
# Tester la configuration
sudo caddy validate --config /etc/caddy/Caddyfile

# Recharger Caddy (sans interruption de service)
sudo systemctl reload caddy

# Vérifier le status
sudo systemctl status caddy

# Voir les logs en temps réel
sudo journalctl -u caddy -f
```

### Étape 4 : Vérifier DNS

Assurez-vous que le DNS pointe vers votre serveur :

```bash
# Tester la résolution DNS
dig docs.bytheprompt.com

# Devrait retourner l'IP de votre serveur
# A record: docs.bytheprompt.com. 300 IN A <VOTRE_IP>
```

**Si le DNS n'est pas configuré :**

Aller dans votre registrar de domaine et ajouter :
```
Type: A
Name: docs
Value: <IP_DE_VOTRE_SERVEUR>
TTL: 3600
```

---

## 🚀 Premier Déploiement

### Étape 1 : Tester le Build Localement (Recommandé)

```bash
# Sur votre machine locale
cd documentation

# Installer les dépendances
npm install

# Build
npm run build

# Vérifier que dist/ existe
ls -la dist/

# Prévisualiser
npm run preview
# Ouvrir http://localhost:4321
```

### Étape 2 : Déployer via GitHub Actions

1. **Aller sur GitHub** : https://github.com/VOTRE_USERNAME/VOTRE_REPO
2. **Cliquer sur l'onglet "Actions"**
3. **Sélectionner "Deploy Documentation"** dans la liste des workflows
4. **Cliquer sur "Run workflow"** (bouton à droite)
5. **Cliquer sur le bouton vert "Run workflow"**

### Étape 3 : Suivre l'Exécution

Le workflow va :
1. ✅ Checkout du code
2. ✅ Installation Node.js 20
3. ✅ `npm ci` dans `documentation/`
4. ✅ `npm run build` (génère `dist/`)
5. ✅ Setup SSH
6. ✅ Création du répertoire sur le serveur
7. ✅ Upload via SCP vers `/var/www/docs.bytheprompt.com/`
8. ✅ Configuration des permissions
9. ✅ Affichage du résumé

**Durée estimée :** 2-3 minutes

### Étape 4 : Vérification

Une fois le workflow terminé :

**1. Tester le site :**
```
https://docs.bytheprompt.com
```

**2. Vérifier les fichiers sur le serveur :**
```bash
ssh $VPS_USERNAME@$VPS_HOST
ls -la /var/www/docs.bytheprompt.com/

# Vous devriez voir :
# index.html
# _astro/
# assets/
# etc.
```

**3. Vérifier les logs Caddy :**
```bash
sudo tail -f /var/log/caddy/docs.bytheprompt.com.log
```

**4. Test de performance :**
```bash
# Test de temps de chargement
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://docs.bytheprompt.com

# Test de compression gzip
curl -H "Accept-Encoding: gzip" -I https://docs.bytheprompt.com
# Devrait contenir : Content-Encoding: gzip
```

---

## 🎉 Félicitations !

Si tout fonctionne, votre documentation est maintenant en ligne sur :
**https://docs.bytheprompt.com**

---

## ❓ Troubleshooting

### Problème 1 : 502 Bad Gateway

**Cause :** Caddy n'est pas démarré ou la config est invalide

**Solution :**
```bash
sudo systemctl status caddy
sudo systemctl start caddy
sudo journalctl -u caddy -f
```

### Problème 2 : 404 Not Found

**Cause :** Les fichiers ne sont pas uploadés ou le chemin est incorrect

**Solution :**
```bash
# Vérifier que les fichiers existent
ls -la /var/www/docs.bytheprompt.com/

# Vérifier les permissions
sudo chown -R www-data:www-data /var/www/docs.bytheprompt.com
sudo chmod -R 755 /var/www/docs.bytheprompt.com
```

### Problème 3 : Permission Denied lors de SCP

**Cause :** Votre utilisateur n'a pas les droits d'écriture

**Solution :**
```bash
# Donner les permissions via ACL
sudo setfacl -R -m u:$USER:rwx /var/www/docs.bytheprompt.com
sudo setfacl -R -d -m u:$USER:rwx /var/www/docs.bytheprompt.com

# Ou ajouter votre utilisateur au groupe www-data
sudo usermod -aG www-data $USER
# Puis se déconnecter/reconnecter pour appliquer
```

### Problème 4 : Le Workflow GitHub Échoue

**Vérifier :**
1. Les secrets `VPS_SSH_KEY`, `VPS_HOST`, `VPS_USERNAME` sont bien définis
2. La clé SSH est valide et a accès au serveur
3. Le répertoire `/var/www/docs.bytheprompt.com` existe
4. Les permissions sont correctes

**Tester manuellement la connexion SSH :**
```bash
ssh -i ~/.ssh/votre_cle $VPS_USERNAME@$VPS_HOST "ls -la /var/www/"
```

### Problème 5 : Certificat SSL Invalide

**Cause :** Caddy n'a pas pu obtenir le certificat Let's Encrypt

**Solution :**
```bash
# Vérifier les logs Caddy
sudo journalctl -u caddy -f

# Redémarrer Caddy pour forcer l'obtention du certificat
sudo systemctl restart caddy

# Vérifier les ports 80 et 443
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo netstat -tulpn | grep :443
```

---

## 📋 Checklist Finale

- [ ] Serveur accessible via SSH
- [ ] Répertoire `/var/www/docs.bytheprompt.com/` créé
- [ ] Permissions configurées (755 répertoires, 644 fichiers)
- [ ] Caddy configuré pour `docs.bytheprompt.com`
- [ ] Caddy redémarré/rechargé
- [ ] DNS configuré (A record vers l'IP du serveur)
- [ ] Workflow GitHub Actions exécuté avec succès
- [ ] Site accessible sur https://docs.bytheprompt.com
- [ ] HTTPS/SSL fonctionne (certificat Let's Encrypt)
- [ ] Compression gzip active
- [ ] Logs Caddy sans erreurs

---

## 🔄 Déploiements Futurs

Pour les prochains déploiements, il suffira de :

1. Modifier la documentation dans `documentation/src/content/docs/`
2. Commit et push vers GitHub
3. Aller sur Actions → Deploy Documentation → Run workflow
4. Attendre 2-3 minutes
5. Rafraîchir https://docs.bytheprompt.com

**C'est tout !** Plus besoin de configuration serveur, tout est automatisé.

---

## 📞 Support

En cas de problème persistant :

1. Vérifier les logs du workflow GitHub Actions
2. Vérifier les logs Caddy : `sudo journalctl -u caddy -f`
3. Tester manuellement le SCP : `scp test.txt $VPS_USERNAME@$VPS_HOST:/var/www/docs.bytheprompt.com/`
4. Consulter [DEPLOYMENT_GUIDE.md](../.github/workflows/DEPLOYMENT_GUIDE.md) pour plus de détails
