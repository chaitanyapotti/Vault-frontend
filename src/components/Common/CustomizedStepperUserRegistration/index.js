import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import { CUICard } from "../../../helpers/material-ui";

const styles = theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  connectorActive: {
    "& $connectorLine": {
      borderColor: theme.palette.secondary.main
    }
  },
  connectorCompleted: {
    "& $connectorLine": {
      borderColor: theme.palette.primary.main
    }
  },
  connectorDisabled: {
    "& $connectorLine": {
      borderColor: theme.palette.grey[100]
    }
  },
  connectorLine: {
    transition: theme.transitions.create("border-color")
  }
});

class CustomizedStepper extends React.Component {
  redirectToIssuerPage = () => {
    console.log("redirecting to redirectToIssuerPage");
    const { projectid } = this.props || "";
    this.props.history.push({
      pathname: `/issuergovernance/details`,
      search: `?projectid=${projectid}`
    });
  };

  render() {
    const { classes, getSteps, activeStep, getStepContent, onClick } = this.props;
    const steps = getSteps();
    const connector = (
      <StepConnector
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine
        }}
      />
    );

    return (
      // <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
      <div className="text--left">
        <div className="txt-xl">User Registration</div>
        <div className={classes.root} style={{ paddingTop: "5px" }}>
          <Stepper alternativeLabel activeStep={activeStep} connector={connector}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>
                  <div className="txt labelAlignment">{label}</div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>{this.redirectToIssuerPage()}</div>
            ) : (
              <div>
                <div className={classes.instructions}>{getStepContent(activeStep)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      // </CUICard>
    );
  }
}

CustomizedStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CustomizedStepper);
