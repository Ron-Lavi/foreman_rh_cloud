import React from 'react';
import { IntegrationTestHelper } from '@theforeman/test';

import Dashboard from '../Dashboard';
import reducers from '../../../ForemanRhCloudReducers';
import { accountID } from '../Dashboard.fixtures';

describe('Dashboard integration test', () => {
  it('should flow', async () => {
    const integrationTestHelper = new IntegrationTestHelper(reducers);
    const component = integrationTestHelper.mount(
      <Dashboard accountID={accountID} />
    );
    component.update();
    /** Create a Flow test */
  });
});
