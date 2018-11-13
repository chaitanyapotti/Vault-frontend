import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPrice } from "../../actions/priceFetchActions";
import { getUserTokens, showUserTokensLoaderAction } from "../../actions/userTokensActions";
import GridData from "../../components/GridData";
import {
  formatCent,
  formatFromWei,
  formatMoney,
  formatTokenPrice,
  r1EndsIn,
  significantDigits,
  formatCurrencyNumber
} from "../../helpers/common/projectDetailhelperFunctions";

class UserTokens extends Component {
  componentDidMount() {
    const { userLocalPublicAddress, getUserTokens: fetchUserTokens, showUserTokensLoaderAction: userTokensLoaderAction, fetchPrice: getPrice } =
      this.props || {};
    fetchUserTokens(userLocalPublicAddress);
    userTokensLoaderAction();
    getPrice("ETH");
  }

  componentDidUpdate(prevProps) {
    const { getUserTokens: fetchUserTokens, userLocalPublicAddress: currentLocalAddress } = this.props || {};
    const { userLocalPublicAddress: prevLocalAddress } = prevProps || {};
    if (prevLocalAddress !== currentLocalAddress) {
      fetchUserTokens(currentLocalAddress);
    }
  }

  calculateKillDuration = killPollStartDate => new Date(killPollStartDate) - new Date();

  render() {
    const { userTokensTable, prices, history } = this.props || {};
    let { ETH } = prices || {};
    ETH = ETH.price || {};
    const data = userTokensTable.map(item => {
      const { projectName, tokenPrice, balance, projectHealth, tapIncrement, killConsensus, killPollStartDate, xfrCount, _id, thumbnailUrl } =
        item || {};
      const dataArray = [
        { projectName, thumbnailUrl },
        formatCent(significantDigits(formatTokenPrice(parseFloat(tokenPrice) * ETH, 3))),
        `${formatCurrencyNumber(balance, 0)}(${formatMoney(formatFromWei(balance * tokenPrice * ETH), 0)})`,
        projectHealth,
        `${significantDigits(tapIncrement)}(Yes)`,
        `${significantDigits(killConsensus)}(No)`,
        r1EndsIn(this.calculateKillDuration(killPollStartDate)),
        xfrCount,
        _id
      ];
      return dataArray;
    });
    return (
      <div>
        <GridData
          history={history}
          tableData={data}
          filterList={[[], [], [], [], [], [], [], [], []]}
          filter={false}
          columns={[
            {
              name: "Name",
              options: {
                customBodyRender: value => {
                  const { projectName, thumbnailUrl } = value || {};
                  return (
                    <div style={{ width: "130px" }} className="hl">
                      <img className="hli" src={thumbnailUrl} width="35" height="35" />
                      <div className="hli pos-rel txt push--left" style={{ top: "10px" }}>
                        {projectName}
                      </div>
                    </div>
                  );
                },
                filter: false
              }
            },
            {
              name: "Price(USD)*",
              options: {
                filter: false
              }
            },
            {
              name: "Tokens",
              options: {
                filter: false
              }
            },
            { name: "Health", options: { filter: false } },
            { name: "Tap Increment*", options: { filter: false } },
            { name: "Kill Consensus", options: { filter: false } },
            { name: "Next Kill In", options: { filter: false } },
            { name: "XFRs", options: { filter: false } },
            { name: "Id", options: { display: false, filter: false } }
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userTokensTable, showUserTokensLoader, userTokensRetrieveFailureMessage, userTokensRetrievedSuccessFully } = state.userTokensData || {};
  const { prices } = state.fetchPriceReducer || {};
  const { userLocalPublicAddress } = state.signinManagerData || {};
  const { signinStatusFlag } = state.signinManagerData || {};
  return {
    userTokensTable,
    showUserTokensLoader,
    userTokensRetrieveFailureMessage,
    userTokensRetrievedSuccessFully,
    prices,
    userLocalPublicAddress,
    signinStatusFlag
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserTokens,
      showUserTokensLoaderAction,
      fetchPrice
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTokens);
