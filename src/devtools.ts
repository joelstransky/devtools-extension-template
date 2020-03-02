// eslint-disable-next-line no-undef
chrome.devtools.panels.create('MV Proxy', null, 'panel.html', (panel) => {
  console.log('new panel callback', panel);
});
