import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import "../../static/css/app.css";
// import AdornedButton from "../Common/LoadingButton";

class Featuredproject extends Component {
  handleCardClicked = projectid => {
    this.props.history.push({
      pathname: `/governance/details`,
      search: `?projectid=${projectid}`
    });
  };

  render() {
    const extra = <button className="blue-button">Know More</button>;
    return (
      <Card
        className="blue-shadow"
        onClick={this.handleCardClicked.bind(this, this.props.projectId)}
        header={this.props.projectName}
        description={this.props.description}
        image="https://cryptocanucks.com/wp-content/uploads/2018/03/daico-explained-what-is-cryptocanucks-ethereum-ico-initial-coin-offering-dao-decentralized-autonomous-organization.jpg"
        extra={extra}
        style={{ margin: "0 auto" }}
      />
    );
  }
}

export default Featuredproject;
