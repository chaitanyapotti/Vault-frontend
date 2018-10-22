import React from "react";
import { CUICard, CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

const TokenChart = () => (
  <div className="push-top--50">
    <div>Token Distribution Chart</div>
    <hr />
    <Row>
      <Col xs={12} lg={6} className="piechrtxtcnt">
        <div>
          <span className="sqrclrbx pieclr1" />
          <span className="piechrtxt fnt-ps">First Token Sale ($500k) at ¢1 per token</span>
        </div>
        <div>
          <span className="sqrclrbx pieclr2" />
          <span className="piechrtxt fnt-ps">Second Token Sale ($3.5 Mn) at ¢2 per token</span>
        </div>
        <div>
          <span className="sqrclrbx pieclr3" />
          <span className="piechrtxt fnt-ps">Third Token Sale ($11 Mn) at ¢4 per token</span>
        </div>
        <div>
          <span className="sqrclrbx pieclr4" />
          <span className="piechrtxt fnt-ps">Foundation</span>
        </div>
        <div>
          <span className="sqrclrbx pieclr5" />
          <span className="piechrtxt fnt-ps">Team</span>
        </div>
        <div>
          <span className="sqrclrbx pieclr6" />
          <span className="piechrtxt fnt-ps">Bug Bounty</span>
        </div>
      </Col>
      <Col xs={12} lg={6}>
        <div className="piechart" />
      </Col>
    </Row>
  </div>
);

export default TokenChart;
