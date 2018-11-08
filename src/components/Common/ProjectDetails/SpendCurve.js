import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { LineChart, Line, XAxis, YAxis, Tooltip}  from "recharts";
import { formatFromWei } from "../../../helpers/common/projectDetailhelperFunctions"
 
const SpendCurve = props => {
  const {
    initialFundRelease,
    startDateTime
  } = props || {};

  let spendableArray = []
  // let xfrArray = []
  let spentArray = []
  spendableArray.push({
    timestamp: new Date(startDateTime).toLocaleString(),  
    ethers: formatFromWei(initialFundRelease),
  })
  spentArray.push({
    timestamp: new Date(startDateTime).toLocaleString(),  
    ethers: formatFromWei(initialFundRelease) + 5,
  })
  return (
    <div>
      <CUICard style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Spend Curve</div>
            <LineChart width={500} height={200} data={spendableArray}
                  margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>

                  <XAxis dataKey="timestamp"  strokeWidth={3} stroke="#3d3d3d" />
                  <YAxis yAxisId="left" strokeWidth={3} stroke="#3d3d3d" />
                  <Tooltip cursor={false} />
                  <Line yAxisId="left" data={spendableArray} type="monotone" dataKey="ethers" stroke="#4ca9fc" strokeWidth={2} activeDot={{ r: 5, fill: 'white', stroke: "#4ca9fc", strokeWidth: 2 }} dot={false}/>
                  <Line yAxisId="left" data={spentArray} type="monotone" dataKey="ethers" stroke="#4ca9fc" strokeWidth={2} activeDot={{ r: 5, fill: 'white', stroke: "#4ca9fc", strokeWidth: 2 }} dot={false}/>
              </LineChart>
      </CUICard>
    </div>
  );
};

export default SpendCurve;
