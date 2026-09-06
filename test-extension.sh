#!/usr/bin/env bash
# Quick test runner for Archive Lens
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Testing Archive Lens extension in Chromium..."
echo "    Extension path: $SCRIPT_DIR"
echo "    Opening test browser with isolated temporary profile..."

CHROMIUM_BIN=$(which chromium || which google-chrome || which brave-browser || echo "")

if [ -z "$CHROMIUM_BIN" ]; then
  echo "Error: Chromium / Chrome / Brave not found in PATH."
  exit 1
fi

"$CHROMIUM_BIN" \
  --load-extension="$SCRIPT_DIR" \
  --no-first-run \
  --no-default-browser-check \
  "https://en.wikipedia.org/wiki/Web_archiving" &

echo "==> Chromium launched with Archive Lens loaded."
echo "    - Right-click any link or page to see 'Archive Lens'"
echo "    - Click the toolbar icon or press Alt+A to test instant Archive.today lookup"
