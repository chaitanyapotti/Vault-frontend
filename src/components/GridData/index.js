/* eslint camelcase: 0 */

import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


class GridData extends React.Component {
  getMuiTheme = () => createMuiTheme({
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
      MuiTypography:{
        root:{
          fontSize: "16px"
        }
      }
    }
  })
  
  redirectToProject = (rowdata) => {
    console.log('redirectToProject', rowdata);
  }

  render() {
    const columns = [ "Name","Rounds","R1 Goal","Final Goal", "Raised*", "Price*","Started at","R1 Ends in"];
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: false,
      onRowClick: this.redirectToProject
    };
    const {tableData} = this.props || {};
    return (
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable
          data={tableData}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

export default GridData
