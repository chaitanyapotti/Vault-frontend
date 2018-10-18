import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from '@material-ui/core/Drawer';
import {Grid,Row, Col} from '../../../helpers/react-flexbox-grid';
import { CUIAppBar, CUIButtonIcon } from '../../../helpers/material-ui';

import { openRegistrationFormAction, closeRegistrationFormAction }  from '../../../actions/signinManagerActions';
const scrnWdh = window.innerWidth;
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '30px',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
    height: '46px',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    height: 'inherit',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: '30px',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class HeaderPartial extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleFormCloseButtonClicked = event => {
    this.props.closeRegistrationFormAction()
  }

  handleRegistrationButtonClicked = event => {
    this.props.openRegistrationFormAction(this.props.userRegistered)
  }

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

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <div>Projects</div>
        </MenuItem>
        <MenuItem>
          <div>Governance</div>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <div>Publish ICO</div>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <CUIAppBar position="static" style={scrnWdh < 768 ? { height: '60px' } : { height: '129px' }}>
          <Grid>
            <Row>
              <Col>
                <Toolbar style={scrnWdh < 768 ? { height: '60px' } : { height: '129px' }}>
                  {scrnWdh < 768
                    ? <CUIButtonIcon
                        onClick={this.handleDrawerOpen}
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Open drawer"
                      >
                        <MenuIcon />
                      </CUIButtonIcon>
                    : <div />}

                  <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    <span className="hdr-logo" />
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
                      <div className="hvr-underline-from-left">Projects</div>
                    </div>
                    <div className="hdr-itm-pad text--primary txt-m">
                      <div className="hvr-underline-from-left">Governance</div>
                    </div>
                    <div className="hdr-itm-pad text--primary txt-m">
                      <div className="hvr-underline-from-left">Publish ICO</div>
                    </div>
                    <div className="hdr-itm-pad text--primary txt-m wdh-100">
                      
                      {/* <div className="add-ellip">{this.props.userServerPublicAddress}</div> */}
                      {this.props.userRegistered? (
                        <div>
                        <div>Somesh:</div>
                        <div>{this.props.userServerPublicAddress}</div>
                        </div>
                        ):(
                         <div> <button onClick={this.handleRegistrationButtonClicked}>Register</button></div>
                        )}
                      
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
            <div className="hdr-itm-pad text--primary txt-m">Projects</div>
            <div className="hdr-itm-pad text--primary txt-m">Governance</div>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    openRegistrationFormAction: openRegistrationFormAction,
    closeRegistrationFormAction : closeRegistrationFormAction
  }, dispatch)
}

const mapStateToProps = state => {
  const { userRegistered, userServerPublicAddress, userIsIssuer, showRegistrationForm } = state.signinManagerData || {}
  return {
      userRegistered: userRegistered,
      userServerPublicAddress: userServerPublicAddress,
      userIsIssuer: userIsIssuer, 
      showRegistrationForm: showRegistrationForm
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderPartial)) ;
