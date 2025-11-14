# Development Setup Guide

## Quick Start

### 1. Install PostgreSQL

#### macOS
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Windows
Download and install from: https://www.postgresql.org/download/windows/

### 2. Create Database

```bash
# Access PostgreSQL
psql -U postgres

# Or on macOS with Homebrew
psql postgres
```

Then run:
```sql
CREATE DATABASE pricelist_db;
\c pricelist_db
```

Copy and paste the contents from `backend/config/db-setup.sql`, or:

```bash
psql -U postgres -d pricelist_db -f backend/config/db-setup.sql
```

### 3. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 4. Configure Environment

Create `backend/.env`:
```bash
cd backend
cp .env.example .env
```

Edit `.env` with your database credentials.

### 5. Run the Application

#### Terminal 1 - Backend
```bash
cd backend
npm start
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Open browser to http://localhost:3000

## Creating Additional Users

### Method 1: Using Node.js

Create a file `backend/create-user.js`:

```javascript
import bcrypt from 'bcryptjs';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

async function createUser(username, password, fullName, location) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (username, password, full_name, location) VALUES ($1, $2, $3, $4) RETURNING id, username',
      [username, hashedPassword, fullName, location]
    );
    
    console.log('User created:', result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await pool.end();
  }
}

// Usage
createUser('johndoe', 'securepass123', 'John Doe', 'Stockholm Office');
```

Run it:
```bash
node create-user.js
```

### Method 2: Using SQL

Generate hash online or using bcrypt, then:

```sql
INSERT INTO users (username, password, full_name, location) 
VALUES ('newuser', '$2a$10$hashedpasswordhere', 'Full Name', 'Location');
```

## Adding Custom Text Translations

```sql
-- Add new login text
INSERT INTO texts (page, key, language, value) 
VALUES ('login', 'welcomeMessage', 'en', 'Welcome back!');

INSERT INTO texts (page, key, language, value) 
VALUES ('login', 'welcomeMessage', 'sv', 'Välkommen tillbaka!');
```

## Adding Products

```sql
INSERT INTO products (article_no, product_service, in_price, price, unit, in_stock, description)
VALUES ('ART023', 'New Product', 100.00, 250.00, 'piece', 50, 'Product description');
```

## Testing

### Test Login API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Test Products API (with token)
```bash
curl http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Test Texts API
```bash
curl http://localhost:5000/api/texts/login?lang=en
```

## Common Issues

### Port Already in Use

**Backend (5000)**
```bash
# Find process
lsof -ti:5000

# Kill it
kill -9 $(lsof -ti:5000)

# Or change port in .env
PORT=5001
```

**Frontend (3000)**
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)
```

### Database Connection Error

1. Check PostgreSQL is running:
```bash
# macOS
brew services list

# Linux
sudo systemctl status postgresql
```

2. Verify credentials in `.env`
3. Test connection:
```bash
psql -U your_username -d pricelist_db
```

### CORS Errors

The backend already has CORS enabled. If you still see errors:
- Clear browser cache
- Check backend is running on port 5000
- Verify proxy settings in `frontend/vite.config.js`

## Project Structure

```
auth-pricelist-app/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Terms.jsx
│   │   │   └── Pricelist.jsx
│   │   ├── styles/
│   │   │   ├── Login.css
│   │   │   ├── Terms.css
│   │   │   └── Pricelist.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    ├── config/
    │   ├── database.js
    │   └── db-setup.sql
    ├── middleware/
    │   └── auth.js
    ├── routes/
    │   ├── auth.js
    │   ├── texts.js
    │   └── products.js
    ├── .env.example
    ├── server.js
    └── package.json
```

## Git Workflow

### Initialize Repository
```bash
cd auth-pricelist-app
git init
git add .
git commit -m "Initial commit"
```

### Daily Commits
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### .gitignore
Create `.gitignore` in the root:
```
node_modules/
.env
dist/
build/
.DS_Store
*.log
```

## Code Style Guidelines

### JavaScript
- Use ES6+ features
- Use const/let instead of var
- Use arrow functions
- Use async/await instead of promises
- Descriptive variable names
- Comments for complex logic

### CSS
- Use class names, not IDs for styling
- Mobile-first approach
- Consistent naming (kebab-case)
- Group related properties
- Use CSS variables for colors

### React
- Functional components only
- Use hooks (useState, useEffect)
- One component per file
- Props validation where appropriate
- Keep components focused and reusable

## Performance Tips

### Frontend
- Lazy load routes if needed
- Optimize images
- Minimize re-renders
- Use production build for deployment

### Backend
- Use connection pooling (already implemented)
- Add indexes to frequently queried fields
- Validate input data
- Use prepared statements (pg does this)

## Security Checklist

- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ SQL injection protection (parameterized queries)
- ✅ CORS configured
- ✅ Environment variables for secrets
- ✅ Input validation
- ⚠️ Add rate limiting for production
- ⚠️ Add HTTPS in production
- ⚠️ Add helmet.js for security headers

## Next Steps

1. Test all features locally
2. Push code to GitLab
3. Set up PostgreSQL database on server
4. Deploy backend
5. Deploy frontend
6. Configure domain and SSL
7. Test production deployment
8. Document credentials and URLs
