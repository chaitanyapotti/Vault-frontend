import React from 'react';
import {Progress} from 'reactstrap';

const LinearProgressBar = (props) => {
  return (
    <div>
      <Progress color="success" value="25"/>
      <Progress color="info" value={50}/>
    </div>
  );
};
export default LinearProgressBar;