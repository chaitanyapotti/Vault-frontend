import React from "react";
import ReactEcharts from "echarts-for-react";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

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
            formatter(params) {
              return `Number of voters with vote share in ${params.value}${params.seriesData.length ? `：${params.seriesData[0].data}` : ""}`;
            }
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#8d8d8d"
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
            color: "#8d8d8d"
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
