#!/bin/bash
echo "🔨 Building Storybook..."
npm run build-storybook

echo "🚀 Starting server..."
npx serve ./storybook-static -l 8080 &
SERVER_PID=$!

echo "⏳ Waiting for server..."
sleep 5

echo "🔍 Running Lighthouse..."
npx lighthouse http://localhost:8080 \
  --output html \
  --output json \
  --output-path ./lighthouse-local \
  --chrome-flags="--headless" \
  --only-categories=accessibility

echo "📊 Results:"
node -pe "const r=require('./lighthouse-local.report.json'); 'Accessibility: ' + (r.categories.accessibility.score*100) + '%'"

echo "🛑 Stopping server..."
kill $SERVER_PID

echo "✅ Report: lighthouse-local.report.html"
