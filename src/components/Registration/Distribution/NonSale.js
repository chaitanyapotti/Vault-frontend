import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { ButtonComponent } from "../../Common/FormComponents";
import actionTypes from "../../../action_types";
import GridData from "../../GridData";
import {
  addNonSaleEntityAction,
  entityNameChangedAction,
  entityPercentageChangedAction,
  entityAddressChangedAction,
  nonSaleEntityEditAction
} from "../../../actions/projectRegistrationActions";
import { CUICard } from "../../../helpers/material-ui";
import { validateLength, validateDecimal } from "../../../helpers/common/validationHelperFunctions";
import TokenChart from "../../Common/ProjectDetails/TokenChart";

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
    if (allowEditAll) {
      this.props.nonSaleEntityEditAction(entityTableIndex);
    }
  };

  getRoundData = () => {
    const { round1Tokens, round2Tokens, round3Tokens, round1Rate, round2Rate, round3Rate } = this.props || {};
    const rounds = [];
    rounds.push({ tokenCount: round1Tokens * Math.pow(10, 18), tokenRate: round1Rate });
    rounds.push({ tokenCount: round2Tokens * Math.pow(10, 18), tokenRate: round2Rate });
    rounds.push({ tokenCount: round3Tokens * Math.pow(10, 18), tokenRate: round3Rate });
    return rounds;
  };

  getFoundationData = () => {
    const { nonSaleEntities, totalSaleTokens } = this.props || {};
    const totalTokens = 2 * totalSaleTokens;
    const foundationDetails = [];
    for (let index = 0; index < nonSaleEntities.length; index += 1) {
      const element = nonSaleEntities[index];
      foundationDetails.push({
        amount: (element.entityPercentage / 100) * parseFloat(totalTokens) * Math.pow(10, 18),
        description: element.entityName
      });
    }
    return foundationDetails;
  };

  render() {
    const { nonSaleEntities, history, entityName, entityPercentage, entityAddress, allowEditAll, errors, ethPrice } = this.props || {};
    const nonSaleEntitiesTable = nonSaleEntities;
    const data =
      nonSaleEntitiesTable.length > 0 &&
      nonSaleEntitiesTable
        .filter(entity => entity.entityName !== "Unallocated")
        .map((item, index) => {
          const { entityName, entityPercentage, entityAddress } = item || {};
          const dataArray = [entityName, entityPercentage, entityAddress, index];
          return dataArray;
        });
    const prices = { ETH: { price: ethPrice } };
    return (
      <CUICard className="card-brdr">
        <div className="txt-xl" style={{ padding: "40px 50px" }}>
          Non Sale Distribution <span>(50% of Supply)</span>
        </div>
        <div style={{ padding: "20px 50px", width: '572px' }}>
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
          <Row style={{ padding: "20px 50px" }}>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                inputName="Name of the Entity"
                inputLabel="Name of the Entity"
                inputPlaceholder=""
                inputValue={this.props.entityName}
                onChange={this.onChangeEntityName}
                disabled={!allowEditAll}
              />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                full
                forceNumDec
                inputName="Total Tokens Supply (%)"
                inputLabel="Total Tokens Supply (%)"
                inputPlaceholder=""
                inputValue={this.props.entityPercentage}
                onChange={this.onChangeEntityPercentage}
                disabled={!allowEditAll}
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
                disabled={!allowEditAll}
                inputValue={this.props.entityAddress}
                onChange={this.onChangeEntityAddress}
                error={!!this.getErrorMsg(actionTypes.ENTITY_ADDRESS_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ENTITY_ADDRESS_CHANGED)}
              />
            </Col>
          </Row>
        ) : null}
        {this.props.unallocatedTokensPer > 0 ? (
          <Row style={{ padding: "20px 50px" }}>
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
                  !validateDecimal(entityPercentage) ||
                  errors[actionTypes.ENTITY_PERCENTAGE_CHANGED] !== "" ||
                  errors[actionTypes.ENTITY_ADDRESS_CHANGED] !== ""
                }
              />
            </div>
          </Col>
        </Row>
        <hr />
        {/* <div className="txt-xl" style={{ padding: "40px 50px" }}>
          Token Distribution Chart
        </div>
        <hr /> */}
        {this.props.totalSaleTokens > 0 ? (
          <Row style={{ padding: "20px 50px" }}>
            <TokenChart currentRoundNumber="0" prices={prices} rounds={this.getRoundData()} foundationDetails={this.getFoundationData()} />
          </Row>
        ) : null}
      </CUICard>
    );
  }
}

const mapStateToProps = state => {
  const {
    nonSaleEntities,
    totalSaleTokens,
    entityName,
    entityPercentage,
    entityAddress,
    saleEntities,
    unallocatedTokensPer,
    allowEditAll,
    errors,
    round1Tokens,
    round2Tokens,
    round3Tokens,
    round1Rate,
    round2Rate,
    round3Rate,
    ethPrice
  } = state.projectRegistrationData || {};

  return {
    nonSaleEntities,
    totalSaleTokens,
    entityName,
    entityPercentage,
    entityAddress,
    saleEntities,
    unallocatedTokensPer,
    allowEditAll,
    errors,
    round1Tokens,
    round2Tokens,
    round3Tokens,
    round1Rate,
    round2Rate,
    round3Rate,
    ethPrice
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
