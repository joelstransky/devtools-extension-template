export type Causeway = {
  sayHello: () => void;
};

export type nsResult = {
  result: string;
  exceptionInfo: chrome.devtools.inspectedWindow.EvaluationExceptionInfo;
};
