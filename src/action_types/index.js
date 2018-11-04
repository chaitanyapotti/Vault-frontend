const actionTypes = {
  APP_INIT: "APP_INIT",
  ACTIVE_DAICOS_FAILED: "ACTIVE_DAICOS_FAILED",
  ACTIVE_DAICOS_SUCCESS: "ACTIVE_DAICOS_SUCCESS",
  SHOW_ACTIVE_DAICOS_LOADER: "SHOW_ACTIVE_DAICOS_LOADER",
  ENDED_DAICOS_FAILED: "ENDED_DAICOS_FAILED",
  ENDED_DAICOS_SUCCESS: "ENDED_DAICOS_SUCCESS",
  SHOW_ENDED_DAICOS_LOADER: "SHOW_ENDED_DAICOS_LOADER",
  UPCOMING_DAICOS_FAILED: "UPCOMING_DAICOS_FAILED",
  UPCOMING_DAICOS_SUCCESS: "UPCOMING_DAICOS_SUCCESS",
  SHOW_UPCOMING_DAICOS_LOADER: "SHOW_UPCOMING_DAICOS_LOADER",
  TRANSACTION_PENDING: "TRANSACTION_PENDING",
  TRANSACTION_REDO: "TRANSACTION_REDO",
  Start_R1_BUTTON_SPINNING: "Start_R1_BUTTON_SPINNING",
  PROJECT_DETAILS_FETCHED: "PROJECT_DETAILS_FETCHED",
  DEPLOYED_CONTRACT: "DEPLOYED_CONTRACT",
  RECEIVED_TRANSACTION_HASH: "RECEIVED_TRANSACTION_HASH",
  FEATURED_PROJECTS_SUCCESS: "FEATURED_PROJECTS_SUCCESS",
  FEATURED_PROJECTS_FAILURE: "FEATURED_PROJECTS_FAILURE",
  SHOW_FEATURED_PROJECTS_ACTION_LOADER: "SHOW_FEATURED_PROJECTS_ACTION_LOADER",
  USER_REGISTRATION_CHECK_FAILED: "USER_REGISTRATION_CHECK_FAILED",
  USER_REGISTRATION_CHECK_SUCCESS: "USER_REGISTRATION_CHECK_SUCCESS",
  USER_DEFAULT_ACCOUNT_CHANGED: "USER_DEFAULT_ACCOUNT_CHANGED",
  USER_LOCAL_ACCOUNT_ADDRESS: "USER_LOCAL_ACCOUNT_ADDRESS",
  USER_LOGGED_OUT: "USER_LOGGED_OUT",
  OTP_SENT_TO_USER_SUCCESS: "OTP_SENT_TO_USER_SUCCESS",
  OTP_SENT_TO_USER_FAILED: "OTP_SENT_TO_USER_FAILED",
  SHOW_REGISTRATION_FORM: "SHOW_REGISTRATION_FORM",
  HIDE_REGISTRATION_FORM: "HIDE_REGISTRATION_FORM",
  COUNTRY_CODE_CHANGED: "COUNTRY_CODE_CHANGED",
  PHONE_NUMBER_CHANGED: "PHONE_NUMBER_CHANGED",
  USER_OTP_INPUT_CHANGED: "USER_OTP_INPUT_CHANGED",
  PHONE_VERIFICATION_SUCCESS: "PHONE_VERIFICATION_SUCCESS",
  PHONE_VERIFICATION_FAILED: "PHONE_VERIFICATION_FAILED",
  IS_ISSUER_FLAG_TOGGLED: "IS_ISSUER_FLAG_TOGGLED",
  ADMIN_NAME_CHANGED: "ADMIN_NAME_CHANGED",
  ADMIN_EMAIL_CHANGED: "ADMIN_EMAIL_CHANGED",
  PROJECT_NAME_CHANGED: "PROJECT_NAME_CHANGED",
  ERC20_TAG_CHANGED: "ERC20_TAG_CHANGED",
  PROJECT_DESCRIPTION_CHANGED: "PROJECT_DESCRIPTION_CHANGED",
  WEBSITE_LINK_CHANGED: "WEBSITE_LINK_CHANGED",
  TELEGRAM_LINK_CHANGED: "TELEGRAM_LINK_CHANGED",
  GITHUB_LINK_CHANGED: "GITHUB_LINK_CHANGED",
  MEDIUM_LINK_CHANGED: "MEDIUM_LINK_CHANGED",
  FACEBOOK_LINK_CHANGED: "FACEBOOK_LINK_CHANGED",
  TWITTER_LINK_CHANGED: "TWITTER_LINK_CHANGED",
  INITIAL_FUND_RELEASE_CHANGED: "INITIAL_FUND_RELEASE_CHANGED",
  // DAICO_ROUNDS_CHANGED: "DAICO_ROUNDS_CHANGED",
  DAICO_START_DATE_CHANGED: "DAICO_START_DATE_CHANGED",
  DAICO_END_DATE_CHANGED: "DAICO_END_DATE_CHANGED",
  ROUND1_TARGET_USD_CHANGED: "ROUND1_TARGET_USD_CHANGED",
  ROUND1_TARGET_ETH_CHANGED: "ROUND1_TARGET_ETH_CHANGED",
  ROUND2_TARGET_USD_CHANGED: "ROUND2_TARGET_USD_CHANGED",
  ROUND2_TARGET_ETH_CHANGED: "ROUND2_TARGET_ETH_CHANGED",
  ROUND3_TARGET_USD_CHANGED: "ROUND3_TARGET_USD_CHANGED",
  ROUND3_TARGET_ETH_CHANGED: "ROUND3_TARGET_ETH_CHANGED",
  PROJECT_REGISTRATION_SUCCESS: "PROJECT_REGISTRATION_SUCCESS",
  PROJECT_REGISTRATION_FAILED: "PROJECT_REGISTRATION_FAILED",
  WHITELIST_CHECK: "WHITELIST_CHECK",
  CURRENT_ROUND_FETCHED: "CURRENT_ROUND_FETCHED",
  ETHER_COLLECTED: "ETHER_COLLECTED",
  ROUND_INFO_RECEIVED: "ROUND_INFO_RECEIVED",
  TOKEN_BALANCE_RECEIVED: "TOKEN_BALANCE_RECEIVED",
  TOKENS_UNDER_GOVERNANCE_RECEIVED: "TOKENS_UNDER_GOVERNANCE_RECEIVED",
  KILL_POLL_INDEX_RECEIVED: "KILL_POLL_INDEX_RECEIVED",
  TOTAL_SUPPLY_RECEIVED: "TOTAL_SUPPLY_RECEIVED",
  KILL_CONSENSUS_RECEIVED: "KILL_CONSENSUS_RECEIVED",
  TAP_CONSENSUS_RECEIVED: "TAP_CONSENSUS_RECEIVED",
  CURRENT_TAP_RECEIVED: "CURRENT_TAP_RECEIVED",
  XFR_DATA_RECEIVED: "XFR_DATA_RECEIVED",
  KILL_POLL_VOTE_RECEIVED: "KILL_POLL_VOTE_RECEIVED",
  TREASURY_STATE_FETCHED: "TREASURY_STATE_FETCHED",
  REFUND_BY_KILL_BUTTON_SPINNING: "REFUND_BY_KILL_BUTTON_SPINNING",
  REFUND_BY_SOFT_CAP_FAIL_BUTTON_SPINNING: "REFUND_BY_SOFT_CAP_FAIL_BUTTON_SPINNING",
  VAULT_MEMBERSHIP_PAYMENT_CHECK_SUCCESS: "VAULT_MEMBERSHIP_PAYMENT_CHECK_SUCCESS",
  VAULT_MEMBERSHIP_PAYMENT_CHECK_FAILED: "VAULT_MEMBERSHIP_PAYMENT_CHECK_FAILED",
  VAULT_MEMBERSHIP_CHECK: "VAULT_MEMBERSHIP_CHECK",
  PHONE_NUMBER_IS_NOT_VERIFIED: "PHONE_NUMBER_IS_NOT_VERIFIED",
  PHONE_NUMBER_IS_VERIFIED: "PHONE_NUMBER_IS_VERIFIED",
  TEAM_ADDRESS_CHANGED: "TEAM_ADDRESS_CHANGED",
  MAX_ETHER_CONTRIBUTION_CHANGED: "MAX_ETHER_CONTRIBUTION_CHANGED",
  INITIAL_TAP_VALUE_CHANGED: "INITIAL_TAP_VALUE_CHANGED",
  TAP_INCREMENT_FACTOR_CHANGED: "TAP_INCREMENT_FACTOR_CHANGED",
  VOTE_SATURATION_LIMIT_CHANGED: "VOTE_SATURATION_LIMIT_CHANGED",
  TOKEN_PRICE_FACTOR_CHANGED: "TOKEN_PRICE_FACTOR_CHANGED",
  CALCULATE_TOKENS: "CALCULATE_TOKENS",
  ADD_NON_SALE_ENTITY: "ADD_NON_SALE_ENTITY",
  ENTITY_ADDRESS_CHANGED: "ENTITY_ADDRESS_CHANGED",
  ENTITY_PERCENTAGE_CHANGED: "ENTITY_PERCENTAGE_CHANGED",
  ENTITY_NAME_CHANGED: "ENTITY_NAME_CHANGED",
  NON_SALE_ENTITY_EDIT: "NON_SALE_ENTITY_EDIT",
  PRICE_FETCHED: "PRICE_FETCHED",
  BUTTON_SPINNING: "BUTTON_SPINNING",
  SEARCH_RESULT_FETCHED: "SEARCH_RESULT_FETCHED",
  METAMASK_INSTALLATION_STATUS_CHECK: "METAMASK_INSTALLATION_STATUS_CHECK",
  METAMASK_NETWORK: "METAMASK_NETWORK",
  ISISSUER_CHECK: "ISISSUER_CHECK",
  USER_TOKENS_SUCCESS: "USER_TOKENS_SUCCESS",
  USER_TOKENS_FAILED: "USER_TOKENS_FAILED",
  SHOW_USER_TOKENS_LOADER: "SHOW_USER_TOKENS_LOADER",
  BUY_BUTTON_SPINNING: "BUY_BUTTON_SPINNING",
  REMAINING_ETHER_BALANCE_RECEIVED: "REMAINING_ETHER_BALANCE_RECEIVED",
  KILL_BUTTON_SPINNING: "KILL_BUTTON_SPINNING",
  TAP_BUTTON_SPINNING: "TAP_BUTTON_SPINNING",
  FETCH_PROJECT_NAMES_SUCCESS: "FETCH_PROJECT_NAMES_SUCCESS",
  FETCH_PROJECT_NAMES_FAILED: "FETCH_PROJECT_NAMES_FAILED",
  FETCH_TOKEN_TAGS_SUCCESS: "FETCH_TOKEN_TAGS_SUCCESS",
  FETCH_TOKEN_TAGS_FAILED: "FETCH_TOKEN_TAGS_FAILED",
  TAP_POLL_VOTE_RECEIVED: "TAP_POLL_VOTE_RECEIVED",
  XFR_POLL_VOTE_RECEIVED: "XFR_POLL_VOTE_RECEIVED",
  XFR1_BUTTON_SPINNING: "XFR1_BUTTON_SPINNING",
  XFR2_BUTTON_SPINNING: "XFR2_BUTTON_SPINNING",
  R1_FINALIZE_BUTTON_SPINNING: "R1_FINALIZE_BUTTON_SPINNING",
  KILL_FINALIZE_BUTTON_SPINNING: "KILL_FINALIZE_BUTTON_SPINNING",
  WHITEPAPER_CHANGED: "WHITEPAPER_CHANGED",
  WHITEPAPER_UPLOAD_SUCCESS: "WHITEPAPER_UPLOAD_SUCCESS",
  WHITEPAPER_UPLOAD_FAILED: "WHITEPAPER_UPLOAD_FAILED",
  UPLOADING_WHITEPAPER: "UPLOADING_WHITEPAPER",
  THUMBNAIL_CHANGED: "THUMBNAIL_CHANGED",
  THUMBNAIL_UPLOAD_SUCCESS: "THUMBNAIL_UPLOAD_SUCCESS",
  THUMBNAIL_UPLOAD_FAILED: "THUMBNAIL_UPLOAD_FAILED",
  UPLOADING_THUMBNAIL: "UPLOADING_THUMBNAIL",
  PROJECT_STATES_SUCCESS: "PROJECT_STATES_SUCCESS",
  PROJECT_STATES_FAILED: "PROJECT_STATES_FAILED",
  PROJECT_STATES_SAVED_SUCCESS: "PROJECT_STATES_SAVED_SUCCESS",
  PROJECT_STATES_SAVED_FAILED: "PROJECT_STATES_SAVED_FAILED",
  START_NEW_ROUND_BUTTON_SPINNING: "START_NEW_ROUND_BUTTON_SPINNING",
  DEPLOY_TAP_POLL_BUTTON_SPINNING: "DEPLOY_TAP_POLL_BUTTON_SPINNING",
  INCREMENT_TAP_BUTTON_SPINNING: "INCREMENT_TAP_BUTTON_SPINNING",
  DEPLOY_XFR_POLL_BUTTON_SPINNING: "DEPLOY_XFR_POLL_BUTTON_SPINNING",
  WITHDRAW_XFR_BUTTON_SPINNING: "WITHDRAW_XFR_BUTTON_SPINNING",
  WITHDRAW_BUTTON_SPINNING: "WITHDRAW_BUTTON_SPINNING",
  CURRENT_WITHDRAWABLE_AMOUNT_RECEIVED: "CURRENT_WITHDRAWABLE_AMOUNT_RECEIVED",
  PROJECT_DEPLOYMENT_INDICATOR_SUCCESS: "PROJECT_DEPLOYMENT_INDICATOR_SUCCESS",
  PROJECT_DEPLOYMENT_INDICATOR_FAILED: "PROJECT_DEPLOYMENT_INDICATOR_FAILED"
};

export default actionTypes;
