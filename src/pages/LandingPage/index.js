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
          <CUICard className="card-brdr-no-shadow crd-img-radius">
            <div>
              <img style={{ width: "100%", marginBottom: "-20px" }} src="/assets/LoginScreen/landing.png" alt="landing" />
              <span className="pos-rel text--white" style={{ top: "-180px", left: "20px" }}>
                Electus DAICO
              </span>
              <span className="pos-rel text--white" style={{ top: "-150px", left: "-98px" }}>
                Watch this space for news about Electus Daico
              </span>
              <span className="pos-rel text--white" style={{ top: "-110px", left: "-478px" }}>
                <LoadingButton onClick={this.onWhiteListClick}>Get WhiteListed</LoadingButton>
              </span>
            </div>
          </CUICard>
        </div>
        <MasonryLayout>
          <CUICard className="card-brdr-no-shadow crd-img-radius">
            <div>
              <a href="https://storage.googleapis.com/electus/VaultProductDocument.pdf" rel="noreferrer noopener" target="_blank">
                <img style={{ width: "100%", marginBottom: "-25px" }} src="/assets/LoginScreen/landing-1.png" alt="landing-1" />
              </a>
              <span className="pos-rel text--white txt-font" style={{ top: "-220px", left: "20px" }}>
                Read Our Productpaper
              </span>
              <span className="pos-rel text--white" style={{ top: "-200px", left: "-280px", textOverflow: "ellipsis" }}>
                Vault is an accountable
              </span>
              <span className="pos-rel text--white" style={{ top: "-160px", left: "-465px", textOverflow: "ellipsis" }}>
                crowdfunding platform
              </span>
            </div>
          </CUICard>

          <CUICard className="card-brdr-no-shadow crd-img-radius">
            <div>
              <a
                href="https://medium.com/@ParthaB/multi-layered-raises-and-why-they-are-relevant-c3e9369cda4f"
                rel="noreferrer noopener"
                target="_blank"
              >
                <img style={{ width: "100%" }} src="/assets/LoginScreen/landing-2.png" alt="landing-2" />
              </a>
              <span className="pos-rel text--white txt-font" style={{ top: "-220px", left: "20px" }}>
                Why multi-layered fundraisers?
              </span>
              <span className="pos-rel text--white txt-font" style={{ top: "-220px", left: "20px" }}>
                To start with, unregulated Icos are
              </span>
              <span className="pos-rel text--white txt-font" style={{ top: "-220px", left: "20px" }}>
                problematic
              </span>
            </div>
          </CUICard>
          <CUICard className="card-brdr-no-shadow crd-img-radius">
            <div>
              <a href="https://storage.googleapis.com/electus/whitepaper.pdf" rel="noreferrer noopener" target="_blank">
                <img style={{ width: "100%" }} src="/assets/LoginScreen/landing-3.png" alt="landing-3" />
              </a>
              <span className="pos-rel text--white txt-font" style={{ top: "-220px", left: "20px" }}>
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
