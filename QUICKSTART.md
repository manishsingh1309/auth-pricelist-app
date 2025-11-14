# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- npm package manager

## Installation Steps

### Option 1: Automatic Setup (macOS/Linux)

```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

**1. Install Backend Dependencies**
```bash
cd backend
npm install
```

**2. Configure Environment**
```bash
cd backend
cp .env.example .env
# Edit .env file with your PostgreSQL credentials
```

**3. Setup Database**
```bash
# Make sure PostgreSQL is running
psql -U postgres -f backend/config/db-setup.sql
```

**4. Install Frontend Dependencies**
```bash
cd frontend
npm install
```

## Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App opens at: http://localhost:3000

## Login Credentials

- **Username:** testuser
- **Password:** password123

## Testing the Application

1. Open http://localhost:3000
2. Login with credentials above
3. You'll be redirected to the price list
4. Try editing product fields
5. Test language switching
6. Visit http://localhost:3000/terms

## Creating New Users

```bash
cd backend
node create-user.js username password "Full Name" "Location"
```

Example:
```bash
node create-user.js johndoe mypass123 "John Doe" "Oslo Office"
```

## Troubleshooting

**Port already in use:**
```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

**Database connection failed:**
- Verify PostgreSQL is running
- Check credentials in backend/.env
- Test connection: `psql -U postgres -d pricelist_db`

## API Endpoints

- POST `/api/auth/login` - User login
- GET `/api/texts/:page?lang=en` - Get page texts
- GET `/api/products` - Get products (requires auth)
- PUT `/api/products/:id` - Update product (requires auth)

## Project Structure

```
auth-pricelist-app/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── pages/    # Login, Terms, Pricelist
│   │   ├── components/
│   │   └── styles/
│   └── package.json
├── backend/          # Node.js + Express
│   ├── config/      # Database setup
│   ├── routes/      # API routes
│   ├── middleware/  # Auth middleware
│   └── package.json
└── README.md
```

## Next Steps

1. ✅ Test all features locally
2. ✅ Push code to GitLab/GitHub
3. ✅ Deploy to VM or hosting platform
4. ✅ Configure domain and SSL
5. ✅ Share credentials with reviewer

## Documentation

- `README.md` - Main documentation
- `SETUP.md` - Detailed setup guide
- `DEPLOYMENT.md` - Deployment instructions
- `PROJECT_INFO.md` - Technical specifications

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review the detailed documentation
3. Verify all prerequisites are met
4. Check console logs for errors
