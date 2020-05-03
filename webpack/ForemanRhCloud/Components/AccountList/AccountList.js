import React, { Component } from 'react';
import { ListView, noop } from 'patternfly-react';
import PropTypes from 'prop-types';
import ListItem from './Components/ListItem';
import EmptyState from './Components/EmptyState';
import ErrorState from './Components/ErrorState';
import './accountList.scss';

class AccountList extends Component {
  componentDidMount() {
    const { fetchAccountsStatus, startAccountStatusPolling } = this.props;
    fetchAccountsStatus();
    const pollingProcessID = setInterval(fetchAccountsStatus, 5000);
    startAccountStatusPolling(pollingProcessID);
  }

  componentWillUnmount() {
    const { stopAccountStatusPolling, pollingProcessID } = this.props;
    stopAccountStatusPolling(pollingProcessID);
  }

  render() {
    const { accounts, error } = this.props;
    const accountIds = Object.keys(accounts);

    if (error) {
      return <ErrorState error={error} />;
    }

    if (accountIds.length === 0) {
      return <EmptyState />;
    }
    const items = accountIds.map((accountID, index) => {
      const account = accounts[accountID];
      return (
        <ListItem
          key={index}
          accountID={accountID}
          account={account}
          initExpanded={index === 0}
        />
      );
    });
    return <ListView className="account_list">{items}</ListView>;
  }
}

AccountList.propTypes = {
  fetchAccountsStatus: PropTypes.func,
  startAccountStatusPolling: PropTypes.func,
  stopAccountStatusPolling: PropTypes.func,
  pollingProcessID: PropTypes.number,
  account: PropTypes.shape({
    generate_report_status: PropTypes.string,
    upload_report_status: PropTypes.string,
  }),
  accounts: PropTypes.object,
  error: PropTypes.string,
};

AccountList.defaultProps = {
  fetchAccountsStatus: noop,
  startAccountStatusPolling: noop,
  stopAccountStatusPolling: noop,
  pollingProcessID: 0,
  account: {
    generate_report_status: 'unknown',
    upload_report_status: 'unknown',
  },
  accounts: {},
  error: '',
};

export default AccountList;
