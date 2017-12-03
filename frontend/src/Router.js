import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Callback from './components/callback';
import Auth from './Auth/auth';
import { withApollo } from 'react-apollo';

// const handleAuthentication = (nextState, replace) => {
    
// };

class MakeMainRoutes extends Component {
  constructor(props) {
    super(props);

    this.auth = new Auth(props);
    this.handleAuthentication = this._handleAuthentication.bind(this);
  }

  _handleAuthentication(nextState, replace) {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        this.auth.handleAuthentication();
    }
  }

  render() {
    return (
      <Router component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={this.auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            this.handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
  }
}

export default withApollo(MakeMainRoutes);
// export const makeMainRoutes = () => {
//   return (
//       <Router component={App}>
//         <div>
//           <Route path="/" render={(props) => <App auth={auth} {...props} />} />
//           <Route path="/callback" render={(props) => {
//             handleAuthentication(props);
//             return <Callback {...props} /> 
//           }}/>
//         </div>
//       </Router>
//   );
// }