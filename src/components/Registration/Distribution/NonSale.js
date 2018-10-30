import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import {
  CUIInputType,
  CUIButtonType,
  CUIInputColor
} from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { ButtonComponent } from "../../Common/FormComponents";

import { Table } from "semantic-ui-react";
import { Tooltip, Legend, Pie, PieChart, Cell, Label, LabelList, Sector } from "recharts";

import {
  addNonSaleEntityAction,
  entityNameChangedAction,
  entityPercentageChangedAction,
  entityAddressChangedAction,
  nonSaleEntityEditAction
} from "../../../actions/projectRegistrationActions";

// const CHARTCOLORS = ['#e1f4ff', '#b0ddff', '#7ec3fe', '#65b6fd', '#4ca9fc', '#3d8dd4', '#2e71ac', '#1e5583', '#0f395b', '#001d33']
const CHARTCOLORS = [
  "#001d33",
  "#0f395b",
  "#1e5583",
  "#3d8dd4",
  "#4ca9fc",
  "#65b6fd",
  "#7ec3fe",
  "#b0ddff",
  "#e1f4ff",
  "#2e71ac"
];

const NonSaleEntitiesTableHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Percentage</Table.HeaderCell>
      <Table.HeaderCell>Address</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        isAnimationActive={true}
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius - 1}
        outerRadius={outerRadius + 1}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


class NonSale extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nonTokenSalePieActiveIndex: 100, centerValue: 0 };
  }

  handleAddNewEntity = () => {
    this.props.addNonSaleEntityAction(
      this.props.entityName,
      parseFloat(this.props.entityPercentage),
      this.props.entityAddress
    );
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
    this.props.nonSaleEntityEditAction(entityTableIndex);
  };

  populateNonSaleEntities = () => {
    let nonSaleEntitiesTable = this.props.nonSaleEntities;
    if (nonSaleEntitiesTable && nonSaleEntitiesTable.length > 0) {
      return nonSaleEntitiesTable.filter(entity => entity.entityName !== "Unallocated").map((entity, index) => {
            return  <Table.Row
                key={index}
                onClick={this.handleNonSaleEntityEdit.bind(this, index)}
              >
                <Table.Cell>{entity.entityName}</Table.Cell>
                <Table.Cell>{entity.entityPercentage}</Table.Cell>
                <Table.Cell>{entity.entityAddress}</Table.Cell>
              </Table.Row>
      });
    } else {
      return null;
    }
  };

  renderCustomizedLabel = () => {
    const { x, y, width, height, value } = this.props;
    const radius = 10;
    // return <text textAnchor="middle">Hello</text>
    // return <text 
    //            x={400} 
    //            y={400} 
    //            dy={-4} 
    //            fontSize='16' 
    //            fontFamily='sans-serif'
    //            fill="#e1f4ff"
    //            textAnchor="middle">{50}%</text>
    //   return <svg height="21" width="40">
    //   <path d="M15 0 L8 20 L22 20 Z" />
    // </svg>
    return <g>
      <circle cx={x} cy={y - radius} r={radius} fill="#8884d8" />
    </g>
    // return this.props.nonSaleEntities.map((entry, index) => (
    //   <svg height="210" width="400">
    //     <path d="M150 0 L75 200 L225 200 Z" />
    //   </svg>
    // ))
  }

  onPieEnter = (data, index) => {
    console.log("on pie enter: ", data, index)
    this.setState({
      nonTokenSalePieActiveIndex: index,
      centerValue: parseInt(parseFloat(data.payload.entityPercentage) * this.props.totalSaleTokens / 100) || 0
    });
  }

  onPieLeave = (data, index) => {
    this.setState({
      nonTokenSalePieActiveIndex: 100,
      centerValue: this.props.totalSaleTokens || 0
    });
  }

  render() {
    console.log("Combined entities: ",this.props.saleEntities.concat(this.props.nonSaleEntities))
    return (
      <div className="push-top--50">
        <div className="txt-xl">Non Sale Distribution</div>
        <hr />
        <div>
          {this.props.unallocatedTokensPer < 50 ? (
            <Table>
              <NonSaleEntitiesTableHeader />
              <Table.Body>{this.populateNonSaleEntities()}</Table.Body>
            </Table>
          ) : null}
        </div>
        {
          this.props.unallocatedTokensPer>0?
          <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Name of the Entity"
              inputLabel="Name of the Entity"
              inputPlaceholder=""
              inputValue={this.props.entityName}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeEntityName}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Percentage of Total Tokens Supply"
              inputLabel="Percentage of Total Tokens Supply"
              inputPlaceholder=""
              inputValue={this.props.entityPercentage}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeEntityPercentage}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Entity Address"
              inputLabel="Entity Addres"
              inputPlaceholder=""
              inputValue={this.props.entityAddress}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeEntityAddress}
            />
          </Col>
          <Col>
            Total unallocated percentage: {this.props.unallocatedTokensPer}
          </Col>
        </Row>
          : null
        }
        

        <Row>
          <Col>
            <div className="push--top">
              <ButtonComponent
                label="Add To token Distribution Chart"
                style={{ width: "100%" }}
                onClick={this.handleAddNewEntity}
              />
            </div>
          </Col>
        </Row>

        {
          this.props.totalSaleTokens > 0 ?
            <Row>
              <PieChart width={600} height={400}>
                <Legend layout='vertical' iconSize={32} verticalAlign="middle" align="left" onMouseEnter={this.onPieEnter} onMouseLeave={this.onPieLeave} />
                <Tooltip />
                <Pie
                  //isAnimationActive={true}
                  data={(this.props.saleEntities.concat(this.props.nonSaleEntities))}
                  activeIndex={this.state.nonTokenSalePieActiveIndex}
                  activeShape={renderActiveShape}
                  cx={250}
                  cy={200}
                  innerRadius={100}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="entityPercentage"
                  nameKey="entityName"
                  onMouseEnter={this.onPieEnter}
                  onMouseLeave={this.onPieLeave}
                >
                  <LabelList position="outside" offset={15} formatter={(index) => `${index} %`} fill="black" stroke="#000000" />
                  {/* <LabelList position="outside" content={this.renderCustomizedLabel}/> */}
                  <Label width={30} position="center">
                    {this.state.centerValue}
                    Tokens
              </Label>
                  {/* {this.props.nonSaleEntities.map((entry, index) => (
                <Label width={30} position="outside">
                  {index}
                </Label>
              ))} */}
                  {(this.props.saleEntities.concat(this.props.nonSaleEntities)).map((entry, index) => (
                    <Cell
                      key={index}
                      fill={CHARTCOLORS[index % CHARTCOLORS.length]}
                    >
                    </Cell>
                  ))}
                </Pie>
              </PieChart>
            </Row>
            :
            null
        }
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  var {
    nonSaleEntities,
    totalSaleTokens,
    entityName,
    entityPercentage,
    entityAddress,
    saleEntities,
    unallocatedTokensPer
  } = state.projectRegistrationData || {};
  return {
    nonSaleEntities: nonSaleEntities,
    totalSaleTokens: totalSaleTokens,
    entityName: entityName,
    entityPercentage: entityPercentage,
    entityAddress: entityAddress,
    saleEntities: saleEntities,
    unallocatedTokensPer: unallocatedTokensPer
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
