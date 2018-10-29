import React from "react";
import { CUICard} from "../../helpers/material-ui";
import { ButtonComponent } from "../Common/FormComponents";

const DeployerCard = (props) =>
    <div className="push-top--50">
      <CUICard style={{ padding: "40px 40px", width: "450px", margin: '0 auto' }}>
        <div className="text-center sbhdr-txt push--bottom txt-xl">
            {props.label}
        </div>
        <div className="text--center">
            <ButtonComponent label={props.btnLabel} onClick={props.onClick}/>
        </div>
      </CUICard>
    </div>;

export default DeployerCard;
