import React from "react";
import { CardActionArea, CardActions } from "@material-ui/core";
import { CUICard, CUIButton } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

const SearchCard = props => {
  const { projectName, tokenTag, description, onClick } = props || {};
  return (
    <CUICard style={{ padding: "40px 40px" }}>
      <CardActionArea onClick={onClick}>
        <Row>
          <Col xs={12} lg={8}>
            <div className="hl">
              <span className="prjct-logo hli" />
              <div className="hli push--left text--primary push-half--top">
                <div className="txt-xxxl">
                  {projectName} ({tokenTag})
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="push-half--top txt">
          <Col>{description}</Col>
        </Row>
      </CardActionArea>
      {/* <CardActions>
        <CUIButton size="small" color="primary" onClick={onClick} />
      </CardActions> */}
    </CUICard>
  );
};

export default SearchCard;
