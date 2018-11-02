import React, { Component } from "react";
import { Tooltip, Legend, Pie, PieChart, Cell } from "recharts";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { formatFromWei } from "../../../helpers/common/projectDetailhelperFunctions";
import PieChartComponent from "../../../components/Common/PieChartComponent";

const CHARTCOLORS = ["#001d33", "#0f395b", "#1e5583", "#3d8dd4", "#4ca9fc", "#65b6fd", "#7ec3fe", "#b0ddff", "#e1f4ff", "#2e71ac"];

class TokenChart extends Component {
  render() {
    const { rounds, foundationDetails } = this.props || {};
    let i = 0;
    let totalSaleTokens = 0;
    
    for (let index = 0; index < rounds.length; index++) {
      const element = rounds[index];
      totalSaleTokens += formatFromWei(element.tokenCount, 0);
    }
    for (let index = 0; index < foundationDetails.length; index++) {
      const element = foundationDetails[index];
      totalSaleTokens += formatFromWei(element.amount, 0);
    }
    
    let interDetails = rounds.map(round => {
      const { tokenCount } = round || 0;
      i += 1;
      return { entityPercentage: formatFromWei(tokenCount)/ totalSaleTokens * 100, entityName: `Round ${i}` };
    });
    console.log(interDetails)
    const foundDetails = 
      foundationDetails.map(foundationRequest => {
        const { amount = 0, description = "team" } = foundationRequest;
        return { entityPercentage: formatFromWei(amount) / totalSaleTokens * 100, entityName: description };
      })
      console.log(foundDetails)
    
    return (
      <div className="push-top--50">
        <div className="txt-xl text--primary">Token Distribution Chart</div>
        <hr />
        <Row>
          <Col xs={12} lg={6}>
            <div>
            <PieChartComponent nonSaleEntities={foundDetails} saleEntities={interDetails} totalSaleTokens={totalSaleTokens}/>
              {/* <PieChart width={400} height={500}>
                <Legend />
                <Tooltip />
                
                <Pie
                  isAnimationActive
                  data={interDetails}
                  cx={200}
                  cy={200}
                  innerRadius={100}
                  outerRadius={150}
                  fill="#8884d8"
                  label
                  dataKey="value"
                  nameKey="description"
                >
                  {interDetails.map((entry, index) => (
                    <Cell key={Math.random()} fill={CHARTCOLORS[index % CHARTCOLORS.length]} />
                  ))}
                </Pie>
              </PieChart> */}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TokenChart;
