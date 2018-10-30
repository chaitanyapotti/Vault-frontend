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
  formatNumberToINRFormat
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
    const { userTokensTable, prices } = this.props || {};
    const { ETH } = prices || {};
    const data = userTokensTable.map(item => {
      const { projectName, tokenPrice, balance, projectHealth, tapIncrement, killConsensus, killPollStartDate, xfrCount } = item || {};
      const dataArray = [
        projectName,
        formatCent(significantDigits(formatTokenPrice(parseFloat(tokenPrice) * ETH, 3))),
        `${formatNumberToINRFormat(balance)}(${formatMoney(formatFromWei(balance * tokenPrice * ETH), 0)})`,
        projectHealth,
        `${tapIncrement}(Yes)`,
        `${killConsensus}(No)`,
        r1EndsIn(this.calculateKillDuration(killPollStartDate)),
        xfrCount
      ];
      return dataArray;
    });
    return (
      <div>
        <GridData
          tableData={data}
          columns={["Name", "Price(USD)*", "Tokens", "Health", "Tap Increment*", "Kill Consensus", "Next Kill In", "XFRs"]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userTokensTable, showUserTokensLoader, userTokensRetrieveFailureMessage, userTokensRetrievedSuccessFully } = state.userTokensData || {};
  const { prices } = state.fetchPriceReducer || {};
  const { userLocalPublicAddress } = state.signinManagerData || {};
  return {
    userTokensTable,
    showUserTokensLoader,
    userTokensRetrieveFailureMessage,
    userTokensRetrievedSuccessFully,
    prices,
    userLocalPublicAddress
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
