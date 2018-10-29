import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import MoreIcon from "@material-ui/icons/MoreVert";
import Drawer from "@material-ui/core/Drawer";
import { Grid, Row, Col } from "../../../helpers/react-flexbox-grid";
import { CUIAppBar, CUIButtonIcon } from "../../../helpers/material-ui";

import { openRegistrationFormAction, closeRegistrationFormAction } from "../../../actions/signinManagerActions";
import {ButtonComponent} from "../../../components/Common/FormComponents";
import "../../../static/css/app.css";

const images = {
  metamask: "/assets/Footer/metamask.png"
};

const urls = {
  metamask: "https://metamask.io/"
};

const scrnWdh = window.innerWidth;
const styles = theme => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: "30px",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto",
    },
    height: "46px",
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    height: "inherit",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: "30px",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

class HeaderPartial extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleFormCloseButtonClicked = event => {
    this.props.closeRegistrationFormAction();
  };

  handleRegistrationButtonClicked = event => {
    this.props.history.push({
      pathname: `/register`,
    });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  };

  onHandleLogoClicked = () => {
    this.props.history.push({
      pathname: `/`,
    });
  };

  onHandleProjectsClicked = () => {
    this.props.history.push({
      pathname: `/projects`,
      // search: "?contract=" + this.props.searchText
    });
  };

  onHandleGovernanceClicked = () => {
    this.props.history.push({
      pathname: `/mytokens`,
      // search: "?contract=" + this.props.searchText
    });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={this.onHandleProjectsClicked}>
          <div>Projects</div>
        </MenuItem>
        <MenuItem onClick={this.onHandleGovernanceClicked}>
          <div>My Tokens</div>
        </MenuItem>
        <MenuItem>
          <div>Publish ICO</div>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <CUIAppBar position="static" style={scrnWdh < 768 ? { height: "60px", "box-shadow": "0px 5px 25px 0px rgba(76, 169, 252, 0.25)" } : { height: "85px", "box-shadow": "0px 5px 25px 0px rgba(76, 169, 252, 0.25)" }}>
          <Grid>
            <Row>
              <Col>
                <Toolbar style={scrnWdh < 768 ? { height: "60px" } : { height: "85px" }}>
                  {scrnWdh < 768 ? (
                    <CUIButtonIcon onClick={this.handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                      <MenuIcon />
                    </CUIButtonIcon>
                  ) : (
                    <div />
                  )}

                  <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    <span onClick={this.onHandleLogoClicked} className="hdr-logo" />
                  </Typography>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <div className="hdr-itm-pad text--primary txt-m">
                      <div className="hvr-underline-from-left" onClick={this.onHandleProjectsClicked}>
                        Projects
                      </div>
                    </div>
                    <div className="hdr-itm-pad text--primary txt-m">
                      <div className="hvr-underline-from-left" onClick={this.onHandleGovernanceClicked}>
                        My Tokens
                      </div>
                    </div>
                    <div className="hdr-itm-pad text--primary txt-m">
                      <div className="hvr-underline-from-left">Publish ICO</div>
                    </div>
                    <div className="text--primary txt-m wdh-100" style={{paddingTop: '10px'}}>
                      {/* <div className="add-ellip">{this.props.userServerPublicAddress}</div> */}
                      <div>
                            {{
                              0: (
                                <a target="_blank" href={urls.metamask} rel="noopener noreferrer">
                                  <img className="push--left" src="/assets/Header/metamask.png" width="20" height="20" alt="metamask" />
                                </a>
                              ),
                              1: (
                                <a target="_blank" href={urls.metamask} rel="noopener noreferrer">
                                  Please Sign in <img className="push--left" src="/assets/Header/metamask.png" width="20" height="20" alt="metamask" />
                                </a>
                              ),
                              2: (
                                <div>
                                Wrong network.
                                  {this.props.userLocalPublicAddress}
                                {/* <ButtonComponent className="register" onClick={this.handleRegistrationButtonClicked}>Register</ButtonComponent> */}
                            </div>

                          ),
                          3: (
                            <div>
                              {this.props.userLocalPublicAddress}
                              <ButtonComponent className="register" onClick={this.handleRegistrationButtonClicked}>Become a Vault Member</ButtonComponent>
                            </div>

                          ),
                          4: (
                            <div>
                              Welcome to the vault.
                              {this.props.userLocalPublicAddress}
                              {/* <ButtonComponent className="register" onClick={this.handleRegistrationButtonClicked}>Register</ButtonComponent> */}
                            </div>
                          ),
                              5: (
                                <div>
                                Welcome to the vault, Issuer.
                              {this.props.userLocalPublicAddress}
                                </div>
                              )
                            }[this.props.signinStatusFlag]}
                          </div>
                    </div>
                  </div>
                  <div className={classes.sectionMobile}>
                    <CUIButtonIcon aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                      <MoreIcon />
                    </CUIButtonIcon>
                  </div>
                </Toolbar>
              </Col>
            </Row>
          </Grid>
        </CUIAppBar>
        {renderMenu}
        {renderMobileMenu}
        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={this.state.drawerIsOpen}
        >
          <div className={classes.drawerHeader}>
            <CUIButtonIcon onClick={this.handleDrawerClose}>
              <div>
                <ChevronLeft /> Back
              </div>
            </CUIButtonIcon>
          </div>
          <div className={classes.drawerInner}>
            <div className="hdr-itm-pad text--primary txt-m" onClick={this.onHandleProjectsClicked}>
              Projects
            </div>
            <div className="hdr-itm-pad text--primary txt-m" onClick={this.onHandleGovernanceClicked}>
              My Tokens
            </div>
            <div className="hdr-itm-pad text--primary txt-m">Publish ICO</div>
          </div>
        </Drawer>
      </div>
    );
  }
}

HeaderPartial.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openRegistrationFormAction,
      closeRegistrationFormAction,
    },
    dispatch,
  );

const mapStateToProps = state => {
  const { userRegistered, userServerPublicAddress, userIsIssuer, showRegistrationForm, isVaultMember, userLocalPublicAddress, signinStatusFlag } =
    state.signinManagerData || {};
  return {
    userRegistered,
    userServerPublicAddress,
    userIsIssuer,
    showRegistrationForm,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(HeaderPartial));
