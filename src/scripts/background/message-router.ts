/**
 * If the extension is active, a single instance of this exists
 */
import Consts from '../../consts';
import { createInvalid } from '../../actions';
import { isFSA } from 'flux-standard-action';
// background.js
let connections = {} as Record<string, chrome.runtime.Port>;

chrome.runtime.onConnect.addListener((port: chrome.runtime.Port) => {
  console.log('ROUTER::onConnect', port);
  const handleMessage = (message: any, port: chrome.runtime.Port): void => {
    console.log('onConnect', message);
    !isFSA(message) && port.postMessage(createInvalid());
    switch (message.type) {
      case Consts.MV_PROXY_EXTENSION_CONNECTION:
        connections = { ...connections };
        break;
      default:
        console.log('onConnect default');
    }
    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
    // if (message.name === 'init') {
    //   connections[message.tabId] = port;
    //   return;
    // }

    // other message handling
  };

  // Listen to messages sent from the DevTools page

  port.onMessage.addListener(handleMessage);

  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(handleMessage);
    connections = Object.entries(connections).reduce((a, [tabId, thePort]) => {
      if (thePort !== port) a[tabId] = thePort;
      return a;
    }, {} as Record<string, chrome.runtime.Port>);
  });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    const tabId = (sender.tab.id as unknown) as string;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log('Tab not found in connection list.');
    }
  } else {
    console.log('sender.tab not defined.');
  }
  return true;
});
