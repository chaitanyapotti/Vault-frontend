/* eslint camelcase: 0 */

import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

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
          caption: {
            fontSize: "1rem"
          }
        },
        MuiTableCell: {
          root: {
            padding: "10px 20px 10px 20px"
          }
        },
        MuiTablePagination: {
          select: {
            fontSize: "14px"
          }
        },
        MuiTableRow: {
          root: {
            "&:hover": {
              cursor: "pointer"
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
