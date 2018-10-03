import React from 'react';
import { ColumnsDirective } from '@syncfusion/ej2-react-grids';
import PropTypes from 'prop-types';

export const DataRow = props =>
  <ColumnsDirective {...props}>
    {props.children}
  </ColumnsDirective>;

DataRow.propTypes = {
  children: PropTypes.node.isRequired,
};
