import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';
import ButtonComponent from "../FormComponents/ButtonComponent";

const styles = {
  root: {
    marginLeft: '20px'
  }
}

const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.root}
    size={20}
    color="primary" 
  />
))

const AdornedButton = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props
  return (
    <ButtonComponent {...rest}>
      {children}
      {loading && <SpinnerAdornment/>}
    </ButtonComponent>
  )
}

export default AdornedButton;

// Example how to use this component
{/* <AdornedButton loading={true} >Click</AdornedButton> */}