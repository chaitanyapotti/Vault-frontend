import React from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import ReactEcharts from "echarts-for-react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
// import LoadingButton from "../LoadingButton";

// const renderCustomizedLabel = (props) => {
//   const { x } = props;
//   // const radius = 5;

//   return (
//     <g>
//       <circle cx={x} cy={230} r={10} fill="red" />
//     </g>
//   );
// };

const getOption = voteHistogramData => {
  // let i = 0;
  // let totalTokens = 0;
  // for (let index = 0; index < rounds.length; index += 1) {
  //   const element = rounds[index];
  //   totalTokens += formatFromWei(element.tokenCount, 0);
  // }
  // for (let index = 0; index < foundationDetails.length; index += 1) {
  //   const element = foundationDetails[index];
  //   totalTokens += formatFromWei(element.amount, 0);
  // }
  // const interDetails = rounds.map(round => {
  //   const { tokenCount } = round || 0;
  //   i += 1;
  //   return { entityPercentage: (formatFromWei(tokenCount) / totalTokens) * 100, entityName: `Round ${i}` };
  // });
  // const foundDetails = foundationDetails.map(foundationRequest => {
  //   const { amount = 0, description = "team" } = foundationRequest;
  //   return { entityPercentage: (formatFromWei(amount) / totalTokens) * 100, entityName: description };
  // });
  const binRanges = [];
  const binValues = [];
  for (let index = 0; index < voteHistogramData.length; index += 1) {
    const element = voteHistogramData[index];
    binRanges.push(`${element.min}%-${element.max}%`);
    binValues.push(element.voters);
  }
  // for (let index = 0; index < 100; index += 1) {
  //   const item = Math.random();
  //   binRanges.push(`${index}%-${index + 1}%`);
  //   binValues.push(index === 0 ? parseFloat(item).toFixed(2) * 100 : (parseFloat(binValues[binValues.length - 1]) + 0.5 - item).toFixed(2));
  // }
  // console.log(binValues);
  return {
    // tooltip: {
    //     trigger: 'none',
    //     axisPointer: {
    //         type: 'cross'
    //     }
    // },
    color: ["#4ca9fc"],
    xAxis: {
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
      data: binRanges
    },
    yAxis: {
      type: "value"
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
          shadowBlur: 75,
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
      <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Vote Histogram</div>

        <Row className="push--top">
          <Col lg={6} className="txt">
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
        {/* <Row className="push--top">
        <Col lg={6} className="txt">
          Collective Vote Weight:{" "}
          <span className="text--secondary"> {collectiveVoteWeight}%</span>
        </Col>
      </Row>
      <Row className="push--top">
        <Col lg={6} className="txt">
          Health:{" "}
          <span className="text--secondary"> {projectHealth}</span>
        </Col>
      </Row> */}
        <ReactEcharts
          option={getOption(voteHistogramData)}
          notMerge
          lazyUpdate
          style={{ height: "30em", width: "30em", padding: "0px" }}
          opts={{ renderer: "svg" }}
        />

        {/* <LineChart width={500} height={200} data={voteHistogramData} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
          <XAxis dataKey="max" tick={false} strokeWidth={3} stroke="#3d3d3d" />
          <YAxis yAxisId="left" tick={false} strokeWidth={3} stroke="#3d3d3d" />
          <Tooltip cursor={false} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="voters"
            stroke="#4ca9fc"
            strokeWidth={2}
            activeDot={{ r: 5, fill: "white", stroke: "#4ca9fc", strokeWidth: 2 }}
            dot={false}
          />
        </LineChart> */}
        {/* <BarChart width={500} height={250} data={voteHistogramData}
            margin={{top: 10, right: 30, left: 30, bottom: 10}}>
       <XAxis dataKey="max" tick={false}/>
       <YAxis tick={false}/>
       <Tooltip />
       <Bar dataKey="voters" fill="#8884d8" />
      </BarChart> */}
      </CUICard>
    </div>
  );
};

export default VoteHistogram;
