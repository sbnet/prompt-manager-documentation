# Documentation Deployment Guide

## 📋 Overview

This guide explains how to deploy the documentation to `https://docs.bytheprompt.com` using the GitHub Actions workflow.

## 🚀 Prerequisites

### 1. GitHub Secrets & Variables

The workflow uses existing secrets and variables:

| Type | Name | Value | Status |
|------|------|-------|--------|
| **Secret** | `VPS_SSH_KEY` | SSH private key | ✅ Already configured |
| **Variable** | `VPS_HOST` | Server hostname/IP | ✅ Already configured |
| **Variable** | `VPS_USERNAME` | SSH user | ✅ Already configured |

**No new secrets needed!** The workflow reuses your existing VPS credentials.

### 2. Server Directory Structure

The documentation will be deployed to:
```
/var/www/docs.bytheprompt.com/
```

The workflow automatically:
- Creates the directory if it doesn't exist
- Sets proper permissions (644 for files, 755 for directories)
- Sets ownership to `www-data:www-data`

### 3. Caddy Configuration

Add this to your Caddyfile (usually `/etc/caddy/Caddyfile`):

```caddy
# Documentation Site
docs.bytheprompt.com {
    root * /var/www/docs.bytheprompt.com
    file_server

    # Enable compression
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

    # SPA fallback for Astro (if using client-side routing)
    try_files {path} {path}/ /index.html

    # Logging
    log {
        output file /var/log/caddy/docs.bytheprompt.com.log
    }
}
```

**Apply the configuration:**
```bash
# Test the configuration
sudo caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy (no downtime)
sudo systemctl reload caddy

# Or restart if needed
sudo systemctl restart caddy
```

### 4. DNS Configuration

Ensure you have an A or CNAME record pointing to your server:

```
Type: A
Name: docs
Value: <YOUR_SERVER_IP>
TTL: 3600
```

Or if using a CNAME:
```
Type: CNAME
Name: docs
Value: bytheprompt.com
TTL: 3600
```

## 🔧 Manual Setup (First Time Only)

If the workflow fails on first run, you may need to create the directory manually:

```bash
# SSH into your server
ssh ${{ vars.VPS_USERNAME }}@${{ vars.VPS_HOST }}

# Create the directory
sudo mkdir -p /var/www/docs.bytheprompt.com

# Set ownership
sudo chown -R www-data:www-data /var/www/docs.bytheprompt.com

# Set permissions
sudo chmod 755 /var/www/docs.bytheprompt.com

# Ensure your deploy user can write to it (if needed)
# Option 1: Add deploy user to www-data group
sudo usermod -aG www-data <your-deploy-user>

# Option 2: Set ACL permissions
sudo setfacl -R -m u:<your-deploy-user>:rwx /var/www/docs.bytheprompt.com
sudo setfacl -R -d -m u:<your-deploy-user>:rwx /var/www/docs.bytheprompt.com
```

## 📝 Deployment Process

### Deploy via GitHub Actions

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. Select **Deploy Documentation** workflow
4. Click **Run workflow**
5. Click **Run workflow** button (green)

The workflow will:
1. ✅ Checkout code
2. ✅ Install Node.js dependencies
3. ✅ Build documentation (`npm run build`)
4. ✅ Setup SSH connection
5. ✅ Upload files to `/var/www/docs.bytheprompt.com/`
6. ✅ Set proper permissions
7. ✅ Display deployment summary

**Deployment time:** ~2-3 minutes

### Verify Deployment

After deployment:

1. **Check the website:**
   ```
   https://docs.bytheprompt.com
   ```

2. **Check server files:**
   ```bash
   ssh ${{ vars.VPS_USERNAME }}@${{ vars.VPS_HOST }}
   ls -la /var/www/docs.bytheprompt.com/
   ```

3. **Check Caddy logs:**
   ```bash
   sudo tail -f /var/log/caddy/docs.bytheprompt.com.log
   ```

## 🔍 Troubleshooting

### Issue: Permission Denied

**Problem:** SCP fails with permission denied

**Solution:**
```bash
# Ensure deploy user has write permissions
sudo setfacl -R -m u:${{ vars.VPS_USERNAME }}:rwx /var/www/docs.bytheprompt.com
```

### Issue: 404 Not Found

**Problem:** Documentation site shows 404

**Solutions:**
1. Check if files were uploaded:
   ```bash
   ls -la /var/www/docs.bytheprompt.com/
   ```

2. Check Caddy configuration:
   ```bash
   sudo caddy validate --config /etc/caddy/Caddyfile
   ```

3. Restart Caddy:
   ```bash
   sudo systemctl restart caddy
   ```

### Issue: SSL Certificate Error

**Problem:** HTTPS not working

**Solution:**
Caddy automatically provisions Let's Encrypt certificates. If it fails:

```bash
# Check Caddy status
sudo systemctl status caddy

# Check Caddy logs
sudo journalctl -u caddy -f

# Ensure ports 80 and 443 are open
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Issue: Build Fails in GitHub Actions

**Problem:** `npm run build` fails

**Solutions:**
1. Test build locally:
   ```bash
   cd documentation
   npm ci
   npm run build
   ```

2. Check build logs in GitHub Actions

3. Ensure `package-lock.json` is committed

## 📊 Monitoring

### Check Deployment Status

**GitHub Actions:**
- View workflow runs: `Actions` → `Deploy Documentation`
- Check deployment summary in each run

**Server Side:**
```bash
# Check last modified time
ls -lt /var/www/docs.bytheprompt.com/ | head

# Check Caddy access logs
sudo tail -f /var/log/caddy/docs.bytheprompt.com.log
```

### Performance

**Test page load speed:**
```bash
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://docs.bytheprompt.com
```

**Test compression:**
```bash
curl -H "Accept-Encoding: gzip" -I https://docs.bytheprompt.com
```

## 🔄 Rollback

If you need to rollback to a previous version:

1. Keep a backup before deploying:
   ```bash
   ssh ${{ vars.VPS_USERNAME }}@${{ vars.VPS_HOST }}
   sudo cp -r /var/www/docs.bytheprompt.com /var/www/docs.bytheprompt.com.backup-$(date +%Y%m%d-%H%M%S)
   ```

2. Restore from backup:
   ```bash
   sudo rm -rf /var/www/docs.bytheprompt.com
   sudo cp -r /var/www/docs.bytheprompt.com.backup-TIMESTAMP /var/www/docs.bytheprompt.com
   sudo chown -R www-data:www-data /var/www/docs.bytheprompt.com
   ```

## 📈 Best Practices

1. **Test locally before deploying:**
   ```bash
   cd documentation
   npm run build
   npm run preview
   ```

2. **Review changes in Pull Requests**

3. **Deploy during low-traffic periods**

4. **Keep backups of previous deployments**

5. **Monitor logs after deployment**

## 🎯 Quick Reference

| Action | Command |
|--------|---------|
| **Deploy** | GitHub Actions → Deploy Documentation workflow |
| **View site** | https://docs.bytheprompt.com |
| **Check files** | `ls -la /var/www/docs.bytheprompt.com/` |
| **Reload Caddy** | `sudo systemctl reload caddy` |
| **View logs** | `sudo tail -f /var/log/caddy/docs.bytheprompt.com.log` |
| **Test build** | `cd documentation && npm run build` |

## 🆘 Support

If you encounter issues:

1. Check GitHub Actions logs
2. Check server logs: `sudo journalctl -u caddy -f`
3. Verify DNS: `dig docs.bytheprompt.com`
4. Test connectivity: `curl -I https://docs.bytheprompt.com`
