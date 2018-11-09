import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { LineChart, Line, XAxis, YAxis, Tooltip}  from "recharts";
import { formatFromWei } from "../../../helpers/common/projectDetailhelperFunctions"
 
const SpendCurve = props => {
  const {
    initialFundRelease,
    startDateTime, 
    spendableArrays, spentArray, xfrDots, tapDots, spendableDots, spentDots, dateArray
  } = props || {};

  var totalArray = []
  for (let i in spendableArrays){
    totalArray = totalArray.concat(spendableArrays[i])
  }

  console.log(spendableArrays, spentArray, xfrDots, tapDots, spendableDots, spentDots, dateArray)
  // let spendableArray = []
  // // let xfrArray = []
  // let spentArray = []
  // spendableArray.push({
  //   timestamp: new Date(startDateTime).toLocaleString(),  
  //   ethers: formatFromWei(initialFundRelease),
  // })
  // spentArray.push({
  //   timestamp: new Date(startDateTime).toLocaleString(),  
  //   ethers: formatFromWei(initialFundRelease) + 5,
  // })

  const plotLineChart = (spendableArrays) => {
    return spendableArrays.map((array, index)=>{
      return (
        //<Line data={array} type="monotone" dataKey="ether" stroke="#82ca9d" dot={false}/>
        <Line data={array} type="monotone" dataKey="ether" stroke="#4ca9fc" strokeWidth={2} activeDot={{ r: 5, fill: 'white', stroke: "#4ca9fc", strokeWidth: 2 }} dot={false}/>
      )
    })

  }
  console.log("total array: ", totalArray)
  return (
    <div>
      <CUICard style={{ padding: "10px 10px" }}>
        <div className="txt-xxxl text--primary">Spend Curve</div>
        <LineChart width={500} height={200} data={dateArray} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
          <XAxis dataKey="date" type="number" domain={['dataMin - 100', 'dataMax + 100']}/>
          <YAxis/>
          <Tooltip/>
          {plotLineChart(spendableArrays)}
          <Line data={spendableDots} type="monotone" dataKey="ether" stroke="none" strokeWidth={2} dot={{ r: 5, fill: 'white', stroke: "#4ca9fc", strokeWidth: 2 }}/>
          <Line data={spentArray} type="monotone" dataKey="ether" stroke="#FF69B4" strokeWidth={2} activeDot={{ r: 5, fill: 'white', stroke: "#FF69B4", strokeWidth: 2 }} dot={false}/>
          <Line data={spentDots} type="monotone" dataKey="ether" stroke="none" strokeWidth={2} dot={{ r: 5, fill: 'white', stroke: "#FF69B4", strokeWidth: 2 }}/>
          <Line data={xfrDots} type="monotone" dataKey="ether" stroke="none" strokeWidth={2} dot={{ r: 5, fill: 'white', stroke: "#4ca9fc", strokeWidth: 2 }}/>
          <Line data={tapDots} type="monotone" dataKey="ether" stroke="none" strokeWidth={2} dot={{ r: 5, fill: 'white', stroke: "#4ca9fc", strokeWidth: 2 }}/>
        </LineChart>
      </CUICard>
    </div>
  );
};

export default SpendCurve;
