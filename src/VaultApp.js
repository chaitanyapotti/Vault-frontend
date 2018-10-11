import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {HeaderPartial, FooterPartial} from '../src/components/Partials';
import SubHeader from '../src/components/Common/Subheader';

class VaultApp extends React.PureComponent {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
        <HeaderPartial />
        <SubHeader/>
        <div className="main-content push-top--50">
          {this.props.children}
        </div>
        <FooterPartial />
      </div>
    );
  }
}

VaultApp.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
};

export default withRouter(VaultApp);
