import { createConnection } from '../actions';

export const connection = (name: string): chrome.runtime.Port => {
  const port = chrome.runtime.connect({
    name
  });
  port.postMessage(createConnection('hello'));
  return port;
};
