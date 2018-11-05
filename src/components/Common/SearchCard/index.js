import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { CUICard, CUICardActions, CUICardMedia, CUICardText } from "../../../helpers/material-ui";
import { ButtonComponent } from "../FormComponents";

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
    const { projectName, tokenTag, description, onClick, classes } = this.props || {};
    return (
      <CUICard onClick={onClick} className={classes.card}>
        <CUICardMedia
          component="img"
          alt="daico"
          className={classes.media}
          height="200"
          image="https://cryptocanucks.com/wp-content/uploads/2018/03/daico-explained-what-is-cryptocanucks-ethereum-ico-initial-coin-offering-dao-decentralized-autonomous-organization.jpg"
          title="Contemplative Reptile"
        />
        <CUICardText>
          <div>{`${projectName} (${tokenTag})`}</div>
          <div>{description}</div>
        </CUICardText>
        <CUICardActions>
          <ButtonComponent label="Know More" onClick={() => console.log("sasaj")} />
        </CUICardActions>
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
