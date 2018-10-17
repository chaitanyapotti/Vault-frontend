/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './static/css/app.css';
import VaultApp from './VaultApp';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import AllDaicos from './pages/AllDaicos';
import Governance from './pages/Governance';
import ProjectGovernance from './pages/ProjectGovernance';

import store from './store';
import 'semantic-ui-css/semantic.min.css';
import Deployer from './pages/Deployer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <VaultApp dispatch={store.dispatch} getState={store.getState}>
            <Switch>
              <Route exact path="/" component={Governance} />
              <Route exact path="/alldaicos" component={AllDaicos} />
              <Route exact path="/landing" component={LandingPage} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/deploy" component={Deployer} />
              <Route exact path="/page6" component={ProjectGovernance} />
            </Switch>
          </VaultApp>
        </Router>
      </Provider>
    );
  }
}

export default App;
