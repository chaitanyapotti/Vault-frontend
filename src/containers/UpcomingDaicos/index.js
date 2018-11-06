import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPrice } from "../../actions/priceFetchActions";
import { getUpcomingDaicos, showUpcomingDaicosLoaderAction } from "../../actions/upcomingDaicosActions";
import GridData from "../../components/GridData";
import {
  formatDate,
  formatCent,
  formatFromWei,
  formatMoney,
  formatRateToPrice,
  significantDigits
} from "../../helpers/common/projectDetailhelperFunctions";

class UpcomingDaicos extends Component {
  componentDidMount() {
    const { getUpcomingDaicos: fetchUpcomingDaicos, fetchPrice: getPrice } = this.props || {};
    fetchUpcomingDaicos();
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
    const { upcomingDaicosTable, prices, history } = this.props || {};
    let { ETH } = prices || {};
    ETH = ETH.price || {};
    const data = upcomingDaicosTable.map(item => {
      const { projectName, rounds, startDateTime, r1EndTime, _id } = item || {};
      const dataArray = [
        projectName,
        rounds.length,
        this.calculateRoundGoal(rounds[0], ETH),
        this.calculateFinalGoal(rounds, ETH),
        formatCent(significantDigits(formatRateToPrice(rounds[0].tokenRate) * ETH)),
        // formatCent(formatNumber(formatRateToPrice(rounds[0].tokenRate) * ETH, 5)),
        formatDate(startDateTime),
        formatDate(r1EndTime),
        _id
      ];
      return dataArray;
    });
    return (
      <div>
        <GridData
          history={history}
          tableData={data}
          columns={["Name", "Rounds", "R1 Goal", "Final Goal", "Price*", "Starts at", "R1 Ends on", { name: "Id", options: { display: false } }]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { upcomingDaicosTable, showUpcomingDaicosLoader, upcomingDaicosRetrieveFailureMessage, upcomingDaicosRetrievedSuccessFully } =
    state.upcomingDaicosData || {};
  const { prices } = state.fetchPriceReducer || {};
  return {
    upcomingDaicosTable,
    showUpcomingDaicosLoader,
    upcomingDaicosRetrieveFailureMessage,
    upcomingDaicosRetrievedSuccessFully,
    prices
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUpcomingDaicos,
      showUpcomingDaicosLoaderAction,
      fetchPrice
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingDaicos);
