/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { ProjectName, TapCard, FundReq, TimeLine } from "../../components/Common/ProjectDetails";
import { CUICard } from "../../helpers/material-ui";

class ProjectDetails extends Component {
  render() {
    return (
      <Grid>
        <CUICard style={{ padding: "40px 50px" }}>
          <TimeLine />
        </CUICard>
        <Row className="push--top">
          <Col xs={12} lg={6}>
            <ProjectName />
          </Col>
          <Col xs={12} lg={6}>
            {/* <PDetails /> */}
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <TapCard />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <FundReq />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ProjectDetails;
