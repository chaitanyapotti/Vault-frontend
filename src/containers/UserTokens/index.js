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
  significantDigits,
  formatCurrencyNumber,
  secondsToDhms
} from "../../helpers/common/projectDetailhelperFunctions";
import TableLoader from "../../components/Loaders/TableLoader";

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

  calculateKillDuration = killPollStartDate => {
    const daysLeft = new Date() - new Date(killPollStartDate);
    if (daysLeft < 0) return secondsToDhms(-daysLeft);
    const secondsLeft = (daysLeft / 1000) % (90 * 3600 * 24);
    return secondsToDhms(90 * 3600 * 24 * 1000 - secondsLeft * 1000);
  };

  render() {
    const {
      userTokensTable,
      prices,
      history,
      showUserTokensLoader,
      signinStatusFlag,
      isIssuerChecked,
      isMetamaskNetworkChecked,
      isMetamaskInstallationChecked,
      isUserDefaultAccountChecked,
      isVaultMembershipChecked
    } = this.props || {};
    let { ETH } = prices || {};
    ETH = ETH.price || {};
    const data = userTokensTable.map(item => {
      const {
        projectName,
        tokenPrice,
        balance,
        projectHealth,
        tapIncrement,
        killConsensus,
        killPollStartDate,
        xfrCount,
        _id,
        thumbnailUrl,
        tapAcceptancePercent,
        killAcceptancePercent
      } = item || {};
      const dataArray = [
        { projectName, thumbnailUrl },
        formatCent(significantDigits(formatTokenPrice(parseFloat(tokenPrice) * ETH, 3))),
        `${formatCurrencyNumber(balance, 0)} (${formatMoney(formatFromWei(balance * tokenPrice * ETH), 0)})`,
        projectHealth,
        { tapIncrement, tapAcceptancePercent },
        { killConsensus, killAcceptancePercent },
        this.calculateKillDuration(killPollStartDate),
        xfrCount,
        _id
      ];
      return dataArray;
    });
    return (
      <div>
        {isIssuerChecked && isMetamaskNetworkChecked && isMetamaskInstallationChecked && isUserDefaultAccountChecked && isVaultMembershipChecked ? (
          <div>
            {signinStatusFlag >= 4 ? (
              <div>
                {showUserTokensLoader ? (
                  <TableLoader />
                ) : (
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
                                <img alt="" className="hli" src={thumbnailUrl} width="35" height="35" />
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
                      {
                        name: "Tap Increment*",
                        options: {
                          filter: false,
                          customBodyRender: value => {
                            const { tapIncrement, tapAcceptancePercent } = value || {};
                            let classes = "hli pos-rel txt push--left";
                            classes += parseFloat(tapIncrement) > parseFloat(tapAcceptancePercent) ? " text--secondary" : "";
                            return <span className={classes}>{significantDigits(tapIncrement)}</span>;
                          }
                        }
                      },
                      {
                        name: "Kill Consensus",
                        options: {
                          filter: false,
                          customBodyRender: value => {
                            const { killConsensus, killAcceptancePercent } = value || {};
                            let classes = "hli pos-rel txt push--left";
                            classes += parseFloat(killConsensus) > parseFloat(killAcceptancePercent) ? " text--danger" : "";
                            return <div className={classes}>{significantDigits(killConsensus)}</div>;
                          }
                        }
                      },
                      { name: "Next Kill In", options: { filter: false } },
                      { name: "XFRs", options: { filter: false } },
                      { name: "Id", options: { display: false, filter: false } }
                    ]}
                  />
                )}
              </div>
            ) : (
              this.props.history.push("/")
            )}
          </div>
        ) : (
          <TableLoader />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userTokensTable, showUserTokensLoader, userTokensRetrieveFailureMessage, userTokensRetrievedSuccessFully } = state.userTokensData || {};
  const { prices } = state.fetchPriceReducer || {};
  const {
    userLocalPublicAddress,
    signinStatusFlag,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked
  } = state.signinManagerData || {};
  return {
    userTokensTable,
    showUserTokensLoader,
    userTokensRetrieveFailureMessage,
    userTokensRetrievedSuccessFully,
    prices,
    userLocalPublicAddress,
    signinStatusFlag,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked
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
