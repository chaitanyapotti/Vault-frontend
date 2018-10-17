const actionTypes = {
  APP_INIT: 'APP_INIT',
  ACTIVE_DAICOS_FAILED: 'ACTIVE_DAICOS_FAILED',
  ACTIVE_DAICOS_SUCCESS: 'ACTIVE_DAICOS_SUCCESS',
  SHOW_ACTIVE_DAICOS_LOADER: 'SHOW_ACTIVE_DAICOS_LOADER',
  ENDED_DAICOS_FAILED: 'ENDED_DAICOS_FAILED',
  ENDED_DAICOS_SUCCESS: 'ENDED_DAICOS_SUCCESS',
  SHOW_ENDED_DAICOS_LOADER: 'SHOW_ENDED_DAICOS_LOADER',
  UPCOMING_DAICOS_FAILED: 'UPCOMING_DAICOS_FAILED',
  UPCOMING_DAICOS_SUCCESS: 'UPCOMING_DAICOS_SUCCESS',
  SHOW_UPCOMING_DAICOS_LOADER: 'SHOW_UPCOMING_DAICOS_LOADER',
  TRANSACTION_PENDING: 'TRANSACTION_PENDING',
  TRANSACTION_REDO: 'TRANSACTION_REDO',
  PROJECT_DETAILS_FETCHED: 'PROJECT_DETAILS_FETCHED',
  DEPLOYED_CONTRACT: 'DEPLOYED_CONTRACT',
  RECEIVED_TRANSACTION_HASH: 'RECEIVED_TRANSACTION_HASH',
  WHITELIST_CHECK: 'WHITELIST_CHECK',
  CURRENT_ROUND_FETCHED: 'CURRENT_ROUND_FETCHED',
  ETHER_COLLECTED: 'ETHER_COLLECTED',
  ROUND_INFO_RECEIVED: 'ROUND_INFO_RECEIVED',
  TOKEN_BALANCE_RECEIVED: 'TOKEN_BALANCE_RECEIVED',
  TOKENS_UNDER_GOVERNANCE_RECEIVED: 'TOKENS_UNDER_GOVERNANCE_RECEIVED',
  KILL_POLL_INDEX_RECEIVED: 'KILL_POLL_INDEX_RECEIVED',
  TOTAL_SUPPLY_RECEIVED: 'TOTAL_SUPPLY_RECEIVED',
  KILL_CONSENSUS_RECEIVED: 'KILL_CONSENSUS_RECEIVED',
  TAP_CONSENSUS_RECEIVED: 'TAP_CONSENSUS_RECEIVED',
  CURRENT_TAP_RECEIVED: 'CURRENT_TAP_RECEIVED',
  XFR_DATA_RECEIVED: 'XFR_DATA_RECEIVED',
  KILL_POLL_VOTE_RECEIVED: 'KILL_POLL_VOTE_RECEIVED',
};

export default actionTypes;
