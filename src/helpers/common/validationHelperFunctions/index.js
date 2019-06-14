import web3 from "../../web3";

const validateAdminName = name => {
  if (name.length > 100) {
    return false;
  }
  return true;
};
const validateTotalSaleTokens = input => {
  if (input === 0) {
    return true;
  }
  return false;
};
const validateUniqueName = (names, input) => {
  if (names.includes(input)) {
    return true;
  }
  return false;
};
const validateTwoDecimalPlaces = input => {
  if (parseFloat(input) < 10 && input.length < 5) {
    return true;
  }
  return false;
};

const validateOneDecimalPlace = input => {
  if (parseFloat(input) >= 10 && parseFloat(input) < 100 && input.length < 5) {
    return true;
  }
  if (parseFloat(input) >= 100 && parseFloat(input) < 999 && input.length < 6) {
    return true;
  }
  if (parseFloat(input) >= 1000 && parseFloat(input) < 9999 && input.length < 7) {
    return true;
  }
  if (parseFloat(input) >= 10000 && parseFloat(input) < 99999 && input.length < 8) {
    return true;
  }
  if (parseFloat(input) >= 100000 && parseFloat(input) < 999999 && input.length < 9) {
    return true;
  }
  if (parseFloat(input) >= 1000000 && parseFloat(input) < 9999999 && input.length < 10) {
    return true;
  }
  if (parseFloat(input) >= 10000000 && parseFloat(input) < 99999999 && input.length < 11) {
    return true;
  }
  if (parseFloat(input) >= 100000000 && parseFloat(input) < 999999999 && input.length < 11) {
    return true;
  }
  return false;
};
const validateMaxEtherContribution = input => {
  if (input < 0.1) {
    return true;
  }
  return false;
};
const validateTapIncrementFactor = input => {
  if (input < 1 || input > 2) {
    return true;
  }
  return false;
};
const validateR1BonusRange = input => {
  if (input <= 100) {
    return true;
  }
  return false;
};
const validateR2BonusRange = input => {
  if (input >= 1 && input <= 100) {
    return true;
  }
  return false;
};
const validateEntityPercentage = input => {
  if (input > 50) {
    return true;
  }
  return false;
};

const validateDecimal = input => {
  if (parseFloat(input) <= 10 && input.toString().length < 5) {
    return true;
  }
  if (parseFloat(input) > 10) {
    console.log(input, typeof input);
    const a = input.toString().split(".");
    if (a.length === 1) {
      return true;
    }
    if (typeof a[1] === "string" && a[1].length < 3) {
      return true;
    }
    return false;
  }
  return false;
};

const validateOneDecimal = input => {
  if (input <= 10 && input.length < 5) {
    return true;
  }
  if (input > 10) {
    const a = input.split(".");
    if (a.length === 1) {
      return true;
    }
    if (typeof a[1] === "string" && a[1].length < 2) {
      return true;
    }
    return false;
  }
  return false;
};
const validateVoteSaturationLimit = input => {
  if (input < 0.01 || input > 5) {
    return true;
  }
  return false;
};
const validateInitialTap = (input, fundRelease) => {
  if (input > fundRelease * 86400 * 30) {
    return true;
  }
  return false;
};
const validateLength = input => {
  if (input.length === 0) {
    return false;
  }
  return true;
};
const validateZero = input => {
  if (input === 0) {
    return false;
  }
  return true;
};
const validateProjectNameLength = input => {
  if (input.length > 32) {
    return false;
  }
  return true;
};

const validateProjectDescription = input => {
  if (input.length > 140) {
    return false;
  }
  return true;
};
const validateTokenTagLength = input => {
  if (input.length < 3 || input.length > 6) {
    return false;
  }
  return true;
};
const alphaOnly = event => /^[a-zA-Z]+$/i.test(event);
const numberOnly = event => /^[0-9]+$/i.test(event);
const validateDate = date => {
  if (date) {
    return true;
  }
  return false;
};
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const isUpperCase = str => str !== str.toUpperCase();
const validateTwitterLink = twitterLink => {
  const re = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i;
  return re.test(twitterLink);
};
const validateFacebookLink = facebookLink => {
  const re = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w-]*\/)*([\w\-.]+)(?:\/)?/i;
  return re.test(facebookLink);
};
const validateWebsiteUrl = websiteUrl => {
  const re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
  return re.test(websiteUrl);
};
const checkMetaMask = address => {
  const isValid = address ? web3.utils.checkAddressChecksum(address) : false;
  return isValid;
};
const validateGitLink = gitLink => {
  const re = /^(?:https?:\/\/)?(?:www\.)?github\.com\/(?:#!\/)?[a-zA-Z0-9_/-]+$/i;
  return re.test(gitLink);
};
const validateMediumLink = mediumLink => {
  const re = /^(?:https?:\/\/)?(?:www\.)?medium\.com\/(?:@\/)?[a-zA-Z0-9/@-]+$/i;
  return re.test(mediumLink);
};
const validateTelegramLink = telegramLink => {
  const re = /^(?:https?:\/\/)?(?:www\.)?t\.me\/joinchat\/[a-zA-Z0-9_]+$/i;
  return re.test(telegramLink);
};

export {
  validateAdminName,
  validateLength,
  validateEmail,
  isUpperCase,
  validateTwitterLink,
  validateFacebookLink,
  validateWebsiteUrl,
  validateGitLink,
  validateMediumLink,
  validateTelegramLink,
  validateProjectNameLength,
  validateTokenTagLength,
  alphaOnly,
  validateMaxEtherContribution,
  validateTapIncrementFactor,
  validateVoteSaturationLimit,
  validateInitialTap,
  validateDate,
  validateTotalSaleTokens,
  validateR1BonusRange,
  validateR2BonusRange,
  numberOnly,
  checkMetaMask,
  validateUniqueName,
  validateDecimal,
  validateEntityPercentage,
  validateTwoDecimalPlaces,
  validateOneDecimalPlace,
  validateZero,
  validateOneDecimal,
  validateProjectDescription
};
