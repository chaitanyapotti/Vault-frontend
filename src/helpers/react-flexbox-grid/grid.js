import React from 'react';
import { Grid } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

export const GridContainer = props =>
  <Grid {...props}>
    {props.children}
  </Grid>;

GridContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
