import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class VaultApp extends React.PureComponent {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
        {/* <HeaderPartial /> */}
        <div className="main-content">
          {this.props.children}
          {/* <FooterPartial /> */}
        </div>
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
