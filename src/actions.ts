import * as CONSTS from './consts';
import { createAction } from '@reduxjs/toolkit';

export const createConnection = createAction(
  CONSTS.MV_PROXY_EXTENSION_CONNECTION
);
export const createInvalid = createAction<string>(
  CONSTS.MV_PROXY_INVALID_MESSAGE
);
