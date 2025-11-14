#!/bin/bash

# Download Images Script for 123 Fakturera Clone
# This script downloads all required images for the login page

echo "🖼️  Downloading images for 123 Fakturera Login Page..."
echo ""

# Create images directory if it doesn't exist
mkdir -p frontend/src/assets/images

# Download diamond logo
echo "📥 Downloading diamond logo..."
curl -o frontend/src/assets/images/diamond.png https://storage.123fakturera.se/public/icons/diamond.png

# Download GB flag
echo "📥 Downloading British flag..."
curl -o frontend/src/assets/images/GB.png https://storage.123fakturere.no/public/flags/GB.png

# Download SE flag
echo "📥 Downloading Swedish flag..."
curl -o frontend/src/assets/images/SE.png https://storage.123fakturere.no/public/flags/SE.png

# Download background image
echo "📥 Downloading background image..."
curl -o frontend/src/assets/images/sverige43.jpg https://storage.123fakturera.se/public/wallpapers/sverige43.jpg

echo ""
echo "✅ All images downloaded successfully!"
echo "📁 Images saved to: frontend/src/assets/images/"
echo ""
echo "You can now run the application:"
echo "  cd frontend && npm run dev"
