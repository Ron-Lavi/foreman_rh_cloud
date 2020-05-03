import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import ReportUpload from '../ReportUpload';
import { props } from '../ReportUpload.fixtures';

const fixtures = {
  'render without Props': {},
  'render with Props': props,
};

describe('ReportUpload', () => {
  describe('rendering', () =>
    testComponentSnapshotsWithFixtures(ReportUpload, fixtures));
});
