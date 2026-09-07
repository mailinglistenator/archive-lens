# Archive Lens 🔍

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-blue.svg)]()
[![Platform: Windows | macOS | Linux](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-brightgreen.svg)]()
[![Browsers: Chrome | Edge | Brave | Opera](https://img.shields.io/badge/Browsers-Chrome%20%7C%20Edge%20%7C%20Brave%20%7C%20Opera-blue.svg)]()

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

Works on **Windows**, **macOS**, and **Linux** with **Google Chrome**, **Microsoft Edge**, **Brave**, or any Chromium-based browser:

1. Clone or download this repository (or download the ZIP from GitHub and unzip it):
   ```bash
   git clone https://github.com/mailinglistenator/archive-lens.git
   cd archive-lens
   ```
2. Open your browser extension manager:
   * **Chrome / Brave**: `chrome://extensions` or `brave://extensions`
   * **Microsoft Edge**: `edge://extensions`
3. Enable **Developer mode** (toggle in the top-right corner on Chrome/Brave, or left sidebar on Edge).
4. Click **"Load unpacked"** (or "Load unpacked extension").
5. Select the `archive-lens` folder.
6. *(Optional)* Click the puzzle piece (Extensions) icon in your browser toolbar and pin **Archive Lens** for 1-click access.

---

## Quick Test Run

To test the extension immediately in a sandbox browser window without affecting your main profile:

### Linux / macOS
```bash
./test-extension.sh
```

### Windows
Double-click `test-extension.bat` (or run it via Command Prompt / PowerShell):
```cmd
test-extension.bat
```

---

## Project Structure

```
archive-lens/
├── manifest.json         # Manifest V3 configuration
├── background.js         # Service worker handling context menus, cleaning & shortcuts
├── icons/                # 16, 32, 48, 128px high-DPI icons
├── generate_icons.py     # Script used to generate crisp icon assets
├── test-extension.sh     # Quick test launcher for Linux
├── test-extension.bat    # Quick test launcher for Windows
└── README.md
```
