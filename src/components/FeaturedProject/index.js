import React from "react";
import { Card } from "semantic-ui-react";
import "../../static/css/app.css";

const Featuredproject = props => {
  const { projectName, description, website } = props || {};
  const extra = (
    <a href={website} target="_blank" rel="noopener noreferrer" alt="Know More">
      Know More
    </a>
  );
  return (
    <Card
      className="blue-shadow"
      header={projectName}
      description={description}
      image="https://cryptocanucks.com/wp-content/uploads/2018/03/daico-explained-what-is-cryptocanucks-ethereum-ico-initial-coin-offering-dao-decentralized-autonomous-organization.jpg"
      extra={extra}
      style={{ margin: "0 auto" }}
    />
  );
};

export default Featuredproject;
