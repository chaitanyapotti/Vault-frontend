/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import './static/css/app.css';
import VaultApp from './VaultApp';
import Registration from './pages/Registration';
import Linear from './components/DAICO/Linear';
import Dashboard from './pages/Dashboard';
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <VaultApp dispatch={store.dispatch} getState={store.getState}>
            <Switch>
              <Route exact path="/" component={Registration}/>
              <Route exact path="/linear" component={Linear}/>
              <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
          </VaultApp>
        </Router>
      </Provider>
    );
  }
}

export default App;

{/*<MUIButton label="Buy" type="contained" full*/
}
{/*style={{*/
}
{/*backgroundImage: 'linear-gradient(to right, #7059de 0%, #4b83e0 42%, #2fa1e2 79%, #25ade3 100%)',*/
}
{/*borderRadius: '20px'*/
}
// }}/>