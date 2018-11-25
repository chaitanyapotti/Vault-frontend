import React from "react";
import ReactEcharts from "echarts-for-react";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

const getOption = voteHistogramData => {
  const binRanges = [];
  const binValues = [];
  for (let index = 0; index < voteHistogramData.length; index += 1) {
    const element = voteHistogramData[index];
    binRanges.push(`${element.min}%-${element.max}%`);
    binValues.push(element.voters);
  }
  return {
    // tooltip: {
    //     trigger: 'none',
    //     axisPointer: {
    //         type: 'cross'
    //     }
    // },
    color: ["#4ca9fc"],
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisPointer: {
          show: true,
          label: {
            width: "100%",
            padding: [5, 60, 5, 60],
            textStyle: { fontFamily: "Montserrat", fontSize: "14" },
            formatter(params) {
              return `No. of voters with vote share in ${params.value}${params.seriesData.length ? `：${params.seriesData[0].data}` : ""}`;
            }
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#3d3d3d"
          }
        },
        axisLabel: {
          show: false
        },
        data: binRanges
      },
      {
        type: "category",
        boundaryGap: false,
        axisPointer: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#3d3d3d"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: binRanges
      }
    ],
    yAxis: [
      {
        max: Math.max(...binValues) * 1.2,
        type: "value",
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: "#3d3d3d"
          }
        }
      },
      {
        max: Math.max(...binValues) * 1.2,
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#3d3d3d"
          }
        }
      }
    ],
    grid: {
      top: 80,
      bottom: 40,
      left: 0,
      right: 5
    },
    series: [
      {
        data: binValues,
        smooth: true,
        type: "line",
        lineStyle: {
          width: 3
        },
        markLine: {
          data: [
            {
              type: "max",
              name: "Frequency",
              label: {
                textStyle: { fontFamily: "Montserrat" },
                position: "middle",
                formatter(params) {
                  return `${params.name}: ${params.value} Voter`;
                }
              }
            }
          ]
        },
        areaStyle: {
          shadowBlur: 0,
          opacity: 0.3
        }
      }
    ]
  };
};

const VoteHistogram = props => {
  const { voteHistogramData, totalVotes, collectiveVoteWeight, projectHealth } = props || {};
  return (
    <div>
      <Row>
        <Col lg={12}>
          <div className="txt-xxxl text--primary">Vote Histogram</div>
        </Col>
      </Row>

      <Row className="push--top">
        <Col lg={6}>
          <div>
            <div className="txt-bold">Total Voters:</div>
            <div className="text--secondary"> {totalVotes}</div>
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <div className="txt-bold">Collective Vote Weight:</div>
            <div className="text--secondary"> {collectiveVoteWeight}%</div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <div>
            <div className="txt-bold">Health:</div>
            <div className="text--secondary"> {projectHealth}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <ReactEcharts
            option={getOption(voteHistogramData)}
            notMerge
            lazyUpdate
            style={{ height: "25em", width: "30em", padding: "0px" }}
            opts={{ renderer: "svg" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default VoteHistogram;
