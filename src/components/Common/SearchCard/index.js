import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { CUICard, CUICardActions, CUICardMedia, CUICardText } from "../../../helpers/material-ui";
import { ButtonComponent } from "../FormComponents";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
// import { ButtonComponent } from "../FormComponents";

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
class SearchCard extends React.Component {
  render() {
    const { projectName, tokenTag, description, onClick, classes, website } = this.props || {};
    return (
      <CUICard className={classes.card} onClick={onClick}>
        <CUICardMedia
          component="img"
          alt="daico"
          className={classes.media}
          height="200"
          image="https://cryptocanucks.com/wp-content/uploads/2018/03/daico-explained-what-is-cryptocanucks-ethereum-ico-initial-coin-offering-dao-decentralized-autonomous-organization.jpg"
        />
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

  // <CUICard style={{ padding: "40px 40px" }}>
  //   <CardActionArea onClick={onClick}>
  //     <Row>
  //       <Col xs={12} lg={8}>
  //         <div className="hl">
  //           <span className="prjct-logo hli" />
  //           <div className="hli push--left text--primary push-half--top">
  //             <div className="txt-xxxl">
  //               {projectName} ({tokenTag})
  //             </div>
  //           </div>
  //         </div>
  //       </Col>
  //     </Row>
  //     <Row className="push-half--top txt">
  //       <Col>{description}</Col>
  //     </Row>
  //   </CardActionArea>
  //   {/* <CardActions>
  //     <CUIButton size="small" color="primary" onClick={onClick} />
  //   </CardActions> */}
  // </CUICard>
}

export default withStyles(styles)(SearchCard);
