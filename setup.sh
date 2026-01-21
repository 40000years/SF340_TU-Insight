#!/bin/bash
# Complete Setup Script for Marketing Trend Analysis Application
# Run this script to automatically set up everything

set -e

echo "================================================"
echo "📊 Marketing Trend Analysis Setup"
echo "================================================"
echo ""

# Check prerequisites
echo "✓ Checking prerequisites..."

if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Download from https://golang.org/dl/"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Download from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed (comes with Node.js)"
    exit 1
fi

echo "✓ Go version: $(go version)"
echo "✓ Node version: $(node -v)"
echo "✓ npm version: $(npm -v)"
echo ""

# Setup Backend
echo "================================================"
echo "📦 Setting up Backend (Go)"
echo "================================================"
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "Downloading Go dependencies..."
go mod download

echo ""
echo "✓ Backend setup complete!"
echo "Run 'go run main.go' in backend/ directory"
echo ""

# Setup Frontend
echo "================================================"
echo "📦 Setting up Frontend (React)"
echo "================================================"
cd ../frontend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "Installing npm dependencies..."
npm install

echo ""
echo "✓ Frontend setup complete!"
echo "Run 'npm run dev' in frontend/ directory"
echo ""

# Summary
echo "================================================"
echo "✅ Setup Complete!"
echo "================================================"
echo ""
echo "📚 Next Steps:"
echo ""
echo "1. Open TWO terminal windows"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ cd backend"
echo "   $ go run main.go"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ cd frontend"
echo "   $ npm run dev"
echo ""
echo "2. Open browser:"
echo "   http://localhost:5173"
echo ""
echo "3. Register new account or login"
echo ""
echo "4. Create trend analysis and view dashboard"
echo ""
echo "📖 Documentation:"
echo "   - README.md - Full documentation"
echo "   - QUICK_START.md - Quick reference"
echo "   - ARCHITECTURE.md - Visual guide"
echo ""
echo "================================================"
