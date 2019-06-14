import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import AlertModal from "../../components/Common/AlertModal";
import { Grid } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import MasonryLayout from "../../components/Common/MasonaryLayout";
import LoadingButton from "../../components/Common/LoadingButton";

const screenWidth = window.innerWidth;
class LandingPage extends Component {
  state = {
    wrongNetworkModalOpen: false
  };

  handleWrongNetworkOpen = () => this.setState({ wrongNetworkModalOpen: true });

  handleWrongNetworkClose = () => this.setState({ wrongNetworkModalOpen: false });

  onWhiteListClick = () => {
    const { history, networkName } = this.props || {};
    if (networkName && networkName !== "main") this.handleWrongNetworkOpen();
    // TODO: after deployment
    else history.push({ pathname: `/governance/details`, search: `?projectid=5c07c4cafff9a5eca2e9c057` });
  };

  render() {
    const { wrongNetworkModalOpen } = this.state;
    return (
      <Grid>
        <div style={{ marginBottom: "20px" }}>
          <CUICard style={{ height: "239px" }} onClick={this.onWhiteListClick} className="card-brdr-no-shadow crd-img-radius card-home">
            <div className="pos-rel">
              <img
                style={screenWidth >= "760" ? { width: "100%", marginBottom: "-20px" } : { width: "100%", marginBottom: "-20px", height: "300px" }}
                src="/assets/LoginScreen/landing.png"
                alt="landing"
              />
              <div className="pos-abs" style={screenWidth >= "760" ? { top: "50px", left: "50px" } : { top: "30px", left: "30px" }}>
                <div className="text--white txt-font">Electus DAICO is live now</div>
                <div className="text--white push-half--top">Contribute now to be a part of the change</div>
                <div className="text--white push--top">
                  <LoadingButton style={{ padding: "10px 40px", pointerEvents: "none" }} id="whiteBtn">
                    <span style={{ fontSize: "18px", fontWeight: "normal", color: "#4ca9fc" }}>Get Whitelisted</span>
                  </LoadingButton>
                </div>
              </div>
            </div>
          </CUICard>
        </div>
        <MasonryLayout columns={screenWidth >= "760" ? 2 : 1}>
          <CUICard style={{ height: "301px" }} className="card-brdr-no-shadow crd-img-radius card-home">
            <div className="pos-rel">
              <a href="https://storage.googleapis.com/electus/VaultProductDocument.pdf" rel="noreferrer noopener" target="_blank">
                <img
                  style={screenWidth >= "760" ? { width: "100%", marginBottom: "-25px" } : { width: "100%", marginBottom: "-25px", height: "500px" }}
                  src="/assets/LoginScreen/landing-1.png"
                  alt="landing-1"
                />
              </a>
              <div className="pos-abs" style={screenWidth >= "760" ? { top: "50px", left: "50px" } : { top: "30px", left: "30px" }}>
                <div className="text--white txt-font">Read Our Productpaper</div>
                <div className="text--white txt-m push-half--top">
                  Vault is an accountable <br /> crowdfunding platform
                </div>
              </div>
            </div>
          </CUICard>

          <CUICard style={{ height: "414px" }} className="card-brdr-no-shadow crd-img-radius card-home">
            <div className="pos-rel">
              <a
                href="https://medium.com/@ParthaB/multi-layered-raises-and-why-they-are-relevant-c3e9369cda4f"
                rel="noreferrer noopener"
                target="_blank"
              >
                <img
                  style={screenWidth >= "760" ? { width: "100%" } : { width: "100%", height: "450px" }}
                  src="/assets/LoginScreen/landing-2.png"
                  alt="landing-2"
                />
              </a>
              <div className="pos-abs" style={screenWidth >= "760" ? { top: "50px", left: "50px" } : { top: "30px", left: "30px" }}>
                <div className="text--white txt-font" style={{ lineHeight: "30px" }}>
                  Why multi-layered fundraisers?
                </div>
                <div className="text--white txt-m push-half--top">
                  To start with, unregulated Icos are <br /> problematic
                </div>
              </div>
            </div>
          </CUICard>
          <CUICard style={{ height: "370px" }} className="card-brdr-no-shadow crd-img-radius card-home">
            <div className="pos-rel">
              <a href="https://storage.googleapis.com/electus/whitepaper.pdf" rel="noreferrer noopener" target="_blank">
                <img
                  style={screenWidth >= "760" ? { width: "100%" } : { width: "100%", height: "450px" }}
                  src="/assets/LoginScreen/landing-3.png"
                  alt="landing-3"
                />
              </a>
              <span
                className="pos-abs text--white txt-font"
                style={screenWidth >= "760" ? { top: "50px", left: "50px" } : { top: "30px", left: "30px" }}
              >
                Read about Electus Protocol
              </span>
            </div>
          </CUICard>
        </MasonryLayout>
        <AlertModal open={wrongNetworkModalOpen} handleClose={this.handleWrongNetworkClose}>
          <div className="text--center push--top">Please switch to Main network in Metamask</div>
        </AlertModal>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { signinManagerData } = state || {};
  const { networkName } = signinManagerData || {};
  return {
    networkName
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);

export default withRouter(connector);
