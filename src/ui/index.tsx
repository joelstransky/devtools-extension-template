import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Causeway, connection, createCauseway } from '../hotbed-ex-chrome';

const App = (): JSX.Element => {
  console.log('APP');
  return (
    <div>
      <button
        type="button"
        onClick={(): void => {
          console.log('sending message...');
        }}
      >
        Send Message
      </button>
    </div>
  );
};
window.addEventListener('load', () => {
  ReactDOM.render(<App />, document.getElementById('container'));
  // send a 1-time message from content-script to
  // eslint-disable-next-line no-undef
  // chrome.runtime.sendMessage({ greeting: 'hello-from-UI' }, (response) => {
  //   console.log(response.farewell);
  // });
  // const message = connection('UI');
  console.log('Sending Connect from UI');
  // eslint-disable-next-line no-undef
  // const port = chrome.runtime.connect({
  //   name: 'UI',
  //   includeTlsChannelId: false
  // });
  const port: chrome.runtime.Port = connection('UI');

  // port.postMessage({
  //   name: 'init',
  //   tabId: chrome.devtools.inspectedWindow.tabId
  // });

  // const sayNamespace = (namespace: string) => (name = 'joel'): void =>
  //   console.log(`Hello ${name}`, namespace);

  // const sayNameString = 'sayNamespace';
  // const extensionId = `${chrome.runtime.id}`;
  // chrome.devtools.inspectedWindow.eval(
  //   `window[${extensionId}] = {}`,
  //   (result, error) => {
  //     if (error) {
  //       throw error;
  //     }
  //     console.log('eval callback', result);
  //     chrome.devtools.inspectedWindow.eval(
  //       `window[${extensionId}].${sayNameString} = ${sayNamespace.toString()}(${extensionId})`
  //     );
  //   }
  // );

  const causeway: Causeway = createCauseway();
  causeway.sayHello();
});
