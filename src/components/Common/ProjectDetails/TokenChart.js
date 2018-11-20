import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { formatFromWei, Colors } from "../../../helpers/common/projectDetailhelperFunctions";

class TokenChart extends Component {
  getOption = () => {
    const { rounds, foundationDetails, prices, currentRoundNumber } = this.props || {};
    const { ETH } = prices || {};
    const { price: etherPrice } = ETH || {};
    // let i = 0;
    // let totalTokens = 0;
    // for (let index = 0; index < rounds.length; index += 1) {
    //   const element = rounds[index];
    //   totalTokens += formatFromWei(element.tokenCount, 0);
    // }
    // for (let index = 0; index < foundationDetails.length; index += 1) {
    //   const element = foundationDetails[index];
    //   totalTokens += formatFromWei(element.amount, 0);
    // }
    // const interDetails = rounds.map(round => {
    //   const { tokenCount } = round || 0;
    //   i += 1;
    //   return { entityPercentage: (formatFromWei(tokenCount) / totalTokens) * 100, entityName: `Round ${i}` };
    // });
    // const foundDetails = foundationDetails.map(foundationRequest => {
    //   const { amount = 0, description = "team" } = foundationRequest;
    //   return { entityPercentage: (formatFromWei(amount) / totalTokens) * 100, entityName: description };
    // });
    const roundNumber = currentRoundNumber === "4" ? 3 : parseInt(currentRoundNumber, 10);
    const tokenData = [];
    const legendData = ["Round 1 Cap", "Round 2 Cap", "Round 3 Cap", "Round 1 Tokens", "Round 2 Tokens", "Round 3 Tokens"];
    const roundDollarData = [];
    for (let index = 0; index < rounds.length; index += 1) {
      const element = rounds[index];
      const price = formatFromWei(parseFloat(element.tokenCount) / parseFloat(element.tokenRate), 10) * etherPrice;
      roundDollarData.push({ value: Math.round(price), name: `Round ${index + 1} Cap`, selected: index + 1 === roundNumber });
      tokenData.push({ value: formatFromWei(element.tokenCount), name: `Round ${index + 1} Tokens`, selected: index + 1 === roundNumber });
    }
    for (let index = 0; index < foundationDetails.length; index += 1) {
      const element = foundationDetails[index];
      legendData.push(element.description);
      tokenData.push({ value: formatFromWei(element.amount), name: element.description, selected: false });
    }

    // /////// TO DEMONSTRATE COLOR POLICY ON LEFT SIDE OF DONUT
    // for (let index = 0; index < rounds.length; index += 1) {
    //   const element = rounds[index];
    //   const price = formatFromWei(parseFloat(element.tokenCount) / parseFloat(element.tokenRate), 10) * etherPrice;
    //   roundDollarData.push({ value: Math.round(price), name: `Round ${index + 1} Cap`, selected: index + 1 === roundNumber });
    //   tokenData.push({ value: formatFromWei(element.tokenCount), name: `Round ${index + 1} Tokens`, selected: index + 1 === roundNumber });
    // }
    // let sumofwei = 0;
    // for (let index = 0; index < foundationDetails.length; index += 1) {
    //   const element = foundationDetails[index];
    //   sumofwei += formatFromWei(element.amount);
    // }
    // for (let index = 0; index < 80; index += 1) {
    //   const rndstrng = Math.random()
    //     .toString(36)
    //     .substr(2, 5);
    //   legendData.push(rndstrng);
    //   tokenData.push({ value: Math.round(sumofwei / 80), name: rndstrng, selected: false });
    // }
    return {
      color: Colors(tokenData.length - 3),
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false,
        orient: "vertical",
        x: "left",
        data: legendData
      },
      series: [
        {
          name: "Round Cap ($)",
          type: "pie",
          selectedMode: "single",
          radius: ["0%", "35%"],
          label: {
            show: false
          },
          data: roundDollarData
        },
        {
          name: "Token Count",
          type: "pie",
          radius: ["55%", "80%"],
          label: {
            show: false
          },
          data: tokenData
        }
      ]
    };
  };

  render() {
    return (
      <div>
        <div className="txt-xxxl text--primary">Token Distribution Chart</div>
        <Row />
        <Row>
          <Col xs={12} lg={6}>
            <div>
              <ReactEcharts
                option={this.getOption()}
                notMerge
                lazyUpdate
                style={{ height: "30em", width: "30em", padding: "0px" }}
                opts={{ renderer: "svg" }}
              />
              {/* <PieChartComponent
                nonSaleEntities={foundDetails}
                saleEntities={interDetails}
                totalTokens={totalTokens}
                totalSaleTokens={parseInt(totalTokens / 2, 10)}
              /> */}
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
