# 🔧 Configuration Caddy pour la Documentation

Guide étape par étape pour configurer Caddy et servir la documentation sur `https://docs.bytheprompt.com`.

## 📍 Informations Importantes

- **Chemin de la documentation :** `/srv/prompt-manager/doc`
- **Domaine :** `docs.bytheprompt.com`
- **Serveur web :** Caddy (déjà installé)
- **HTTPS :** Automatique via Let's Encrypt (géré par Caddy)

---

## 🚀 Étape 1 : Se Connecter au Serveur

```bash
ssh $VPS_USERNAME@$VPS_HOST
```

---

## 📁 Étape 2 : Créer le Répertoire de Documentation

```bash
# Créer le répertoire
sudo mkdir -p /srv/prompt-manager/doc

# Donner les permissions à votre utilisateur
sudo chown -R $USER:$USER /srv/prompt-manager/doc
sudo chmod -R 755 /srv/prompt-manager/doc

# Vérifier
ls -la /srv/prompt-manager/
```

**Résultat attendu :**
```
drwxr-xr-x  2 votre-user votre-user  4096 Jan 31 16:00 doc
```

---

## 📝 Étape 3 : Configurer Caddy

### Option A : Fichier de Configuration Unique (Recommandé)

```bash
# Éditer le Caddyfile principal
sudo nano /etc/caddy/Caddyfile
```

**Ajouter cette configuration à la fin du fichier :**

```caddy
# Documentation Site
docs.bytheprompt.com {
    # Servir les fichiers statiques
    root * /srv/prompt-manager/doc
    file_server

    # Activer la compression gzip
    encode gzip

    # Cache pour les assets statiques
    @static {
        path *.css *.js *.jpg *.jpeg *.png *.gif *.svg *.ico *.woff *.woff2 *.ttf *.eot
    }
    header @static {
        Cache-Control "public, max-age=31536000, immutable"
    }

    # Cache pour les fichiers HTML (plus court)
    @html {
        path *.html
    }
    header @html {
        Cache-Control "public, max-age=3600, must-revalidate"
    }

    # Headers de sécurité
    header {
        # Force HTTPS
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

        # Empêche le sniffing MIME
        X-Content-Type-Options "nosniff"

        # Protection contre le clickjacking
        X-Frame-Options "DENY"

        # Protection XSS
        X-XSS-Protection "1; mode=block"

        # Politique de referrer
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # Fallback pour SPA (Astro/Starlight)
    try_files {path} {path}/ /index.html

    # Logging
    log {
        output file /var/log/caddy/docs.bytheprompt.com.log {
            roll_size 100mb
            roll_keep 5
            roll_keep_for 720h
        }
        format json
        level INFO
    }
}

# Redirection HTTP → HTTPS (automatique avec Caddy, mais explicite)
http://docs.bytheprompt.com {
    redir https://docs.bytheprompt.com{uri} permanent
}
```

### Option B : Fichier de Configuration Séparé

Si vous préférez séparer les configurations :

```bash
# Créer le répertoire pour les configs
sudo mkdir -p /etc/caddy/sites

# Créer le fichier pour la doc
sudo nano /etc/caddy/sites/docs.bytheprompt.com
```

**Contenu du fichier :**
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

**Puis inclure dans le Caddyfile principal :**
```bash
sudo nano /etc/caddy/Caddyfile
```

**Ajouter à la fin :**
```caddy
import sites/*
```

---

## ✅ Étape 4 : Valider et Redémarrer Caddy

### Validation

```bash
# Tester la configuration
sudo caddy validate --config /etc/caddy/Caddyfile
```

**Résultat attendu :**
```
Valid configuration
```

### Redémarrage

```bash
# Recharger Caddy (sans interruption)
sudo systemctl reload caddy

# Ou redémarrer (avec courte interruption)
sudo systemctl restart caddy

# Vérifier le statut
sudo systemctl status caddy
```

**Résultat attendu :**
```
● caddy.service - Caddy
     Loaded: loaded (/lib/systemd/system/caddy.service; enabled; vendor preset: enabled)
     Active: active (running) since...
```

---

## 🌐 Étape 5 : Vérifier le DNS

```bash
# Tester la résolution DNS
dig docs.bytheprompt.com

# Ou avec nslookup
nslookup docs.bytheprompt.com
```

**Résultat attendu :**
```
;; ANSWER SECTION:
docs.bytheprompt.com. 300 IN A <IP_DE_VOTRE_SERVEUR>
```

### Si le DNS n'est pas configuré

Ajoutez un enregistrement A dans votre DNS :

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | docs | `<IP_SERVEUR>` | 3600 |

**Attendre 1-5 minutes pour la propagation DNS.**

---

## 🧪 Étape 6 : Tester la Configuration

### 1. Créer un Fichier de Test

```bash
# Créer un fichier index.html temporaire
echo "<h1>Documentation Test</h1><p>Caddy fonctionne correctement!</p>" > /srv/prompt-manager/doc/index.html
```

### 2. Tester depuis le Serveur

```bash
# Test local
curl -I http://localhost

# Test via le domaine (si DNS configuré)
curl -I https://docs.bytheprompt.com
```

**Résultat attendu :**
```
HTTP/2 200
content-type: text/html
...
```

### 3. Tester depuis votre Navigateur

Ouvrir : `https://docs.bytheprompt.com`

Vous devriez voir : **"Documentation Test"**

---

## 📊 Étape 7 : Vérifier les Logs

```bash
# Logs Caddy en temps réel
sudo journalctl -u caddy -f

# Logs spécifiques à la doc
sudo tail -f /var/log/caddy/docs.bytheprompt.com.log
```

---

## 🔍 Vérifications Post-Configuration

### 1. HTTPS Fonctionne

```bash
curl -I https://docs.bytheprompt.com
```

Devrait retourner `HTTP/2 200` (pas d'erreur SSL)

### 2. Compression Activée

```bash
curl -H "Accept-Encoding: gzip" -I https://docs.bytheprompt.com
```

Devrait contenir : `Content-Encoding: gzip`

### 3. Headers de Sécurité

```bash
curl -I https://docs.bytheprompt.com | grep -i "strict-transport-security"
```

Devrait retourner : `Strict-Transport-Security: max-age=31536000...`

### 4. Redirection HTTP → HTTPS

```bash
curl -I http://docs.bytheprompt.com
```

Devrait retourner : `HTTP/1.1 301 Moved Permanently` avec `Location: https://...`

---

## 🚀 Étape 8 : Déployer la Documentation

Maintenant que Caddy est configuré, déployez la documentation :

1. **Via GitHub Actions** (recommandé) :
   - Aller sur GitHub → Actions
   - Sélectionner "Deploy Documentation"
   - Cliquer sur "Run workflow"

2. **Manuellement** (pour tester) :
   ```bash
   # Sur votre machine locale
   cd documentation
   npm run build

   # Uploader vers le serveur
   scp -r dist/* $VPS_USERNAME@$VPS_HOST:/srv/prompt-manager/doc/
   ```

---

## 🛠️ Troubleshooting

### Problème : 502 Bad Gateway

**Cause :** Caddy n'est pas démarré

**Solution :**
```bash
sudo systemctl start caddy
sudo systemctl status caddy
```

### Problème : 404 Not Found

**Cause :** Fichiers non uploadés ou chemin incorrect

**Solution :**
```bash
# Vérifier que les fichiers existent
ls -la /srv/prompt-manager/doc/

# Vérifier le Caddyfile
sudo caddy validate --config /etc/caddy/Caddyfile
```

### Problème : Certificat SSL Invalide

**Cause :** Caddy n'a pas pu obtenir le certificat Let's Encrypt

**Solution :**
```bash
# Vérifier les logs
sudo journalctl -u caddy -n 50

# Vérifier que les ports 80 et 443 sont ouverts
sudo ss -tulpn | grep :443
sudo ss -tulpn | grep :80

# Si firewall actif
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Redémarrer Caddy
sudo systemctl restart caddy
```

### Problème : DNS ne Résout Pas

**Cause :** DNS non configuré ou propagation incomplète

**Solution :**
```bash
# Tester avec dig
dig docs.bytheprompt.com

# Attendre 5-10 minutes
# Vider le cache DNS local
sudo systemd-resolve --flush-caches
```

---

## 📋 Checklist Finale

- [ ] Répertoire `/srv/prompt-manager/doc` créé
- [ ] Permissions correctes (755 pour dossiers, 644 pour fichiers)
- [ ] Caddy configuré avec le bloc `docs.bytheprompt.com`
- [ ] Configuration Caddy validée (`caddy validate`)
- [ ] Caddy redémarré (`systemctl reload caddy`)
- [ ] DNS configuré (A record pointant vers le serveur)
- [ ] Fichier de test créé et accessible
- [ ] HTTPS fonctionne (certificat Let's Encrypt obtenu)
- [ ] Compression gzip activée
- [ ] Headers de sécurité présents
- [ ] Logs accessibles et sans erreurs

---

## 📚 Commandes Utiles

| Action | Commande |
|--------|----------|
| **Voir la config Caddy** | `sudo cat /etc/caddy/Caddyfile` |
| **Valider la config** | `sudo caddy validate --config /etc/caddy/Caddyfile` |
| **Recharger Caddy** | `sudo systemctl reload caddy` |
| **Redémarrer Caddy** | `sudo systemctl restart caddy` |
| **Status Caddy** | `sudo systemctl status caddy` |
| **Logs en temps réel** | `sudo journalctl -u caddy -f` |
| **Logs de la doc** | `sudo tail -f /var/log/caddy/docs.bytheprompt.com.log` |
| **Test local** | `curl -I https://docs.bytheprompt.com` |
| **Test compression** | `curl -H "Accept-Encoding: gzip" -I https://docs.bytheprompt.com` |

---

## ✅ Prochaines Étapes

Une fois Caddy configuré et fonctionnel :

1. **Déployer la vraie documentation** via GitHub Actions
2. **Vérifier** que `https://docs.bytheprompt.com` affiche correctement
3. **Monitorer** les logs pendant quelques minutes
4. **Partager** le lien de la doc avec votre équipe

---

**Votre documentation sera accessible 24/7 avec HTTPS automatique grâce à Caddy ! 🎉**
