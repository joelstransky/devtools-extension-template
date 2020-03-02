/* eslint-disable no-undef */
import * as CONSTS from '../../consts';

console.log('hello from content script');
const injector = chrome.extension.getURL('/injector.js');
const script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = injector;
script.onload = (): void => script.remove();
document.body.appendChild(script);

// Event listener
document.addEventListener(CONSTS.MV_PROXY_EXTENSION_CONNECTION, (e) => {
  // e.detail contains the transferred data (can be anything, ranging
  // from JavaScript objects to strings).
  // Do something, for example:
  // alert(e.detail);
  console.log('CONNECTION', e);
});

// send a 1-time message from content-script to
// chrome.runtime.sendMessage(
//   { greeting: 'hello-from-content-script' },
//   (response) => {
//     console.log(response.farewell);
//   }
// );
