import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
// import LoadingButton from "../LoadingButton";
import {LineChart, Line, XAxis, YAxis, Tooltip}  from "recharts";

// const renderCustomizedLabel = (props) => {
//   const { x } = props;
//   // const radius = 5;

//   return (
//     <g>
//       <circle cx={x} cy={230} r={10} fill="red" />
//     </g>
//   );
// };

const VoteHistogram = props => {
  const {
    voteHistogramData, totalVotes, collectiveVoteWeight, projectHealth
  } = props || {};
  return (
    <div>
      <CUICard style={{ padding: "10px 10px" }}>
        <div className="txt-xxxl text--primary">Vote Histogram</div>
        
      <Row className="push--top">
        <Col lg={6} className="txt">
          <div>
          Total Voters:{" "}
          <span className="text--secondary"> {totalVotes}</span>
          </div>
          <div>
          Collective Vote Weight:{" "}
          <span className="text--secondary"> {collectiveVoteWeight}%</span>
          </div>
          <div>
          Health:{" "}
          <span className="text--secondary"> {projectHealth}</span>  
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

        <LineChart width={500} height={200} data={voteHistogramData}
        margin={{top: 10, right: 30, left: 30, bottom: 10}}>
       
       <XAxis dataKey="max" tick={false} strokeWidth={3} stroke="#3d3d3d"/>
       <YAxis yAxisId="left" tick={false} strokeWidth={3} stroke="#3d3d3d"/>
       <Tooltip cursor={false}/>
       <Line yAxisId="left" type="monotone" dataKey="voters" stroke="#4ca9fc" strokeWidth={2} activeDot={{r: 5, fill:'white', stroke:"#4ca9fc", strokeWidth:2}} dot={false}>
       </Line>
      </LineChart>
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
