import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPrice } from "../../actions/priceFetchActions";
import { getActiveDaicos, showActiveDaicosLoaderAction } from "../../actions/activeDaicosActions";
import GridData from "../../components/GridData";
import {
  formatDate,
  formatCent,
  formatFromWei,
  formatMoney,
  formatTokenPrice,
  r1EndsIn,
  significantDigits
} from "../../helpers/common/projectDetailhelperFunctions";

class ActiveDaicos extends Component {
  componentDidMount() {
    const { getActiveDaicos: fetchActiveDaicos, fetchPrice: getPrice } = this.props || {};
    fetchActiveDaicos();
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
    const { activeDaicosTable, prices, history } = this.props || {};
    let { ETH } = prices || {};
    ETH = ETH.price || {};
    const data = activeDaicosTable.map(item => {
      const { projectName, rounds, currentRound, startDateTime, r1EndTime, raisedAmount, tokenPrice, _id, thumbnailUrl } = item || {};
      const dataArray = [
        {projectName, thumbnailUrl},
        `${currentRound} of 3`,
        this.calculateRoundGoal(rounds[0], ETH),
        this.calculateFinalGoal(rounds, ETH),
        formatMoney(formatFromWei(parseFloat(raisedAmount) * parseFloat(ETH)), 0),
        formatCent(significantDigits(formatTokenPrice(parseFloat(tokenPrice) * ETH, 3))),
        formatDate(startDateTime),
        r1EndsIn(this.calculateEndDuration(r1EndTime)),
        _id
      ];
      return dataArray;
    });
    return (
      <div>
        <GridData
          history={history}
          tableData={data}
          columns={[
            {
              name: "Name",
              options:{
                customBodyRender: (value) => {
                  const {projectName, thumbnailUrl} = value || {};
                  return(
                    <div style={{width:'130px'}} className="hl">
                      <img className="hli" src={thumbnailUrl} width="35" height="35" />
                      <div className="hli pos-rel txt push--left" style={{top: '10px'}}>{projectName}</div>
                    </div>
                  )
                }
              }
            },
            "Current Round",
            "R1 Goal",
            "Final Goal",
            "Raised*",
            "Price*",
            "Started at (UTC)",
            "R1 Ends in",
            { name: "Id", options: { display: false } }
          ]}
        />
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
