import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import StepContent from "@material-ui/core/StepContent";
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

class VerticalStepper extends React.Component {
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
      <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
        <div className="text--right">
          <a rel="noopener" onClick={onClick}>
            Start Over
          </a>
        </div>
        <div className="txt-xl">Deployer</div>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  <div className="txt labelAlignment">{label}</div>
                </StepLabel>
                <StepContent>{getStepContent(index)}</StepContent>
              </Step>
            ))}
          </Stepper>
          <div>{activeStep === steps.length ? <div>{this.redirectToIssuerPage()}</div> : <div />}</div>
        </div>
      </CUICard>
    );
  }
}

VerticalStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(VerticalStepper);
