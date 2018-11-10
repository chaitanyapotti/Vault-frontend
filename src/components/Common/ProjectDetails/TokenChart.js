import React, { Component } from "react";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { formatFromWei } from "../../../helpers/common/projectDetailhelperFunctions";
import PieChartComponent from "../PieChartComponent";

class TokenChart extends Component {
  render() {
    const { rounds, foundationDetails } = this.props || {};
    let i = 0;
    let totalTokens = 0;
    for (let index = 0; index < rounds.length; index += 1) {
      const element = rounds[index];
      totalTokens += formatFromWei(element.tokenCount, 0);
    }
    for (let index = 0; index < foundationDetails.length; index += 1) {
      const element = foundationDetails[index];
      totalTokens += formatFromWei(element.amount, 0);
    }
    const interDetails = rounds.map(round => {
      const { tokenCount } = round || 0;
      i += 1;
      return { entityPercentage: (formatFromWei(tokenCount) / totalTokens) * 100, entityName: `Round ${i}` };
    });
    const foundDetails = foundationDetails.map(foundationRequest => {
      const { amount = 0, description = "team" } = foundationRequest;
      return { entityPercentage: (formatFromWei(amount) / totalTokens) * 100, entityName: description };
    });

    return (
      <div>
        <div className="txt-xl text--primary">Token Distribution Chart</div>
        <hr />
        <Row>
          <Col xs={12} lg={6}>
            <div>
              <PieChartComponent nonSaleEntities={foundDetails} saleEntities={interDetails} totalTokens={totalTokens} totalSaleTokens={parseInt(totalTokens/2)}/>
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
