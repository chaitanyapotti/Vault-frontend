import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPrice } from "../../actions/priceFetchActions";
import { getEndedDaicos, showEndedDaicosLoaderAction } from "../../actions/endedDaicosActions";
import GridData from "../../components/GridData";
import {
  formatDate,
  formatCent,
  formatFromWei,
  formatMoney,
  formatTokenPrice,
  significantDigits
} from "../../helpers/common/projectDetailhelperFunctions";

class EndedDaicos extends Component {
  componentDidMount() {
    const { getEndedDaicos: fetchEndedDaicos, fetchPrice: getPrice } = this.props || {};
    fetchEndedDaicos();
    getPrice("ETH");
  }

  calculateEndDuration = r1EndTime => new Date(r1EndTime) - new Date();

  convertRoundGoal = (round, ETH) => formatFromWei((parseFloat(round.tokenCount) * ETH) / parseFloat(round.tokenRate));

  calculateRoundGoal = (round, ETH) => formatMoney(this.convertRoundGoal(round, ETH), 0);

  calculateFinalGoal = (roundArray, ETH) => {
    let finalGoal = 0;
    for (let i = 0; i < roundArray.length; i += 1) {
      finalGoal += this.convertRoundGoal(roundArray[i], ETH);
    }
    return formatMoney(finalGoal, 0);
  };

  render() {
    const { endedDaicosTable, prices, history } = this.props || {};
    let { ETH } = prices || {};
    ETH = ETH.price || {};
    const data = endedDaicosTable.map(item => {
      const { projectName, startDateTime, endedAt, raisedAmount, tokenPrice, killConsensus, _id } = item || {};
      const dataArray = [
        projectName,
        formatMoney(formatFromWei(parseFloat(raisedAmount)), 0),
        formatCent(significantDigits(formatTokenPrice(parseFloat(tokenPrice) * parseFloat(ETH), 3))),
        `${killConsensus}%`,
        formatDate(startDateTime),
        formatDate(endedAt),
        _id
      ];
      return dataArray;
    });
    return (
      <div>
        <GridData
          history={history}
          tableData={data}
          columns={["Name", "Raised*", "Price*", "Kill Consensus", "Started at", "Ended at", { name: "Id", options: { display: false } }]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { endedDaicosTable, showEndedDaicosLoader, endedDaicosRetrieveFailureMessage, endedDaicosRetrievedSuccessFully } =
    state.endedDaicosData || {};
  const { prices } = state.fetchPriceReducer || {};
  return {
    endedDaicosTable,
    showEndedDaicosLoader,
    endedDaicosRetrieveFailureMessage,
    endedDaicosRetrievedSuccessFully,
    prices
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEndedDaicos,
      showEndedDaicosLoaderAction,
      fetchPrice
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EndedDaicos);
