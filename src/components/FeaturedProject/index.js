import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

import { CUICard, CUICardActions, CUICardMedia, CUICardText } from "../../helpers/material-ui";
import {ButtonComponent} from "../Common/FormComponents";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    borderRadius: '4px'
  },
};
class Featuredproject extends Component {
  handleCardClicked = projectid => {
    this.props.history.push({
      pathname: `/governance/details`,
      search: `?projectid=${projectid}`
    });
  };

  render() {
    const {classes} = this.props || {};
    return (
      // <CUICard
      //   className="blue-shadow"
      //   onClick={this.handleCardClicked.bind(this, this.props.projectId)}
      //   header={this.props.projectName}
      //   description={this.props.description}
      //   image="https://cryptocanucks.com/wp-content/uploads/2018/03/daico-explained-what-is-cryptocanucks-ethereum-ico-initial-coin-offering-dao-decentralized-autonomous-organization.jpg"
      //   extra={extra}
      //   style={{ margin: "0 auto" }}
      // />
      <CUICard className={classes.card}>
          <CUICardMedia
            component="img"
            alt="daico"
            className={classes.media}
            height="200"
            image="https://cryptocanucks.com/wp-content/uploads/2018/03/daico-explained-what-is-cryptocanucks-ethereum-ico-initial-coin-offering-dao-decentralized-autonomous-organization.jpg"
            title="Contemplative Reptile"
          />
          <CUICardText>
            <div>{this.props.projectName}</div>
            <div>{this.props.description}</div>
          </CUICardText>
          <CUICardActions>
            <ButtonComponent label="Know More" onClick={console.log('sasaj')} />
          </CUICardActions>
      </CUICard>
    );
  }
}

export default withStyles(styles)(Featuredproject);
