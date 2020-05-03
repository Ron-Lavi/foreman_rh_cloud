import { testReducerSnapshotWithFixtures } from '@theforeman/test';

import {
  INVENTORY_ACCOUNT_STATUS_POLLING,
  INVENTORY_ACCOUNT_STATUS_POLLING_START,
  INVENTORY_ACCOUNT_STATUS_POLLING_STOP,
  INVENTORY_ACCOUNT_STATUS_POLLING_ERROR,
  INVENTORY_PROCESS_RESTART,
} from '../AccountListConstants';
import reducer from '../AccountListReducer';
import {
  accounts,
  error,
  pollingProcessID,
  accountID,
  processStatusName,
  autoUploadEnabled,
} from '../AccountList.fixtures';
import { AUTO_UPLOAD_TOGGLE } from '../../AutoUploadSwitcher/AutoUploadSwitcherConstants';

const fixtures = {
  'should return the initial state': {},
  'should handle INVENTORY_ACCOUNT_STATUS_POLLING': {
    action: {
      type: INVENTORY_ACCOUNT_STATUS_POLLING,
      payload: {
        accounts,
        autoUploadEnabled,
      },
    },
  },
  'should handle INVENTORY_ACCOUNT_STATUS_POLLING_ERROR': {
    action: {
      type: INVENTORY_ACCOUNT_STATUS_POLLING_ERROR,
      payload: { error },
    },
  },
  'should handle INVENTORY_ACCOUNT_STATUS_POLLING_START': {
    action: {
      type: INVENTORY_ACCOUNT_STATUS_POLLING_START,
      payload: {
        pollingProcessID,
      },
    },
  },
  'should handle INVENTORY_ACCOUNT_STATUS_POLLING_STOP': {
    action: {
      type: INVENTORY_ACCOUNT_STATUS_POLLING_STOP,
    },
  },
  'should handle INVENTORY_PROCESS_RESTART': {
    action: {
      type: INVENTORY_PROCESS_RESTART,
      payload: {
        accountID,
        processStatusName,
      },
    },
  },
  'should handle AUTO_UPLOAD_TOGGLE': {
    action: {
      type: AUTO_UPLOAD_TOGGLE,
      payload: {
        autoUploadEnabled,
      },
    },
  },
};

describe('AccountList reducer', () =>
  testReducerSnapshotWithFixtures(reducer, fixtures));
