/**
 * causeway: a raised road or track across low or wet ground. 🛤
 * In hotbed, a causeway gives access to the dirty DOM, ie. the DOM as modified by other sources
 * compared to a content_script which only has access to the clean DOM
 */

// first provide a unique causeway connection utility
// second provide causeway instance api for injecting a method(s)
// calling api
// callback api
// error handling
// Flux actions

// eslint-disable-next-line no-undef
chrome.devtools.inspectedWindow.eval(
  `window[${extensionId}] = {}`,
  (result, error) => {
    if (error) {
      throw error;
    }
    console.log('eval callback', result);
    // eslint-disable-next-line no-undef
    chrome.devtools.inspectedWindow.eval(
      `window[${extensionId}].${sayNameString} = ${sayNamespace.toString()}(${extensionId})`
    );
  }
);
