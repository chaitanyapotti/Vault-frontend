import React from "react";
import LoadingButton from "../Common/LoadingButton";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import { ensureHttpUrl } from "../../helpers/common/urlFixerInHref";

const DeployerCard = props => {
  const { btnLabel, onClick, label, latestTxHash, deployContractStartButtonSpinning } = props || {};
  const link = `https://rinkeby.etherscan.io/tx/${latestTxHash}`;
  return (
    <div className="push-top--50">
      {latestTxHash !== "0x" ? (
        <Row>
          <Col lg={8} xs={12}>
            <div>{label}</div>
          </Col>

          <Col lg={4} xs={12}>
            <div className="text--right">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          </Col>
        </Row>
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
