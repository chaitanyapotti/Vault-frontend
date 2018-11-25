import React from "react";
import ReactEcharts from "echarts-for-react";
import { CUICard } from "../../../helpers/material-ui";

const SpendCurve = props => {
  const { spendableArrays, spentArray, contributionArray, dateArray, contriArrayReceived } = props || {};

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
            textStyle: { fontFamily: "Montserrat", fontSize: "14" },
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
              color: "#3d3d3d"
            }
          },
          axisPointer: {
            show: true,
            label: {
              width: "100%",
              padding: [5, 60, 5, 60],
              textStyle: { fontFamily: "Montserrat", fontSize: "14" },
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
              color: "#3d3d3d"
            }
          },
          axisPointer: {
            show: true,
            label: {
              width: "100%",
              padding: [5, 60, 5, 60],
              textStyle: { fontFamily: "Montserrat", fontSize: "14" },
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
            show: false,
            textStyle: { fontFamily: "Montserrat" }
          },
          axisTick: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: "#3d3d3d"
            }
          }
        },
        {
          type: "value",
          axisLabel: {
            show: false,
            textStyle: { fontFamily: "Montserrat" }
          },
          axisLine: {
            lineStyle: {
              color: "#3d3d3d"
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
          markLine: {
            data: [
              {
                type: "max",
                name: "Total collected",
                label: {
                  textStyle: { fontFamily: "Montserrat" },
                  position: "middle",
                  formatter(params) {
                    return `${params.name}: ${params.value} ETH`;
                  }
                }
              }
            ]
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

  return (
    <div>
      {contriArrayReceived}
      <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Spend Curve</div>
        <br />
        <ReactEcharts option={getOption()} notMerge lazyUpdate style={{ height: "25em", width: "30em", padding: "0px" }} opts={{ renderer: "svg" }} />
      </CUICard>
    </div>
  );
};

export default SpendCurve;
