import React from "react";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "../../PropTypes";

/**
 * @Component Avatar
 *
 * @param props and their values
 * imgsrc --> src String
 * imgsize --> String
 *
 * @returns { CUIAvatar }
 *
 * @constructor MaterialUI Avatar
 *
 * @Example
 *
 * <CUIAvatar imgsrc='https://google.com/images/200X200.png' imgsize="40" style={{borderRadius : '50%' ,width : '40px' , height : '40px'}}/>
 *
 * @Material-Avatar@API https://material-ui.com/api/avatar/
 */

const CUIAvatar = props => {
  const avatarProps = {
    style: props.style,
    src: props.imgSrc,
  };
  return <Avatar {...avatarProps} />;
};

CUIAvatar.defaultProps = {
  imgSrc: "",
  style: {},
};

CUIAvatar.propTypes = {
  style: PropTypes.shape(),
  imgSrc: PropTypes.string,
};

export default CUIAvatar;
