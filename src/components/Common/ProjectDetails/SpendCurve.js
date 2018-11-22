import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import moment from "moment";
import ReactEcharts from "echarts-for-react";
import { object } from "prop-types";
import { CUICard } from "../../../helpers/material-ui";
import { formatFromWei } from "../../../helpers/common/projectDetailhelperFunctions";

const SpendCurve = props => {
  const {
    initialFundRelease,
    startDateTime,
    spendableArrays,
    spentArray,
    xfrDots,
    tapDots,
    spendableDots,
    spentDots,
    contributionArray,
    dateArray,
    contriArrayReceived
  } = props || {};
  // const plotLineChart = spendableArrays =>
  //   spendableArrays.map((array, index) => (
  //     <Line
  //       data={array}
  //       type="basis"
  //       dataKey="ether"
  //       stroke="#4ca9fc"
  //       strokeWidth={2}
  //       activeDot={{ r: 5, fill: "white", stroke: "#4cFFfc", strokeWidth: 2 }}
  //       dot={false}
  //     />
  //   ));

  // const customTooltip = e => {
  //   let spentEther = 0;
  //   let spendableEther = 0;
  //   if (e.label) {
  //     for (const i in spentArray) {
  //       if (spentArray[i].date === e.label) {
  //         spentEther = spentArray[i].ether;
  //       }
  //     }
  //     for (const i in spendableArrays) {
  //       for (const j in spendableArrays[i]) {
  //         if (spendableArrays[i][j].date === e.label) {
  //           spendableEther = spendableArrays[i][j].ether.toFixed(2);
  //         }
  //       }
  //     }
  //   }

  //   return (
  //     <div className="custom-tooltip">
  //       <p>Date: {formatXAxis(e.label)}</p>
  //       {e.label ? <p>Spent: {spentEther}</p> : null}
  //       {e.label ? <p>Spendable: {spendableEther}</p> : null}
  //     </div>
  //   );
  // };

  const getOption = () => {
    const colors = ["#4ca9fc", "#ff89a0", "#f7c34f", "#8d8d8d"];
    const dates = dateArray.map(item => {
      const date = new Date(item.date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    });
    const spendableAmounts = [];
    if (spendableArrays && spendableArrays.length > 0) {
      spendableAmounts.push(spendableArrays[0][0].ether.toFixed(3));
      for (let index = 0; index < spendableArrays.length; index += 1) {
        const element = spendableArrays[index];
        for (let j = 1; j < element.length; j += 1) {
          const spentItem = element[j];
          spendableAmounts.push(spentItem.ether.toFixed(3));
        }
      }
    }
    let spentAmounts = [];
    if (spentArray && spentArray.length > 0) {
      spentAmounts = spentArray.map(item => item.ether.toFixed(3));
    }
    const contributedAmounts = [];
    if (contributionArray.length > 0) {
      for (let index = 0; index < contributionArray.length; index += 1) {
        const element = contributionArray[index];
        contributedAmounts.push(element.ether.toFixed(3));
      }
    }
    const withdrawableAmounts = [];
    for (let index = 0; index < spendableAmounts.length; index += 1) {
      const element = spendableAmounts[index];
      const element2 = spentAmounts[index];
      withdrawableAmounts.push(parseFloat(element) - parseFloat(element2));
    }
    return {
      color: colors,
      legend: {
        data: [
          {
            name: "Spendable",
            textStyle: { fontFamily: "Montserrat", fontSize: "14" },
            icon:
              "path://M11.5,22.4c-6,0-10.9-4.9-10.9-10.9S5.5,0.6,11.5,0.6s10.9,4.9,10.9,10.9S17.5,22.4,11.5,22.4z M11.5,5.4c-3.3,0-6.1,2.7-6.1,6.1s2.7,6.1,6.1,6.1s6.1-2.7,6.1-6.1S14.8,5.4,11.5,5.4z"
          },
          {
            name: "Spent",
            textStyle: { fontFamily: "Montserrat", fontSize: "14" },
            icon:
              "path://M11.5,22.4c-6,0-10.9-4.9-10.9-10.9S5.5,0.6,11.5,0.6s10.9,4.9,10.9,10.9S17.5,22.4,11.5,22.4z M11.5,5.4c-3.3,0-6.1,2.7-6.1,6.1s2.7,6.1,6.1,6.1s6.1-2.7,6.1-6.1S14.8,5.4,11.5,5.4z"
          },
          {
            name: "Withdrawable",
            textStyle: { fontFamily: "Montserrat", fontSize: "14" },
            icon:
              "path://M11.5,22.4c-6,0-10.9-4.9-10.9-10.9S5.5,0.6,11.5,0.6s10.9,4.9,10.9,10.9S17.5,22.4,11.5,22.4z M11.5,5.4c-3.3,0-6.1,2.7-6.1,6.1s2.7,6.1,6.1,6.1s6.1-2.7,6.1-6.1S14.8,5.4,11.5,5.4z"
          },
          {
            name: "Collected",
            textStyle: { fontFamily: "Montserrat", fontSize: 14 },
            icon:
              "path://M11.5,22.4c-6,0-10.9-4.9-10.9-10.9S5.5,0.6,11.5,0.6s10.9,4.9,10.9,10.9S17.5,22.4,11.5,22.4z M11.5,5.4c-3.3,0-6.1,2.7-6.1,6.1s2.7,6.1,6.1,6.1s6.1-2.7,6.1-6.1S14.8,5.4,11.5,5.4z"
          }
        ],
        selected: {
          Spendable: true,
          Spent: true,
          Withdrawable: false,
          Collected: false
        },
        type: "scroll",
        padding: [5, 0, 0, 0],
        itemGap: 25
      },
      grid: {
        top: 80,
        bottom: 40,
        left: 0,
        right: 5
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#8d8d8d"
            }
          },
          axisPointer: {
            show: true,
            label: {
              width: "100%",
              padding: [5, 60, 5, 60],
              formatter(params) {
                return `Spent as of ${params.value}${params.seriesData.length ? `：${params.seriesData[0].data}` : ""} ETH`;
              }
            }
          },
          axisLabel: {
            show: false
          },
          boundaryGap: false,
          data: dates
        },
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#8d8d8d"
            }
          },
          axisPointer: {
            show: true,
            label: {
              width: "100%",
              padding: [5, 60, 5, 60],
              formatter(params) {
                return `Spendable as of ${params.value}${params.seriesData.length ? `：${params.seriesData[0].data}` : ""} ETH`;
              }
            }
          },
          axisLabel: {
            show: false
          },
          boundaryGap: false,
          data: dates
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#8d8d8d"
            }
          }
        },
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#8d8d8d"
            }
          }
        }
      ],
      series: [
        {
          name: "Spendable",
          type: "line",
          xAxisIndex: 1,
          smooth: false,
          data: spendableAmounts,
          lineStyle: {
            width: 3
          }
        },
        {
          name: "Spent",
          type: "line",
          smooth: false,
          lineStyle: {
            width: 3
          },
          data: spentAmounts
        },
        {
          name: "Collected",
          type: "line",
          smooth: false,
          lineStyle: {
            width: 3
          },
          data: contributedAmounts
        },
        {
          name: "Withdrawable",
          type: "line",
          smooth: false,
          lineStyle: {
            width: 3
          },
          data: withdrawableAmounts
        }
      ]
    };
  };

  // const formatXAxis = tickItem =>
  //   // If using moment.js
  //   moment(tickItem).format("DD-MM-YYYY");

  return (
    <div>
      {contriArrayReceived}
      <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Spend Curve</div>
        <ReactEcharts option={getOption()} notMerge lazyUpdate style={{ height: "25em", width: "30em", padding: "0px" }} opts={{ renderer: "svg" }} />
        {/* <LineChart width={500} height={200} data={dateArray} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
          <XAxis dataKey="date" type="number" domain={["dataMin - 100", "dataMax + 100"]} tickFormatter={formatXAxis} tickCount={3} />
          <YAxis />
          <Tooltip content={customTooltip} />

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
        </LineChart> */}
      </CUICard>
    </div>
  );
};

export default SpendCurve;
