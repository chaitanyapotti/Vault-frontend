import React from 'react';

const SFCard = (props) =>
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
        <div>Health Index: 8136</div>
        <div>Kill Consensus: 1.52%</div>
        <div>Pending OTPs: 3</div>
      </div>
      <div className="hli">
        Your current vote: No
      </div>
    </div>
    <span className="crd-btm-ryt-box">
      SF
    </span>
  </div>;

export default SFCard;