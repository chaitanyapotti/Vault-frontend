import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { ButtonComponent } from "../../Common/FormComponents";
import actionTypes from "../../../action_types";
import PieChartComponent from "../../../components/Common/PieChartComponent";

import GridData from "../../GridData";
import {
  addNonSaleEntityAction,
  entityNameChangedAction,
  entityPercentageChangedAction,
  entityAddressChangedAction,
  nonSaleEntityEditAction
} from "../../../actions/projectRegistrationActions";

import { validateLength, validateDecimal } from "../../../helpers/common/validationHelperFunctions";

// const CHARTCOLORS = ['#e1f4ff', '#b0ddff', '#7ec3fe', '#65b6fd', '#4ca9fc', '#3d8dd4', '#2e71ac', '#1e5583', '#0f395b', '#001d33']


class NonSale extends React.Component {

  componentDidUpdate(prevProps) {
    const { errors } = this.props || {};
    if (prevProps.errors !== errors) {
      this.getErrorMsg();
    }
  }

  getErrorMsg = propName => {
    const { errors } = this.props || {};
    if (errors) {
      if (errors.hasOwnProperty(propName)) {
        return errors[propName];
      }
      return "";
    }
    return "";
  };

  handleAddNewEntity = () => {
    this.props.addNonSaleEntityAction(this.props.entityName, parseFloat(this.props.entityPercentage), this.props.entityAddress);
  };

  onChangeEntityName = e => {
    this.props.entityNameChangedAction(e.target.value);
  };

  onChangeEntityAddress = e => {
    this.props.entityAddressChangedAction(e.target.value);
  };

  onChangeEntityPercentage = e => {
    this.props.entityPercentageChangedAction(e.target.value);
  };

  handleNonSaleEntityEdit = entityTableIndex => {
    const { allowEditAll } = this.props || false;
    if (allowEditAll){
      this.props.nonSaleEntityEditAction(entityTableIndex);
    }
  };



  render() {
    const { nonSaleEntities, history, entityName, entityPercentage, entityAddress, allowEditAll, errors } = this.props || {};
    const nonSaleEntitiesTable = nonSaleEntities;
    const data =
      nonSaleEntitiesTable.length > 0 &&
      nonSaleEntitiesTable.filter(entity => entity.entityName !== "Unallocated").map((item, index) => {
        const { entityName, entityPercentage, entityAddress } = item || {};
        const dataArray = [entityName, entityPercentage, entityAddress, index];
        return dataArray;
      });
    return (
      <div className="push-top--50">
        <hr/>
        <div className="txt-xl" style={{ padding: "40px 50px" }}>
          Non Sale Distribution <span>(50% of Supply)</span>
        </div>
        <hr />
        <div style={{ padding: "20px 50px" }}>
          {this.props.unallocatedTokensPer < 50 ? (
            <GridData
              history={history}
              tableData={data}
              filter={false}
              search={false}
              viewColumns={false}
              rowClickFn
              onRowClick={this.handleNonSaleEntityEdit}
              columns={["Name", "Percentage", "Address", { name: "Id", options: { display: false } }]}
            />
          ) : null}
        </div>
        {this.props.unallocatedTokensPer > 0 ? (
          <Row>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                inputName="Name of the Entity"
                inputLabel="Name of the Entity"
                inputPlaceholder=""
                inputValue={this.props.entityName}
                onChange={this.onChangeEntityName}
                disabled = {!allowEditAll}
              />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                full
                forceNumDec
                inputName="Percentage of Total Tokens Supply"
                inputLabel="Percentage of Total Tokens Supply"
                inputPlaceholder=""
                inputValue={this.props.entityPercentage}
                onChange={this.onChangeEntityPercentage}
                disabled = {!allowEditAll}
                error={!!this.getErrorMsg(actionTypes.ENTITY_PERCENTAGE_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ENTITY_PERCENTAGE_CHANGED)}
              />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                full
                inputName="Entity Address"
                inputLabel="Entity Addres"
                inputPlaceholder=""
                disabled = {!allowEditAll}
                inputValue={this.props.entityAddress}
                onChange={this.onChangeEntityAddress}
                error={!!this.getErrorMsg(actionTypes.ENTITY_ADDRESS_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ENTITY_ADDRESS_CHANGED)}
              />
            </Col>
          </Row>
        ) : null}
        {this.props.unallocatedTokensPer > 0 ? (
          <Row>
            <Col>Currently unallocated: {this.props.unallocatedTokensPer}%</Col>
          </Row>
        ) : null}
        <Row style={{ padding: "20px 50px" }}>
          <Col lg={12}>
            <div className="push--top">
              <ButtonComponent
                label="Add To token Distribution Chart"
                style={{ width: "100%" }}
                onClick={this.handleAddNewEntity}
                disabled={
                  !validateLength(entityName) ||
                  !validateLength(entityAddress) ||
                  !validateLength(entityPercentage) ||
                  errors[actionTypes.ENTITY_PERCENTAGE_CHANGED] !== "" ||
                  errors[actionTypes.ENTITY_ADDRESS_CHANGED] !== ""
                }
              />
            </div>
          </Col>
        </Row>
        <hr/>
        <div className="txt-xl" style={{ padding: "40px 50px" }}>
          Token Distribution Chart
        </div>
        <hr />
        {this.props.totalSaleTokens > 0 ? (
          <Row style={{ padding: "20px 50px" }}>
            <PieChartComponent nonSaleEntities={this.props.nonSaleEntities} saleEntities={this.props.saleEntities} totalSaleTokens={this.props.totalSaleTokens}/>
          </Row>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { nonSaleEntities, totalSaleTokens, entityName, entityPercentage, entityAddress, saleEntities, unallocatedTokensPer, allowEditAll, errors } =
    state.projectRegistrationData || {};
  return {
    nonSaleEntities,
    totalSaleTokens,
    entityName,
    entityPercentage,
    entityAddress,
    saleEntities,
    unallocatedTokensPer,
    allowEditAll,
    errors
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addNonSaleEntityAction,
      entityNameChangedAction,
      entityPercentageChangedAction,
      entityAddressChangedAction,
      nonSaleEntityEditAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonSale);
