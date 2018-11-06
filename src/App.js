/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./static/css/app.css";
import VaultApp from "./VaultApp";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AllProjects from "./pages/AllProjects";
import Governance from "./pages/Governance";
import FeaturedProjects from "./pages/FeaturedProjects";
import ProjectIssuerGovernance from "./pages/ProjectIssuerGovernance";
import Deployer from "./pages/Deployer";
import ProjectGovernance from "./pages/ProjectGovernance";
import SigninManager from "./containers/SigninManager";
import Register from "./containers/Register";
import store from "./store";
import Search from "./pages/Search";
import WhiteList from "./pages/WhiteList";

const App = props => {
  const { history } = props || {};
  // console.log("logging store: ", store.getState())
  // const { signinManagerData } = store.getState() || {}
  // console.log("signin data: ", signinManagerData)
  // const {isIssuerChecked, isMetamaskNetworkChecked, isMetamaskInstallationChecked, isUserDefaultAccountChecked, isVaultMembershipChecked} = signinManagerData || {}
  // console.log("required states: ", isIssuerChecked, isMetamaskNetworkChecked, isMetamaskInstallationChecked, isUserDefaultAccountChecked, isVaultMembershipChecked)
  return (
    <Provider store={store}>
      <Router>
        <VaultApp dispatch={store.dispatch} getState={store.getState} history={history}>
          <Switch>
            <Route exact path="/" component={FeaturedProjects} history={history} />
            <Route exact path="/mytokens" component={Governance} />
            <Route strict path="/governance/details" component={ProjectGovernance} history={history} />
            <Route strict path="/issuergovernance/details" component={ProjectIssuerGovernance} history={history} />
            <Route exact path="/projects" component={AllProjects} />
            <Route exact path="/landing" component={LandingPage} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/deploy" component={Deployer} />
            <Route exact path="/register" component={WhiteList} />
            {/* <Route exact path="/register" component={Register} /> */}
            <Route path="/search" component={Search} />
            <Route
              path="/pollscan"
              component={() => {
                console.log("address: ", window.location);
                const searchPart = window.location.search;
                window.location = `https://pollscan.io/contract${searchPart}`;
              }}
            />
          </Switch>
          <SigninManager />
        </VaultApp>
      </Router>
    </Provider>
  );
};

export default App;
