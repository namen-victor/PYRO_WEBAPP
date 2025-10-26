#!/bin/bash

# PyroSolutions Inc. - Local Development Setup Script
# This script helps new developers set up their local environment

set -e  # Exit on error

echo "🚀 PyroSolutions Inc. - Local Development Setup"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "Checking for Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
echo "Checking for npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm found: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found. Please install npm."
    exit 1
fi

# Check if Firebase CLI is installed
echo "Checking for Firebase CLI..."
if command -v firebase &> /dev/null; then
    FIREBASE_VERSION=$(firebase --version)
    echo -e "${GREEN}✓${NC} Firebase CLI found: $FIREBASE_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Firebase CLI not found."
    echo "Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Check if Git is installed
echo "Checking for Git..."
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version | cut -d" " -f3)
    echo -e "${GREEN}✓${NC} Git found: $GIT_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Git not found, but it's not critical for setup."
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "⚙️  Setting up environment variables..."

# Copy env.example to .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    cp env.example .env.local
    echo -e "${GREEN}✓${NC} Created .env.local from env.example"
else
    echo -e "${YELLOW}⚠${NC} .env.local already exists, skipping..."
fi

echo ""
echo -e "${YELLOW}⚠ IMPORTANT:${NC} You need to fill in your Firebase credentials in .env.local"
echo ""

# Check if Firebase project is logged in
echo "Checking Firebase authentication..."
if firebase projects:list &> /dev/null; then
    echo -e "${GREEN}✓${NC} Firebase CLI is authenticated"
    echo ""
    echo "Available Firebase projects:"
    firebase projects:list --json | grep '"projectId"' | cut -d'"' -f4 || echo "No projects found"
else
    echo -e "${YELLOW}⚠${NC} Firebase CLI not authenticated. Run: firebase login"
fi

echo ""
echo "📝 Next Steps:"
echo "=============="
echo ""
echo "1. Edit .env.local with your Firebase project credentials:"
echo "   - NEXT_PUBLIC_FIREBASE_API_KEY"
echo "   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
echo "   - NEXT_PUBLIC_FIREBASE_PROJECT_ID"
echo "   - etc."
echo ""
echo "2. For local development with Firestore emulators:"
echo "   npm run emulators"
echo ""
echo "3. In another terminal, start the development server:"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "5. (Optional) To test Cloud Functions locally:"
echo "   cd functions"
echo "   echo -n 'your_brevo_api_key' | firebase functions:secrets:set BREVO_API_KEY"
echo "   cd .."
echo "   npm run emulators"
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Need help? Check CONTRIBUTING.md or open an issue on GitHub."

