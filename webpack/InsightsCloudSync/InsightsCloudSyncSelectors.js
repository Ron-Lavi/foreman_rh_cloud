import URI from 'urijs';
import { selectRouterLocation } from 'foremanReact/routes/RouterSelector';
import { selectAPIResponse } from 'foremanReact/redux/API/APISelectors';
import { INSIGHTS_HITS_API_KEY } from './InsightsCloudSyncConstants';
import { selectInsightsCloudSync } from '../ForemanRhCloudSelectors';

export const selectQuery = state => selectRouterLocation(state).query;

export const selectSearch = state => {
  const { search = '' } = selectQuery(state);
  return URI.decodeQuery(search);
};

export const selectPage = state => {
  const { page = '1' } = selectQuery(state);
  return Number(page);
};

export const selectPerPage = state => {
  const perPage = selectQuery(state).per_page;
  return perPage && Number(perPage);
};

export const selectQueryParams = state => ({
  page: selectPage(state),
  perPage: selectPerPage(state),
  query: selectSearch(state),
  sortBy: selectSortBy(state),
  sortOrder: selectSortOrder(state),
});

export const selectSortBy = state => {
  const sortBy = selectQuery(state).sort_by;
  return sortBy ? URI.decodeQuery(sortBy) : '';
};

export const selectSortOrder = state => {
  const sortOrder = selectQuery(state).sort_order;
  return sortOrder ? URI.decodeQuery(sortOrder) : '';
};

export const selectHits = state =>
  selectAPIResponse(state, INSIGHTS_HITS_API_KEY).hits || [];

export const selectSelectedIds = state =>
  selectInsightsCloudSync(state).table.selectedIds || [];

export const selectItemCount = state =>
  selectAPIResponse(state, INSIGHTS_HITS_API_KEY).itemCount || 0;
