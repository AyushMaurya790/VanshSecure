#!/bin/bash
# Hostinger Deployment Script

echo "🚀 Starting Hostinger Deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Build the application
echo "🔨 Building application..."
npm run build

# Verify output directory
if [ -d ".output" ]; then
    echo "✅ Build successful! .output directory created"
    echo "📁 Contents:"
    ls -la .output/
    echo ""
    echo "📁 Server contents:"
    ls -la .output/server/
    echo ""
    echo "📁 Public contents:"
    ls -la .output/public/ | head -n 10
else
    echo "❌ ERROR: .output directory not found!"
    exit 1
fi

echo "✅ Deployment ready!"
