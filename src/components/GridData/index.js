/* eslint camelcase: 0 */

import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {CUIWrapper} from "../../helpers/material-ui";
class GridData extends React.Component {
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper:{
          elevation4:{
            border: '1.75px solid #EAEAEA',
            boxShadow: 'none'
          }
        },
        MuiToolbar: {
          regular: {
            borderBottom: '1.75px solid #EAEAEA'
          }
        },
        MUIDataTableBodyCell: {
          root: {
            fontSize: "16px",
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }
        },
        MUIDataTableHeadCell: {
          root: {
            fontSize: "16px",
            fontFamily: "Montserrat"          }
          },
        MUIDataTableFooterCell: {
          root: {
            fontSize: "16px",
            fontFamily: "Product Sans"
          }
        },
        MuiTypography: {
          root: {
            fontSize: "16px",
            fontFamily: "Product Sans"
          },
          caption: {
            fontSize: "1rem"
          }
        },
        MuiTableCell: {
          root: {
            padding: "10px 20px 10px 20px",
            fontFamily: "Product Sans"
          }
        },
        MuiTablePagination: {
          select: {
            fontSize: "14px",
            fontFamily: "Product Sans"
          }
        },
        MuiTableRow: {
          root: {
            "&:hover": {
              cursor: "pointer",
              boxShadow: '0px 10px 20px 0px rgba(76, 169, 252, 0.5)',
              backgroundColor: 'rgba(76, 169, 252, 0.2) !important'
            }
          }
        }
      }
    });
  render() {
    const { tableData, columns, history, ...rest } = this.props || {};
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: false,
      rowsPerPage: 15,
      onRowClick: (currentRowsSelected, allRowsSelected) => {
        const length = currentRowsSelected.length;
        const _id = currentRowsSelected && currentRowsSelected[length - 1];
        const address = currentRowsSelected && currentRowsSelected[0];
        const { rowClickFn, onRowClick, rowClickPollHistory } = this.props || {};
        {
          rowClickFn
            ? onRowClick(_id)
            : rowClickPollHistory
              ? window.open(`/pollscan?contract=${address}`).focus()
              : history.push({
                  pathname: `/governance/details`,
                  search: `?projectid=${_id}`
                });
        }
      },
      ...rest
    };
    return (
       <MuiThemeProvider theme={this.getMuiTheme()}>
        <MUIDataTable data={tableData} columns={columns} options={options} />
       </MuiThemeProvider>
    );
  }
}

export default withRouter(GridData);
