/* eslint camelcase: 0 */

import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

class GridData extends React.Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            fontSize: "16px"
          }
        },
        MUIDataTableHeadCell: {
          root: {
            fontSize: "16px"
          }
        },
        MUIDataTableFooterCell: {
          root: {
            fontSize: "16px"
          }
        },
        MuiTypography: {
          root: {
            fontSize: "16px"
          },
          caption:{
            fontSize: '1rem'
          }
        },
        MuiTableCell:{
          root:{
            padding: '10px 20px 10px 20px'
          }
        },
        MuiTablePagination:{
          select:{
            fontSize: '14px'
          }
        }
      }
    });

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: false,
      onRowClick: this.redirectToProject
    };
    const { tableData, columns } = this.props || {};
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable data={tableData} columns={columns} options={options} />
      </MuiThemeProvider>
    );
  }
}

export default GridData;
