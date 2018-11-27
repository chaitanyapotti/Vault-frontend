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
import TableLoader from "../../components/Loaders/TableLoader";

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
    const { endedDaicosTable, prices, history, showEndedDaicosLoader } = this.props || {};
    let { ETH } = prices || {};
    ETH = ETH.price || {};
    const data = endedDaicosTable.map(item => {
      const { projectName, startDateTime, projectEndedAt, raisedAmount, tokenPrice, killConsensus, _id, thumbnailUrl } = item || {};
      const dataArray = [
        thumbnailUrl,
        projectName,
        formatMoney(formatFromWei(parseFloat(raisedAmount)), 0),
        formatCent(significantDigits(formatTokenPrice(parseFloat(tokenPrice) * parseFloat(ETH), 3))),
        `${killConsensus}%`,
        formatDate(startDateTime),
        formatDate(projectEndedAt),
        _id
      ];
      return dataArray;
    });
    return (
      <div>
        {showEndedDaicosLoader ? (
          <TableLoader />
        ) : (
          <GridData
            history={history}
            tableData={data}
            filter={false}
            columns={[
              {
                name: "",
                options: {
                  download: false,
                  filter: true,
                  customBodyRender: value => <img style={{ margin: "0 10px" }} src={value} width="35" height="35" />
                }
              },
              {
                name: "Name",
                options: {
                  filter: true
                }
              },
              { name: "Raised", options: { filter: false } },
              { name: "Price*", options: { filter: false } },
              { name: "Kill Consensus", options: { filter: false } },
              { name: "Started at (UTC)", options: { filter: false } },
              { name: "Ended at (UTC)", options: { filter: false } },
              { name: "Id", options: { display: false, filter: false } }
            ]}
          />
        )}
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
