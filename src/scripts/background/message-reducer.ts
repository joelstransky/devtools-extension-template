import Consts from '../../consts';
type HotBedAction = {
  type: string;
  data?: any;
  tabId?: string;
  port?: chrome.runtime.Port;
};
const initialState = {};
const handleMessageAction: object = (
  connections = initialState,
  action: HotBedAction
) => {
  switch (action.type) {
    case Consts.EXTENSION_CONNECTION:
      return { ...connections, [`${action.tabId}`]: action.port };
    default:
      return connections;
  }
};
