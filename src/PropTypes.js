import PropTypes from "prop-types";
import {
  CUIButtonSize,
  CUIButtonType,
  CUICardType,
  CUIColor,
  CUIDialogMaXWidth,
  CUIInputMargin,
  CUIInputType,
  CUIModalTemplateType,
  CUIPosition,
  CUIPrefixSuffixType,
  CUIProgressType
} from "./static/js/variables";
// import { MEMBERSHIP_TYPE } from './enitites/Common';

const cuiTypes = {
  CUIInputType,
  CUIProgressType,
  CUIPosition,
  CUIButtonType,
  CUIButtonSize,
  CUIColor,
  CUIDialogMaXWidth,
  CUIInputMargin,
  CUICardType,
  CUIPrefixSuffixType,
  CUIModalTemplateType
};

function getCUIPropTypes(object) {
  return PropTypes.oneOf(Object.keys(object).map(key => object[key]));
}

const types = {};
for (const type in cuiTypes) {
  if (Object.prototype.hasOwnProperty.call(cuiTypes, type)) types[type.replace("CUI", "cui")] = getCUIPropTypes(cuiTypes[type]);
}

// types.membershipType = PropTypes.oneOf(Object.keys(MEMBERSHIP_TYPE).map(item => MEMBERSHIP_TYPE[item]));

types.basicProfile = {
  profileStatus: PropTypes.bool,
  religion: PropTypes.string,
  motherTongue: PropTypes.string,
  slug: PropTypes.string,
  displayID: PropTypes.string,
  displayName: PropTypes.string,
  gender: PropTypes.string,
  age: PropTypes.string,
  height: PropTypes.string,
  location: PropTypes.shape({
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string
  }),
  membershipType: PropTypes.string,
  income: PropTypes.string,
  displayImage: PropTypes.string,
  photos: PropTypes.shape({ count: PropTypes.number, status: PropTypes.bool, images: PropTypes.arrayOf(PropTypes.object) }),
  flag: PropTypes.shape({
    isFree: PropTypes.bool,
    isLiked: PropTypes.bool
  })
};

types.profileItem = {
  slug: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf(["space", "dot", "comma"]) // defaults to comma
};

types.profileSection = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.shape(PropTypes.profileItem))
};

types.profileImage = {
  domain_name: PropTypes.string.isRequired,
  large: PropTypes.string,
  semilarge: PropTypes.string,
  small: PropTypes.string
};

types.displayProfile = {
  uid: PropTypes.string.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  subtitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  snacks: PropTypes.arrayOf(PropTypes.string).isRequired,
  sections: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape(PropTypes.profileSection))).isRequired,
  photos: PropTypes.shape({
    count: PropTypes.number,
    status: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.shape(PropTypes.profileImage))
  }).isRequired,
  flag: PropTypes.shape({
    isActive: PropTypes.bool.isRequired
  }).isRequired
};

types.children = PropTypes.node;

types.tPhrases = PropTypes.object;

export default { ...PropTypes, ...types };
