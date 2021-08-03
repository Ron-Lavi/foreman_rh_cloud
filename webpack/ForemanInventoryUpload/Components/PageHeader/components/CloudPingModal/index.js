/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import {
  Card,
  CardTitle,
  CardBody,
  Modal,
  ModalVariant,
  Spinner,
  Text,
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@patternfly/react-icons';
import { get } from 'foremanReact/redux/API';
import { translate as __, sprintf } from 'foremanReact/common/I18n';
import { STATUS } from 'foremanReact/constants';
import {
  selectAPIResponse,
  selectAPIStatus,
  selectAPIErrorMessage,
} from 'foremanReact/redux/API/APISelectors';
import { inventoryUrl } from '../../../../ForemanInventoryHelpers';
import './index.scss';

export const API_KEY = 'CLOUD_PING';

const CloudPingModal = ({ title, isOpen, toggle }) => {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const setTableRows = useCallback(
    response => {
      setRows(
        response.cert_auth.map(cert => ({
          cells: [
            {
              title: (
                <>
                  <StatusIcon APIStatus={status} authStatus={cert} />{' '}
                  {cert.org_name}
                </>
              ),
            },
          ],
        }))
      );
    },
    [status]
  );
  useEffect(() => {
    dispatch(
      get({
        key: API_KEY,
        url: inventoryUrl('status'),
        handleSuccess: response => {
          setTableRows(response);
        },
      })
    );
  }, [dispatch, setTableRows]);

  const status = useSelector(state => selectAPIStatus(state, API_KEY));
  const {
    ping: { token_auth = {}, cert_auth = [] } = {},
  } = useSelector(state => selectAPIResponse(state, API_KEY));
  const error = useSelector(state => selectAPIErrorMessage(state, API_KEY));

  return (
    <>
      <Modal
        id="cloud-ping-modal"
        appendTo={document.getElementsByClassName('react-container')[0]}
        variant={ModalVariant.large}
        title={title}
        isOpen={isOpen}
        onClose={toggle}
      >
        <Card className="token-status">
          <CardTitle>
            <StatusIcon APIStatus={status} authStatus={token_auth} />{' '}
            {__('API token status')}
          </CardTitle>
        </Card>
        <Card className="certs-status">
          <CardTitle>{__('Organization status')}</CardTitle>
          <CardBody>
            <Text>
              {__('Displays manifest statuses per accessible organizations.')}
            </Text>
            <Text className="pull-right">
              {sprintf(__('%s organizations'), cert_auth?.length)}
            </Text>
            <Table aria-label="Simple Table" cells={[]} rows={rows}>
              <TableHeader />
              <TableBody />
            </Table>
          </CardBody>
        </Card>
      </Modal>
    </>
  );
};

const StatusIcon = ({ APIStatus = STATUS.PENDING, authStatus = {} }) => {
  if (APIStatus === STATUS.PENDING) return <Spinner size="sm" />;
  if (authStatus.success) return <CheckCircleIcon color="green" />;
  if (authStatus.error) return <ExclamationCircleIcon color="red" />;
  return <Spinner size="sm" />;
};

StatusIcon.propTypes = {
  APIStatus: PropTypes.string,
  authStatus: PropTypes.shape(),
};

CloudPingModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default CloudPingModal;
