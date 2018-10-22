import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Col, Grid, Row } from "../../../helpers/react-flexbox-grid";

const styles = theme => ({
  colorSwitchBase: {
    color: purple[300],
    "&$colorChecked": {
      color: purple[500],
      "& + $colorBar": {
        backgroundColor: purple[500],
      },
    },
  },
  colorBar: {},
  colorChecked: {},
});

class TapSwitch extends React.Component {
  state = {
    checked: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="bg--white tp-swtch-cnt">
        <Grid>
          <Row>
            <Col md={4}>
              <div className="txt-m txt-g-primary">No</div>
            </Col>
            <Col md={4}>
              <div>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checked}
                        onChange={this.handleChange("checked")}
                        value="checkedA"
                        classes={{
                          switchBase: classes.colorSwitchBase,
                          checked: classes.colorChecked,
                          bar: classes.colorBar,
                        }}
                      />
                    }
                  />
                </FormGroup>
              </div>
            </Col>
            <Col md={4}>
              <div className="txt-m txt-g-primary">Yes</div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

TapSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TapSwitch);
