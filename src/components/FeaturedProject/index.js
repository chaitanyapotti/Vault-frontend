import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { CUICard, CUICardActions, CUICardMedia, CUICardText } from "../../helpers/material-ui";
import { ButtonComponent } from "../Common/FormComponents";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
    borderRadius: "4px"
  }
};
class Featuredproject extends Component {
  onClick = projectid => {
    const { history } = this.props || {};
    history.push({
      pathname: `/governance/details`,
      search: `?projectid=${projectid}`
    });
  };

  render() {
    const { classes, projectName, description, thumbnailUrl, projectId } = this.props || {};
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
          onClick={() => this.onClick(projectId)}
          className={classes.media}
          height="200"
          image={thumbnailUrl}
          title="Contemplative Reptile"
        />
        <CUICardText>
          <div>{projectName}</div>
          <div>{description}</div>
        </CUICardText>
        <CUICardActions>
          <ButtonComponent label="Know More" onClick={() => this.onClick(projectId)} />
        </CUICardActions>
      </CUICard>
    );
  }
}

export default withStyles(styles)(Featuredproject);
