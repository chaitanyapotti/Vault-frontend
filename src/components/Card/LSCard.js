import React from 'react';

const LSCard = (props) =>
  <div className="crd-cnt-mrgn">
    <div className="hl">
      <span className="crd-img-cnt hli"/>
      <div className="hli">
        <div>Wanchain(WAN)</div>
        <div>12000$ (1.2%)</div>
        <div>0.0000012 BTC (3.8%)</div>
        <div>0.0000035 BTC (1.8%)</div>
      </div>
    </div>
    <div className="hl">
      <div className="hli">
        <div>Next kill vote in: 7 days</div>
        <div>Kill Consensus: 1.52%</div>
        <div>Tap Increment consensus: 34%</div>
        <div>Your current vote: No</div>
        <div>Pending OTPs: 2</div>
      </div>
      <div className="hli">
        Your current vote: No
      </div>
    </div>
    <span className="crd-btm-ryt-box">
      LS
    </span>
  </div>;

export default LSCard;