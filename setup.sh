#!/bin/bash

echo "🚀 Starting Authentication & Price List Application"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your database credentials!"
    echo ""
fi

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Edit backend/.env with your database credentials"
echo "3. Create the database: psql -U postgres -f backend/config/db-setup.sql"
echo "4. Run 'npm start' in backend/ directory (Terminal 1)"
echo "5. Run 'npm run dev' in frontend/ directory (Terminal 2)"
echo ""
echo "🌐 Application will be available at: http://localhost:3000"
echo "🔐 Default login: username=testuser, password=password123"
echo ""
