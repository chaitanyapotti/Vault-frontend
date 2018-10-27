import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPrice } from "../../actions/priceFetchActions";
import { getActiveDaicos, showActiveDaicosLoaderAction } from "../../actions/activeDaicosActions";
import GridData from "../../components/GridData";
import { formatDate, formatCent, formatFromWei, formatMoney, formatTokenPrice, r1EndsIn } from "../../helpers/common/projectDetailhelperFunctions";

class ActiveDaicos extends Component {
  componentDidMount() {
    this.props.getActiveDaicos();
    this.props.showActiveDaicosLoaderAction();
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
    const { activeDaicosTable, prices } = this.props || {};
    const { ETH } = prices || {};
    const data = activeDaicosTable.map(item => {
      const { projectName, rounds, currentRound, startDateTime, r1EndTime, raisedAmount, tokenPrice } = item || {};
      const dataArray = [
        projectName,
        `${currentRound} of 3`,
        this.calculateRoundGoal(rounds[0], ETH),
        this.calculateFinalGoal(rounds, ETH),
        formatMoney(formatFromWei(parseFloat(raisedAmount)), 0),
        formatCent(formatTokenPrice(parseFloat(tokenPrice) * ETH, 3)),
        formatDate(startDateTime),
        r1EndsIn(this.calculateEndDuration(r1EndTime))
      ];
      return dataArray;
    });
    return (
      <div>
        <GridData tableData={data} columns={["Name", "Current Round", "R1 Goal", "Final Goal", "Raised*", "Price*", "Started at", "R1 Ends in"]} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { activeDaicosTable, showActiveDaicosLoader, activeDaicosRetrieveFailureMessage, activeDaicosRetrievedSuccessFully } =
    state.activeDaicosData || {};
  const { prices } = state.fetchPriceReducer || {};
  return {
    activeDaicosTable,
    showActiveDaicosLoader,
    activeDaicosRetrieveFailureMessage,
    activeDaicosRetrievedSuccessFully,
    prices
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getActiveDaicos,
      showActiveDaicosLoaderAction,
      fetchPrice
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveDaicos);

// class ActiveDaicosTableBody extends Component {
//   handleTableRowClicked = projectid => {
//     this.props.history.push({
//       pathname: `/governance/details`,
//       search: `?projectid=${projectid}`
//     });
//   };
