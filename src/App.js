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
import LandingPage from "./pages/LandingPage";
import AllDaicos from "./pages/AllDaicos";
import Governance from "./pages/Governance";
import FeaturedProjects from "./pages/FeaturedProjects";
import Deployer from "./pages/Deployer";
import ProjectGovernance from './pages/ProjectGovernance';


import SigninManager from "./containers/SigninManager";
import Register from "./containers/Register";

import store from "./store";
import "semantic-ui-css/semantic.min.css";



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <VaultApp dispatch={store.dispatch} getState={store.getState}>
            <Switch>
              <Route exact path="/" component={FeaturedProjects} />
              <Route exact path="/governance" component={Governance} />
              <Route exact path="/alldaicos" component={AllDaicos} />
              <Route exact path="/landing" component={LandingPage} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/deploy" component={Deployer} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/page6" component={ProjectGovernance} />
            </Switch>
            <SigninManager/>
          </VaultApp>
        </Router>
      </Provider>
    );
  }
}

export default App;
