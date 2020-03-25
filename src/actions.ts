import * as CONSTS from './consts';
import { createAction } from '@reduxjs/toolkit';

export const createConnection = createAction(CONSTS.EXTENSION_CONNECTION);
export const createInvalid = createAction(CONSTS.INVALID_MESSAGE);
