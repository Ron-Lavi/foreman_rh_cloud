import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';
import { translate as __ } from 'foremanReact/common/I18n';
import './errorState.scss';

const ErrorState = ({ error }) => (
  <div className="error_state">
    <Icon className="error_icon" name="times" size="2x" />
    <p>{__('Encountered an error while trying to access the server:')}</p>
    <p className="error_description">{error}</p>
  </div>
);

ErrorState.propTypes = {
  error: PropTypes.string,
};

ErrorState.defaultProps = {
  error: '',
};

export default ErrorState;
