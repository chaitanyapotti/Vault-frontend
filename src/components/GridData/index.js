/* eslint camelcase: 0 */

import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import {CUIWrapper} from "../../helpers/material-ui";
class GridData extends React.Component {

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
       <CUIWrapper>
        <MUIDataTable data={tableData} columns={columns} options={options} />
       </CUIWrapper>
    );
  }
}

export default withRouter(GridData);
