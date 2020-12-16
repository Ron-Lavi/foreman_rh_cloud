import { push } from 'connected-react-router';
import API from 'foremanReact/API';
import { get } from 'foremanReact/redux/API';
import { addToast } from 'foremanReact/redux/actions/toasts';
import { stringifyParams } from 'foremanReact/common/urlHelpers';
import { insightsCloudUrl } from './InsightsCloudSyncHelpers';
import { selectQueryParams } from './InsightsCloudSyncSelectors';
import {
  INSIGHTS_CLOUD_SYNC_SUCCESS,
  INSIGHTS_HITS_PATH,
  INSIGHTS_HITS_API_KEY,
  INSIGHTS_PATH,
} from './InsightsCloudSyncConstants';

export const syncInsights = () => async dispatch => {
  try {
    await API.post(insightsCloudUrl('tasks'));
    dispatch({
      type: INSIGHTS_CLOUD_SYNC_SUCCESS,
      payload: {},
    });
  } catch ({ message }) {
    dispatch(
      addToast({
        sticky: true,
        type: 'error',
        message,
      })
    );
  }
};

export const updateUrlQuery = (queryParams = {}) => (dispatch, getState) => {
  dispatch(
    push({
      pathname: INSIGHTS_PATH,
      search: stringifyParams({
        ...selectQueryParams(getState()),
        ...queryParams,
      }),
    })
  );
};

export const fetchInsights = ({ page, perPage, query, sort } = {}) => {
  const order =
    sort && Object.keys(sort).length > 0 ? `${sort.by} ${sort.order}` : '';
  return get({
    key: INSIGHTS_HITS_API_KEY,
    url: INSIGHTS_HITS_PATH,
    params: {
      page,
      per_page: perPage,
      search: query,
      order,
    },
  });
};
