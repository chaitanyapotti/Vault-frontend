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
  CLEAR_PROJECT_DETAILS: "CLEAR_PROJECT_DETAILS",
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
  PHONE_VERIFICATION_ERROR: "PHONE_VERIFICATION_ERROR",
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
  TEAM_ADDRESS_CHANGED: "TEAM_ADDRESS_CHANGED",
  MAX_ETHER_CONTRIBUTION_CHANGED: "MAX_ETHER_CONTRIBUTION_CHANGED",
  INITIAL_TAP_VALUE_CHANGED: "INITIAL_TAP_VALUE_CHANGED",
  TAP_INCREMENT_FACTOR_CHANGED: "TAP_INCREMENT_FACTOR_CHANGED",
  VOTE_SATURATION_LIMIT_CHANGED: "VOTE_SATURATION_LIMIT_CHANGED",
  R1_BONUS_CHANGED: "R1_BONUS_CHANGED",
  R2_BONUS_CHANGED: "R2_BONUS_CHANGED",
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
  KILL_POLLS_HISTORY_SUCCESS: "KILL_POLLS_HISTORY_SUCCESS",
  KILL_POLLS_HISTORY_FAILED: "KILL_POLLS_HISTORY_FAILED",
  TAP_POLLS_HISTORY_SUCCESS: "TAP_POLLS_HISTORY_SUCCESS",
  TAP_POLLS_HISTORY_FAILED: "TAP_POLLS_HISTORY_FAILED",
  XFR_POLLS_HISTORY_SUCCESS: "XFR_POLLS_HISTORY_SUCCESS",
  XFR_POLLS_HISTORY_FAILED: "XFR_POLLS_HISTORY_FAILED",
  PROJECT_DEPLOYMENT_INDICATOR_SUCCESS: "PROJECT_DEPLOYMENT_INDICATOR_SUCCESS",
  PROJECT_DEPLOYMENT_INDICATOR_FAILED: "PROJECT_DEPLOYMENT_INDICATOR_FAILED",
  SPEND_CURVE_DATA_SUCCESS: "SPEND_CURVE_DATA_SUCCESS",
  SPEND_CURVE_DATA_FAILED: "SPEND_CURVE_DATA_FAILED",
  VOTE_HISTOGRAM_DATA_SUCCESS: "VOTE_HISTOGRAM_DATA_SUCCESS",
  VOTE_HISTOGRAM_DATA_FAILED: "VOTE_HISTOGRAM_DATA_FAILED",
  UPLOADING_PASSPORT_DOC: "UPLOADING_PASSPORT_DOC",
  PASSPORT_UPLOAD_SUCCESS: "PASSPORT_UPLOAD_SUCCESS",
  PASSPORT_UPLOAD_FAILED: "PASSPORT_UPLOAD_FAILED",
  UPLOADING_SELFIE: "UPLOADING_SELFIE",
  SELFIE_UPLOAD_SUCCESS: "SELFIE_UPLOAD_SUCCESS",
  SELFIE_UPLOAD_FAILED: "SELFIE_UPLOAD_FAILED",
  UPLOADING_ADDRESS_DOC: "UPLOADING_ADDRESS_DOC",
  ADDRESS_DOC_UPLOAD_SUCCESS: "ADDRESS_DOC_UPLOAD_SUCCESS",
  ADDRESS_DOC_UPLOAD_FAILED: "ADDRESS_DOC_UPLOAD_FAILED",
  ADDRESS_LINE1_CHANGED: "ADDRESS_LINE1_CHANGED",
  ADDRESS_LINE2_CHANGED: "ADDRESS_LINE2_CHANGED",
  CITY_CHANGED: "CITY_CHANGED",
  USER_STATE_CHANGED: "USER_STATE_CHANGED",
  POSTAL_CODE_CHANGED: "POSTAL_CODE_CHANGED",
  COUNTRY_CHANGED: "COUNTRY_CHANGED",
  TYPE_OF_DOCUMENT_CHANGED: "TYPE_OF_DOCUMENT_CHANGED",
  DOCUMENT_NUMBER_CHANGED: "DOCUMENT_NUMBER_CHANGED",
  DATE_OF_ISSUANCE_CHANGED: "DATE_OF_ISSUANCE_CHANGED",
  DATE_OF_EXPIRATION_CHANGED: "DATE_OF_EXPIRATION_CHANGED",
  FIRST_NAME_CHANGED: "FIRST_NAME_CHANGED",
  LAST_NAME_CHANGED: "LAST_NAME_CHANGED",
  GENDER_CHANGED: "GENDER_CHANGED",
  DATE_OF_BIRTH_CHANGED: "DATE_OF_BIRTH_CHANGED",
  CITIZENSHIP_CHANGED: "CITIZENSHIP_CHANGED",
  USER_FORM_STATES_SAVED_FAILED: "USER_FORM_STATES_SAVED_FAILED",
  USER_FORM_STATES_SAVED_SUCCESS: "USER_FORM_STATES_SAVED_SUCCESS",
  USER_FORM_STATES_SUCCESS: "USER_FORM_STATES_SUCCESS",
  NEXT_BUTTON_PRESSED: "NEXT_BUTTON_PRESSED",
  BACK_BUTTON_PRESSED: "BACK_BUTTON_PRESSED",
  USER_FORM_STATES_FAILED: "USER_FORM_STATES_FAILED",
  CONDITION_ONE_CHANGED: "CONDITION_ONE_CHANGED",
  CONDITION_TWO_CHANGED: "CONDITION_TWO_CHANGED",
  USER_FORM_SUBMISSION_SUCCESS: "USER_FORM_SUBMISSION_SUCCESS",
  USER_FORM_SUBMISSION_FAILED: "USER_FORM_SUBMISSION_FAILED",
  SEARCH_TEXT_CHANGED: "SEARCH_TEXT_CHANGED",
  CLEAR_GOVERNANCE_STATES: "CLEAR_GOVERNANCE_STATES",
  DEPLOY_CONTRACT_BUTTON_SPINNING: "DEPLOY_CONTRACT_BUTTON_SPINNING",
  DEPLOY_CONTRACT_START_BUTTON_SPINNING: "DEPLOY_CONTRACT_START_BUTTON_SPINNING",
  XFR_TITLE_CHANGED: "XFR_TITLE_CHANGED",
  XFR_AMOUNT_CHANGED: "XFR_AMOUNT_CHANGED",
  XFR_DESCRIPTION_CHANGED: "XFR_DESCRIPTION_CHANGED",
  WITHDRAW_AMOUNT_CHANGED: "WITHDRAW_AMOUNT_CHANGED",
  XFR1_BUTTON_TRANSACTION_HASH_RECEIVED: "XFR1_BUTTON_TRANSACTION_HASH_RECEIVED",
  START_R1_BUTTON_TRANSACTION_HASH_RECEIVED: "START_R1_BUTTON_TRANSACTION_HASH_RECEIVED",
  START_NEW_ROUND_BUTTON_TRANSACTION_HASH_RECEIVED: "START_NEW_ROUND_BUTTON_TRANSACTION_HASH_RECEIVED",
  DEPLOY_TAP_POLL_BUTTON_TRANSACTION_HASH_RECEIVED: "DEPLOY_TAP_POLL_BUTTON_TRANSACTION_HASH_RECEIVED",
  INCREMENT_TAP_BUTTON_TRANSACTION_HASH_RECEIVED: "INCREMENT_TAP_BUTTON_TRANSACTION_HASH_RECEIVED",
  DEPLOY_XFR_POLL_TRANSACTION_HASH_RECEIVED: "DEPLOY_XFR_POLL_TRANSACTION_HASH_RECEIVED",
  WITHDRAW_XFR_BUTTON_TRANSACTION_HASH_RECEIVED: "WITHDRAW_XFR_BUTTON_TRANSACTION_HASH_RECEIVED",
  WITHDRAW_BUTTON_TRANSACTION_HASH_RECEIVED: "WITHDRAW_BUTTON_TRANSACTION_HASH_RECEIVED",
  BUY_BUTTON_TRANSACTION_HASH_RECEIVED: "BUY_BUTTON_TRANSACTION_HASH_RECEIVED",
  R1_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED: "R1_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED",
  KILL_BUTTON_TRANSACTION_HASH_RECEIVED: "KILL_BUTTON_TRANSACTION_HASH_RECEIVED",
  WHITELIST_BUTTON_TRANSACTION_HASH_RECEIVED: "WHITELIST_BUTTON_TRANSACTION_HASH_RECEIVED",
  REFUND_BY_KILL_BUTTON_TRANSACTION_HASH_RECEIVED: "REFUND_BY_KILL_BUTTON_TRANSACTION_HASH_RECEIVED",
  REFUND_BY_SOFTCAPFAIL_BUTTON_TRANSACTION_HASH_RECEIVED: "REFUND_BY_SOFTCAPFAIL_BUTTON_TRANSACTION_HASH_RECEIVED",
  TAP_BUTTON_TRANSACTION_HASH_RECEIVED: "TAP_BUTTON_TRANSACTION_HASH_RECEIVED",
  XFR2_BUTTON_TRANSACTION_HASH_RECEIVED: "XFR2_BUTTON_TRANSACTION_HASH_RECEIVED",
  KILL_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED: "KILL_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED",
  VAULT_MEMBERSHIP_REQUEST_CHECK_FAILED: "VAULT_MEMBERSHIP_REQUEST_CHECK_FAILED",
  VAULT_MEMBERSHIP_REQUEST_CHECK_SUCCESS: "VAULT_MEMBERSHIP_REQUEST_CHECK_SUCCESS",
  PROJECT_METADATA_SUCCESS: "PROJECT_METADATA_SUCCESS",
  PROJECT_METADATA_FAILED: "PROJECT_METADATA_FAILED",
  BUY_AMOUNT_CHANGED: "BUY_AMOUNT_CHANGED",
  EDIT_XFR1_DESCRIPTION_CHANGED: "EDIT_XFR1_DESCRIPTION_CHANGED",
  EDIT_XFR2_DESCRIPTION_CHANGED: "EDIT_XFR2_DESCRIPTION_CHANGED",
  XFR1_DESCRIPTION_CHANGED: "XFR1_DESCRIPTION_CHANGED",
  XFR2_DESCRIPTION_CHANGED: "XFR2_DESCRIPTION_CHANGED",
  PAGE_RELOADING: "PAGE_RELOADING",
  VAULT_MEMBERSHIP_BUTTON_SPINNING: "VAULT_MEMBERSHIP_BUTTON_SPINNING",
  VAULT_MEMBERSHIP_REQUEST_TRANSACTION_HASH_RECEIVED: "VAULT_MEMBERSHIP_REQUEST_TRANSACTION_HASH_RECEIVED",
  USER_TOKENS: "USER_TOKENS"
};

export default actionTypes;
