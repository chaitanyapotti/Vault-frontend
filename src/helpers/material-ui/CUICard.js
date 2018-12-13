import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "../../PropTypes";

/**
 * @Component Card
 *
 * @param props and their props
 * raised --> type : Boolean true | false
 *
 * @returns { CUICard, CUICardMedia, CUICardActions, CUICardHeader, CUICardText }
 *
 * @constructor MaterialUI Card
 *
 * @Example
 *
 * <CUICard raised onClick={this.handleClick} style={{backgroundColor : CS_COLORS.PRIMARY}}>
 *   <CUICardMedia srcLink="https://google.com/images/200X200.png">
 *     <CUICardHeader cardTitle='This is Title' cardSubtitle='This is subtitle' />
 *   </CUICardMedia>
 *   <CUICardText>
 *      <div style={{fontSize : '18px'}}>Text Goes here...</div>
 *      <p>Text Goes here...</p>
 *   </CUICardText>
 *   <CUICardActions>
 *     <CUIButton type={CUIButtonType.RAISED} color={CUIButtonColor.PRIMARY}>OK</CUIButton>
 *     <CUIButton color={CUIButtonColor.SECONDARY}>cancel</CUIButton>
 *   </CUICardActions>
 * </CUICard>
 *
 *@Material-Card@API https://material-ui.com/api/card/
 *@Material-CardMedia@API https://material-ui.com/api/card-media/
 *@Material-CardMedia@API https://material-ui.com/api/card-actions/
 *@Material-CardHeader@API https://material-ui.com/api/card-header/
 *@Material-CardContent: CUICardText@API https://material-ui.com/api/card-content/
 */

const CUICard = props => <Card {...props}>{props.children}</Card>;

CUICard.defaultProps = {
  style: { overflow: "unset" },
  raised: true
};

CUICard.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  raised: PropTypes.bool
};

/** *********************** CUICardMedia ************************ */
const CUICardMedia = props => <CardMedia {...props}>{props.children}</CardMedia>;

CUICardMedia.defaultProps = {
  children: null,
  srclink: null,
  mediaimg: null
};

CUICardMedia.propTypes = {
  children: PropTypes.node,
  srclink: PropTypes.string,
  mediaimg: PropTypes.string
};

/** *********************** CUICardActions ************************ */
const CUICardActions = props => <CardActions {...props}>{props.children}</CardActions>;

CUICardActions.propTypes = {
  children: PropTypes.node.isRequired
};

/** *********************** CUICardHeader ************************ */
const CUICardHeader = props => <CardHeader {...props}>{props.children}</CardHeader>;

CUICardHeader.defaultProps = {
  children: null,
  cardtitle: "",
  subtitle: "",
  headerimg: ""
};

CUICardHeader.propTypes = {
  children: PropTypes.node,
  cardtitle: PropTypes.string,
  subtitle: PropTypes.string,
  headerimg: PropTypes.string
};

/** *********************** CUICardText ************************ */
const CUICardText = props => <CardContent {...props}>{props.children}</CardContent>;

CUICardText.propTypes = {
  children: PropTypes.node.isRequired
};

export { CUICard, CUICardMedia, CUICardText, CUICardActions, CUICardHeader };
