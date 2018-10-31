import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import ButtonComponent from "../FormComponents/ButtonComponent";

const styles = {
  root: {
    marginLeft: "20px"
  }
};

const SpinnerAdornment = withStyles(styles)(props => <CircularProgress className={props.classes.root} size={20} color="primary" />);

const LoadingButton = props => {
  const { children, loading, label, ...rest } = props;
  return (
    <ButtonComponent {...rest}>
      {children}
      {loading && <SpinnerAdornment />}
    </ButtonComponent>
  );
};

export default LoadingButton;

// Example how to use this component
// {
/* <LoadingButton loading={true} >Click</LoadingButton> */
// }
