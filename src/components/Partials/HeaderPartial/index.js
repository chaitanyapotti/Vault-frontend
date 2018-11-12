import React from "react";
import { Redirect } from 'react-router';
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
import { ButtonComponent } from "../../Common/FormComponents";
import "../../../static/css/app.css";
import AlertModal from "../../Common/AlertModal";
import Warning from "@material-ui/icons/Warning";

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
  srchlogo:{
    fill: 'rgba(61, 61, 61, 0.25)'
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    height: "inherit",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: "30px",
    fontSize: '16px'
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
    signInModalOpen: false
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
    this.props.searchTextChangeAction("")
    // this.setState({ searchText: "" });
    this.props.history.push({
      pathname: `/`
    });
  };

  onHandleProjectsClicked = () => {
    // this.setState({ searchText: "" });
    this.props.searchTextChangeAction("")
    this.props.history.push({
      pathname: `/projects`
    });
  };

  onHandleGovernanceClicked = () => {
    // this.setState({ searchText: "" });
    this.props.searchTextChangeAction("")
    this.props.history.push({
      pathname: `/mytokens`
    });
  };

  onHandlePublishDaicoClicked = () => {
    this.props.searchTextChangeAction("");
    // this.setState({ searchText: "" });
    this.props.history.push( `/registration`);
  };

  searchProject = e => {
    this.props.searchTextChangeAction(e.target.value)
    // this.setState({
    //   searchText: e.target.value
    // });
  };

  handleSearch = e => {
    if (e.keyCode === 13) {
      const { history, getSearchResults: fetchSearchResults } = this.props || {};
      const { searchText } = this.props;
      if (searchText===""){
        history.push({
          pathname: `/`
        });   
      }else{
        fetchSearchResults(searchText);
        history.push(`/search?q=${searchText}`);
      }
      
    }
  };

  signinButtonClicked = e => { };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { isIssuerChecked, isMetamaskNetworkChecked, isMetamaskInstallationChecked, isUserDefaultAccountChecked, isVaultMembershipChecked } =
      this.props || {};
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
          <div>Projects</div>
        </MenuItem>
        {this.props.signinStatusFlag === 4 || this.props.signinStatusFlag === 5 ? (
          <MenuItem onClick={this.onHandleGovernanceClicked}>
            <div>My Tokens</div>
          </MenuItem>
        ) : null}
        {this.props.signinStatusFlag === 5 ? (
          <MenuItem onClick={this.onHandlePublishDaicoClicked}>
            <div>Publish DAICO</div>
          </MenuItem>
        ) : null}
      </Menu>
    );

    return (
      <div>
        {isIssuerChecked && isMetamaskNetworkChecked && isMetamaskInstallationChecked && isUserDefaultAccountChecked && isVaultMembershipChecked ? (
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
                          placeholder="Search…"
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
                            Projects
                          </div>
                        </div>
                        {this.props.signinStatusFlag === 4 || this.props.signinStatusFlag === 5 ? (
                          <div className="hdr-itm-pad text--primary txt-m">
                            <div className="hvr-underline-from-left" onClick={this.onHandleGovernanceClicked}>
                              My Tokens
                            </div>
                          </div>
                        ) : null}
                        {this.props.signinStatusFlag === 5 ? (
                          <div className="hdr-itm-pad text--primary txt-m">
                            <div onClick={this.onHandlePublishDaicoClicked} className="hvr-underline-from-left">
                              Publish DAICO
                            </div>
                          </div>
                        ) : null}

                        <div className="text--primary txt-m push-half--top">
                          <div className="text--center">
                            {
                              {
                                0: (
                                  <a target="_blank" href={urls.metamask} rel="noopener noreferrer">
                                    <ButtonComponent style={{boxShadow: 'none' }} onClick={()=>{}}>
                                      <div className="soft-half--sides">
                                        <img className="push-left--10" src="/assets/Header/metamask.png" width="20" height="20" alt="metamask" /> 
                                        <span style={{top: '3px'}} className="push-half--left pos-rel">Install</span>
                                      </div>
                                    </ButtonComponent>
                                  </a>
                                ),
                                1: (
                                  <ButtonComponent style={{boxShadow: 'none' }} onClick={this.handleSignInModalOpen}>
                                    <div className="soft-half--sides">
                                      <img className="push-left--10" src="/assets/Header/metamask.png" width="20" height="20" alt="metamask" /> 
                                      <span style={{top: '3px'}} className="push-half--left pos-rel">Sign in</span>
                                    </div>
                                  </ButtonComponent>
                                ),
                                2: (
                                  <div>
                                    <ButtonComponent>Wrong network</ButtonComponent>
                                    <div style={{ width: "150px" }} className="txt-ellipsis">
                                      {this.props.userLocalPublicAddress}
                                    </div>
                                    <CUIButton className="btn bg-yellow txt-p-vault txt-dddbld text--white">Wrong network</CUIButton>
                                    {/* <ButtonComponent className="register" onClick={this.handleRegistrationButtonClicked}>Register</ButtonComponent> */}
                                  </div>
                                ),
                                3: (
                                  <div>
                                    <div style={{ width: "150px" }} className="txt-ellipsis">
                                      {this.props.userLocalPublicAddress}
                                    </div>
                                    <ButtonComponent style={{boxShadow: 'none' }} className="register" onClick={this.handleRegistrationButtonClicked}>
                                      Become a Vault Member
                                    </ButtonComponent>
                                  </div>
                                ),
                                4: (
                                  <div>
                                    <ButtonComponent style={{boxShadow: 'none' }}>{this.props.userLocalPublicAddress.slice(0, 6)}</ButtonComponent>
                                    {/* <ButtonComponent className="register" onClick={this.handleRegistrationButtonClicked}>Register</ButtonComponent> */}
                                  </div>
                                ),
                                5: (
                                  <div>
                                    <ButtonComponent style={{boxShadow: 'none' }}>{this.props.userLocalPublicAddress.slice(0, 6)}</ButtonComponent>
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
                  Projects
                </div>
                {this.props.signinStatusFlag === 4 || this.props.signinStatusFlag === 5 ? (
                  <div className="hdr-itm-pad text--primary txt-m" onClick={this.onHandleGovernanceClicked}>
                    My Tokens
                  </div>
                ) : null}
                {this.props.signinStatusFlag === 5 ? (
                  <div className="hdr-itm-pad text--primary txt-m">
                    <div onClick={this.onHandlePublishDaicoClicked} className="hdr-itm-pad text--primary txt-m">
                      Publish DAICO
                    </div>
                    </div>
                ) : null}
              </div>
            </Drawer>
          </div>
        ) : null}
        <AlertModal open={signInModalOpen} handleClose={this.handleSignInModalClose}>
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--center push--top">You are not signed in. Please use the browser extension Metamask to sign in.</div>
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
      searchTextChangeAction
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
    isVaultMembershipChecked
  } = state.signinManagerData || {};

  const {
    searchText
  } = state.searchReducer || {}
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
    searchText
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HeaderPartial));
