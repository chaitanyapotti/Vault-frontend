import React from 'react';
import {Row} from 'reactstrap';
import PropTypes from 'prop-types';

export const GridRow = props =>
  <Row {...props}>
    {props.children}
  </Row>;

GridRow.propTypes = {
  children: PropTypes.node.isRequired,
};
