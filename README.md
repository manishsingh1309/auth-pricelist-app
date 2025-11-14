# Authentication and Price List Web Application

A full-stack web application with authentication and price list management features.

## Project Structure

```
auth-pricelist-app/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── assets/        # Static assets (images, etc.)
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── styles/        # CSS files
│   └── package.json
├── backend/               # Node.js + Express backend
│   ├── config/           # Database configuration
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   └── package.json
└── README.md
```

## Technology Stack

### Frontend
- **React**: v18.2.0
- **Vite**: v5.0.8
- **React Router DOM**: v6.20.0
- **JavaScript**: ES6+
- **CSS**: Vanilla CSS (no frameworks)

### Backend
- **Node.js**: v18+ (LTS)
- **Express**: v4.18.2
- **PostgreSQL**: v14+
- **JWT**: v9.0.2 (for authentication)
- **bcryptjs**: v2.4.3 (for password hashing)
- **JavaScript**: ES6+ with modules

## Features

1. **Login Page**
   - JWT-based authentication
   - Multi-language support (English/Swedish)
   - Responsive design (mobile, tablet, desktop)
   - Hamburger menu navigation

2. **Terms Page**
   - Multi-language support
   - Mobile portrait responsive
   - Content pulled from PostgreSQL database

3. **Price List Page**
   - Protected route (requires authentication)
   - Editable product fields
   - Real-time updates to database
   - 20+ sample products
   - Responsive design (all screen sizes)
   - Scrollable product table

## Prerequisites

- Node.js v18 or higher
- PostgreSQL v14 or higher
- npm or yarn package manager

## Installation

### 1. Clone or Download the Project

```bash
cd /Users/manishsinghchouhan1309/Desktop/auth-pricelist-app
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your PostgreSQL credentials:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pricelist_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### 3. Database Setup

Make sure PostgreSQL is running, then execute:

```bash
psql -U postgres -f config/db-setup.sql
```

Or manually:

```bash
psql -U postgres
```

Then copy and paste the contents of `config/db-setup.sql`.

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

**Important**: Add required images to `src/assets/images/`:
- `diamond.png` - Logo icon
- `GB.png` - British flag
- `SE.png` - Swedish flag  
- `sverige43.jpg` - Background image

See `frontend/src/assets/SETUP.md` for details.

## Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
npm start
```

The server will start on http://localhost:5000

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The application will be available at http://localhost:3000

## Default Login Credentials

**Username**: testuser  
**Password**: password123

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Texts (Multi-language)
- `GET /api/texts/:page?lang=en` - Get page texts

### Products (Protected)
- `GET /api/products` - Get all products
- `PUT /api/products/:id` - Update product field

## Database Schema

### Users Table
- id (SERIAL PRIMARY KEY)
- username (VARCHAR UNIQUE)
- password (VARCHAR - hashed)
- full_name (VARCHAR)
- location (VARCHAR)
- created_at (TIMESTAMP)

### Texts Table
- id (SERIAL PRIMARY KEY)
- page (VARCHAR)
- key (VARCHAR)
- language (VARCHAR)
- value (TEXT)
- created_at (TIMESTAMP)

### Products Table
- id (SERIAL PRIMARY KEY)
- article_no (VARCHAR)
- product_service (TEXT)
- in_price (DECIMAL)
- price (DECIMAL)
- unit (VARCHAR)
- in_stock (INTEGER)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## Responsive Breakpoints

- Mobile Portrait: < 480px
- Mobile Landscape: 481px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## External Assets

The application uses these external resources:
- Swedish Flag: https://storage.123fakturere.no/public/flags/SE.png
- British Flag: https://storage.123fakturere.no/public/flags/GB.png
- Background: https://storage.123fakturera.se/public/wallpapers/sverige43.jpg
- Logo: https://storage.123fakturera.se/public/icons/diamond.png

## Deployment

### Frontend Build

```bash
cd frontend
npm run build
```

The build files will be in the `dist` folder.

### Backend Deployment

1. Set environment variables on your server
2. Install dependencies: `npm install --production`
3. Start with PM2 or similar: `pm2 start server.js`

### Recommended Platforms

- **VM**: DigitalOcean, AWS EC2, Google Cloud, Azure
- **Free Options**: Render.com, Railway.app, Fly.io

## Creating a New User

To create a new user, use bcryptjs to hash the password:

```javascript
import bcrypt from 'bcryptjs';

const password = 'your_password';
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
```

Then insert into the database:

```sql
INSERT INTO users (username, password, full_name, location) 
VALUES ('newuser', 'hashed_password_here', 'User Name', 'Location');
```

# Authentication & Price List App

Full-stack web application with authentication and price list management.

## Tech Stack

**Frontend:** React 18.2, Vite 5.0.8, React Router 6.20  
**Backend:** Node.js 18+, Express 4.18.2  
**Database:** PostgreSQL 14+  
**Auth:** JWT 9.0.2, bcryptjs 2.4.3

## Features

- JWT authentication
- Multi-language support (EN/SV)
- Responsive design
- Protected routes
- Editable price list

## Quick Start

### Backend

```bash
cd backend
npm install
createdb pricelist_db
psql pricelist_db < config/db-setup.sql
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

**Login:** testuser / password123

## Environment

Create `backend/.env`:

```
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pricelist_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=change-this-secret
```

## Structure

```
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── assets/
│   └── package.json
└── backend/
    ├── routes/
    ├── config/
    └── package.json
```

## API

- `POST /api/auth/login` - Login
- `GET /api/texts/:page?lang=en` - Get texts
- `GET /api/products` - Get products
- `PUT /api/products/:id` - Update product

## License

MIT
