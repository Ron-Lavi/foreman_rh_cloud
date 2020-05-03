import { testSelectorsSnapshotWithFixtures } from '@theforeman/test';
import {
  selectDashboard,
  selectPollingProcessID,
  selectActiveTab,
  selectUploading,
  selectGenerating,
} from '../DashboardSelectors';
import {
  logs,
  completed,
  pollingProcessID,
  activeTab,
  accountID,
} from '../Dashboard.fixtures';

const state = {
  dashboard: {
    [accountID]: {
      generating: {
        logs,
        completed,
      },
      uploading: {
        logs,
        completed,
      },
      activeTab,
      pollingProcessID,
    },
  },
};

const fixtures = {
  'should return Dashboard': () => selectDashboard(state, accountID),
  'should return Dashboard uploading': () => selectUploading(state, accountID),
  'should return Dashboard generating': () =>
    selectGenerating(state, accountID),
  'should return Dashboard pollingProcessID': () =>
    selectPollingProcessID(state, accountID),
  'should return Dashboard activeTab': () => selectActiveTab(state, accountID),
};

describe('Dashboard selectors', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
