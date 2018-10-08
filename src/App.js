/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './static/css/app.css';
import VaultApp from './VaultApp';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import LandingPage from './pages/LandingPage';
import AllDaicos from './pages/AllDaicos';

import store from "./store";
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <VaultApp dispatch={store.dispatch} getState={store.getState}>
            <Switch>
              <Route exact path="/" component={AllDaicos} />
              <Route exact path="/landing" component={LandingPage} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/project" component={ProjectDetails} />
            </Switch>
          </VaultApp>
        </Router>
      </Provider>
    );
  }
}

export default App;
