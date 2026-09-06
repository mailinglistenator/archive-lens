# Archive Lens 🔍

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-blue.svg)]()
[![Platform: Chromium / Brave / Chrome](https://img.shields.io/badge/Platform-Chromium%20%7C%20Brave%20%7C%20Chrome-brightgreen.svg)]()

A lightweight, private, native Manifest V3 browser extension to instantly open paywalled, restricted, or historical web pages in **Archive.today** (`archive.ph`) or the **Wayback Machine** (`web.archive.org`).

---

## Features

* **Right-Click Context Menu**:
  * **On any webpage**: Right-click anywhere &rarr; **Archive Lens** &rarr; open the page in Archive.today or Wayback Machine.
  * **On any link**: Right-click a link (on Reddit, Twitter/X, Hacker News, Google, etc.) &rarr; **Archive Lens** &rarr; open the archived snapshot directly without triggering paywalled scripts or trackers.
  * **Side-by-side tabs**: Choose *"Open in Both"* to open both archive services concurrently.
* **1-Click Toolbar Action**: Click the extension icon in your browser toolbar to instantly open the active page in Archive.today.
* **Keyboard Shortcuts**:
  * `Alt + A`: Open current page in Archive.today
  * `Alt + W`: Open current page in the Wayback Machine
* **Smart URL Sanitization**: Automatically strips analytics query parameters (`utm_*`, `fbclid`, `gclid`, etc.) before lookup so exact-match archive records are found reliably.
* **100% Local & Zero Bloat**: No tracking, no external server requests, no unnecessary permissions.

---

## Installation (Takes 10 Seconds)

Works with **Chromium**, **Google Chrome**, **Brave**, or any Chromium-based browser:

1. Open your browser and navigate to `chrome://extensions` (or `brave://extensions`).
2. In the top-right corner, toggle **Developer mode** to **ON**.
3. Click the **"Load unpacked"** button in the top-left corner.
4. Select the extension directory:
   ```
   /home/redking/.gemini/antigravity/scratch/archive-lens-extension
   ```
5. *(Optional)* Click the puzzle piece icon in the browser toolbar and pin **Archive Lens** to keep it 1-click accessible.

---

## Quick Test Run

To launch a test browser instance immediately with the extension preloaded:

```bash
cd /home/redking/.gemini/antigravity/scratch/archive-lens-extension
./test-extension.sh
```

---

## Project Structure

```
archive-lens-extension/
├── manifest.json         # Manifest V3 configuration
├── background.js         # Service worker handling context menus, cleaning & shortcuts
├── icons/                # 16, 32, 48, 128px high-DPI icons
├── generate_icons.py     # Script used to generate crisp icon assets
├── test-extension.sh     # Quick test launcher
└── README.md
```
