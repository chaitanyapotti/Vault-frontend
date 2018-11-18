import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { CUICard, CUICardActions, CUICardMedia, CUICardText } from "../../helpers/material-ui";
import { ButtonComponent } from "../Common/FormComponents";
import { ensureHttpUrl } from "../../helpers/common/urlFixerInHref";

const styles = {
  card: {
    "&:hover": {
      transform: "translate(0px, -5px) scale(1.001)",
      transition: "250ms"
    },
    maxWidth: 345,
    boxShadow: "0px 10px 20px 0px rgba(76, 169, 252, 0.5)"
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
    const { classes, projectName, description, thumbnailUrl, projectId, website, tokenTag } = this.props || {};
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
      <CUICard className={classes.card} onClick={() => this.onClick(projectId)}>
        <CUICardMedia component="img" alt="daico" className={classes.media} height="200" image={thumbnailUrl} />
        <CUICardText>
          <div className="txt-xxl txt-dbld">{`${projectName} (${tokenTag})`}</div>
          <div className="push--top fnt-ps dscrptn-lins">{description}</div>
          <div className="push--top text--right">
            <a href={ensureHttpUrl(website)} target="_blank" rel="noopener noreferrer">
              <ButtonComponent onClick={() => {}}>Know More</ButtonComponent>
            </a>
          </div>
        </CUICardText>
        <CUICardActions />
      </CUICard>
    );
  }
}

export default withStyles(styles)(Featuredproject);
