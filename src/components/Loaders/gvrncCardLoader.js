import React from "react";
import { Code, List } from "react-content-loader";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";

const GvrncCardLoader = () => (
  <Grid>
    <Row className="push-top--50">
      <Col lg={6}>
        <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
          <Code />
          <Code />
        </CUICard>
      </Col>

      <Col lg={6}>
        <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
          <Code />
          <Code />
        </CUICard>
      </Col>
    </Row>

    <Row className="push--top">
      <Col lg={6}>
        <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
          <List />
          <List />
        </CUICard>
      </Col>

      <Col lg={6}>
        <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
          <List />
          <List />
        </CUICard>
      </Col>
    </Row>
  </Grid>
);

export default GvrncCardLoader;
