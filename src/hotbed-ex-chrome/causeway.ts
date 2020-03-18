/**
 * causeway: a raised road or track across low or wet ground. 🛤
 * In hotbed, a causeway gives access to the dirty DOM, ie. the DOM as modified by other sources
 * compared to a content_script which only has access to the clean DOM
 */
import { Causeway, nsResult } from './types';
import createKeccakHash from 'keccak';

// first provide a unique causeway connection utility

const asyncEval = (expression: string): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    chrome.devtools.inspectedWindow.eval(expression, (result, err) => {
      console.log('result', result, 'excepInfo', err);
      err
        ? reject(
            err.isException
              ? new Error(
                  `Script Error:: Your expression caused the following exception.\n${err.value}`
                )
              : new Error(
                  `${err.code}:: ${err.description}.\nDetails:: ${err.details}`
                )
          )
        : resolve(result);
    });
  });
};

export const createCauseway = async (): Promise<Causeway> => {
  const keccak = createKeccakHash('keccak256')
    .update(chrome.runtime.id)
    .digest('hex');
  console.log('KECCAK::', keccak);
  const causeway: Causeway = {
    sayHello: () => {
      console.log('hello');
    }
  };

  const asyncResult = await asyncEval(`window["${keccak}"] = {};`);
  console.log('Eval Result::', asyncResult);
  return causeway;
};
// second provide causeway instance api for injecting a method(s)
// calling api
// callback api
// error handling
// Flux actions
