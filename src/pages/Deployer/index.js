import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import qs from "qs";
import Warning from "@material-ui/icons/Warning";
import { fetchProjectDetails, deployContractAction, performContractAction, resetDeployment } from "../../actions/deployerActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUIModal, CUIModalActions, CUIModalContent } from "../../helpers/material-ui";
import web3 from "../../helpers/web3";
import VerticalStepper from "../../components/Common/VerticalStepper";
import DeployerCard from "../../components/DeployerCard";
import config from "../../config";
import TableLoader from "../../components/Loaders/TableLoader";
import LoadingButton from "../../components/Common/LoadingButton";

class Deployer extends Component {
  state = {
    modalOpen: false
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  componentDidMount() {
    const { fetchProjectDetails: getProjectDetails, history } = this.props || {};
    const currentUrl = new URL(window.location.href);
    const params = qs.parse(currentUrl.search, { ignoreQueryPrefix: true });
    if ("projectid" in params) {
      getProjectDetails(params.projectid);
    } else {
      history.push({
        pathname: `/`
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { pageReloading, projectDetails } = this.props || {};
    const { currentDeploymentIndicator, _id } = projectDetails || {};
    const { pageReloading: oldReload, currentDeploymentIndicator: oldStep } = prevProps || {};
    if (oldReload !== pageReloading) {
      console.log("reloading in props");
      if (pageReloading) {
        window.location.reload();
      }
    }
    if (oldStep !== currentDeploymentIndicator) {
      if (currentDeploymentIndicator === 12) this.redirectToIssuerPage(_id);
    }
  }

  redirectToIssuerPage = projectid => {
    const { history } = this.props || {};
    console.log("redirecting to redirectToIssuerPage", projectid);
    history.push({
      pathname: `/issuergovernance/details`,
      search: `?projectid=${projectid}`
    });
  };

  deployMembership = async (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, deployContractAction: deployAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag, network } = projectDetails || {};
    const vault_contract_address = config.vault_contract_address[network];
    const args = [web3.utils.fromAscii(projectName), web3.utils.fromAscii(tokenTag), vault_contract_address];
    deployAction(version, _id, currentDeploymentIndicator, args, "Protocol", userLocalPublicAddress, nonce);
  };

  deployDaicoToken = (nonce = "") => {
    const { userLocalPublicAddress, deployContractAction: deployAction, projectDetails } = this.props || {};
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag, membershipAddress, totalMintableSupply, capPercent } =
      projectDetails || {};
    const args = [projectName, tokenTag, membershipAddress, totalMintableSupply, capPercent];
    deployAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", userLocalPublicAddress, nonce);
  };

  deployLockedTokens = (nonce = "") => {
    const { userLocalPublicAddress, deployContractAction: deployAction, projectDetails } = this.props || {};
    const { version, _id, currentDeploymentIndicator, daicoTokenAddress } = projectDetails || {};
    const args = [daicoTokenAddress];
    deployAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", userLocalPublicAddress, nonce);
  };

  deployPollFactory = async (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, deployContractAction: deployAction } = this.props || {};
    const {
      version,
      _id,
      currentDeploymentIndicator,
      daicoTokenAddress,
      teamAddress,
      initialFundRelease,
      initialTapAmount,
      killPollStartDate,
      capPercent,
      killAcceptancePercent,
      xfrRejectionPercent,
      tapAcceptancePercent,
      lockedTokensAddress,
      tapIncrementFactor,
      network
    } = projectDetails || {};
    const vault_contract_address = config.vault_contract_address[network];
    const args = [
      daicoTokenAddress,
      teamAddress,
      initialFundRelease,
      initialTapAmount,
      (new Date(killPollStartDate).getTime() / 1000).toString(), // In Unix Time
      vault_contract_address,
      capPercent,
      killAcceptancePercent,
      xfrRejectionPercent,
      tapAcceptancePercent,
      lockedTokensAddress,
      tapIncrementFactor,
      config.poll_deployer_contract_address
    ];
    deployAction(version, _id, currentDeploymentIndicator, args, "PollFactory", userLocalPublicAddress, nonce);
  };

  deployCrowdSale = async (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, deployContractAction: deployAction } = this.props || {};
    const {
      version,
      _id,
      currentDeploymentIndicator,
      minimumEtherContribution,
      maximumEtherContribution,
      r1EndTime,
      rounds,
      lockedTokensAddress,
      pollFactoryAddress,
      membershipAddress,
      daicoTokenAddress,
      foundationDetails,
      startDateTime,
      network
    } = projectDetails || {};
    const vault_contract_address = config.vault_contract_address[network];
    const args = [
      minimumEtherContribution.toString(),
      maximumEtherContribution.toString(),
      Math.round(new Date(r1EndTime).getTime() / 1000),
      Math.round(new Date(startDateTime).getTime() / 1000),
      rounds.map(a => a.tokenCount.toString()),
      rounds.map(a => a.tokenRate.toString()),
      lockedTokensAddress,
      pollFactoryAddress,
      membershipAddress,
      daicoTokenAddress,
      vault_contract_address,
      foundationDetails.map(a => a.address),
      foundationDetails.map(a => a.amount.toString())
    ];
    deployAction(version, _id, currentDeploymentIndicator, args, "CrowdSale", userLocalPublicAddress, nonce);
  };

  setTreasuryInDaicoToken = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress, daicoTokenAddress } = projectDetails || {};
    const args = pollFactoryAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress, userLocalPublicAddress, nonce);
  };

  setCrowdsaleInDaicoToken = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, daicoTokenAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress, userLocalPublicAddress, nonce);
  };

  setCrowdsaleInLockedTokens = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, lockedTokensAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", lockedTokensAddress, userLocalPublicAddress, nonce);
  };

  setCrowdSaleInPollFactory = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, pollFactoryAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "PollFactory", pollFactoryAddress, userLocalPublicAddress, nonce);
  };

  createKillPolls = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress } = projectDetails || {};
    contractAction(version, _id, currentDeploymentIndicator, "", "PollFactory", pollFactoryAddress, userLocalPublicAddress, nonce);
  };

  mintFoundationTokens = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress } = projectDetails || {};
    contractAction(version, _id, currentDeploymentIndicator, "", "CrowdSale", crowdSaleAddress, userLocalPublicAddress, nonce);
  };

  redirectHome = () => {
    // this.props.history.push("/issuergovernance/details");
    const { history, projectDetails } = this.props || {};
    const { _id } = projectDetails || {};
    history.push({
      pathname: `/issuergovernance/details`,
      search: `?projectid=${_id}`
    });
  };

  onResetClick = () => {
    const { resetDeployment: onResetDeployment, userLocalPublicAddress } = this.props || {};
    onResetDeployment(userLocalPublicAddress);
    this.setState({
      modalOpen: false
    });
  };

  onSpeedUpClick = () => {
    const { projectDetails } = this.props || {};
    const { nonce, currentDeploymentIndicator } = projectDetails || {};
    switch (currentDeploymentIndicator) {
      case 0:
        this.deployMembership(nonce);
        break;
      case 1:
        this.deployDaicoToken(nonce);
        break;
      case 2:
        this.deployLockedTokens(nonce);
        break;
      case 3:
        this.deployPollFactory(nonce);
        break;
      case 4:
        this.deployCrowdSale(nonce);
        break;
      case 5:
        this.setTreasuryInDaicoToken(nonce);
        break;
      case 6:
        this.setCrowdsaleInDaicoToken(nonce);
        break;
      case 7:
        this.setCrowdsaleInLockedTokens(nonce);
        break;
      case 8:
        this.setCrowdSaleInPollFactory(nonce);
        break;
      case 9:
        this.createKillPolls(nonce);
        break;
      case 10:
        this.createKillPolls(nonce);
        break;
      case 11:
        this.mintFoundationTokens(nonce);
        break;
      default:
        break;
    }
  };

  onResetModalOpenClick = () => {
    this.setState({
      modalOpen: true
    });
  };

  getStepContent = () => {
    const { projectDetails, deployContractButtonSpinning, deployContractStartButtonSpinning } = this.props || {};
    const { currentDeploymentIndicator, latestTxHash, network } = projectDetails || {};
    switch (currentDeploymentIndicator) {
      case 0:
        return (
          <DeployerCard
            label="Deploy this contract to enable whitelisting in DAICO"
            btnLabel="Deploy Membership Contract"
            onClick={() => this.deployMembership("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 1:
        return (
          <DeployerCard
            label="Deploy this contract to enable creation of ERC-20 tokens"
            btnLabel="Deploy ERC-20 Contract"
            onClick={() => this.deployDaicoToken("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 2:
        return (
          <DeployerCard
            label="Deploy this contract to enable the locking of vested tokens for 1 year"
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            btnLabel="Deploy Token Locker"
            onClick={() => this.deployLockedTokens("")}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 3:
        return (
          <DeployerCard
            label="Deploy this contract to enable Polls and Treasury on your DAICO"
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            btnLabel="Deploy Poll Factory"
            onClick={() => this.deployPollFactory("")}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 4:
        return (
          <DeployerCard
            label="Deploy this contract to accept ether in exchange of minted ERC-20 tokens"
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            btnLabel="Deploy Crowdsale Contract"
            onClick={() => this.deployCrowdSale("")}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 5:
        return (
          <DeployerCard
            label="Sign this transaction to define the treasury address of your DAICO in ERC-20 Contract"
            btnLabel="Set Treasury Address"
            onClick={() => this.setTreasuryInDaicoToken("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 6:
        return (
          <DeployerCard
            label="Sign this transaction to define the crowdsale address of your DAICO in ERC-20 Contract"
            btnLabel="Set Crowdsale Address"
            onClick={() => this.setCrowdsaleInDaicoToken("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 7:
        return (
          <DeployerCard
            label="Sign this transaction to define the crowdsale address of your DAICO in Token Locker"
            btnLabel="Set Crowdsale Address"
            onClick={() => this.setCrowdsaleInLockedTokens("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 8:
        return (
          <DeployerCard
            label="Sign this transaction to define the crowdsale address of your DAICO in Poll Factory Contract"
            btnLabel="Set Crowdsale Address"
            onClick={() => this.setCrowdSaleInPollFactory("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 9:
        return (
          <DeployerCard
            label="Sign this transaction to deploy the first 4 Kill Polls"
            btnLabel="Create Kill Polls I"
            onClick={() => this.createKillPolls("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 10:
        return (
          <DeployerCard
            label="Sign this transaction to deploy the remaining 4 Kill Polls"
            btnLabel="Create Kill Polls II"
            onClick={() => this.createKillPolls("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      case 11:
        return (
          <DeployerCard
            label="Sign this transaction to mint the vested tokens"
            btnLabel="Mint vested tokens"
            onClick={() => this.mintFoundationTokens("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
            network={network}
          />
        );
      default:
        return (
          <DeployerCard
            label="Deployment is done. Click here to be redirected to home page"
            btnLabel="Redirect Home"
            onClick={this.redirectHome}
            network={network}
          />
        );
    }
  };

  getSteps = () => [
    "Membership Contract",
    "ERC-20 Contract",
    "Token Locker",
    "Poll Factory",
    "Crowdsale Contract",
    "Treasury Address",
    "Crowdsale Address I",
    "Crowdsale Address II",
    "Crowdsale Address III",
    "Kill Polls I",
    "Kill Polls II",
    "Mint Tokens"
  ];

  render() {
    const {
      projectDetails,
      isIssuerChecked,
      isMetamaskNetworkChecked,
      isMetamaskInstallationChecked,
      isUserDefaultAccountChecked,
      isVaultMembershipChecked,
      signinStatusFlag
    } = this.props || {};
    const { modalOpen } = this.state;
    const { currentDeploymentIndicator, _id } = projectDetails || {};
    return (
      <div style={{ marginBottom: "50px" }}>
        {isIssuerChecked && isMetamaskNetworkChecked && isMetamaskInstallationChecked && isUserDefaultAccountChecked && isVaultMembershipChecked ? (
          <div>
            {signinStatusFlag === 5 ? (
              <Grid>
                <Row>
                  <Col lg={12} />
                </Row>
                <Row>
                  <Col lg={12}>
                    <VerticalStepper
                      history={this.props.history}
                      getStepContent={this.getStepContent}
                      getSteps={this.getSteps}
                      activeStep={currentDeploymentIndicator}
                      projectid={_id}
                      onClick={this.onResetModalOpenClick}
                      header="Deployer"
                      startOver="Start Over"
                    />
                  </Col>
                </Row>
              </Grid>
            ) : (
              this.props.history.push("/")
            )}
          </div>
        ) : (
          <Grid>
            <TableLoader />
          </Grid>
        )}
        {
          <CUIModal open={modalOpen}>
            <CUIModalContent>
              <div className="text--center text--danger">
                <Warning style={{ width: "2em", height: "2em" }} />
              </div>
              <div className="text--center push--top">
                Please do this, only if you have externally interrupted your deployment, and are not able to fix it. The gas spent on your current
                deployment will be lost and you will have to start from step 1. Before using this option, you may check the Electus subreddit for
                solutions or post on the subreddit asking for help.
              </div>
            </CUIModalContent>
            <CUIModalActions>
              <div className="hli">
                <LoadingButton style={{ padding: "0 40px" }} onClick={this.onResetClick} type="danger">
                  Proceed
                </LoadingButton>
              </div>
              <div className="hli">
                <LoadingButton style={{ padding: "0 40px" }} onClick={this.handleClose}>
                  Close
                </LoadingButton>
              </div>
            </CUIModalActions>
          </CUIModal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    userLocalPublicAddress,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    signinStatusFlag
  } = state.signinManagerData || {};
  const { projectDetails, deployContractButtonSpinning, deployContractStartButtonSpinning, pageReloading } = state.deployerReducer || {};
  return {
    projectDetails,
    userLocalPublicAddress,
    deployContractButtonSpinning,
    deployContractStartButtonSpinning,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    signinStatusFlag,
    pageReloading
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProjectDetails,
      deployContractAction,
      performContractAction,
      resetDeployment
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Deployer)
);
