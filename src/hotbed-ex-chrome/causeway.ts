/**
 * causeway: a raised road or track across low or wet ground. 🛤
 * In hotbed, a causeway gives access to the dirty DOM, ie. the DOM as modified by other sources
 * compared to a content_script which only has access to the clean DOM
 */
import { v4 as uuidv4 } from 'uuid';
// first provide a unique causeway connection utility
export type Causeway = {
  sayHello: () => void;
};
export const createCauseway = (): Causeway => {
  const uuid: string = uuidv4();
  const causeway: Causeway = {
    sayHello: (): void => {
      console.log('hello');
    }
  };
  chrome.devtools.inspectedWindow.eval(
    `window[${uuid}] = {}`,
    (result, error) => {
      error && error.isException && console.log('Exception::', error.value);
      if (error && error.isError) {
        throw error;
      }
    }
  );
  return causeway;
};
// second provide causeway instance api for injecting a method(s)
// calling api
// callback api
// error handling
// Flux actions

// chrome.devtools.inspectedWindow.eval(
//   `window[${extensionId}] = {}`,
//   (result, error) => {
//     if (error) {
//       throw error;
//     }
//     console.log('eval callback', result);
//     // eslint-disable-next-line no-undef
//     chrome.devtools.inspectedWindow.eval(
//       `window[${extensionId}].${sayNameString} = ${sayNamespace.toString()}(${extensionId})`
//     );
//   }
// );
