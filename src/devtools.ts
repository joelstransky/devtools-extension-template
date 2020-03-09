chrome.devtools.panels.create(
  'MV Proxy',
  `/assets/icon128.png`,
  'panel.html',
  (panel: chrome.devtools.panels.ExtensionPanel) => {
    console.log('new panel callback', panel);
  }
);
