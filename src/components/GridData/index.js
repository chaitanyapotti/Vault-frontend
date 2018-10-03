/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {DataGrid, DataRow, DataCol} from '../../helpers/DataGridHelpers';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-grids';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

class GridData extends Component {
  render() {
    const data = new DataManager({
        url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders/',
      });
    return (
        <GridComponent dataSource={data} allowPaging={true} height={268}>
            <ColumnsDirective>
                <ColumnDirective field='OrderID' width='100' textAlign="Right" />
                <ColumnDirective field='CustomerID' width='100' />
                <ColumnDirective field='EmployeeID' width='100' textAlign="Right" />
                <ColumnDirective field='Freight' width='100' format="C2" textAlign="Right" />
                <ColumnDirective field='ShipCountry' width='100' />
            </ColumnsDirective>
            <Inject services={[Page]}/>
        </GridComponent>
    );
  }
}

export default GridData;
