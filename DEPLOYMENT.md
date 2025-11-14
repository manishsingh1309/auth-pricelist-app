# Deployment Guide

## Deploying to a Linux VM

### Prerequisites
- Linux VM (Ubuntu 20.04 or later recommended)
- Root or sudo access
- Domain name (optional)

### Step 1: Server Setup

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install nginx (for reverse proxy)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 2: PostgreSQL Setup

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE pricelist_db;
CREATE USER pricelist_user WITH PASSWORD 'strong_password_here';
GRANT ALL PRIVILEGES ON DATABASE pricelist_db TO pricelist_user;
\q
```

### Step 3: Upload Project Files

```bash
# Create application directory
sudo mkdir -p /var/www/pricelist-app
sudo chown $USER:$USER /var/www/pricelist-app

# Upload files via scp, git, or FTP
# Example with git:
cd /var/www/pricelist-app
git clone <your-repo-url> .
```

### Step 4: Backend Setup

```bash
cd /var/www/pricelist-app/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
```

Add your production environment variables:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pricelist_db
DB_USER=pricelist_user
DB_PASSWORD=strong_password_here
JWT_SECRET=very-strong-random-secret-key
NODE_ENV=production
```

```bash
# Setup database
sudo -u postgres psql -d pricelist_db -f config/db-setup.sql

# Start backend with PM2
pm2 start server.js --name pricelist-backend
pm2 save
pm2 startup
```

### Step 5: Frontend Setup

```bash
cd /var/www/pricelist-app/frontend

# Install dependencies
npm install

# Build for production
npm run build
```

### Step 6: Nginx Configuration

```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/pricelist-app
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        root /var/www/pricelist-app/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/pricelist-app /etc/nginx/sites-enabled/

# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### Step 7: Firewall Setup

```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

### Step 8: SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Deploying to Render.com (Free Alternative)

### Backend on Render

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure:
   - **Name**: pricelist-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add environment variables in the dashboard
6. Click "Create Web Service"

### Database on Render

1. Click "New +" → "PostgreSQL"
2. Name it "pricelist-db"
3. Free tier is sufficient
4. Copy the internal database URL
5. Add to backend environment variables

### Frontend on Render

1. Click "New +" → "Static Site"
2. Connect your Git repository
3. Configure:
   - **Name**: pricelist-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist
4. Click "Create Static Site"

## Environment Variables Checklist

### Backend
- ✅ PORT
- ✅ DB_HOST
- ✅ DB_PORT
- ✅ DB_NAME
- ✅ DB_USER
- ✅ DB_PASSWORD
- ✅ JWT_SECRET
- ✅ NODE_ENV (production)

## Post-Deployment Checklist

- [ ] Database is set up and accessible
- [ ] Backend server is running
- [ ] Frontend is built and served
- [ ] API endpoints are accessible
- [ ] Login functionality works
- [ ] JWT authentication works
- [ ] Products can be fetched and updated
- [ ] SSL certificate is installed (if applicable)
- [ ] Firewall is configured
- [ ] Domain is pointed to server
- [ ] PM2 is configured to restart on reboot
- [ ] Database backups are configured

## Monitoring

```bash
# View backend logs
pm2 logs pricelist-backend

# Check status
pm2 status

# Monitor resources
pm2 monit

# Restart if needed
pm2 restart pricelist-backend
```

## Troubleshooting

### Backend won't start
```bash
pm2 logs pricelist-backend
# Check for errors in environment variables or database connection
```

### Database connection failed
```bash
# Test PostgreSQL connection
sudo -u postgres psql -d pricelist_db
# Verify credentials in .env file
```

### Nginx errors
```bash
# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t
```

### CORS issues
- Ensure backend CORS is configured correctly
- Check that API_URL in frontend matches backend URL

## Backup

```bash
# Backup database
sudo -u postgres pg_dump pricelist_db > backup_$(date +%Y%m%d).sql

# Backup files
tar -czf pricelist-backup-$(date +%Y%m%d).tar.gz /var/www/pricelist-app
```

## Update Deployment

```bash
# Pull latest changes
cd /var/www/pricelist-app
git pull

# Backend
cd backend
npm install
pm2 restart pricelist-backend

# Frontend
cd ../frontend
npm install
npm run build
```
