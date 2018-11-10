import React, { Component } from "react";
import { Tooltip, Legend, Pie, PieChart, Cell, Label, LabelList, Sector } from "recharts";
import { formatCurrencyNumber } from "../../../helpers/common/projectDetailhelperFunctions";

const CHARTCOLORS = ["#001d33", "#0f395b", "#1e5583", "#3d8dd4", "#4ca9fc", "#65b6fd", "#7ec3fe", "#b0ddff", "#e1f4ff", "#2e71ac"];

export default class PieChartComponent extends Component {
  
  constructor(props) {
    super(props);
    const { totalSaleTokens } = this.props || 0
    this.state = { nonTokenSalePieActiveIndex: 100, centerValue: 2*totalSaleTokens, showTooltip: false };
  }

  onPieEnter = (data, index) => {
    this.setState({
      nonTokenSalePieActiveIndex: index,
      centerValue: parseInt((2 * parseFloat(data.payload.entityPercentage) * this.props.totalSaleTokens) / 100,10) || 0,
      showTooltip: true
    });
  };

  onPieLeave = (data, index) => {
    this.setState({
      nonTokenSalePieActiveIndex: 100,
      centerValue: 2 * this.props.totalSaleTokens || 0,
      showTooltip: false
    });
  };

  render() {
    return (
      <div>
      <PieChart width={600} height={400}>
              <Legend
                layout="vertical"
                iconSize={32}
                verticalAlign="middle"
                align="left"
                onMouseEnter={this.onPieEnter}
                onMouseLeave={this.onPieLeave}
              />
              <Tooltip active={this.state.showTooltip} formatter={(value, name) => `${value.toFixed(2)} %`}/>
              <Pie
                // isAnimationActive={true}
                data={this.props.saleEntities.concat(this.props.nonSaleEntities)}
                activeIndex={this.state.nonTokenSalePieActiveIndex}
                activeShape={renderActiveShape}
                cx={200}
                cy={200}
                innerRadius={100}
                outerRadius={150}
                fill="#8884d8"
                dataKey="entityPercentage"
                nameKey="entityName"
                onMouseEnter={this.onPieEnter}
                onMouseLeave={this.onPieLeave}
                paddingAngle={1.5}
              >
                {/* <LabelList position="outside" offset={15} formatter={index => `${index} %`} fill="black" stroke="#000000" /> */}
                <Label width={20} position="center">
                  
                  {formatCurrencyNumber(this.state.centerValue, 0)} Tokens
                </Label>
                {/* {this.props.nonSaleEntities.map((entry, index) => (
                <Label width={30} position="outside">
                  {index}
                </Label>
              ))} */}
                {this.props.saleEntities.concat(this.props.nonSaleEntities).map((entry, index) => (
                  <Cell key={index} fill={CHARTCOLORS[index % CHARTCOLORS.length]} />
                ))}
              </Pie>
            </PieChart>
      </div>
    )
  }
}


const renderActiveShape = props => {
  // const RADIAN = Math.PI / 180;
  const { cx, cy , innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 10) * cos;
  // const sy = cy + (outerRadius + 10) * sin;
  // const mx = cx + (outerRadius + 30) * cos;
  // const my = cy + (outerRadius + 30) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  // const ey = my;
  // const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        isAnimationActive
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius - 1} outerRadius={outerRadius + 3} fill={fill} />
      {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};