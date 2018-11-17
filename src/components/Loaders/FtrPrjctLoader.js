import React from "react";
import { Instagram } from "react-content-loader";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";

const FtrPrjctLoader = () => (
  <Grid>
    <Row className="push-top--50">
      <Col lg={4}>
        <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
          <Instagram />
        </CUICard>
      </Col>

      <Col lg={4}>
        <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
          <Instagram />
        </CUICard>
      </Col>

      <Col lg={4}>
        <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
          <Instagram />
        </CUICard>
      </Col>
    </Row>
  </Grid>
);

export default FtrPrjctLoader;
