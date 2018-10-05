/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Grid, Row, Col} from '../../helpers/react-flexbox-grid';
import {ProjectName} from '../../components/ProjectDetails';

class ProjectDetails extends Component {
  render() {
    return (
      <Grid>
        <Row className="push--top">
          <Col xs={12} lg={7}>
            <ProjectName />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ProjectDetails;
