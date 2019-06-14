const constants = {
  ACTIVE_DAICOS_FAILED_MESSAGE: "Failed to retrieve Active DAICOs, please reload the page.",
  SUCCESS: "Success",
  FAILED: "Failed",
  FEATURED_PROJECTS_FAILED_MESSAGE: "Failed to retrieve Featured projects, please reload the page",
  KILL_POLLS_HISTORY_FAILED_MESSAGE: "Failed to retrieve Kill Polls, please reload the page",
  TAP_POLLS_HISTORY_FAILED_MESSAGE: "Failed to retrieve Past Tap Polls, please reload the page",
  XFR_POLLS_HISTORY_FAILED_MESSAGE: "Failed to retrieve Past Xfr Polls, please reload the page",
  FAILED_TO_GET_PUBLIC_ADDRESS: "Failed to get your public address. Please ensure Metamask is installed and you are logged in.",
  PHONE_VERIFICATION_FAILED_MESSAGE: "Your public address or phone number already exists.",
  OTP_DID_NOT_MATCH: "OTP didn't match. Please re-enter your number and try again.",
  PROJECT_REGISTRATION_FAILED_MESSAGE: "Project registration failed.",
  ENDED_DAICOS_FAILED_MESSAGE: "Failed to retrieve Ended DAICOs, please reload the page.",
  UPCOMING_DAICOS_FAILED_MESSAGE: "Failed to retrieve Upcoming DAICOs, please reload the page.",
  USER_TOKENS_FAILED_MESSAGE: "Failed to retrieve User Tokens, please reload the page.",
  PROJECT_NAMES_FAILED_MESSAGE: "Failed to retrieve Project Names, please reload the page.",
  TOKEN_TAGS_FAILED_MESSAGE: "Failed to retrieve Token Tags, please reload the page.",
  PROJECT_STATES_FAILED_MESSAGE: "Failed to retrieve previously stored information.",
  PROJECT_STATES_SAVED_FAILED_MESSAGE: "Failed to save current form states.",
  PROJECT_DEPLOYMENT_INDICATOR_FAILED_MESSAGE: "Failed to retrieve deployment indicator, please revisit the page again.",
  SPEND_CURVE_DATA_FAILED_MESSAGE: "Failed to retrieve spend curve data, please reload the page.",
  VOTE_HISTOGRAM_DATA_FAILED_MESSAGE: "Failed to retrieve histogram data, please reload the page.",
  USER_FORM_STATES_SAVED_FAILED_MESSAGE: "Failed to save user form state.",
  USER_FORM_STATES_FAILED_MESSAGE: "Failed to retrieve previously stored information.",
  USER_FORM_SUBMISSION_FAILED_MESSAGE: "Failed to submit the form. Please try again later.",
  PROJECT_METADATA_FAILED_MESSAGE: "Failed to submit the form. Please try again later.",
  METAMASK_NOT_INSTALLED: "Metamask is not installed",
  METAMASK_NOT_SIGNED_IN: "You are not signed into Metamask",
  METAMASK_WRONG_NETWORK: "Wrong network selected. Switch to Main",
  NOT_VAULT_MEMBER: "You are not a Vault Member",
  NOT_VAULT_ISSUER: "Feature only for issuer of the DAICO"
};

export const countryList = [
  {
    code: "AF",
    name: "Afghanistan"
  },
  {
    code: "AL",
    name: "Albania"
  },
  {
    code: "DZ",
    name: "Algeria"
  },
  {
    code: "AD",
    name: "Andorra"
  },
  {
    code: "AO",
    name: "Angola"
  },
  {
    code: "AI",
    name: "Anguilla"
  },
  {
    code: "AG",
    name: "Antigua and Barbuda"
  },
  {
    code: "AR",
    name: "Argentina"
  },
  {
    code: "AM",
    name: "Armenia"
  },
  {
    code: "AW",
    name: "Aruba"
  },
  {
    code: "AU",
    name: "Australia"
  },
  {
    code: "AT",
    name: "Austria"
  },
  {
    code: "AZ",
    name: "Azerbaijan"
  },
  {
    code: "BS",
    name: "Bahamas"
  },
  {
    code: "BH",
    name: "Bahrain"
  },
  {
    code: "BD",
    name: "Bangladesh"
  },
  {
    code: "BB",
    name: "Barbados"
  },
  {
    code: "BY",
    name: "Belarus"
  },
  {
    code: "BE",
    name: "Belgium"
  },
  {
    code: "BZ",
    name: "Belize"
  },
  {
    code: "BJ",
    name: "Benin"
  },
  {
    code: "BM",
    name: "Bermuda"
  },
  {
    code: "BT",
    name: "Bhutan"
  },
  {
    code: "BO",
    name: "Bolivia"
  },
  {
    code: "BA",
    name: "Bosnia Herzegovina"
  },
  {
    code: "BW",
    name: "Botswana"
  },
  {
    code: "BV",
    name: "Bouvet Island"
  },
  {
    code: "BR",
    name: "Brazil"
  },
  {
    code: "IO",
    name: "British Indian Ocean Territory"
  },
  {
    code: "VG",
    name: "British Virgin Islands"
  },
  {
    code: "BN",
    name: "Brunei Darussalam"
  },
  {
    code: "BG",
    name: "Bulgaria"
  },
  {
    code: "BF",
    name: "Burkina Faso"
  },
  {
    code: "BI",
    name: "Burundi"
  },
  {
    code: "KH",
    name: "Cambodia"
  },
  {
    code: "CM",
    name: "Cameroon"
  },
  {
    code: "CA",
    name: "Canada"
  },
  {
    code: "CV",
    name: "Cape Verde"
  },
  {
    code: "KY",
    name: "Cayman Islands"
  },
  {
    code: "CF",
    name: "Central African Republic"
  },
  {
    code: "TD",
    name: "Chad"
  },
  {
    code: "CL",
    name: "Chile"
  },
  {
    code: "CN",
    name: "China"
  },
  {
    code: "CX",
    name: "Christmas Island"
  },
  {
    code: "CC",
    name: "Cocos (Keeling) Islands"
  },
  {
    code: "CO",
    name: "Colombia"
  },
  {
    code: "KM",
    name: "Comoros"
  },
  {
    code: "CG",
    name: "Congo"
  },
  {
    code: "CD",
    name: "Congo (The Democratic Republic of the)"
  },
  {
    code: "CK",
    name: "Cook Islands"
  },
  {
    code: "CR",
    name: "Costa Rica"
  },
  {
    code: "CI",
    name: "Cote d Ivoire (Ivory Coast)"
  },
  {
    code: "HR",
    name: "Croatia"
  },
  {
    code: "CU",
    name: "Cuba"
  },
  {
    code: "CY",
    name: "Cyprus"
  },
  {
    code: "CZ",
    name: "Czech Republic"
  },
  {
    code: "DK",
    name: "Denmark"
  },
  {
    code: "DJ",
    name: "Djibouti"
  },
  {
    code: "DM",
    name: "Dominica"
  },
  {
    code: "DO",
    name: "Dominican Republic"
  },
  {
    code: "TL",
    name: "East Timor"
  },
  {
    code: "EC",
    name: "Ecuador"
  },
  {
    code: "EG",
    name: "Egypt"
  },
  {
    code: "SV",
    name: "El Salvador"
  },
  {
    code: "GQ",
    name: "Equatorial Guinea"
  },
  {
    code: "ER",
    name: "Eritrea"
  },
  {
    code: "EE",
    name: "Estonia"
  },
  {
    code: "ET",
    name: "Ethiopia"
  },
  {
    code: "FK",
    name: "Falkland Islands (Malvinas)"
  },
  {
    code: "FO",
    name: "Faroe Islands"
  },
  {
    code: "FJ",
    name: "Fiji"
  },
  {
    code: "FI",
    name: "Finland"
  },
  {
    code: "FR",
    name: "France"
  },
  {
    code: "GF",
    name: "French Guiana"
  },
  {
    code: "PF",
    name: "French Polynesia"
  },
  {
    code: "TF",
    name: "French Southern Territories"
  },
  {
    code: "GA",
    name: "Gabon"
  },
  {
    code: "GM",
    name: "Gambia"
  },
  {
    code: "GE",
    name: "Georgia"
  },
  {
    code: "DE",
    name: "Germany"
  },
  {
    code: "GH",
    name: "Ghana"
  },
  {
    code: "GI",
    name: "Gibraltar"
  },
  {
    code: "GR",
    name: "Greece"
  },
  {
    code: "GL",
    name: "Greenland"
  },
  {
    code: "GD",
    name: "Grenada"
  },
  {
    code: "GP",
    name: "Guadeloupe"
  },
  {
    code: "GT",
    name: "Guatemala"
  },
  {
    code: "GN",
    name: "Guinea"
  },
  {
    code: "GW",
    name: "Guinea-Bissau"
  },
  {
    code: "GY",
    name: "Guyana"
  },
  {
    code: "HT",
    name: "Haiti"
  },
  {
    code: "HM",
    name: "Heard Island and McDonald Islands"
  },
  {
    code: "VA",
    name: "Holy See (Vatican City State)"
  },
  {
    code: "HN",
    name: "Honduras"
  },
  {
    code: "HK",
    name: "Hong Kong"
  },
  {
    code: "HU",
    name: "Hungary"
  },
  {
    code: "IS",
    name: "Iceland"
  },
  {
    code: "IN",
    name: "India"
  },
  {
    code: "ID",
    name: "Indonesia"
  },
  {
    code: "IQ",
    name: "Iraq"
  },
  {
    code: "IE",
    name: "Ireland"
  },
  {
    code: "IR",
    name: "Islamic Republic of Iran"
  },
  {
    code: "IL",
    name: "Israel"
  },
  {
    code: "IT",
    name: "Italy"
  },
  {
    code: "JM",
    name: "Jamaica"
  },
  {
    code: "JP",
    name: "Japan"
  },
  {
    code: "JO",
    name: "Jordan"
  },
  {
    code: "KZ",
    name: "Kazakhstan"
  },
  {
    code: "KE",
    name: "Kenya"
  },
  {
    code: "KI",
    name: "Kiribati"
  },
  {
    code: "KP",
    name: "Korea (Democratic People s Republic of)"
  },
  {
    code: "KR",
    name: "Korea (Republic of)"
  },
  {
    code: "KW",
    name: "Kuwait"
  },
  {
    code: "KG",
    name: "Kyrgzstan"
  },
  {
    code: "LA",
    name: "Lao People s Democratic Republic"
  },
  {
    code: "LV",
    name: "Latvia"
  },
  {
    code: "LB",
    name: "Lebanon"
  },
  {
    code: "LS",
    name: "Lesotho"
  },
  {
    code: "LR",
    name: "Liberia"
  },
  {
    code: "LY",
    name: "Libyan Arab Jamahiriya"
  },
  {
    code: "LI",
    name: "Liechtenstein"
  },
  {
    code: "LT",
    name: "Lithuania"
  },
  {
    code: "LU",
    name: "Luxembourg"
  },
  {
    code: "MO",
    name: "Macao"
  },
  {
    code: "MK",
    name: "Macedonia (The Former Yugoslav Republic of)"
  },
  {
    code: "MG",
    name: "Madagascar"
  },
  {
    code: "MW",
    name: "Malawi"
  },
  {
    code: "MY",
    name: "Malaysia"
  },
  {
    code: "MV",
    name: "Maldives"
  },
  {
    code: "ML",
    name: "Mali"
  },
  {
    code: "MT",
    name: "Malta"
  },
  {
    code: "MH",
    name: "Marshall Islands"
  },
  {
    code: "MQ",
    name: "Martinique"
  },
  {
    code: "MR",
    name: "Mauritania"
  },
  {
    code: "MU",
    name: "Mauritius"
  },
  {
    code: "YT",
    name: "Mayotte"
  },
  {
    code: "MX",
    name: "Mexico"
  },
  {
    code: "MD",
    name: "Moldova"
  },
  {
    code: "MC",
    name: "Monaco"
  },
  {
    code: "MN",
    name: "Mongolia"
  },
  {
    code: "MS",
    name: "Montserrat"
  },
  {
    code: "MA",
    name: "Morocco"
  },
  {
    code: "MZ",
    name: "Mozambique"
  },
  {
    code: "MM",
    name: "Myanmar"
  },
  {
    code: "NA",
    name: "Namibia"
  },
  {
    code: "NR",
    name: "Nauru"
  },
  {
    code: "NP",
    name: "Nepal"
  },
  {
    code: "NL",
    name: "Netherlands"
  },
  {
    code: "AN",
    name: "Netherlands Antilles"
  },
  {
    code: "NC",
    name: "New Caledonia"
  },
  {
    code: "NZ",
    name: "New Zealand"
  },
  {
    code: "NI",
    name: "Nicaragua"
  },
  {
    code: "NE",
    name: "Niger"
  },
  {
    code: "NG",
    name: "Nigeria"
  },
  {
    code: "NU",
    name: "Niue"
  },
  {
    code: "NF",
    name: "Norfolk Island"
  },
  {
    code: "NO",
    name: "Norway"
  },
  {
    code: "OM",
    name: "Oman"
  },
  {
    code: "PK",
    name: "Pakistan"
  },
  {
    code: "PW",
    name: "Palau"
  },
  {
    code: "PA",
    name: "Panama"
  },
  {
    code: "PG",
    name: "Papua New Guinea"
  },
  {
    code: "PY",
    name: "Paraguay"
  },
  {
    code: "PE",
    name: "Peru"
  },
  {
    code: "PH",
    name: "Philippines"
  },
  {
    code: "PN",
    name: "Pitcairn"
  },
  {
    code: "PL",
    name: "Poland"
  },
  {
    code: "PT",
    name: "Portugal"
  },
  {
    code: "QA",
    name: "Qatar"
  },
  {
    code: "RE",
    name: "Reunion"
  },
  {
    code: "RO",
    name: "Romania"
  },
  {
    code: "RU",
    name: "Russian Federation"
  },
  {
    code: "RW",
    name: "Rwanda"
  },
  {
    code: "SH",
    name: "Saint Helena"
  },
  {
    code: "KN",
    name: "Saint Kitts and Nevis"
  },
  {
    code: "LC",
    name: "Saint Lucia"
  },
  {
    code: "PM",
    name: "Saint Pierre and Miquelon"
  },
  {
    code: "VC",
    name: "Saint Vincent and the Grenadines"
  },
  {
    code: "WS",
    name: "Samoa"
  },
  {
    code: "SM",
    name: "San Marino"
  },
  {
    code: "ST",
    name: "Sao Tome and Principe"
  },
  {
    code: "SA",
    name: "Saudi Arabia"
  },
  {
    code: "SN",
    name: "Senegal"
  },
  {
    code: "RS",
    name: "Serbia"
  },
  {
    code: "SC",
    name: "Seychelles"
  },
  {
    code: "SL",
    name: "Sierra Leone"
  },
  {
    code: "SG",
    name: "Singapore"
  },
  {
    code: "SK",
    name: "Slovakia"
  },
  {
    code: "SI",
    name: "Slovenia"
  },
  {
    code: "SB",
    name: "Solomon Islands"
  },
  {
    code: "SO",
    name: "Somalia"
  },
  {
    code: "ZA",
    name: "South Africa"
  },
  {
    code: "GS",
    name: "South Georgia and the South Sandwich Islands"
  },
  {
    code: "ES",
    name: "Spain"
  },
  {
    code: "LK",
    name: "Sri Lanka"
  },
  {
    code: "SD",
    name: "Sudan"
  },
  {
    code: "SR",
    name: "Suriname"
  },
  {
    code: "SJ",
    name: "Svalbard and Jan Mayen"
  },
  {
    code: "SZ",
    name: "Swaziland"
  },
  {
    code: "SE",
    name: "Sweden"
  },
  {
    code: "CH",
    name: "Switzerland"
  },
  {
    code: "SY",
    name: "Syrian Arab Republic"
  },
  {
    code: "TW",
    name: "Taiwan"
  },
  {
    code: "TJ",
    name: "Tajikstan"
  },
  {
    code: "TZ",
    name: "Tanzania United Republic"
  },
  {
    code: "TH",
    name: "Thailand"
  },
  {
    code: "TG",
    name: "Togo"
  },
  {
    code: "TK",
    name: "Tokelau"
  },
  {
    code: "TO",
    name: "Tonga"
  },
  {
    code: "TT",
    name: "Trinidad and Tobago"
  },
  {
    code: "TN",
    name: "Tunisia"
  },
  {
    code: "TR",
    name: "Turkey"
  },
  {
    code: "TM",
    name: "Turkmenistan"
  },
  {
    code: "TC",
    name: "Turks and Caicos Islands"
  },
  {
    code: "TV",
    name: "Tuvalu"
  },
  {
    code: "UG",
    name: "Uganda"
  },
  {
    code: "UA",
    name: "Ukraine"
  },
  {
    code: "AE",
    name: "United Arab Emirates"
  },
  {
    code: "GB",
    name: "United Kingdom"
  },
  {
    code: "US",
    name: "United States"
  },
  {
    code: "UY",
    name: "Uruguay"
  },
  {
    code: "UZ",
    name: "Uzbekistan"
  },
  {
    code: "VU",
    name: "Vanuatu"
  },
  {
    code: "VE",
    name: "Venezuela"
  },
  {
    code: "VN",
    name: "Vietnam"
  },
  {
    code: "WF",
    name: "Wallis and Futuna"
  },
  {
    code: "EH",
    name: "Western Sahara"
  },
  {
    code: "YE",
    name: "Yemen"
  },
  {
    code: "ZM",
    name: "Zambia"
  },
  {
    code: "ZW",
    name: "Zimbabwe"
  }
];

export default constants;
