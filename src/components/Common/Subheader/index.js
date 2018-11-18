import React from "react";
import { Col, Grid, Row } from "../../../helpers/react-flexbox-grid";

const Subheader = () => (
  <div className="sbhdr-cnt push-top--91">
    <Grid>
      <div className="sbhdr-txt txt-xl txt-bold sbhdr-mrgn-tp">ACCOUNTABLE CROWDFUNDING PLATFORM</div>
      <Row>
        <Col lg={6} className="txt-g-secondary">
          Powered By Electus Protocol
        </Col>
        <Col lg={6} className="text--right">
          <a
            className="text--secondary"
            rel="noreferrer noopener"
            target="_blank"
            href="https://storage.googleapis.com/electus/VaultProductDocument.pdf"
          >
            Learn more about Vault & DAICOs
          </a>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Subheader;
