// Archive Lens - Background Service Worker (Manifest V3)

function isValidHttpUrl(urlString) {
  if (!urlString) return false;
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function cleanUrl(urlString) {
  try {
    const url = new URL(urlString);
    // Strip common tracking parameters that break archive lookups
    const trackingParams = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'fbclid', 'gclid', 'msclkid', 'mc_cid', 'mc_eid', '_hsenc', '_hsmi'
    ];
    for (const param of trackingParams) {
      url.searchParams.delete(param);
    }
    return url.toString();
  } catch (_) {
    return urlString;
  }
}

function getArchiveTodayUrl(rawUrl) {
  const target = cleanUrl(rawUrl);
  return `https://archive.ph/newest/${target}`;
}

function getWaybackLatestUrl(rawUrl) {
  const target = cleanUrl(rawUrl);
  return `https://web.archive.org/web/2/${target}`;
}

function getWaybackCalendarUrl(rawUrl) {
  const target = cleanUrl(rawUrl);
  return `https://web.archive.org/web/*/${target}`;
}

async function flashBadge(text, color = '#38bdf8') {
  try {
    await chrome.action.setBadgeText({ text });
    await chrome.action.setBadgeBackgroundColor({ color });
    setTimeout(async () => {
      try {
        await chrome.action.setBadgeText({ text: '' });
      } catch (_) {}
    }, 1800);
  } catch (_) {}
}

async function openArchiveTab(archiveUrl, sourceTab, activate = true) {
  const options = {
    url: archiveUrl,
    active: activate
  };
  if (sourceTab && typeof sourceTab.index === 'number') {
    options.index = sourceTab.index + 1;
    options.openerTabId = sourceTab.id;
  }
  return await chrome.tabs.create(options);
}

async function handleUrlAction(targetUrl, actionId, sourceTab) {
  if (!isValidHttpUrl(targetUrl)) {
    await flashBadge('ERR', '#ef4444');
    return;
  }

  switch (actionId) {
    case 'open-archive-today':
      await flashBadge('ARCH', '#38bdf8');
      await openArchiveTab(getArchiveTodayUrl(targetUrl), sourceTab, true);
      break;

    case 'open-wayback':
      await flashBadge('WAYB', '#818cf8');
      await openArchiveTab(getWaybackLatestUrl(targetUrl), sourceTab, true);
      break;

    case 'open-wayback-calendar':
      await flashBadge('CAL', '#818cf8');
      await openArchiveTab(getWaybackCalendarUrl(targetUrl), sourceTab, true);
      break;

    case 'open-both':
      await flashBadge('BOTH', '#10b981');
      await openArchiveTab(getWaybackLatestUrl(targetUrl), sourceTab, false);
      await openArchiveTab(getArchiveTodayUrl(targetUrl), sourceTab, true);
      break;

    default:
      await flashBadge('ARCH', '#38bdf8');
      await openArchiveTab(getArchiveTodayUrl(targetUrl), sourceTab, true);
      break;
  }
}

function createMenus() {
  chrome.contextMenus.create({
    id: 'archive-lens-root',
    title: 'Archive Lens',
    contexts: ['page', 'link']
  });

  chrome.contextMenus.create({
    id: 'open-archive-today',
    parentId: 'archive-lens-root',
    title: 'Archive.today (archive.ph)',
    contexts: ['page', 'link']
  });

  chrome.contextMenus.create({
    id: 'open-wayback',
    parentId: 'archive-lens-root',
    title: 'Wayback Machine (Latest snapshot)',
    contexts: ['page', 'link']
  });

  chrome.contextMenus.create({
    id: 'open-wayback-calendar',
    parentId: 'archive-lens-root',
    title: 'Wayback Machine (Full history calendar)',
    contexts: ['page', 'link']
  });

  chrome.contextMenus.create({
    id: 'open-both',
    parentId: 'archive-lens-root',
    title: 'Open in Both (parallel tabs)',
    contexts: ['page', 'link']
  });
}

// Re-register context menus on extension install or update
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    createMenus();
  });
});

// Handle Context Menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const targetUrl = info.linkUrl || info.pageUrl || tab?.url;
  await handleUrlAction(targetUrl, info.menuItemId, tab);
});

// Handle Toolbar Action Icon click (1-click Archive.today)
chrome.action.onClicked.addListener(async (tab) => {
  if (tab && tab.url) {
    await handleUrlAction(tab.url, 'open-archive-today', tab);
  }
});

// Handle Keyboard Shortcuts (Alt+A, Alt+W)
chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url) {
    await handleUrlAction(tab.url, command, tab);
  }
});
