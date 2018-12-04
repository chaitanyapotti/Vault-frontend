import React, { Component } from "react";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import MasonryLayout from "../../components/Common/MasonaryLayout";
import LoadingButton from "../../components/Common/LoadingButton";

class LandingPage extends Component {
  onWhiteListClick = () => {
    const { history } = this.props || {};
    // TODO: after deployment
    history.push({ pathname: `/governance/details`, search: `?projectid=${123}` });
  };

  render() {
    return (
      <Grid>
        <div style={{ marginBottom: "20px" }}>
          <CUICard style={{ height: "239px" }} className="card-brdr-no-shadow crd-img-radius card-home">
            <div className="pos-rel">
              <img style={{ width: "100%", marginBottom: "-20px" }} src="/assets/LoginScreen/landing.png" alt="landing" />
              <span className="pos-abs text--white txt-font" style={{ top: "50px", left: "50px" }}>
                Electus DAICO
              </span>
              <span className="pos-abs text--white" style={{ top: "80px", left: "50px" }}>
                Watch this space for news about Electus Daico
              </span>
              <span className="pos-abs text--white" style={{ top: "115px", left: "50px" }}>
                <LoadingButton onClick={this.onWhiteListClick}>Get WhiteListed</LoadingButton>
              </span>
            </div>
          </CUICard>
        </div>
        <MasonryLayout>
          <CUICard style={{ height: "301px" }} className="card-brdr-no-shadow crd-img-radius card-home">
            <div className="pos-rel">
              <a href="https://storage.googleapis.com/electus/VaultProductDocument.pdf" rel="noreferrer noopener" target="_blank">
                <img style={{ width: "100%", marginBottom: "-25px" }} src="/assets/LoginScreen/landing-1.png" alt="landing-1" />
              </a>
              <span className="pos-abs text--white txt-font" style={{ top: "50px", left: "50px" }}>
                Read Our Productpaper
              </span>
              <span className="pos-abs text--white txt-m" style={{ top: "85px", left: "50px", textOverflow: "ellipsis" }}>
                Vault is an accountable <br /> crowdfunding platform
              </span>
            </div>
          </CUICard>

          <CUICard style={{ height: "414px" }} className="card-brdr-no-shadow crd-img-radius card-home">
            <div className="pos-rel">
              <a
                href="https://medium.com/@ParthaB/multi-layered-raises-and-why-they-are-relevant-c3e9369cda4f"
                rel="noreferrer noopener"
                target="_blank"
              >
                <img style={{ width: "100%" }} src="/assets/LoginScreen/landing-2.png" alt="landing-2" />
              </a>
              <span className="pos-abs text--white txt-font" style={{ top: "50px", left: "50px" }}>
                Why multi-layered fundraisers?
              </span>
              <span className="pos-abs text--white txt-m" style={{ top: "85px", left: "50px" }}>
                To start with, unregulated Icos are <br /> problematic
              </span>
            </div>
          </CUICard>
          <CUICard style={{ height: "370px" }} className="card-brdr-no-shadow crd-img-radius card-home">
            <div className="pos-rel">
              <a href="https://storage.googleapis.com/electus/whitepaper.pdf" rel="noreferrer noopener" target="_blank">
                <img style={{ width: "100%" }} src="/assets/LoginScreen/landing-3.png" alt="landing-3" />
              </a>
              <span className="pos-abs text--white txt-font" style={{ top: "50px", left: "50px" }}>
                Read about Electus Protocol
              </span>
            </div>
          </CUICard>
        </MasonryLayout>
      </Grid>
    );
  }
}

export default LandingPage;
