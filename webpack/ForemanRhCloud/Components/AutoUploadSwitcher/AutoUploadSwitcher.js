import React from 'react';
import PropTypes from 'prop-types';
import { Switch, FieldLevelHelp } from 'patternfly-react';
import { translate as __ } from 'foremanReact/common/I18n';
import './autoUploadSwitcher.scss';

const AutoUploadSwitcher = ({ autoUploadEnabled, handleToggle }) => (
  <div className="auto_upload_switcher">
    <Switch
      size="mini"
      value={autoUploadEnabled}
      onChange={() => handleToggle(autoUploadEnabled)}
    />
    <FieldLevelHelp
      content={__(
        'Enable automatic upload of your host inventory to the Red Hat cloud'
      )}
    />
    <span>Allow Auto Upload</span>
  </div>
);

AutoUploadSwitcher.propTypes = {
  autoUploadEnabled: PropTypes.bool,
  handleToggle: PropTypes.func.isRequired,
};

AutoUploadSwitcher.defaultProps = {
  autoUploadEnabled: true,
};

export default AutoUploadSwitcher;
