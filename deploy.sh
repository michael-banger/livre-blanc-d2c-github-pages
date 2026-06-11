#!/bin/bash
echo "Deploying landing page to GitHub Pages..."
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"
git push origin main
echo ""
echo "✅ Deployed! Live in 2-3 minutes at:"
echo "https://michael-banger.github.io/livre-blanc-d2c-github-pages/"
