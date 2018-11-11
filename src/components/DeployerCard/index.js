import React from "react";
import { CUICard } from "../../helpers/material-ui";
import { ButtonComponent } from "../Common/FormComponents";
import LoadingButton from "../Common/LoadingButton";

const DeployerCard = props => {
  const { btnLabel, onClick, label, deployContractButtonSpinning, latestTxHash, deployContractStartButtonSpinning } = props || {};
  return (
    <div className="push-top--50">
      {deployContractButtonSpinning ? (
        <CUICard style={{ padding: "40px 40px", width: "450px", margin: "0 auto" }}>
          <div className="text--center">
            This transaction is currently pending. You can View the status
            <a href={`https://rinkeby.etherscan.io/tx/${latestTxHash}`} target="_blank" rel="noreferrer noopener">
              here
            </a>
          </div>
        </CUICard>
      ) : (
        <CUICard style={{ padding: "40px 40px", width: "450px", margin: "0 auto" }}>
          <div className="text-center sbhdr-txt push--bottom txt-xl">{label}</div>
          <div className="text--center">
            <LoadingButton onClick={onClick} loading={deployContractStartButtonSpinning}>
              {btnLabel}
            </LoadingButton>
          </div>
        </CUICard>
      )}
    </div>
  );
};

export default DeployerCard;
