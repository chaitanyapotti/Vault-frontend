import React from 'react';
import {Container} from 'reactstrap';
import PropTypes from 'prop-types';

export const GridContainer = props =>
  <Container {...props}>
    {props.children}
  </Container>;

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
