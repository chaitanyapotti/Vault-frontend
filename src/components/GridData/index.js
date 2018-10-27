/* eslint camelcase: 0 */

import React from "react";
import MUIDataTable from "mui-datatables";
class GridData extends React.Component {
  render() {
    const columns = [
      {
        name: "Name",
        options: {
          filter: false
        }
      },
      {
        name: "Rounds",
        options: {
          filter: true
        }
      },
      {
        name: "R1 Goal",
        options: {
          filter: true,
        }
      },
      {
        name: "Final Goal",
        options: {
          filter: false
        }
      },
      {
        name: "Raised*",
        options: {
          filter: true,
        }
      },
      {
        name: "Price*",
        options: {
          filter: true,
        }
      },
      {
        name: "Started at",
        options: {
          filter: true,
        }
      },
      {
        name: "R1 Ends in",
        options: {
          filter: true,
        }
      }
    ];

    

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll"
    };
    const {tableData} = this.props || {};
    return (
      <MUIDataTable
        title={"Active Daicos List"}
        data={tableData}
        columns={columns}
        options={options}
      />
    );
  }
}

export default GridData
