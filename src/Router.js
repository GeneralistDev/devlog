import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Callback from './components/callback';
import Auth from './Auth/auth';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
};

export const makeMainRoutes = () => {
  return (
      <Router component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}