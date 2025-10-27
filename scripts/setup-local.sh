#!/usr/bin/env bash
set -euo pipefail

echo "Setting up local environment..."

if [ ! -f .env.local ]; then
  cp env.example .env.local
  echo "Created .env.local from env.example. Please edit it with your real values."
else
  echo ".env.local already exists."
fi

command -v node >/dev/null 2>&1 || { echo >&2 "Node.js is required"; exit 1; }
command -v firebase >/dev/null 2>&1 || { echo >&2 "Firebase CLI not found. Install with: npm i -g firebase-tools"; }

echo "Install dependencies"
npm install

echo "All set. Run: npm run dev"


