const validateAdminName = name => {
  if (name.length > 100) {
    return false;
  }
  return true;
};
const validateLength = input => {
  if (input.length === 0) {
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
const validateTokenTagLength = input => {
  if (input.length < 3 || input.length > 9) {
    return false;
  }
  return true;
};
const alphaOnly = event => /^[a-zA-Z]+$/i.test(event);
const validateEmail = email => {
  const re = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
  return re.test(email);
};
const isUpperCase = str => str !== str.toUpperCase();
const validateTwitterLink = twitterLink => {
  const re = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i;
  return re.test(twitterLink);
};
const validateFacebookLink = facebookLink => {
  const re = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
  return re.test(facebookLink);
};
const validateWebsiteUrl = websiteUrl => {
  const re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
  return re.test(websiteUrl);
};
const validateGitLink = gitLink => {
  const re = /^(?:https?:\/\/)?(?:www\.)?github\.com\/(#!\/)?[a-zA-Z0-9_]+$/i;
  return re.test(gitLink);
};
const validateMediumLink = mediumLink => {
  const re = /^(?:https?:\/\/)?(?:www\.)?medium\.com\/(@)?[a-zA-Z0-9_]+$/i;
  return re.test(mediumLink);
};
const validateTelegramLink = telegramLink => {
  const re = /^(?:https?:\/\/)?(?:www\.)?t\.me\/(#!\/)?[a-zA-Z0-9_]+$/i;
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
  alphaOnly
};
