import React from "react";
import LoadingButton from "../Common/LoadingButton";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import { ensureHttpUrl } from "../../helpers/common/urlFixerInHref";
import { getEtherScanHashLink } from "../../helpers/common/projectDetailhelperFunctions";

const DeployerCard = props => {
  const { btnLabel, onClick, label, latestTxHash, deployContractStartButtonSpinning, network } = props || {};
  const link = getEtherScanHashLink(latestTxHash, network);
  return (
    <div className="push-top--50">
      {latestTxHash !== "0x" ? (
        <div>
          {/* <Row>
            <Col lg={8} xs={12} />
            <Col lg={4} xs={12}>
              <LoadingButton style={{ padding: "0 40px" }} onClick={speedup} loading={deployContractStartButtonSpinning}>
                Speed Up
              </LoadingButton>
            </Col>
          </Row> */}
          <Row>
            <Col lg={8} xs={12}>
              <div>{label}</div>
            </Col>

            <Col lg={4} xs={12}>
              <div className="text--right">
                <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                  <LoadingButton style={{ padding: "0 40px" }} type="pending" onClick={() => console.log("Sent to etherscan")}>
                    Status
                  </LoadingButton>
                </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} xs={12}>
              <div className="text--danger ">
                Do not use metamask’s speed up functionality, your deployment will get disrupted, and you will have to start again.
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Row>
          <Col lg={8} xs={12}>
            <div>{label}</div>
          </Col>

          <Col lg={4} xs={12}>
            <div className="text--right">
              <LoadingButton style={{ padding: "0 40px", "margin-top": "-15px" }} onClick={onClick} loading={deployContractStartButtonSpinning}>
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
// If the tx is
//   taking too much time, use the speed up button on this page.
