import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import ScheduledRun from '../ScheduledRun';
import { props } from '../ScheduledRun.fixtures';

const fixtures = {
  'render with Props': props,
};

describe('ScheduledRun', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(ScheduledRun, fixtures));
});
