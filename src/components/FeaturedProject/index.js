import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class Featuredproject extends Component {
  render() {
    const extra = <button>Know More</button>;
    return (
        <Card
          header={this.props.projectName}
          description={this.props.description}
          image="https://cryptocanucks.com/wp-content/uploads/2018/03/daico-explained-what-is-cryptocanucks-ethereum-ico-initial-coin-offering-dao-decentralized-autonomous-organization.jpg"
          extra={extra}
          style={{margin: '0 auto'}}
        />
    );
  }
}

export default Featuredproject;
