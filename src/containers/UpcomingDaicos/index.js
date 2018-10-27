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
  formatTokenPrice,
  formatNumber,
  formatRateToPrice
} from "../../helpers/common/projectDetailhelperFunctions";

class UpcomingDaicos extends Component {
  componentDidMount() {
    this.props.getUpcomingDaicos();
    this.props.showUpcomingDaicosLoaderAction();
    this.props.fetchPrice("ETH");
  }

  calculateEndDuration = r1EndTime =>
    // console.log(moment.duration( moment(moment(r1EndTime).format('YYYY-MM-DD hh:mm:ss')), moment(moment().format('YYYY-MM-DD hh:mm:ss'))))
    new Date(r1EndTime) - new Date();

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
    const { upcomingDaicosTable, prices } = this.props || {};
    const { ETH } = prices || {};
    const data = upcomingDaicosTable.map(item => {
      const { projectName, rounds, startDateTime, r1EndTime } = item || {};
      const dataArray = [
        projectName,
        rounds.length,
        this.calculateRoundGoal(rounds[0], ETH),
        this.calculateFinalGoal(rounds, ETH),
        formatCent(formatNumber(formatRateToPrice(rounds[0].tokenRate) * ETH, 3)),
        formatDate(startDateTime),
        formatDate(r1EndTime)
      ];
      return dataArray;
    });
    return (
      <div>
        <GridData tableData={data} columns={["Name", "Rounds", "R1 Goal", "Final Goal", "Price*", "Starts at", "R1 Ends on"]} />
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
