import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
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
import { CUIAppBar, CUIButtonIcon, CUIButton } from "../../../helpers/material-ui";
import { getSearchResults, searchTextChangeAction } from "../../../actions/searchActions/index";
import { openRegistrationFormAction, closeRegistrationFormAction } from "../../../actions/signinManagerActions";
import { fetchProjectDetails } from "../../../actions/deployerActions";
import { clearProjectDetails } from "../../../actions/projectRegistrationActions";
import { ButtonComponent } from "../../Common/FormComponents";
import "../../../static/css/app.css";
import AlertModal from "../../Common/AlertModal";
import Warning from "@material-ui/icons/Warning";
import Loader from "../../Loaders/loader";
import SubHeader from "../../Common/Subheader";
// import { formatAddress } from "../../../helpers/common/addressDisplayFormatter";

// const images = {
//   metamask: "/assets/Footer/metamask.png"
// };

const urls = {
  metamask: "https://metamask.io/"
};

const scrnWdh = window.innerWidth;
const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: "30px",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    },
    height: "46px"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  srchlogo: {
    fill: "rgba(61, 61, 61, 0.25)"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    height: "inherit",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: "30px",
    fontSize: "16px"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class HeaderPartial extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    signInModalOpen: false,
    drawerIsOpen: false
  };

  handleSignInModalOpen = () => this.setState({ signInModalOpen: true });

  handleSignInModalClose = () => this.setState({ signInModalOpen: false });

  handleFormCloseButtonClicked = event => {
    this.props.closeRegistrationFormAction();
  };

  handleRegistrationButtonClicked = event => {
    this.props.history.push({
      pathname: `/register`
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
    this.props.searchTextChangeAction("");
    // this.setState({ searchText: "" });
    this.props.history.push({
      pathname: `/`
    });
  };

  onHandleProjectsClicked = () => {
    // this.setState({ searchText: "" });
    this.props.searchTextChangeAction("");
    this.props.history.push({
      pathname: `/projects`
    });
  };

  onHandleGovernanceClicked = () => {
    // this.setState({ searchText: "" });
    this.props.searchTextChangeAction("");
    this.props.history.push({
      pathname: `/mytokens`
    });
  };

  onHandleManageDaicoClicked = () => {
    this.props.searchTextChangeAction("");
    this.props.clearProjectDetails();
    this.props.fetchProjectDetails("", this.props.userLocalPublicAddress);
    setTimeout(() => {
      this.props.history.push({
        pathname: "/deploy",
        search: `?projectid=${this.props.project_id}`
      });
    }, 1000);
  };

  onHandlePublishDaicoClicked = () => {
    this.props.searchTextChangeAction("");
    // this.setState({ searchText: "" });
    this.props.history.push(`/registration`);
  };

  searchProject = e => {
    this.props.searchTextChangeAction(e.target.value);
    // this.setState({
    //   searchText: e.target.value
    // });
  };

  handleSearch = e => {
    if (e.keyCode === 13) {
      const { history, getSearchResults: fetchSearchResults } = this.props || {};
      const { searchText } = this.props;
      if (searchText === "") {
        history.push({
          pathname: `/`
        });
      } else {
        fetchSearchResults(searchText);
        history.push(`/search?q=${searchText}`);
      }
    }
  };

  onCopyClickAddress = () => {
    const { userLocalPublicAddress } = this.props || {};
    const textField = document.createElement("textarea");
    textField.contentEditable = true;
    textField.readOnly = false;
    textField.setSelectionRange(0, 9999999);
    textField.innerText = userLocalPublicAddress;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  signinButtonClicked = e => {};

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { isIssuerChecked, isMetamaskNetworkChecked, isMetamaskInstallationChecked, isUserDefaultAccountChecked, isVaultMembershipChecked } =
      this.props || {};
    const { userDetails } = this.props || {};
    const { firstName } = userDetails || "";
    const { signInModalOpen } = this.state || {};

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
          <span className="hdr-menu-cnt">{this.props.networkName ? `Projects: ${this.props.networkName}` : `Projects`}</span>
        </MenuItem>
        {this.props.signinStatusFlag === 4 || this.props.signinStatusFlag === 5 ? (
          <MenuItem onClick={this.onHandleGovernanceClicked}>
            <span className="hdr-menu-cnt">My Tokens</span>
          </MenuItem>
        ) : null}
        {this.props.signinStatusFlag === 5 ? (
          <div>
            {this.props.manageDaico ? (
              <MenuItem onClick={this.onHandleManageDaicoClicked}>
                <span className="hdr-menu-cnt">Manage DAICO</span>
              </MenuItem>
            ) : (
              <MenuItem onClick={this.onHandlePublishDaicoClicked}>
                <span className="hdr-menu-cnt">Publish DAICO</span>
              </MenuItem>
            )}
          </div>
        ) : null}
      </Menu>
    );
    // const random = Math.random() * (1 - 0.7) + 0.7;
    return (
      <div>
        {isIssuerChecked && isMetamaskNetworkChecked && isMetamaskInstallationChecked && isUserDefaultAccountChecked && isVaultMembershipChecked ? (
          <div>
            <div className={classes.root}>
              <CUIAppBar
                position="static"
                style={
                  scrnWdh < 768
                    ? { height: "60px", boxShadow: "0px 5px 25px 0px rgba(76, 169, 252, 0.25)" }
                    : { height: "85px", boxShadow: "0px 5px 25px 0px rgba(76, 169, 252, 0.25)" }
                }
              >
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <Toolbar style={scrnWdh < 768 ? { height: "60px" } : { height: "85px", padding: 0 }}>
                        {scrnWdh < 768 ? (
                          <CUIButtonIcon onClick={this.handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                          </CUIButtonIcon>
                        ) : (
                          <div />
                        )}

                        <div className={classes.title}>
                          <span onClick={this.onHandleLogoClicked} className="hdr-logo" />
                        </div>
                        <div className={classes.search}>
                          <div className={classes.searchIcon}>
                            <SearchIcon className={classes.srchlogo} />
                          </div>
                          <InputBase
                            placeholder="Search"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput
                            }}
                            value={this.props.searchText}
                            onChange={this.searchProject}
                            onKeyDown={this.handleSearch}
                          />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                          <div className="hdr-itm-pad text--primary txt-m">
                            <div className="hvr-underline-from-left" onClick={this.onHandleProjectsClicked}>
                              <span className="hdr-menu-cnt">{this.props.networkName ? `Projects: ${this.props.networkName}` : `Projects`}</span>
                            </div>
                          </div>
                          {this.props.signinStatusFlag === 4 || this.props.signinStatusFlag === 5 ? (
                            <div className="hdr-itm-pad text--primary txt-m">
                              <div className="hvr-underline-from-left" onClick={this.onHandleGovernanceClicked}>
                                <span className="hdr-menu-cnt">My Tokens</span>
                              </div>
                            </div>
                          ) : null}
                          {this.props.signinStatusFlag === 5 ? (
                            <div className="hdr-itm-pad text--primary txt-m">
                              {this.props.manageDaico ? (
                                <div onClick={this.onHandleManageDaicoClicked} className="hvr-underline-from-left">
                                  <span className="hdr-menu-cnt">Manage DAICO</span>
                                </div>
                              ) : (
                                <div onClick={this.onHandlePublishDaicoClicked} className="hvr-underline-from-left">
                                  <span className="hdr-menu-cnt">Publish DAICO</span>
                                </div>
                              )}
                            </div>
                          ) : null}

                          <div className="text--primary txt-m push-half--top">
                            <div className="text--center">
                              {
                                {
                                  0: (
                                    <a target="_blank" href={urls.metamask} rel="noopener noreferrer">
                                      <ButtonComponent onClick={() => {}}>
                                        <div className="soft-half--sides">
                                          <img className="push-left--10" src="/assets/Header/metamask.png" width="20" height="20" alt="metamask" />
                                          <span style={{ top: "3px" }} className="push-half--left pos-rel">
                                            Install
                                          </span>
                                        </div>
                                      </ButtonComponent>
                                    </a>
                                  ),
                                  1: (
                                    <ButtonComponent onClick={this.handleSignInModalOpen}>
                                      <div className="soft-half--sides">
                                        <img className="push-left--10" src="/assets/Header/metamask.png" width="20" height="20" alt="metamask" />
                                        <span style={{ top: "3px" }} className="push-half--left pos-rel">
                                          Sign in
                                        </span>
                                      </div>
                                    </ButtonComponent>
                                  ),
                                  2: (
                                    <div>
                                      <CUIButton className="btn bg-yellow txt-p-vault txt-dddbld text--white">Wrong network</CUIButton>
                                      {/* <div style={{ width: "150px" }} className="txt-ellipsis">
                                        {formatAddress(this.props.userLocalPublicAddress)}
                                      </div> */}

                                      {/* <ButtonComponent className="register" onClick={this.handleRegistrationButtonClicked}>Register</ButtonComponent> */}
                                    </div>
                                  ),
                                  3: (
                                    <div>
                                      {/* <div style={{ width: "150px" }} className="txt-ellipsis">
                                      {this.props.userLocalPublicAddress}
                                    </div> */}
                                      {/* <div style={{ width: "150px" }}>{formatAddress(this.props.userLocalPublicAddress)}</div> */}
                                      <ButtonComponent onClick={this.handleRegistrationButtonClicked}>Become a Vault Member</ButtonComponent>
                                    </div>
                                  ),
                                  4: (
                                    <div>
                                      <ButtonComponent onClick={this.onCopyClickAddress}>
                                        <span>Hi {firstName}</span>
                                        {/* {this.props.userLocalPublicAddress.slice(0, 6)} */}
                                      </ButtonComponent>
                                      {/* <ButtonComponent className="register" onClick={this.handleRegistrationButtonClicked}>Register</ButtonComponent> */}
                                    </div>
                                  ),
                                  5: (
                                    <div>
                                      <ButtonComponent onClick={this.onCopyClickAddress}>
                                        <span>Hi {firstName}</span>
                                        {/* {this.props.userLocalPublicAddress.slice(0, 6)} */}
                                      </ButtonComponent>
                                    </div>
                                  )
                                }[this.props.signinStatusFlag]
                              }
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
                  paper: classes.drawerPaper
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
                    <span className="hdr-menu-cnt">{this.props.networkName ? `Projects: ${this.props.networkName}` : `Projects`}</span>
                  </div>
                  {this.props.signinStatusFlag === 4 || this.props.signinStatusFlag === 5 ? (
                    <div className="hdr-itm-pad text--primary txt-m" onClick={this.onHandleGovernanceClicked}>
                      <span className="hdr-menu-cnt">My Tokens</span>
                    </div>
                  ) : null}
                  {this.props.signinStatusFlag === 5 ? (
                    <div className="hdr-itm-pad text--primary txt-m">
                      {this.props.manageDaico ? (
                        <div onClick={this.onHandleManageDaicoClicked} className="hdr-itm-pad text--primary txt-m">
                          <span className="hdr-menu-cnt">Manage DAICO</span>
                        </div>
                      ) : (
                        <div onClick={this.onHandlePublishDaicoClicked} className="hdr-itm-pad text--primary txt-m lnk--i">
                          <span className="hdr-menu-cnt">Publish DAICO</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              </Drawer>
            </div>
            <SubHeader />
          </div>
        ) : (
          <Grid>
            <Loader rows={1} />
          </Grid>
        )}
        <AlertModal open={signInModalOpen} handleClose={this.handleSignInModalClose}>
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--left push--top">You are not signed in. Please use the browser extension Metamask to sign in.</div>
        </AlertModal>
      </div>
    );
  }
}

HeaderPartial.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openRegistrationFormAction,
      closeRegistrationFormAction,
      getSearchResults,
      searchTextChangeAction,
      clearProjectDetails,
      fetchProjectDetails
    },
    dispatch
  );

const mapStateToProps = state => {
  const {
    userRegistered,
    userServerPublicAddress,
    userIsIssuer,
    showRegistrationForm,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    manageDaico,
    deploymentIndicator,
    project_id,
    userDetails,
    networkName
  } = state.signinManagerData || {};

  const { searchText } = state.searchReducer || {};
  return {
    userRegistered,
    userServerPublicAddress,
    userIsIssuer,
    showRegistrationForm,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    searchText,
    manageDaico,
    deploymentIndicator,
    project_id,
    userDetails,
    networkName
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HeaderPartial));
