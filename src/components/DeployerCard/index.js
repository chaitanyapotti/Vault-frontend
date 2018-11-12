import React from "react";
import { CUICard } from "../../helpers/material-ui";
import LoadingButton from "../Common/LoadingButton";
import { Row, Col } from "../../helpers/react-flexbox-grid";

const DeployerCard = props => {
  const { btnLabel, onClick, label, latestTxHash, deployContractStartButtonSpinning } = props || {};
  const link = `https://rinkeby.etherscan.io/tx/${latestTxHash}`;
  return (
    <div className="push-top--50">
      {latestTxHash !== "0x" ? (
        <CUICard style={{ padding: "40px 40px", width: "450px", margin: "0 auto" }}>
          <div className="text-center sbhdr-txt push--bottom txt-xl">{label}</div>
          <div className="text--center">
            <a href={link} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
          </div>
        </CUICard>
      ) : (
        <Row>
          <Col lg={8} xs={12}>
            <div>{label}</div>
          </Col>

          <Col lg={4} xs={12}>
            <div className="text--right">
              <LoadingButton style={{ padding: "0 40px" }} onClick={onClick} loading={deployContractStartButtonSpinning}>
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
