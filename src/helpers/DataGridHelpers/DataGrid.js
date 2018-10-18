import React from "react";
import { GridComponent } from "@syncfusion/ej2-react-grids";
import PropTypes from "prop-types";

export const DataGrid = props => <GridComponent {...props}>{props.children}</GridComponent>;

DataGrid.propTypes = {
  children: PropTypes.node.isRequired,
};
