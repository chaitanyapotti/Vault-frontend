/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./static/css/app.css";
import VaultApp from "./VaultApp";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

import store from "./store";
import Deployer from "./pages/Deployer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <VaultApp dispatch={store.dispatch} getState={store.getState}>
            <Switch>
              <Route exact path="/" component={Registration} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/project" component={ProjectDetails} />
              <Route exact path="/deploy" component={Deployer} />
            </Switch>
          </VaultApp>
        </Router>
      </Provider>
    );
  }
}

export default App;
