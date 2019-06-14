import React from "react";
import ReactEcharts from "echarts-for-react";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { formatFromWei, Colors, formatCurrencyNumber, significantDigits } from "../../../helpers/common/projectDetailhelperFunctions";

const getOption = (rounds, foundationDetails, prices, currentRoundNumber, roundInfo) => {
  const { ETH } = prices || {};
  const { price: etherPrice } = ETH || {};
  const roundNumber = currentRoundNumber === "4" ? 3 : currentRoundNumber === "0" || currentRoundNumber === "" ? 1 : parseInt(currentRoundNumber, 10);
  const tokenData = [];
  const legendData = ["Round 1 Cap", "Round 2 Cap", "Round 3 Cap", "Round 1 Tokens", "Round 2 Tokens", "Round 3 Tokens"];
  const roundDollarData = [];
  let tokenSold = 0;
  let totalTokens = 0;
  let totalCollectableEther = 0;
  let etherCollected = 0;
  for (let index = 0; index < roundNumber - 1; index += 1) {
    const element = rounds[index];
    tokenSold += formatFromWei(element.tokenCount);
    etherCollected += (formatFromWei(parseFloat(element.tokenCount), 10) / parseFloat(element.tokenRate)) * etherPrice;
  }
  tokenSold += roundInfo ? formatFromWei(roundInfo.totalTokensSold) : 0;
  etherCollected +=
    typeof roundInfo !== "undefined"
      ? (formatFromWei(parseFloat(roundInfo.totalTokensSold), 10) / parseFloat(rounds[roundNumber - 1].tokenRate)) * etherPrice
      : 0;
  for (let index = 0; index < rounds.length; index += 1) {
    const element = rounds[index];
    totalTokens += formatFromWei(element.tokenCount);
    const etherAmount = formatFromWei(parseFloat(element.tokenCount) / parseFloat(element.tokenRate), 10);
    const price = etherAmount * etherPrice;
    totalCollectableEther += price;
    roundDollarData.push({ value: Math.round(price), name: `Round ${index + 1} Cap`, selected: false });
    // roundEtherData.push({value: etherAmount, name:  })
    tokenData.push({ value: formatFromWei(element.tokenCount), name: `Round ${index + 1} Tokens`, selected: false });
  }
  for (let index = 0; index < foundationDetails.length; index += 1) {
    const element = foundationDetails[index];
    totalTokens += formatFromWei(element.amount);
    legendData.push(element.description);
    tokenData.push({ value: formatFromWei(element.amount), name: element.description, selected: false });
  }
  const tokenUnsold = totalTokens - tokenSold;
  etherCollected = Math.round(etherCollected);
  const etherUnCollected = Math.round(totalCollectableEther) - etherCollected;
  // formatter: "{a} <br/>{b}: {c} ({d}%)",
  return {
    color: Colors(tokenData.length - 3),
    tooltip: {
      trigger: "item",
      formatter(params) {
        const seriesI =
          params.seriesIndex === 2 || params.seriesIndex === 0
            ? `$${formatCurrencyNumber(params.value, 0)}`
            : `${formatCurrencyNumber(params.value, 0)}`;
        const seriesEther = params.seriesIndex === 2 ? `<br/>${significantDigits(params.value / etherPrice)} ETH` : ``;
        return `${params.seriesName} <br/>${params.name}: ${seriesI} (${params.percent}%)${seriesEther}`;
      },
      textStyle: { fontFamily: "Montserrat", fontSize: "14" }
    },
    legend: {
      show: false,
      orient: "vertical",
      x: "left",
      data: legendData
    },
    series: [
      {
        name: "Dollar Value",
        type: "pie",
        radius: ["45%", "47%"],
        label: {
          show: false
        },
        data: [{ value: etherCollected, name: "Collected" }, { value: etherUnCollected, name: "Uncollected" }]
      },
      {
        name: "Token Count",
        type: "pie",
        radius: ["90%", "92%"],
        label: {
          show: false
        },
        data: [{ value: tokenSold, name: "Sold" }, { value: tokenUnsold, name: "Unsold" }]
      },
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

const TokenChart = props => {
  const { rounds, foundationDetails, prices, currentRoundNumber, roundInfo } = props || {};
  return (
    <div>
      <div className="txt-xxxl text--primary">Token Distribution Chart</div>
      <Row>
        <Col xs={12} lg={6}>
          <div>
            <ReactEcharts
              option={getOption(rounds, foundationDetails, prices, currentRoundNumber, roundInfo)}
              notMerge
              lazyUpdate
              style={{ height: "30em", width: "30em", padding: "0px" }}
              opts={{ renderer: "svg" }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TokenChart;
