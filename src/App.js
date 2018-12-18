/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./static/css/app.css";
import VaultApp from "./VaultApp";
import Registration from "./pages/Registration";
import AllProjects from "./pages/AllProjects";
import Governance from "./pages/Governance";
// import FeaturedProjects from "./pages/FeaturedProjects";
import ProjectIssuerGovernance from "./pages/ProjectIssuerGovernance";
import Deployer from "./pages/Deployer";
import ProjectGovernance from "./pages/ProjectGovernance";
import SigninManager from "./containers/SigninManager";
// import Register from "./containers/Register";
import store from "./store";
import Search from "./pages/Search";
import WhiteList from "./pages/WhiteList";
import LandingPage from "./pages/LandingPage";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const App = props => {
  const { history } = props || {};
  return (
    <Provider store={store}>
      <Router>
        <VaultApp dispatch={store.dispatch} getState={store.getState} history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} history={history} />
            <Route exact path="/mytokens" component={Governance} />
            <Route strict path="/governance/details" component={ProjectGovernance} history={history} />
            <Route strict path="/issuergovernance/details" component={ProjectIssuerGovernance} history={history} />
            <Route exact path="/projects" component={AllProjects} />
            <Route exact path="/registration" component={Registration} history={history} />
            <Route strict path="/deploy" component={Deployer} history={history} />
            <Route exact path="/register" component={WhiteList} />
            {/* <Route exact path="/register" component={Register} /> */}
            <Route strict path="/search" component={Search} />
            <Route
              path="/pollscan"
              component={() => {
                const searchPath = window.location.search;
                window.location = `https://pollscan.io/contract${searchPath}`;
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
