import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { CUICard } from "../../../helpers/material-ui";
import { formatFromWei } from "../../../helpers/common/projectDetailhelperFunctions";
import moment from "moment";

const SpendCurve = props => {
  const { initialFundRelease, startDateTime, spendableArrays, spentArray, xfrDots, tapDots, spendableDots, spentDots, dateArray } = props || {};

  const plotLineChart = (spendableArrays) => {
    return spendableArrays.map((array, index)=>{
      return (
        <Line data={array} type="basis" dataKey="ether" stroke="#4ca9fc" strokeWidth={2} 
        activeDot={{ r: 5, fill: 'white', stroke: "#4cFFfc", strokeWidth: 2 }} dot={false}/>
      )
    })
  }

  const customTooltip = (e) => {
    // console.log("tooltip: ", e)
    // console.log(spentArray)
    let spentEther = 0
    let spendableEther = 0
    if (e.label) {
      for (let i in spentArray) {
        if (spentArray[i].date === e.label) {
          spentEther = spentArray[i].ether
        }
      }
      for (let i in spendableArrays) {
        for (let j in spendableArrays[i]) {
          if (spendableArrays[i][j].date === e.label) {
            spendableEther = spendableArrays[i][j].ether.toFixed(2)
          }
        }
      }
    }

    return (
      <div className="custom-tooltip">
        <p>Date: {formatXAxis(e.label)}</p>
        {e.label ? (<p>Spent: {spentEther}</p>) : (null)}
        {e.label ? (<p>Spendable: {spendableEther}</p>) : (null)}
      </div>
    );
  }

  const formatXAxis=(tickItem)=> {
    // If using moment.js
    return moment(tickItem).format('DD-MM-YYYY')
    }

  return (
    <div>
      <CUICard style={{ padding: "10px 10px" }}>
        <div className="txt-xxxl text--primary">Spend Curve</div>
        <LineChart width={500} height={200} data={dateArray} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
          <XAxis  dataKey="date" type="number" domain={["dataMin - 100", "dataMax + 100"]} tickFormatter={formatXAxis} tickCount={3}/>
          <YAxis />
          <Tooltip content={customTooltip}/>
          {/* <Tooltip formatter={(data, index, c)=>{console.log("tooltip data: ", data, index, c); return(data.toFixed(2))}}/> */}
          
          
          <Line
            data={spentArray}
            type="monotone"
            dataKey="ether"
            stroke="#FF69B4"
            strokeWidth={2}
            activeDot={{ r: 5, fill: "white", stroke: "#FF69B4", strokeWidth: 2 }}
            dot={false}
          />
          {plotLineChart(spendableArrays)}
          <Line
            data={spendableDots}
            type="basis"
            dataKey="ether"
            stroke="none"
            strokeWidth={2}
            dot={{ r: 5, fill: "white", stroke: "#4ca9fc", strokeWidth: 2 }}
          />
          <Line
            data={spentDots}
            type="basis"
            dataKey="ether"
            stroke="none"
            strokeWidth={2}
            dot={{ r: 5, fill: "white", stroke: "#FF69B4", strokeWidth: 2 }}
          />
          <Line
            data={xfrDots}
            type="basis"
            dataKey="ether"
            stroke="none"
            strokeWidth={2}
            dot={{ r: 5, fill: "white", stroke: "#4ca9fc", strokeWidth: 2 }}
          />
          <Line
            data={tapDots}
            type="basis"
            dataKey="ether"
            stroke="none"
            strokeWidth={2}
            dot={{ r: 5, fill: "white", stroke: "#4ca9fc", strokeWidth: 2 }}
          />
        </LineChart>
      </CUICard>
    </div>
  );
};

export default SpendCurve;
