import React from "react";
import { CUICard } from "../../helpers/material-ui";
import { ButtonComponent } from "../Common/FormComponents";
import LoadingButton from "../Common/LoadingButton";
import {Row, Col} from "../../helpers/react-flexbox-grid";

const DeployerCard = props => {
  const { btnLabel, onClick, label, deployContractButtonSpinning, latestTxHash, deployContractStartButtonSpinning } = props || {};
  return (
    <div className="push-top--50">
      {deployContractButtonSpinning ? (
          <div className="text--center">
            This transaction is currently pending. You can View the status
            <a href={`https://rinkeby.etherscan.io/tx/${latestTxHash}`} target="_blank" rel="noreferrer noopener">
              here
            </a>
          </div>
      ) : (
        <Row>
          <Col lg={8} xs={12}>
            <div>{label}</div>
          </Col>
          
          <Col lg={4} xs={12}>
            <div className="text--right">
              <LoadingButton style={{padding: '0 40px'}} onClick={onClick} loading={deployContractStartButtonSpinning}>
                {btnLabel}
              </LoadingButton>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DeployerCard;
